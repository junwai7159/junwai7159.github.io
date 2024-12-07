# Lecture 5: Command-line Environment
## Job Control
- The shell uses a UNIX communication mechanism called a signal to communicate information to the process

### Killing a process
**Signals**:
- `SIGINT`: 
    - `Ctrl+C`
    - interrupt program
- `SIGQUIT`: 
    - `Ctrl+\`
    - quit program
- `SIGTERM`: 
    - `kill -TERM <PID>`
    - software termination signal (most cases equivalent to `SIGINT` & `SIGQUIT`, not sent through terminal)
- `SIGKILL`:
    - `kill -KILL <PID>`
    - cannot be captured by the process
    - terminate process no immediately
    - leaving orphaned children processes

**Example**:
- captures `SIGINT` and ignores, no longer stopping
```python
#!/usr/bin/env python
import signal, time

def handler(signum, time):
    print("\nI got a SIGINT, but I am not stopping")

signal.signal(signal.SIGINT, handler)
i = 0
while True:
    time.sleep(.1)
    print("\r{}".format(i), end="")
    i += 1

####

$ python sigint.py
24^C
I got a SIGINT, but I am not stopping
26^C
I got a SIGINT, but I am not stopping
30^\[1]    39913 quit       python sigint.py
```

### Pausing and backgrounding processes
**Signals**:
- `SIGHUP`: 
    - `kill -SIGHUP <PID>`
    - terminal line hangup (close terminal, terminate running processes)
- `SIGSTOP`: 
    - `Ctrl+Z` will send `SIGTSTP` (terminal's version of `SIGSTOP`)
    - stop (cannot obe caught or ignored) / pause a process  
- `SIGCONT`: 
    - `fg <PID>`, `bg <PID>`
    - continue after stop

**Example**:
- `nohup`: a wrapper to ignore `SIGHUP`
- `&`: runs the command in the background
- `fg` & `bg` to continue paused job in foreground or background
- `jobs` list unfinished jobs associated with the current terminal session
```bash
$ sleep 1000
^Z
[1]  + 18653 suspended  sleep 1000

$ nohup sleep 2000 &
[2] 18745
appending output to nohup.out

$ jobs
[1]  + suspended  sleep 1000
[2]  - running    nohup sleep 2000

$ bg %1
[1]  - 18653 continued  sleep 1000

$ jobs
[1]  - running    sleep 1000
[2]  + running    nohup sleep 2000

$ kill -STOP %1
[1]  + 18653 suspended (signal)  sleep 1000

$ jobs
[1]  + suspended (signal)  sleep 1000
[2]  - running    nohup sleep 2000

$ kill -SIGHUP %1
[1]  + 18653 hangup     sleep 1000

$ jobs
[2]  + running    nohup sleep 2000

$ kill -SIGHUP %2

$ jobs
[2]  + running    nohup sleep 2000

$ kill %2
[2]  + 18745 terminated  nohup sleep 2000

$ jobs
```

## Terminal Multiplexers
**Sessions** - a session is an independent workspace with one or more windows
- `tmux` starts a new session.
- `tmux new -s NAME` starts it with that name.
- `tmux ls `lists the current sessions
- Within `tmux` typing `<C-b> d` detaches the current session
- `tmux a` attaches the last session. You can use `-t` flag to specify which
- kill session:
    - inside the session: `<C-b> :`, then type `kill-session`
    - else: `tmux kill-session -t`

**Windows** - Equivalent to tabs in editors or browsers, they are visually separate parts of the same session
- `<C-b> c` Creates a new window. To close it you can just terminate the shells doing `<C-d>`
- `<C-b> N` Go to the N th window. Note they are numbered
- `<C-b> p` Goes to the previous window
- `<C-b> n` Goes to the next window
- `<C-b> ,` Rename the current window
- `<C-b> w` List current windows

**Panes** - Like vim splits, panes let you have multiple shells in the same visual display.
 -`<C-b> "` Split the current pane horizontally
 -`<C-b> %` Split the current pane vertically
 -`<C-b> <direction>` Move to the pane in the specified direction. Direction here means arrow keys.
 -`<C-b> z` Toggle zoom for the current pane
 -`<C-b> [` Start scrollback. You can then press `<space>` to start a selection and `<enter>` to copy that selection.
 -`<C-b> <space>` Cycle through pane arrangements.

## Aliases
- short form for command
- make alias persistent: `.bashrc` or `.zshrc`

**Features**:
```bash
# Make shorthands for common flags
alias ll="ls -lh"

# Save a lot of typing for common commands
alias gs="git status"
alias gc="git commit"
alias v="vim"

# Save you from mistyping
alias sl=ls

# Overwrite existing commands for better defaults
alias mv="mv -i"           # -i prompts before overwrite
alias mkdir="mkdir -p"     # -p make parent dirs as needed
alias df="df -h"           # -h prints human readable format

# Alias can be composed
alias la="ls -A"
alias lla="la -l"

# To ignore an alias run it prepended with \
\ls
# Or disable an alias altogether with unalias
unalias la

# To get an alias definition just call it with alias
alias ll
# Will print ll='ls -lh'
```

## Dotfiles
- hidden in `ls` by default
- many programs will ask you to include a line like `export PATH="$PATH:/path/to/program/bin"` in your shell configuration file so their binaries can be found
- dotfile repos: https://github.com/mathiasbynens/dotfiles
- dotfiles should be in their own folder, under version control, and symlinked (`ln -s`) into place using a script

**Example of dotfiles**:
- `bash` - `~/.bashrc`, `~/.bash_profile`
- `git` - `~/.gitconfig`
- `vim` - `~/.vimrc` and the `~/.vim folder`
- `ssh` - `~/.ssh/config`
- `tmux` - `~/.tmux.conf`

## Remote Machines
### Executing commands
- execute `ls` in the home of `foobar`, `grep` locally the remote output of `ls`
```bash
ssh foobar@server ls | grep PATTERN
```

- `grep` remotely the local output of `ls`
```bash
ls | ssh foobar@server grep PATTERN
```

### SSH keys
- Public-key cryptography to prove to the server that, the client owns the secret private key without revealing the key
- Do not need to reenter password every time
- Private key (`~/.ssh/id_rsa` or `~/.ssh/id_ed25519`) is effectively your password

**Key generation**:
- To generate public-private key pair
```bash
ssh-keygen -o -a 100 -t ed25519 -f ~/.ssh/id_ed25519
```

- To check if passphrase is available and validate
```bash
ssh-keygen -y -f /path/to/key
```

**Key-based authentication**:
- `ssh` will look into public key (`.ssh/authorized_keys`) to determine which clients to let in

Copy a public key over
```bash
cat .ssh/id_ed25519.pub | ssh foobar@remote 'cat >> ~/.ssh/authorized_keys'
```
or
```bash
ssh-copy-id -i .ssh/id_ed25519 foobar@remote
```

### Copying files over SSH
- `ssh+tee`
    - `cat localfile | ssh remote_server tee serverfile`
- `scp`
    - `scp path/to/local_file remote_host:path/to/remote_file`
    - copy large amounts of file
- `rcp`
    - `rcp -avP . remote_host:path/`
    - detect identical files in local and remote, prevent copying again

### Port Forwarding
**Local Port Forwarding**:
- Specifies that the given port on the local (client) host is to be forwarded to the given host and port on the remote side
- `ssh -L sourcePort:forwardToHost:onPort connectToHost` means: connect with ssh to `connectToHost`, and forward all connection attempts to the local `sourcePort` to port `onPort` on the machine called `forwardToHost`, which can be reached from the `connectToHost` machine.
![local-port-forwarding](./media/local-port-forwarding.png)

**Remote Port Forwarding**:
- Specifies that the given port on the remote (server) host is to be forwarded to the given host and port on the local side
- `ssh -R sourcePort:forwardToHost:onPort connectToHost` means: connect with ssh to `connectToHost`, and forward all connection attempts to the remote `sourcePort` to port `onPort` on the machine called `forwardToHost`, which can be reached from your local machine.
![remote-port-forwarding](./media/remote-port-forwarding.png)

### SSH Configuration
**Shell alias**:
```bash
alias my_server="ssh -i ~/.id_ed25519 --port 2222 -L 9999:localhost:8888 foobar@remote_server
```

**`~/.ssh/config`**:
- dotfile, able to be read by other programs like `scp`, `rsync`, `mosh`
- server side config: `/etc/ssh/sshd_config`
```bash
Host vm
    User foobar
    HostName 172.16.174.141
    Port 2222
    IdentityFile ~/.ssh/id_ed25519
    LocalForward 9999 localhost:8888

# Configs can also take wildcards
Host *.mit.edu
    User foobaz
```

## Exercises
TO-DO