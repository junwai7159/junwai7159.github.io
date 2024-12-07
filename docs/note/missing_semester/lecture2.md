# Lecture 2: Shell Tools and Scripting

## Shell Scripting

**Assign variables:**
```bash
foo=bar
echo "$foo"
# prints bar
echo '$foo'
# prints $foo
```
- spacing will perform argument spliting

**Control flow:**
```bash
mcd () {
    mkdir -p "$1"
    cd "$1"
}
```
- `source`: execute commands from a file in the current shell

**Special variables**:
- `$0` - Name of the script
- `$1` to `$9` - Arguments to the script. $1 is the first argument and so on.
- `$@` - All the arguments
- `$#` - Number of arguments
- `$?` - Return code of the previous command
- `$$` - Process identification number (PID) for the current script
- `!!` - Entire last command, including arguments. A common pattern is to execute a command only for it to fail due to missing permissions; you can quickly re-execute the command with `sudo` by doing `sudo !!`
- `$_` - Last argument from the last command. If you are in an interactive shell, you can also quickly get this value by typing `Esc` followed by . or `Alt+`.

**Command returns**:
- return output with `STDOUT`, errors with `STDERR`
- `>` to redirect `STDOUT`, `2>` to redirect `STDERR`
- Return Code: 0 means OK, else an error occured
- `true`: 0 return code, `false`: 1 return code

**Short-circuiting**:
```bash
false || echo "Oops, fail"
# Oops, fail

true || echo "Will not be printed"
#

true && echo "Things went well"
# Things went well

false && echo "Will not be printed"
#

true ; echo "This will always run"
# This will always run

false ; echo "This will always run"
# This will always run
```

**Substitution**:
- command substitution: `$(CMD)`, execute `CMD`, get the output of the command and substitute in place
- process substitution: `<(CMD)`, execute `CMD`, place the output in a temporary file and substitute `<()` with that file's name
- try to use double brackets `[[ ]]` in favor of single brackets `[ ]` in bash, although it won't be portable in `sh` 
```bash
#!/bin/bash

echo "Starting program at $(date)" # Date will be substituted

echo "Running program $0 with $# arguments with pid $$"

for file in "$@"; do
    grep foobar "$file" > /dev/null 2> /dev/null
    # When pattern is not found, grep has exit status 1
    # We redirect STDOUT and STDERR to a null register since we do not care about them
    if [[ $? -ne 0 ]]; then
        echo "File $file does not have any foobar, adding one"
        echo "# foobar" >> "$file"
    fi
done
```

**Globbing**:
- glob patterns specify sets of filenames with wildcard characters
- wildcards: `?` and `*` to match one or any amount of characters respectively
- curly braces `{}`: common substring in a series of command, to expand
```bash
convert image.{png,jpg}
# Will expand to
convert image.png image.jpg

cp /path/to/project/{foo,bar,baz}.sh /newpath
# Will expand to
cp /path/to/project/foo.sh /path/to/project/bar.sh /path/to/project/baz.sh /newpath

# Globbing techniques can also be combined
mv *{.py,.sh} folder
# Will move all *.py and *.sh files


mkdir foo bar
# This creates files foo/a, foo/b, ... foo/h, bar/a, bar/b, ... bar/h
touch {foo,bar}/{a..h}
touch foo/x bar/y
# Show differences between files in foo and bar
diff <(ls foo) <(ls bar)
# Outputs
# < x
# ---
# > y
```

**shebang**:
- `env` command to resolve to wherever the command lives in the system
- e.g. use `#!/usr/bin/env python` instead of `#!/usr/local/bin/python`
- `shellcheck` to find errors in sh/bash scripts
```python
#!/usr/bin/env python
import sys
for arg in reversed(sys.argv[1:]):
    print(arg)
```

**Shell functions vs scripts**:
- Functions have to be in the same language as the shell, while scripts can be written in any language. This is why including a shebang for scripts is important.
- Functions are loaded once when their definition is read. Scripts are loaded every time they are executed. This makes functions slightly faster to load, but whenever you change them you will have to reload their definition.
- Functions are executed in the current shell environment whereas scripts execute in their own process. Thus, functions can modify environment variables, e.g. change your current directory, whereas scripts can’t. Scripts will be passed by value environment variables that have been exported using `export`
- As with any programming language, functions are a powerful construct to achieve modularity, code reuse, and clarity of shell code. Often shell scripts will include their own function definitions.

## Shell Tools
### Finding how to use commands
- help, man, tldr

### Finding files
**find file or directory**:
```bash
# Find all directories named src
find . -name src -type d
# Find all python files that have a folder named test in their path
find . -path '*/test/*.py' -type f
# Find all files modified in the last day
find . -mtime -1
# Find all zip files with size in range 500k to 10M
find . -size +500k -size -10M -name '*.tar.gz'
```

**Perform actions**:
```bash
# Delete all files with .tmp extension
find . -name '*.tmp' -exec rm {} \;
# Find all PNG files and convert them to JPG
find . -name '*.png' -exec convert {} {}.jpg \;
```

**`fd`**:
- alternative to `find`
- offers some nice defaults like colorized output, default regex matching, and Unicode support
```bash
fd "*.py"
```

**`locate`**:
- uses a database that is updated using `updatedb`
- `updatedb` is updated daily via `cron`

### Finding code
**`grep`**:
- `-R`: recursive search
- `-C`: context lines
- `-v`: invert match

**`rg`**:
```bash
# Find all python files where I used the requests library
rg -t py 'import requests'
# Find all files (including hidden files) without a shebang line
rg -u --files-without-match "^#\!"
# Find all matches of foo and print the following 5 lines
rg foo -A 5
# Print statistics of matches (# of matched lines and files )
rg --stats PATTERN
```

### Finding shell commands
- up arrow
- `history`, e.g. `history | grep`
- `Ctrl + R`
- `fzf`: fuzzy finder
- `fish`: history-based autosuggestions


### Directory navigation
- shell aliases: `alias`
- symlinks: `ln -s`
- autojump: `fasd`, `autojump`
- overview of directory structure: `tree`, `broot`, `nnn`, `ranger`

## Exercises
- `xargs`: execute a command using `STDIN` as arguments