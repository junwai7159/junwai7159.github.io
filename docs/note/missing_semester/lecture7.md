# Lecture 7: Debugging and Profiling
## Printf debugging and Logging
### Advantages of logging over ad hoc print statements
- Log to files, sockets, and even remote servers instead of standard ouput
- Supports severity levels (python: `NOTSET`, `DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`)
    - Allows to filter the output
- New issues have a high chance of producing logs with sufficient information to detect the problem
- Logs can be colored

### Third party logs
- Large software systems have dependencies that run as separate programs (e.g. web servers, databases, message brokers, etc.)
    - Read their logs, since client side error messages might not suffice
- UNIX systems: programs write logs under `/var/log`
    - e.g. to view logs `cat /var/log/syslog | lnav`
- System logs (Linux): use `systemd` as system daemon
    - place logs under `/var/log/journal`
    - `journalctl` to display the log
    - `logger` for logging under the systems logs
```bash
logger "Hello Logs"
# On macOS
log show --last 1m | grep Hello
# On Linux
journalctl --since "1m ago" | grep Hello
```

### Debuggers
Debuggers are programs that let you interact with the execution of a program:
- Halt execution of the program when it reaches a certain line
- Step through the program one instruction at a time
- Inspect values of variables after the program crashed
- Conditionally halt the execution when a given condition is met

**Python Debugger `pdb`**:
- l(ist) - Displays 11 lines around the current line or continue the previous listing.
- s(tep) - Execute the current line, stop at the first possible occasion.
- n(ext) - Continue execution until the next line in the current function is reached or it returns.
- b(reak) - Set a breakpoint (depending on the argument provided).
- p(rint) - Evaluate the expression in the current context and print its value. There’s also pp to display using `pprint` instead.
    - `p locals()`: dictionary representing the current local symbol table (local variables in the current scope)
- r(eturn) - Continue execution until the current function returns.
- q(uit) - Quit the debugger.
- c(continue) - resumes execution of the program until the next breakpoint or the program finishes (e.g. error)
- restart - restarts the debugger and reruns the program from the beginning

**`ipdb`**:
- improved pdb that uses the `IPython` REPL 
- enabling tab completion, syntax highlighting, better tracebacks, and better introspection - retaining the same interface as the `pdb` module
```bash
python -m ipdb bubble.py
```

**Low level programming debugger**:
- `gdb`, `pwndbg`, `lldb`
- optimized for C-like language debugging
- probe pretty much any process and get its current machine state: registers, stack, program counter, etc.

### Specialized Tools
- Programs use **system calls** (a program requests a service from the operating system) to perform actions that only the kernel can
- `strace` to trace the syscalls made by the program
```bash
# On Linux
sudo strace -e lstat ls -l > /dev/null
# On macOS
sudo dtruss -t lstat64_extended ls -l > /dev/null
```

#### Static Analysis
- Static analysis programs take source code as input and analyze it using coding rules to reason about its correctness
- Python: `pyflakes`, `mypy`
- shell: `shellcheck`

**Code linting**:
- e.g. display stylistic violations or insecure constructs
- vim: `ale`, `syntastic`
- Python: 
    - stylistic linters: `pylint`, `pep8`
    - find common security issues: `bandit`
    - code formatter: `black`

**References**:
- https://github.com/analysis-tools-dev/static-analysis
- https://github.com/caramelomartins/awesome-linters

## Profiling
- Premature optimization is the root of all evil
- Profilers & Monitoring Tools: 
    - helps to understand which part of the program is taking most of the time and/or resources
    - thus focus on optimizing those parts

### Timing
**Python using the `time` module**:
- wall clock time (*Real*) is misleading
- computer might be running other process at the same time
- or waiting for events to happen
- *User* + *Sys*: how much time the process actually spent in the CPU
```python
import time, random
n = random.randint(1, 10) * 100

# Get current time
start = time.time()

# Do some work
print("Sleeping for {} ms".format(n))
time.sleep(n/1000)

# Compute time between start and now
print(time.time() - start)

# Output
# Sleeping for 500 ms
# 0.5713930130004883
```

**Real, User, Sys time**
1. *Real*
    - Wall clock elapsed time from start to finish of the program, including the time taken by other processes and time taken while blocked (e.g. waiting for I/O or network)
2. *User*
    - Amount of time spent in the CPU running user code
3. *Sys*
    - Amount of time spent in the CPU running kernel code

**Example**:
- 2 seconds for the request to complete
- 15ms of CPU user time
- 12ms of kenel CPU time
```bash
$ time curl https://missing.csail.mit.edu &> /dev/null
real    0m2.561s
user    0m0.015s
sys     0m0.012s
```

### Profilers
**CPU**:
- Profilers usuallly mean CPU profilers
- Two main types: tracing and sampling profilers
    - Tracing: keep a record of every function call the program makes
    - Sampling: probe the program periodically and record the program's stack
- Profilers present aggregate statistics of what the program spent the most time doing

**Python `cProfile`**:
- to profile time per fuction call
```python
#!/usr/bin/env python

import sys, re

def grep(pattern, file):
    with open(file, 'r') as f:
        print(file)
        for i, line in enumerate(f.readlines()):
            pattern = re.compile(pattern)
            match = pattern.search(line)
            if match is not None:
                print("{}: {}".format(i, line), end="")

if __name__ == '__main__':
    times = int(sys.argv[1])
    pattern = sys.argv[2]
    for i in range(times):
        for file in sys.argv[3:]:
            grep(pattern, file)
```
- IO takes most of the time
- compiling the regex takes a fair amount of time
- caveat: display time per function call
```bash
$ python -m cProfile -s tottime grep.py 1000 '^(import|\s*def)[^,]*$' *.py

[omitted program output]

 ncalls  tottime  percall  cumtime  percall filename:lineno(function)
     8000    0.266    0.000    0.292    0.000 {built-in method io.open}
     8000    0.153    0.000    0.894    0.000 grep.py:5(grep)
    17000    0.101    0.000    0.101    0.000 {built-in method builtins.print}
     8000    0.100    0.000    0.129    0.000 {method 'readlines' of '_io._IOBase' objects}
    93000    0.097    0.000    0.111    0.000 re.py:286(_compile)
    93000    0.069    0.000    0.069    0.000 {method 'search' of '_sre.SRE_Pattern' objects}
    93000    0.030    0.000    0.141    0.000 re.py:231(compile)
    17000    0.019    0.000    0.029    0.000 codecs.py:318(decode)
        1    0.017    0.017    0.911    0.911 grep.py:3(<module>)

[omitted lines]
```

**Line profilers**"
- using `cProfile` would get over 2500 lines of output
- even with sorting, hard to understand where the time is spent
- line profiler: shows the time taken per line
```python
#!/usr/bin/env python
import requests
from bs4 import BeautifulSoup

# This is a decorator that tells line_profiler
# that we want to analyze this function
@profile
def get_urls():
    response = requests.get('https://missing.csail.mit.edu')
    s = BeautifulSoup(response.content, 'lxml')
    urls = []
    for url in s.find_all('a'):
        urls.append(url['href'])

if __name__ == '__main__':
    get_urls()
```
```bash
$ kernprof -l -v a.py
Wrote profile results to urls.py.lprof
Timer unit: 1e-06 s

Total time: 0.636188 s
File: a.py
Function: get_urls at line 5

Line #  Hits         Time  Per Hit   % Time  Line Contents
==============================================================
 5                                           @profile
 6                                           def get_urls():
 7         1     613909.0 613909.0     96.5      response = requests.get('https://missing.csail.mit.edu')
 8         1      21559.0  21559.0      3.4      s = BeautifulSoup(response.content, 'lxml')
 9         1          2.0      2.0      0.0      urls = []
10        25        685.0     27.4      0.1      for url in s.find_all('a'):
11        24         33.0      1.4      0.0          urls.append(url['href'])
```

**Memory**:
- C/C++:
    - memory leaks: program to never release memory
    - Valgrind: identify memory leaks
- Python:
    - garbage collected languages
    - as long as having pointers to objects to memory, they won't be garbage collected

```python
@profile
def my_func():
    a = [1] * (10 ** 6)
    b = [2] * (2 * 10 ** 7)
    del b
    return a

if __name__ == '__main__':
    my_func()
```
```bash
$ python -m memory_profiler example.py
Line #    Mem usage  Increment   Line Contents
==============================================
     3                           @profile
     4      5.97 MB    0.00 MB   def my_func():
     5     13.61 MB    7.64 MB       a = [1] * (10 ** 6)
     6    166.20 MB  152.59 MB       b = [2] * (2 * 10 ** 7)
     7     13.61 MB -152.59 MB       del b
     8     13.61 MB    0.00 MB       return a
```

**Event Profiling**:
- `perf`: abstracts CPU differences away and does not report time or memory, but instead it reports system eventes related to you program
- e.g. report poor cache locality, high amounts of page faults or livelocks

**Visualization**:
- Flame graph:
    - Y axis: hierarachy of function calls
    - X axis: time taken
- Call graph / control flow graph:
    - display the relationships between subroutines within a program by including functions as nodes and functions calls between them as directed edges
    - Python: `pycallgraph`

### Resource Monitoring
`stress`: artificially impose loads on the loads to test these tools:
1. General monitoring: `htop`, `glances`, `dstat`
2. I/O operations: `iotop`
3. Disk usage: `df`, `du`, `ncdu`
4. Memory usage: `free`
5. Open files: `lsof`
6. Network connections and config: `ss`, `ip`
7. Network usage: `nethogs`, `iftop`

**Specialized tools**:
- `hyperfine`: quickly benchmark command line programs
- `fd` was 20x faster than `find`
```bash
$ hyperfine --warmup 3 'fd -e jpg' 'find . -iname "*.jpg"'
Benchmark #1: fd -e jpg
  Time (mean ± σ):      51.4 ms ±   2.9 ms    [User: 121.0 ms, System: 160.5 ms]
  Range (min … max):    44.2 ms …  60.1 ms    56 runs

Benchmark #2: find . -iname "*.jpg"
  Time (mean ± σ):      1.126 s ±  0.101 s    [User: 141.1 ms, System: 956.1 ms]
  Range (min … max):    0.975 s …  1.287 s    10 runs

Summary
  'fd -e jpg' ran
   21.89 ± 2.33 times faster than 'find . -iname "*.jpg"'
```

## Exercises
TO-DO