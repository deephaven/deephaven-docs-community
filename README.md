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

## Versioning (Community)

Community docs are not versioned the same way as Enterprise. Instead, we maintain a `next` branch on GitHub where changes for the next DHC release can be staged.

On each DHC release, we should merge `next` into `main`. The nightly actions will auto merge `main` into `next` so that the `next` branch stays up to date with `main` and reduces the size of any potential merge conflicts.

./core/docs contains the python docs, ./core_versioned_docs/version-groovy/docs contains the groovy docs. They were split due to divergent behaviors and supported features.

### Changes to current DHC docs

This workflow is for changes that affect/work for the currently released DHC version.

1. Branch off of `main`
2. Make your changes
3. Run `npm run updateSnapshots` to automatically run any code examples you modified/added. Commit the files created by this. See the [auto run examples readme](./tools/run-examples/README.md) for more info
4. Create a PR targeted for `main`

### Changes for next version DHC docs

This workflow is for changes which affect/work on the next, unreleased DHC version. This is useful for staging syntax changes or new features that will be released in the next version.

1. Branch off of `next`
2. Make your changes
3. Run `npm run updateSnapshots:next` to automatically run any code examples you modified/added. Commit the files created by this. See the [auto run examples readme](./tools/run-examples/README.md) for more info
4. Create a PR targeted for `next`

## Versioning (Enterprise Only)

Enterprise docs are versioned by release. The `/enterprise/docs` folder represents the latest release and served as enterprise/docs. The current "rc" branch will have its own branch. If you need to update docs for older releases, update the appropriate doc in the `/enterprise_versioned_docs/{release-name}/folder`.

For creating new docs, each versioned_doc also has a versioned_sidebars, so if you are adding a new doc to versioned_release please update all appropriate sidebars as well. The current release sidebar is in the root at `sidebars.enterprise.js` and older versioned sidebars are available at the `/enterprise_versioned_sidebars/{release-name}-sidebar.json`

**!!To edit older docs, with changes that also apply to newer versions, you must manually update the version of each document in each release folder and the root enterprise/docs that the change applies to!!**

| release         | path                                     |
| --------------- | ---------------------------------------- |
| current release | enterprise/docs                          |
| older releases  | enterprise_versioned_docs/{release-name} |

Images/assets are also versioned into each folder, and can be updated for just specific versions.

### Release process

When the enterprise version is ready to be released run `npx docusaurus docs:version:enterprise {name}` (where {name} is the lower-case release name ex. "bard", and becomes part of the url for past releases). That commmand copies/snapshots everything in "enterprise/docs" into a versioned folder. Future edits for that release go into the versioned folder, and the `enterprise/docs` folder, become the new rc.

Manually update the `./versions_labels.js` file with the appropriate labels (follow instructions in that file). (`./enterprise_versions.json`) is automatically appended by the command at the start of this process.

Manually update any `latest` or `next` Javadoc links to a stable, versioned link.

_After_ the branch with the new release has been merged and deployed the search index should be re-built. Manually trigger the "Nightly" workflow action to immediately update the search links (rather than waiting until it runs automatically at night).

#### Deleting old releases

We should regularly prune releases that are no longer used to improve build time, and reduce complexity from users.

1. delete release folder from enterprise_versioned_docs
2. delete the sidebar from enterprise_versioned_sidebars
3. delete the version from enterprise_versions.json
4. delte the version from enterprise_versions_labels.js

## Editing

Documents are created and stored in the projects `<project>/docs` folder as `.md` markdown files. You can use whatever folder hierarchy is appropriate for your content. All file and folder names should be in _kebab-case_, and will become the public-facing url. `.<project>/docs/path/to-your-folder/your-document`. Files in /enterprise/docs represent the next unreleased version.

Once a file is created, to have it appear in the sidebar, it must manually be added to the appropriate `./sidebar.<project>.js`. To appear on the enterprise onboarding landing page, add a link in the `./src/pages/enterprise/docs/index.js`, which is a react rendered page.

Image assets are stored in `<project>/assets` and can be linked using the relative path from your document.

Note: images should be captured with Snagit software. In **Settings**, check "Keep original image dimensions" and un-check "Scale down retina images when sharing."

All changes should be approved by an editor on the docs team before being merged and must be formatted using [Prettier](https://prettier.io/) before submitting.

- If using [Visual Studio Code](https://code.visualstudio.com/), and the Prettier extension is installed, this is done automatically on save as configured in the `.vscode/settings.json` file.
- If using a [Jetbrains IDE](https://www.jetbrains.com/), you can install the [Prettier plugin](https://plugins.jetbrains.com/plugin/10456-prettier) and enable it to format on save.
- If you prefer not to format on save, you can run the `npm run format` command instead. This may take a minute to run initially but should be fairly quick once the cache is built.
- In some cases, such as YAML code blocks, you may want to preserve indentation and tell Prettier not to format the code. Use a `<!-- prettier-ignore -->` comment to skip the following line. This works if put directly above a code block.

## Organization

We've adopted [Diátaxis Framework](https://diataxis.fr/) for documentation. All new content should fit into one of these four quadrants: Tutorial, How-to, Reference, or Conceptual Guide. We encourage you to refresh yourself on the structure at the above link before starting on a new piece of documentation.

Quick Reference:

| &nbsp;      | Tutorials                       | How-to guides                        | Reference                 | Conceptual                         |
| ----------- | ------------------------------- | ------------------------------------ | ------------------------- | ---------------------------------- |
| **Purpose** | learning                        | a goal                               | information               | understanding                      |
| **Intent**  | allow a new user to get started | show how to solve a specific problem | exhaustively describe     | explain how or why                 |
| **Format**  | a lesson                        | a series of steps                    | dry description           | contextual explanations            |
| **Analogy** | teaching a child to bake bread  | a recipe for sour dough              | a wikipedia page on yeast | an article on the history of bread |

Upon completing a **tutorial**, all users should end up with the same outcome. When following along with a **how-to guide**, all users will learn the same information, but - continuing with the baking analogy - they can use their own ingredients, so outcomes may differ.

## Blogging

Blog posts are stored in the /blogs folder. For new posts, you can use a previous post as a template. If you haven't contributed to the blog before, you'll need to add yourself to the /blog/authors.yml file (please add in alphabetical order). Your key should be your github username.

The date in the file name represents the date it will be shown as published. The PR should be merged on the desired publish date.

Example blog frontmatter:

```
---
title: "The title shown on blog"
subtitle: "The subtitle shown after the title on the blog" (uses description if no subtitle provided)
authors: githubusername or [githubusername1, githubusername2] (must be in authors.yml)
tags: ['devops', 'gRPC', 'Flight'] (for categorization, not social tagging)
description: summary displayed in search engine for page
image: img/blog-covers/...  (optional, the image used for social media previews)
thumbnail: img/blog-thumbnails/match-blog-post-filename.jpg (required, displays as main image)
---
```

### Images

For thumbnail imagery, @dsmmcken creates an AI-generated image using Dall-e or Stable diffusion. It can be abstractly connected, or directly. Example: A photo of a red panda for RedPanda posts, or a photo of shipping container on a whale for docker container posts. Photos should be selected based on visual interest, have bright colours and a central focal point. Avoid or re-crop asymmetrical photos, as the image is displayed in both square and landscape formats.

## Job postings

You can create a new job posting by creating a new markdown file with the job title as the file name in `/src/pages/company/careers/posts`. You must also add a link to the job post you just created in the `/src/pages/company/careers/index.md` file. To remove a job posting you can simply mark the file to start with an `_` so that it is not published (in case you may want to re-open it in the near future), or delete the file. You must also update the `index.md` file to remove the link from the current openings section. If we have no current openings, please use an html style code comments (one html comment per line in markdown) to temporarily remove the current openings section.

Please follow one of our other job postings as a template for what to include in your post.

## Deployment

Changes are automatically deployed live when the branch is merged to main. Continuous deployment is handled by a github action. See the .github/workflows for details.

The files are built with a github action, then rsync copies the changed files to the server (currently Dreamhost), and deletes old files. Each doc path published by deephaven-core as javadocs/pydocs etc are excluded from deletion by the rsync action, and has manually created symlinks at the desired path location.

Enterprise docs are protected by basic http auth, using the following rule in an `.htaccess` file in the `/enterprise` folder on the server. The expr `/.*/docs` accounts for versioned docs.

```
AuthType Basic
AuthUserFile /home/<redacted>/deephaven.io/enterprise/docs/.htpasswd
AuthName "Enterprise Docs"
Require expr %{REQUEST_URI} !~ m#/.*/docs#
Require valid-user
```

`.htpasswd` is autogenerated an updated via the dreamhost settings.

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
