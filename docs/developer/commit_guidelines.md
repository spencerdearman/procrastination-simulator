# Developer Guidelines

## Pre-Commit Hooks

We use [Husky](https://typicode.github.io/husky/) to handle our pre-commit
hooks to ensure both consistent commit structure and running tests before
pushing to the remote. Going forward, we will use it to lint and check for
style will use it to lint and check for style errors

## Git branches

> TLDR: Short branches, small PRs, only PRs.

We will be loosely be following Vincent Driessen's
[git flow](https://nvie.com/posts/a-successful-git-branching-model/)
model of branching. Please take a few minutes to read that article in full.

There are a few modifications we will be making to Vincent's model:

- The `main` branch is protected in our repository. The only way to merge to
  it is via a pull request.
- Feature branches should be **incremental and small** with a single pull
  request at the end. They are not intended to be long-lived branches that are
  merged into `main` multiple times.
- Feature branches should follow the naming scheme `USERNAME/DESCRIPTION`.
  For example, if you are adding a new feature for caching, the branch for your
  changes might be `user1/award-caching`
- You should merge changes from `main` into a feature branch you are working
  on (to pull in any new code you may need, and to resolve integration issues
  before submitting a pull request). This does not require a pull request and
  can be done with `git merge`.

I want to emphasize that commits should represent **one logical unit of work**.
This means, if you find yourself writing "and" in your commit messages, you
might want to split up that commit into multiple commits.

> There is nothing wrong with a commit which changes just a single line of code.
> There is probably something wrong if you're changing a thousand lines in a
> single commit.

## Commit Message Format

We will be following mostly be following the standards described in
[commitlint's Angular config](https://github.com/conventional-changelog/commitlint/blob/main/%40commitlint/config-angular/README.md)
with a few modifications:

- Subjects must be less than 75 characters long

Here is the structure for commits

```
<type>: <short summary>
  │           │
  │           └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|style|test|
```

#### Type

Must be the following:

- **build**: Changing/updating dependencies
- **ci**: Changes to the CI pipeline
- **docs**: Documentation only changes
- **feat**: Partial or complete implementation of a feature
- **fix**: Partial or complete fix of a bug
- **perf**: An code change that results in a performance change
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: A change that only affects the style of the code
- **test**: Adding or modifying tests
- **impr**: An improvement to an existing feature
- **chore**: Other changes which don't apply

build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test
The reason for this standardization is to encourage thoughtful, incremental commits.

Husky will automatically enforce these standards whenever you try to commit, so
don't worry about accidentally making a mistake in your format—the commit will
not succeed if so.

**Example**

If you were trying to add a drag-and-drop feature, you might create a branch
`my-username/drag-and-drop`, and make the following commits:

```
impr: add "canDrag" to `Task`
impr: `Calendar` can recognize locations for where to drop `Task` instances
feat: implement drag and drop feature
docs: update documentation for `Task` and `Calendar` classes
```
