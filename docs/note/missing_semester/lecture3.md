# Lecture 3: Editors (Vim)

## Modal editing
**Operating modes**:
- Normal: for moving around a file and making edits; `<ESC>`
- Insert: for inserting text; `i`
- Replace: for replacing text; `R`
- Visual (plain, line, or block): for selecting blocks of text; `v`, `V` for line, `<C-v>` for block
- Command-line: for running a command; `:`

## Basics
### Buffers, tabs, and windows
- buffers: set of open files
- tabs: collection of one or more windows
- windows: each window shows a single buffer

### Command-line
- `:q` quit (close window), `:qa` to close all windows, `q!` to discard changes
- `:w` save (“write”)
- `:wq` save and quit
- `:e` \{name of file\} open file for editing
- `:ls` show open buffers
- `:help` \{topic\} open help
    - `:help :w` opens help for the `:w` command
    - `:help w` opens help for the `w` movement
- `:sp`: split window
- `:tabnew`

## Vim's interface is a programming language
### Movement (nouns)
- Basic movement: `hjkl` (left, down, up, right)
- Words: `w` (next word), `b` (beginning of word), `e` (end of word)
- Lines: `0` (beginning of line), `^` (first non-blank character), `$` (end of line)
- Screen: `H` (top of screen), `M` (middle of screen), `L` (bottom of screen)
- Scroll: `Ctrl-u` (up), `Ctrl-d` (down)
- File: `gg` (beginning of file), `G` (end of file)
- Line numbers: `:{number}<CR>` or `{number}G` (line \{number\})
- Misc: `%` (corresponding item)
- Find: `f{character}`, `t{character}`, `F{character}`, `T{character}`
    - find/to forward/backward \{character\} on the current line
    - `,`/ `;` for navigating matches
- Search: `/{regex}`, `n` / `N` for navigating matches

### Selection
- Visual: `v`
- Visual Line: `V`
- Visual Block: `Ctrl-v`

### Edits (verbs)
- `i` enter Insert mode
    - but for manipulating/deleting text, want to use something more than backspace
- `o` / `O` insert line below / above
- `d`\{motion\}` delete \{motion\}
    - e.g. `dw` is delete word, `d$` is delete to end of line, `d0` is delete to beginning of line
- `c{motion}` change \{motion\}
    - e.g. `cw` is change word
    - like `d{motion}` followed by i
- `x` delete character (equal do `dl`)
- `r` replace character
- `s` substitute character (equal to `cl`)
- Visual mode + manipulation
    - select text, `d` to delete it or `c` to change it
- `u` to undo, `<C-r>` to redo
- `y` to copy / “yank” (some other commands like `d` also copy); `yy` line, `yw` word
- `p` to paste
- `/` for next match
- `n` for next match
- `.` repeats previous editing command
- `A` append to end of line
- Lots more to learn: e.g. `~` flips the case of a character

### Counts
- `3w` move 3 words forward
- `5j` move 5 lines down
- `7dw` delete 7 words

### Modifiers
- `ci(` change the contents inside the current pair of parentheses
- `ci[` change the contents inside the current pair of square brackets
- `da'` delete a single-quoted string, including the surrounding single quotes

## Customizing Vim
- customize through `~/.vimrc`

## Extending Vim
- create the directory `~/.vim/pack/vendor/start/`
- put plugins in there (e.g. via `git clone`)

## Exercises
TO-DO
- `vimtutor`
- install anid configure a plugin
- advanced vivimm