import {Octokit} from 'octokit';
import sodium from 'libsodium-wrappers';

import core from '@actions/core'
import github from '@actions/github'

const updateGithubSecret = async () => {

  const repoOwner = core.getInput('repo_owner_name') || github.context.repo.owner;
  const repoName = core.getInput('repo_name') || github.context.repo.repo;

  const githubToken = core.getInput('github_token');

  const variable = core.getBooleanInput('variable');

  if(!githubToken) {
    throw new Error('No token provided');
  }
  
  const octokit = new Octokit({
    auth: githubToken,
  });

  if(variable) {

    const variableName = core.getInput('variable_name');

    const variableValue = core.getInput('variable_value');

    if(!variableName) {
      throw new Error('variable_name cannot be empty');
    }

    const updateVariableRequest = await octokit.request(
      `PATCH /repos/${repoOwner}/${repoName}/actions/variables/${variableName}`,
      {
        owner: repoOwner,
        repo: repoName,
        name: variableName,
        value: variableValue,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    if(updateVariableRequest.status && updateVariableRequest.status == 204) {
      core.setOutput('result', '✅ Github Repository Variable Updated Successfully!');
    } else {
      core.setFailed('❌ Failed to update repository action variable!');
    }

    return;
  }


  // The secret key name you want to update
  const secretName = core.getInput('secret_name');

  // The secret value you want to encrypt and update in secrets
  const secretValue = core.getInput('secret_value');

  if(!secretName) {
    throw new Error('secret_name cannot be empty');
  }

  const publicKeyRequest = await octokit.request(
    `GET /repos/${repoOwner}/${repoName}/actions/secrets/public-key`,
    {
      owner: repoOwner,
      repo: repoName,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );

  if(publicKeyRequest.status && publicKeyRequest.status == 200) {

    //Check if libsodium is ready and then proceed.
    sodium.ready.then(async () => {
      // Convert Secret & Base64 key to Uint8Array.
      let binkey = sodium.from_base64(publicKeyRequest.data.key, sodium.base64_variants.ORIGINAL);
      let binsec = sodium.from_string(secretValue);

      //Encrypt the secret using LibSodium
      let encBytes = sodium.crypto_box_seal(binsec, binkey);

      // Convert encrypted Uint8Array to Base64
      let output = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);

      const updateSecretRequest = await octokit.request(
        `PUT /repos/${repoOwner}/${repoName}/actions/secrets/${secretName}`,
        {
          owner: repoOwner,
          repo: repoName,
          secret_name: secretName,
          encrypted_value: output,
          key_id: publicKeyRequest.data.key_id,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          },
        },
      );

      if(updateSecretRequest.status && (updateSecretRequest.status == 200 || updateSecretRequest.status == 204)) {
        console.log(updateSecretRequest.status);
        core.setOutput('result', '✅ Github Action Secret Updated Successfully!');
      } else {
        core.setFailed('❌ Failed to update repository action secret!');
      }

      
    });

  } else {
    core.setFailed('❌ Failed to get repository public key!');
  }
  
};

updateGithubSecret();
