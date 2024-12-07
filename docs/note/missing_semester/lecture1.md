# Lecture 1: The Shell

## What is the shell?

- textual interface
- shell vs terminal
- bash (Bourne Again Shell)

## Using the shell

**Launch terminal to open shell prompt:**
```bash
missing:~$
```
- `missing`: machine
- `~`: short for home
- `$`: you are not the root user

**Echo:**
```bash
missing:~$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
missing:~$ which echo
/bin/echo
missing:~$ /bin/echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```
- `$PATH`: lists which directories the shell should search for programs
- Colon separated list
- `which`: which file is executed for a given program name

## Navigating in the shell
```bash
missing:~$ pwd
/home/missing
missing:~$ cd /home
missing:/home$ pwd
/home
missing:/home$ cd ..
missing:/$ pwd
/
missing:/$ cd ./home
missing:/home$ pwd
/home
missing:/home$ cd missing
missing:~$ pwd
/home/missing
missing:~$ ../../bin/echo hello
hello
```
- Linux & macOS: path separated by `/`; the path `/` is the root of the file system
- Windows: path separated by `\`; one root for each disk partition (e.g. `C:\`)
- `cd ~`: to home directory
- `cd -`: to previous directory

**`ls` command:**
```bash
missing:~$ ls
missing:~$ cd ..
missing:/home$ ls
missing
missing:/home$ cd ..
missing:/$ ls
bin
boot
dev
etc
home
...
```
- commands accept flags and options (flags with values)
- `exa`: modern replacement for `ls`

**`ls --help`:**
```
  -l                         use a long listing format
```
```bash
missing:~$ ls -l /home
drwxr-xr-x 1 missing  users  4096 Jun 15  2019 missing
```
- permissions: owner (`missing`) - group (`users`) - everyone else
- `rwx`: read, write, execute
- files: read; write; execute
- directory: `ls`; rename/create/remove files in the directory; "search", to enter the a directory

**Handy programs:**
- `mv` (rename/move file), `cp` (copy file), `rm -r` (remove recursively), `rmdir` (remove directory), `mkdir` (make directory)
- `ctrl+l` to clear
- `man ls`: show manual page of `ls`

## Connecting programs
- Two primary "streams": input stream and output stream
- redirect streams: `< file` and `> file`
- append: `>>` 

**`cat`**
- `tac`: reverses the output
```bash
missing:~$ echo hello > hello.txt
missing:~$ cat hello.txt
hello
missing:~$ cat < hello.txt
hello
missing:~$ cat < hello.txt > hello2.txt
missing:~$ cat hello2.txt
hello
```

**Pipes**:
```bash
missing:~$ ls -l / | tail -n1
drwxr-xr-x 1 root  root  4096 Jun 20  2019 var
missing:~$ curl --head --silent google.com | grep --ignore-case content-length | cut --delimiter=' ' -f2
219
```
- to "chain" programs such that the output of one is the input of another
- `head`, `tail` 

## A versatile and powerful tool
- `$`: regular user ; `#`: root user
- `sudo`: do as super user
- `sudo su`: super user do; shell as super user, `exit` to return
- `find`: search for file
- `tee`: read from standard input, write to both standard output and file
- `xdg-open`: open file with preferred application

**e.g. change brightness**:
```bash
$ sudo find -L /sys/class/backlight -maxdepth 2 -name '*brightness*'
/sys/class/backlight/thinkpad_screen/brightness
$ cd /sys/class/backlight/thinkpad_screen
$ sudo echo 3 > brightness
An error occurred while redirecting file 'brightness'
open: Permission denied
```
- `|`, `>` and `<` are done by the shell

workaround:
```bash
echo 3 | sudo tee brightness
```

## Exercises
- `touch`: create an empty file
- single quotes (treated as literal string) vs double quote (allow variable expansion)
- `sh`: Bourne shell
- `chmod`: change file permissions
    - `r=4, w=2, x=1`
    - e.g. `chmod 600`: `rw` permission for owner, denies permission for group members and others
- shebang: `#!` beginning of a script, specifies the intepreter to be used, e.g. `#!/bin/bash`