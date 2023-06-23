# node-octokit-stream-disturbed

Reproduction for octokit Error "Response body object should not be disturbed or locked"

## Prerequisites

To set up this notes app, complete the following tasks:

- Install **Node.js** by following these steps:
  1. Install [nvm](https://github.com/nvm-sh/nvm#installation-and-update).
  1. Use node v18.x.x by running `nvm use` or `nvm use 18` in a terminal window.
  1. Verify that node is installed by running `node -v` in a terminal window and confirm that it shows Node.js >=18, such as `v18.13.0`).
  1. Enable corepack by running `corepack enable` in a terminal window.
- Install dependencies by running `yarn`.

## Reproduction

- Create a fork of this repo.
- Manually create a GitHub release, with some tag, say `v0.0.1`.
- Create a personal access token with `repo` scope.
- Export personal token in environment variable `OCTOKIT_AUTH_TOKEN`
  - `export OCTOKIT_AUTH_TOKEN=<your token>`.
- Run `node run.js`.
