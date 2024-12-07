# Lecture 4: Data Wrangling
## Introduction
**`less`**:
```bash
ssh myserver 'journalctl | grep sshd | grep "Disconnected from"' > ssh.log
less ssh.log
```
- single quote to do the filtering on the remote server
- `less`: gives a "pager"

**stream editor**:
```bash
ssh myserver journalctl
 | grep sshd
 | grep "Disconnected from"
 | sed 's/.*Disconnected from //'
```
- to modify file, rather than manipulate its content directly
- `s/REGEX/SUBSTITUTION`

## Regular expressions
**Common patterns**:
- `.` means “any single character” except newline
- `*` zero or more of the preceding match
- `+` one or more of the preceding match
- `[abc]` any one character of a, b, and c
- `(RX1|RX2)` either something that matches RX1 or RX2
- `^` the start of the line
- `$` the end of the line

**Example**:
```bash
echo 'aba' | sed 's/[ab]//'
# ba
echo 'aba' | sed 's/[ab]//g'
#
echo 'abcaba' | sed -E 's/(ab)*//g'
# ca
echo 'abcaba' | sed 's/\(ab\)*//g'
# ca
echo 'Disconnected from invalid user Disconnected from 84.211' | sed 's/.*Disconnected from//'
# 84.211
echo 'Disconnected from invalid user Disconnected from 84.211' | perl -pe 's/.*?Disconnected from//'
# invalid user Disconnected from 84.211
```
- replace once by default, add `g` modifier for all occurences 
- `sed` is weird, need to add `\` or `-E` to give special meaning
- `*` and `+` are by default greedy: match the most text
- `perl`: suffix `*` or `+` with `?` to make them non-greedy (not available in `sed`)

**Misc**:
- `\d`: any digit
- `\D`: any non-digit
- `\.`: period
- `[^abc]`: any single character expect for a, b, c
- `[a-z]`: characters a to z
- `\w`: any alphanumeric character, equivalent to `[A-Za-z0-9_]`
- `\W`: any non-alphanumeric character
- `a{m,n}`: m to n repetitions of character a
- `.*` :zero or more of any character
- `a?`: optional character of a
- `\s`: any whitespace (space `..`, tab `\t`, new line `\n`, carriage return `\r`)
- `\S`: any non-whitespace character
- `(...)`: capture group (access with numbered capture group, e.g. `\1`, `\2`, `\3`)
- `(a(bc))`: capture sub-group

**regex debugger**:
https://regex101.com/r/qqbZqh/2

## Back to data wrangling
```bash
ssh myserver journalctl
 | grep sshd
 | grep "Disconnected from"
 | sed -E 's/.*Disconnected from (invalid |authenticating )?user (.*) [^ ]+ port [0-9]+( \[preauth\])?$/\2/'
 | sort | uniq -c
 | sort -nk1,1 | tail -n10
 | awk '{print $2}' | paste -sd,
```
- `wc`: word count (`-l` lines)
- `sort`: sort output (`-r` sort in reverse, `-n` sort in numeric, `-kl,1` sort by only the first whitespace-separated column, sort until the 1st field)
- `uniq`: filter repeated lines (`-c` for number of occurences)
- `awk`: programming language for processing text streams
- `paste -sd,`: combine lines by character delimiter `,`

## awk - another editor
**example**:
the number of single-use usernames that start with c and end with e
```bash
 | awk '$1 == 1 && $2 ~ /^c[^ ]*e$/ { print $2 }' | wc -l
```
or 
```bash
BEGIN { rows = 0 }
$1 == 1 && $2 ~ /^c[^ ]*e$/ { rows += $1 }
END { print rows }
```

## Analyzing data
**Calculator**:
- `bc`
```bash
echo "1+2" | bc -l
# 3
```

**Stats**:
- `st`
- `R`
```bash
ssh myserver journalctl
 | grep sshd
 | grep "Disconnected from"
 | sed -E 's/.*Disconnected from (invalid |authenticating )?user (.*) [^ ]+ port [0-9]+( \[preauth\])?$/\2/'
 | sort | uniq -c
 | awk '{print $1}' | R --no-echo -e 'x <- scan(file="stdin", quiet=TRUE); summary(x)'
```
- `gnuplot` for simple plotting
```bash
ssh myserver journalctl
 | grep sshd
 | grep "Disconnected from"
 | sed -E 's/.*Disconnected from (invalid |authenticating )?user (.*) [^ ]+ port [0-9]+( \[preauth\])?$/\2/'
 | sort | uniq -c
 | sort -nk1,1 | tail -n10
 | gnuplot -p -e 'set boxwidth 0.5; plot "-" using 1:xtic(2) with boxes'
```

## Data wrangling to make arguments
Uninstall old nightly builds of Rust from my system by extracting the old build names using data wrangling tools and then passing them via `xargs` to the uninstaller
```bash
rustup toolchain list | grep nightly | grep -vE "nightly-x86" | sed 's/-x86.*//' | xargs rustup toolchain uninstall
```

## Wrangling binary data
use ffmpeg to capture an image from our camera, convert it to grayscale, compress it, send it to a remote machine over SSH, decompress it there, make a copy, and then display it
```bash
ffmpeg -loglevel panic -i /dev/video0 -frames 1 -f image2 -
 | convert - -colorspace gray -
 | gzip
 | ssh mymachine 'gzip -d | tee copy.jpg | env DISPLAY=:0 feh -'
```

## Exercises
TO-DO
- `curl`
- `pup`
- `jq`