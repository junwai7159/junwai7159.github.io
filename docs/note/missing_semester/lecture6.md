# Lecture 6: Version Control (Git)

## Git's data model
### Snapshots
- tree: directory, maps names to blobs or trees
- blob: file (bunch of bytes)
- snapshot / commit: top-level tree that is being tracked

**Example**:
- top-level tree has two elements: tree "foo", blob "baz.txt"
```
<root> (tree)
|
+- foo (tree)
|  |
|  + bar.txt (blob, contents = "hello world")
|
+- baz.txt (blob, contents = "git is wonderful")
```

### Modeling history: relating snapshots
- history: directed acyclic graph (DAG) of snapshots
- each snapshot refers to a set of parents (the snapshots that preceded it)
- single parent: linear history
- multiple parents: merging two parallel branches
- commits are immutable, "edits" to the commit history are creating new commits

**Example**:
```
o <-- o <-- o <-- o <---- o
            ^            /
             \          v
              --- o <-- o
```

### Data model, as pseudocode
```
// a file is a bunch of bytes
type blob = array<byte>

// a directory contains named files and directories
type tree = map<string, tree | blob>

// a commit has parents, metadata, and the top-level tree
type commit = struct {
    parents: array<commit>
    author: string
    message: string
    snapshot: tree
}
```

### Objects and content-addressing
Object: blob, tree, or commit
```
type object = blob | tree | commit
```

In Git data store, all objects are content-addressed by their SHA-1 hash (160 bits, 40 hexadecimal characters)
```
objects = map<string, object>

def store(object):
    id = sha1(object)
    objects[id] = object

def load(id):
    return objects[id]
```

**Example**:
- When objects reference other object,  they don’t actually contain them in their on-disk representation, but have a reference to them by their hash
- visualize commit: `git cat-file -p 698281bc680d1995c5f4caaf3359721a5a58d48d`
```
100644 blob 4448adbf7ecd394f42ae135bbeed9676e894af85    baz.txt
040000 tree c68d233a33c5c06e0340e4c224f0afca87c8ce87    foo
```
- visualize `baz.txt`: `git cat-file -p 4448adbf7ecd394f42ae135bbeed9676e894af85`
```
git is wonderful
```

### References
- human-readable names for SHA-1 hashes
- pointers to commits
- mutable (update to point new commit)
- e.g. `master` reference points to the latest commit in the main branch
- `HEAD`: reference to current check-out commit 
    - e.g. `HEAD -> main -> C1`; `git checkout main`
- detached `HEAD`: when `HEAD` points to a commit rather than a branch 
    - e.g. `HEAD -> C1`; `git checkout C1`

```
references = map<string, string>

def update_reference(name, id):
    references[name] = id

def read_reference(name):
    return references[name]

def load_reference(name_or_id):
    if name_or_id in references:
        return load(references[name_or_id])
    else:
        return load(name_or_id)
```

### Repositories
- Git repository: it is the data `objects` and `references`
- all `git` commands map to some manipulation of the commit DAG by adding `objects` and adding/updating `references`

## Staging area
Allow to specify which modifications should be included in the next snapshot

## Git command-line interface
### Basics
- `git help <command>`: get help for a git command
- `git init`: creates a new git repo, with data stored in the .git directory
    - `git init --bare`: create bare repositories (for central repositories, does not have working directory)
- `git status`: tells you what’s going on
- `git add <filename>`: adds files to staging area
- `git commit`: creates a new commit
- `git log`: shows a flattened log of history
- `git log --all --graph --decorate --oneline`: visualizes history as a DAG
- `git diff <filename>`: show what has changed but hasn't been added to the index yet via `git add`
- `git diff --cached`: show what has been added to the index  via `git add` but not yet committed
- `git diff <revision> <filename>`: shows differences in a file between snapshots
- `git checkout <revision>`: updates HEAD and current branch
    - `git checkout HEAD^`: check out to parent commit (move upwards 1 time); `^` (parent directly above); `^2` (2nd parent) 
    - `git checkout HEAD~n`: move upwards `n` times

### Branching and merging
- `git branch`: shows branches
    - `git branch -vv` for verbose display
    - `git branch -f main HEAD~3`: moves (by force) the `main` branch 3 parents behind `HEAD`
- `git branch <name>`: creates a branch
- `git checkout -b <name>`: creates a branch and switches to it
    - `same as git branch <name>; git checkout <name>`
    - `git checkout -b foo origin/main`: set local branch `foo` to track `origin/main`
- `git merge <revision>`: merges into current branch
    - need to stage the file to mark the conflict as resolved
    - `git merge --continue` instead of `git commit` to complete the merge
    - `git merge --abort` to abort the merge
- `git mergetool`: use a fancy tool to help resolve merge conflicts
- `git rebase`: rebase set of patches onto a new base
- `git rebase <basebranch> <topicbranch>`: checks out the topic branch for you and replays it onto the base branch

### Remotes
- `git remote`: list remotes
- `git remote add <name> <url>`: add a remote
- `git push <remote> <local branch>:<remote branch>`: send objects to remote, and update remote reference
    - `git push <remote> :<remote branch>`: deletes remote branch
- `git branch --set-upstream-to=<remote>/<remote branch>`: set up correspondence between local and remote branch
    - `git branch -u origin/main foo`: set local branch `foo` to track `origin/main`
- `git fetch`: retrieve objects/references from a remote (does not update local branch)
    - `git fetch <remote> <remote branch>:<local branch>`: fetch remote branch from remote to local branch
    - `git fetch <remote> :<local branch>`: fetching nothing makes new local branch 
- `git pull`: same as git fetch; git merge
    - `git pull --rebase`: fetch and rebase
    - `git pull origin foo`: `git fetch origin foo; git merge origin/foo`
    - `git pull origin bar:bugFix`: `git fetch origin bar:bugFix; git merge bugFix`
- `git clone`: download repository from remote

### Undo
- `git commit --amend`: edit a commit’s contents/message
- `git reset HEAD <file>`: unstage a file
- `git reset HEAD~1`: move a branch backwards
- `git checkout -- <file>`: discard changes
- `git revert HEAD`: creates a new commit that effectively negates the changes introduced by the specified commit

## Advanced Git
- `git config`: Git is highly customizable, `~/.gitconfig`
- `git clone --depth=1`: shallow clone, without entire version history
- `git add -p`: interactive staging
- `git rebase -i`: interactive rebasing
- `git blame`: show who last edited which line
- `git stash`: temporarily remove modifications to working directory
    - `git stash pop` to undo the stash
- `git bisect`: binary search history (e.g. for regressions)
- `.gitignore`: specify intentionally untracked files to ignore
- `git show <commit>`: show commit
- `git cherry-pick <commit1> <commit2>`: apply the changes introduced by specific commits from one branch to another branch
- `git tag <tagname> <commit>`: add tag at commit
- `git describe <ref>`: describe where you are relative to the closest tag
    - outputs `<tag>_<numCommits>_g<hash>`

## Workflows
**Types of workflows**:
- Centralized workflow
    - centralized repository that individual developers will push and pull from 
- Feature branch workflow
    - all feature development should take place in a dedicated branch instead of the `main` branch
- Gitflow workflow
    - `develop`, `feature`, `release`, `hotfix` branches
- Forking workflow
    - instead of a single server-side repository to act as the "central" codebase, it gives every developer a server-side repository
    - each contributor has two Git repositories: a private local one and a public server-side one

**Gitflow**:
![git-flow](./media/git-flow.png)

**The overall flow of Gitflow**:
1. A `develop` branch is created from `main`
2. A `release` branch is created from `develop`
3. `Feature` branches are created from `develop`
4. When a `feature` is completed it is merged into the `develop` branch
5. When the `release` branch is done it is merged into `develop` and `main`
6. If an issue in `main` is detected a `hotfix` branch is created from `main`
7. Once the `hotfix` is complete it is merged to both `develop` and `main`

**References**:
- https://www.endoflineblog.com/gitflow-considered-harmful
- https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
- https://nvie.com/posts/a-successful-git-branching-model/

## Write good commit messages
**Example**:
```
Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

Resolves: #123
See also: #456, #789
1. Separate subject fr
```

**The seven rules of a great Git commit message**
- One more thing: atomic commits!
1. Separate subject from body with a blank line
2. Limit the subject line to 50 characters
3. Capitalize the subject line
4. Do not end the subject line with a period
5. Use the imperative mood in the subject line
6. Wrap the body at 72 characters
7. Use the body to explain what and why vs. how

**References**:
- https://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
- https://cbea.ms/git-commit/

## Exercises
TO-DO
- https://learngitbranching.js.org/
- https://git-scm.com/book/en/v2