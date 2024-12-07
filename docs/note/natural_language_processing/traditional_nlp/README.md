# Traditional NLP

## Applications

1. Text Classification
2. Sequence Labelling: NER, POS
3. Dependency Parsing
4. Text-to-Speech

## Concepts

### Regular Expressions

- TO-DO

### Word Type

- The number of distinct words in a corpus
- If the set of words in the vocabulary is $V$, the number of types is the vocabulary size $|V|$

### Word Instance

- The total number of $N$ running words

### Corpus

- Plural corpora
- A computer-readable collection of text or speech

### Code Switching

- The phenomenon of speakers or writers to use multiple languages in a single communicative act

### Utterance

- *The spoken correlate of a sentence*
- e.g. I do uh main- mainly business data processing
  - This utterance has two kinds of **disfluencies**
  - **Fragment:** the broken-off word *main*-
  - **Filled pause:** words like *uh* and *um*

### Heaps' Law / Herdan's Law

The relationship between the number of types $|V|$ and number of instances $N$:

$$|V| = kN^{\beta}$$

### Lemma / Citation Form

- A set of lexical forms having the same stem, the same major part-of-speech, and the same word sense
- e.g. Consider inflected forms like *cats* and *cat*, they are different wordforms but have the same lemma

### Word Normalization

- The process of transforming text into a standard or canonical form
- At least three tasks are commonly applied
  1. Tokenizing (segmenting) words
  2. Normalizing word formats
  3. Segmenting sentences

### Stop Words

- Commonly used words that are often filtered out before processing text
- These words are considered to have little value in terms of meaning
- e.g. *and*, *the*, *a*, *is*, *are*, *to* etc.

### Morphology

- The study of the way words are built up from morphemes
- **Stems:** the central morpheme of the word, supplying the main meaning
- **Affixes:** adding "additional" meanings of various kinds

### Phoneme

- Expert term for 'sound'
- e.g. /k/

### Grapheme

- Expert term for 'letter(s) that spell a sound'
- e.g. the following table shows 4 different graphemes to represent 1 phoneme, the /k/ sound

| Word | Grapheme |
| --- | --- |
| **c**at | c |
| **k**ite | k |
| du**ck** | -ck |
| s**ch**ool | ch |

### Morpheme

- The smalles meaning-bearing unit of a language
- e.g. *unwashable* has the morphemes *un-*, *wash*, *-able*

### Case Folding

- The process of converting all characters in a text to a uniform case

### Lemmatizaion

- The task of determining that two words have the same root, despite their surface differences
- e.g. The words *am*, *are*, *is* have the shared lemma *be*

### Stemming

- Chopping off word-final affixes
- e.g. Porter stemmer

### Sentence Segmentaion

- The most useful cues for segmenting a text into sentences are punctuation, like periods, question marks, and exclamation points
- In general, sentence segmentation methods work by first deciding whether a period is part of the word or is a sentence-boundary marker

### Minimum Edit Distance

- The minimum edit distance between two strings is defined as the minimum number of editing operations (operations like insertion, deletion, substitution) needed to transform one string into another
- The Levenshtein distance between two sequences is the simplest weighting factor in which each of the three operations has a cost of 1 
- Can be computed by dynamic programming, which also results in an alignment of the two strings
  
### Perplexity

The perplexity of $W$ computed with a bigram language model:

$$\text{perplexity}(W) = \sqrt[N]{\prod^{N}_{i=1}{\frac{1}{P(w_i|w_{i-1})}}}$$

- The higher the probabiity of the word sequence, the lower the perplexity
- The lower the perpexity of a model on the data, the better the model
- Minimizng the perplexity is equivalent to maximizing the test set probability according to the language model
- Can also be thought of as the weighted average branching factor

### Smoothing

- TO-DO
- smoothing, interpolation and backoff

### Statistical Significance Test

- TO-DO
- Used to determine whether we can be confident that one versrion of a model is better than another
- Bootstrap test

### Model Card

Documents a ML model with information like:

- Training algorithms and parameters
- Training data sources, motivation, and preprocessing
- Evaluation data sources, motivation, and preprocessing
- Intended use and users
- Model performance across demographic or other groups and environmental situations

### Part of Speech (POS)

- A category of words that have similar grammatical properties:
- e.g. noun, verb, pronoun, adjective, adverb, preposition, etc.

### Natural Language Inference (NLI)

The task of determining whether a "hypothesis" is:

- true (entailment)
- false (contradiction)
- undetermined (neutral)

given a premise

## Models

### N-gram Language Models

Given the bigram assumption for the probability of an individual word, we can compute the probability of a complete word sequence:

$$P(w_{1:n}) \approx \prod_{k=1}^{n}{P(w_k|w_{k-1})}$$

- An n-gram is a sequence of $n$ words
- **Markov assumption:** the probability of a words depends only on the previous word
- The n-gram model looks $n-1$ words into the past
- Estimate n-gram probability through Maximum Likelihood Estimation (MLE)

For example, the bigram probability of a word $w_n$ given a previous word $w_{n-1}$:
$$P(w_n | w_{n-1}) = \frac{C(w_{n-1}w_n)}{\sum_w{C(w_{n-1}w)}} = \frac{C(w_{n-1}w_n)}{C(w_{n-1})}$$
  
- Compute the count of the bigram $C(w_{n-1}w_n)$, and normalize by the sum of all the bigrams that share the same first word $w_{n-1}$
- The sum of all bigram counts that start with a given word $w_{n−1}$ must be equal to the unigram count for that word $w_{n−1}$

Dealing with scale in large n-gram models:

- Use log probabilities, since multiplying enough n-grams together would result in numerical underflow
- Although for pedagogical purposes we have only described bitrigram gram models, when there is sufficient training data we use trigram models, which condition on the previous two words, or 4-gram or 5-gram models.
- For these larger n-grams, we’ll need to assume extra contexts to the left and right of the sentence end
- The infini-gram project allows n-gram of any length

### Bag-Of-Words

- **Tokenization:** Split the text into individual tokens
- **Vocabulary Creation:** An unordered set of words with their position ignored, keeping only their frequency in the text document
- **Vectorization:** Represent each document as a vector, where each element corresponds to the count of a word from the vocabulary

### Naive Bayes

A probabilistic classifier, for a document $d$, out of all classes $c \in C$, the classifier returns the class $\hat{c}$ which has the maximum posterior probability given the document:

$$\hat{c} = \argmax_{c \in C}{P(c|d)} = \argmax_{c \in C}{\frac{P(d|c)P(c)}{P(d)}} = \argmax_{c \in C}{P(d|c)P(c)}$$

- We call Naive Bayes a generative model, an implicit assumption about how a document is generated:
  - A class is sampled from $P(c)$ (prior probability of the class)
  - Then the words are generated by sampling from $P(d|c)$ (likelihood of the document)

We can represent a document $d$ as a set of features $f_1, f_2, \dots, f_n$:

$$\hat{c} = \argmax_{c \in C} P(f_1, f_2, \dots, f_n | c)P(c)$$

- Estimating the probability of every possible combination of features would require huge number of parameters and impossibly large training sets
- Naive Bayes classifiers make two simplifying assumptions:
  1. **Bag-of-words assumption:** assume position doesn't matter
  2. **Naive Bayes assumption:** conditional independence assumption

Final equation for the class chosen by a Naive Bayes classifier:

$$c_{NB} = \argmax_{c \in C}{P(c) \prod_{i \in positions}{P(w_i|c)}}$$

Naive Bayes as a Language Model:

$$P(s|c) = \prod_{i \in positions}{P(w_i | c)}$$
