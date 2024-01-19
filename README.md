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

## Code Of Conduct

This project has adopted the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).
For more information see the [Code of Conduct](CODE_OF_CONDUCT.md) or contact [opencode@deephaven.io](mailto:opencode@deephaven.io)
with any additional questions or comments.

<!--TODO
## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.
-->
