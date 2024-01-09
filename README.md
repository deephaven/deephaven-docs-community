# Deephaven Community Core documentation

Source code for the [deephaven.io](https://deephaven.io/) Community User Guide. This documentation is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator (powered by React).

## Getting the source

Deephaven uses the [Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow). In this workflow, the [deephaven/deephaven-community-docs](https://github.com/deephaven/deephaven-docs-community) repository contains a minimum number of branches, and development work happens in user-forked repositories.

To learn more see:

- [Forking Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow)
- [Forking Projects](https://guides.github.com/activities/forking/)
- [Fork A Repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo)
- [Working With Forks](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/working-with-forks)

To get started quickly:

1. Navigate to [https://github.com/deephaven/deephaven-community-docs](https://github.com/deephaven/deephaven-docs-community).
2. Click `Fork` in the top right corner.

## Installation

### GitHub LFS

The repository uses [GitHub large file support](https://git-lfs.github.com/). Follow the directions in the link to install. If you are using Mac, you need to:

```
brew install git-lfs
git lfs install
```

The current files that are stored in LFS can be seen in [.gitattributes](.gitattributes). To add a new file type to LFS, use the `lfs track` command.  
Here is an example for `*.mp4` files.

```
git lfs track "*.mp4"
```

Note that if you have installed lfs _after_ you cloned the repo, you will need to manually fetch the lfs files using

```
git lfs fetch
```

On some systems, you may also need to run:

```
git lfs pull
```

### Git Clone

Be sure that GitHub LFS is installed before cloning, or you will just see links to files, instead of the files.

`git clone git@github.com:<username>/<forkname>.git`

Commit changes to your own branches in your forked repository.

### NPM Install

To get started clone this repo, and assuming you have node.js installed (node LTS, not node current, see appendix for notes on managing node versions) run the following in the cloned directory. This will install the needed dependencies to build and run locally. If you don't have node installed, see [Installing Node](#installing-node) in the appendix below.

```
$ npm install
```

If you are running an M1 mac, please make sure your node version is >=16. (You can check by running `node -v`).

## Local Development

```
$ npm start
```

This command starts a local development server on port 3001, [http://localhost:3001](http://localhost:3001), and will open up a browser window for live previewing. Most changes are reflected live without having to restart the server. Edit your changes in markdown and preview them in the browser.

## Appendix

### Installing Node

If you don't have node installed (check with `node -v` on the command line), we recommend installing node by using [nvm](https://github.com/nvm-sh/nvm) (node version manager).

Install nvm by running:

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash`

Install the repo node version:

`nvm use`

If working with multiple repos w/ node versions, you can automatically switch between the versions with nvm based on the `.nvmrc` file by following the instructions [here](https://github.com/nvm-sh/nvm#deeper-shell-integration) for your shell.

## Code Of Conduct

This project has adopted the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).
For more information see the [Code of Conduct](CODE_OF_CONDUCT.md) or contact [opencode@deephaven.io](mailto:opencode@deephaven.io)
with any additional questions or comments.

<!--TODO
## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.
-->
