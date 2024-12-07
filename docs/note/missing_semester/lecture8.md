# Lecture 8: Metaprogramming
## Build systems
**`make`**:
- consults `Makefile`
-  the things named on the right-hand side are dependencies, and the left-hand side is the target
- the indented block is a sequence of programs to produce the target from those dependencies
- the first directive is the default goal
```bash
paper.pdf: paper.tex plot-data.png
	pdflatex paper.tex

plot-%.png: %.dat plot.py
	./plot.py -i $*.dat -o $@
```

## Dependency management
**Repository**
- hosts a large number of dependencies in a single place
- Examples: 
    - Ubuntu package repositories for Ubuntu system packages, accessed through `apt` tool
    - PyPI for Python librarires

**Sematic versioning**: 
-  major.minor.path
- e.g. code written for Python 3.5 might run fine on Python 3.7, but possibly not on 3.4

1. If a new release does not change the API, increase the patch version
2. If you add to your API in a backwards-compatible way, increase the minor version
3. If you change the API in a non-backwards-compatible way, increase the major version

**Lock files**
- a file that lists the exact version currently depending on of each dependency
- vendoring: copy all the code of your dependencies into your own project

## Continuous integration systems
- CI: umbrella term for "stuff that runs whenever your code changes"
- Examples:
    - event triggered: 
        - general: Travis CI, Azure Pipelines, GitHub Actions
        - website: GitHub Pages
    - dependency version: Dependabot, alert when there are updates or security vulnerabilities, keeping dependencies up to date
- How it works:
    - roughly: you add a file (rule/recipe) to your repository that describes what should happen when various things happen to that repository
    - more detailed: when the event triggers, the CI provider spins up virtual machines, runs the commands in your "recipe", and then usually notes down the results somewhere
- Most common rule/recipe: 
    - when someone pushes code (or submit pull requests), run the test suite
    - check your code style everytime you commit
-  You might set it up so that you are notified if the test suite stops passing, or so that a little badge appears on your repository (e.g. top of README.md) as long as the tests pass

**A brief aside on testing**:
- Test suite: a collective term for all the tests
- Unit test: a “micro-test” that tests a specific feature in isolation
- Integration test: a “macro-test” that runs a larger part of the system to check that different feature or components work together.
- Regression test: a test that implements a particular pattern that previously caused a bug to ensure that the bug does not resurface.
- Mocking: to replace a function, module, or type with a fake implementation to avoid testing unrelated functionality. For example, you might “mock the network” or “mock the disk”.

## Exercises
TO-DO