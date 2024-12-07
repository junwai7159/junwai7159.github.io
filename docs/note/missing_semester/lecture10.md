# Lecture 10: Potpourri
## Daemons
- processes that runs in the background rather than waiting for a user to launch them and interact with them
- programs that run as daemon ofthen end with a `d`, e.g. `sshd` (SSH daemon), `systemd` (running and setting up daemon processes)
- `systemctl status` to list current runing daemons
- e.g. managing the network, solving DNS queries or displaying the graphical interface for the system
- `cron`: a daemon your system already runs to perform scheduled tasks
    - if need to run some program with a given frequency
    - no need to build a custom daemon

**Example**:
a daemon for running a simple Python app
```ini
# /etc/systemd/system/myapp.service
[Unit]
Description=My Custom App
After=network.target

[Service]
User=foo
Group=foo
WorkingDirectory=/home/foo/projects/mydaemon
ExecStart=/usr/bin/local/python3.7 app.py
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## FUSE (Filesystem in User Space)
- UNIX filesystems are traditonally implemented as kernel modules and only the kernel is allowed to perform filesystem calls
- FUSE allows filesystems to be implemented by a user program
- Examples:
    - sshfs: open locally remote files/folder through an SSH connection
    - rclone: Mount cloud storage services like Dropbox, GDrive, Amazon S3 or Google Cloud Storage and open data locally

## Backups
- Any data that you haven’t backed up is data that could be gone at any moment, forever
- 3-2-1 rule:
    - at least 3 copies of your data
    - 2 copies in different mediums
    - 1 of the copies being offsite
- Bad solutions:
    - copy of the data on the same disk
    - an external drive in your home
    - synchronization solutions (e.g. Dropbox)
    - disk mirroring solutions (e.g. RAID)
- Good backups:
    - versioning
    - deduplication
    - security
    - having offline copies of data in the cloud (e.g. email)

## APIs
- Structured URLs:
    - often rooted at `api.service.com`
    - path and query parameters indicate what data you want to read or what action you want to perform
- `curl`: used to transfer data with URLs
- OAuth: a way to give you tokens that can "act as you" on a given service
    - some APIs require authentication: secret token to include with the request
- [IFTTT](https://ifttt.com/): provides integrations with tons of services, and lets you chain events from them in nearly arbitrary ways

## Common command-line flags/patterns
- `--help`: dispaly brief usage instructions
- `--version` or `-V`: print version
- `--verbose` or `-v`: produce more verbose output, e.g. `-vvv` to get more verbose outout
- `--quiet`: only print something on error
- "dry run": only print what the tools would have done, but do not actually perform the change
- "interactive" flag: prompt you for each destructive action
- `-r`: make destructive tools recursive
- `-` in place of a file name: "standard input" (keyboard by default) or "standard output" (terminal screen by default)
- `--`: makes a program stop processing flags and options (things starting with `-`):
    - e.g. remove a file called `-r`: `rm -- -r`

## Window managers
- "floating" window manager
- "tiling" window manager

## VPNs
- just a way for you to change your internet service provider as far as the internet is concerned
- all your traffic will look like it’s coming from the VPN provider instead of your “real” location
- and the network you are connected to will only see encrypted traffic
- when you use a VPN, all you are really doing is shifting your trust from you current ISP to the VPN hosting company, whatever your ISP could see, the VPN provider now sees instead
- much of your traffic, at least of a sensitive nature, is already encrypted through HTTPS or TLS more generally
- some VPN providers are malicious (or at the very least opportunist), and will log all your traffic, and possibly sell information about it to third parties
- WireGuard to roll your own VPN

## Booting + Live USBs
**Booting**:
- When machine boots up, before the OS is loaded, the BIOS/UEFI initializes the system
- “Press F9 to configure BIOS. Press F12 to enter boot menu.” during the boot process
- BIOS menu: configure all sorts of hardware-related settings
- Boot menu: to boot from an alternate device instead of your hard drive

**Live USBs**:
- USB flash drives containing an OS

## Docker, Vagrant, VMs, Cloud, OpenStack
https://missing.csail.mit.edu/2020/potpourri/#docker-vagrant-vms-cloud-openstack