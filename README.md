# Update Github Action Secret

This action is built to update github action secret using github workflow.

## Using in github workflow

```yaml
jobs:
  update-secret:
    runs-on: ubuntu-latest
    steps:
      - name: Update Github Secret
        uses: update-github-action-secret@1.0.0
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }} # Your github token to allow access to the API
          repo_name: repoName # Github Repository name
          repo_owner_name: repoOwnerName # Github Repository Owner name
          secret_name: 'SECRET_KEY' # Github Secret key name for update
          secret_value: 'secret_value' # Github Secret value to update
```
