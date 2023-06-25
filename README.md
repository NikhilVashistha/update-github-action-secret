# Update Github Action Secret and Variable

This action is built to update github action secret and github repository variable using github workflow.

## Update Github Action Secret Using Github Workflow

```yaml
jobs:
  update-secret:
    runs-on: ubuntu-latest
    steps:
      - name: Update Github Secret
        uses: NikhilVashistha/update-github-action-secret@v1.0.3
        with:
          github_token: ${{ secrets.REPO_ACCESS_TOKEN }} # Your github token to allow access to the API
          secret_name: 'SECRET_KEY' # Github Secret key name for update
          secret_value: 'secret value' # Github Secret value to update
```

## Update Github Action Secret Using Github Workflow for Other Repositories

```yaml
jobs:
  update-secret:
    runs-on: ubuntu-latest
    steps:
      - name: Update Github Secret
        uses: NikhilVashistha/update-github-action-secret@v1.0.3
        with:
          github_token: ${{ secrets.REPO_ACCESS_TOKEN }} # Your github token to allow access to the API
          repo_name: repoName # Github Repository name
          repo_owner_name: repoOwnerName # Github Repository Owner name
          secret_name: 'SECRET_KEY' # Github Secret key name for update
          secret_value: 'secret value' # Github Secret value to update
```

## Update Github Repository Variable Using Github Workflow

```yaml
jobs:
  update-secret:
    runs-on: ubuntu-latest
    steps:
      - name: Update Github Variable
        uses: NikhilVashistha/update-github-action-secret@v1.0.3
        with:
          github_token: ${{ secrets.REPO_ACCESS_TOKEN }} # Your github token to allow access to the API
          variable: true # To update github repository variable
          variable_name: 'VARIABLE_NAME' # Github Repository variable key name for update
          variable_value: 'variable value' # Github Repository variable value to update
```

## Update Github Repository Variable Using Github Workflow for Other Repositories

```yaml
jobs:
  update-secret:
    runs-on: ubuntu-latest
    steps:
      - name: Update Github Variable
        uses: NikhilVashistha/update-github-action-secret@v1.0.3
        with:
          github_token: ${{ secrets.REPO_ACCESS_TOKEN }} # Your github token to allow access to the API
          repo_name: repoName # Github Repository name
          repo_owner_name: repoOwnerName # Github Repository Owner name
          variable: true # To update github repository variable
          variable_name: 'VARIABLE_NAME' # Github Repository variable key name for update
          variable_value: 'variable value' # Github Repository variable value to update
```
