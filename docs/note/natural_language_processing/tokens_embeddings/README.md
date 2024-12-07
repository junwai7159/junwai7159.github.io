# Tokens and Embeddings

## Concepts

### Distributional Hypothesis

- **Definition:** Words that occur in similar contexts tend to have similar meanings
- **Vector semantics:** instantiates this linguistic hypothesis by learning representations of the meaning of words, called embeddings, directly from their distribution in texts

### Word Sense

- A sense refers to a specific meaning of a word
- **Polysemy**: words can have multiple senses

### Synonymy

- **Synonyms:** One word has a sense whose meaning is identical to a sense of another word, or nearly identical, we say the two senses of those two words are synonyms
- **A more formal definition of synonymy (between words rather than senses):** two words are synonymous if they are substituable for one another in any sentence without changing the truth conditions of the sentence, the situations in which the sentence would be true
- In practice, the word synonym is used to describe a relationship of approximate or rough synonymy

### Principle of Contrast

- A difference in linguistic form is always associated with some difference in meaning

### Word Similarity

- While words don't have many synonyms, most words do have lots of similar words
- Knowing how similar two words are can help in computing how similar the meaning of two phrases or sentences are
- One way of getting values for word similarity is to ask humans to judge how similar one word is to another

### Word Relatedness

- Traditionally called word association in psychology
- One common kind of relatedness between words is if they belong to the same semantic field

### Semantic Field

- A set of words which cover a particular semantic domain and bear structured relations with each other
- e.g. the semantic field of hospitals (*surgeon*, *scalpel*, *nurse*, *anesthetic*, *hospital*)
- Also related to topic models, like Latent Dirichlet Allocation (LDA), which apply unsupervised learning on large sets of texts to induce sets of associated words from text

### Semantic Frame

- A set of words that denote perspectives or participants in a particular type of event
- Frames have semantic roles, and words in a sentence can take on these roles

### Connotation

- The aspects of a word's meaning that are related to a writer or reader's emotions, sentiment, opinions, or evaluations
- Words varied along three important dimensions of affective meaning
  - **Valence:** the pleasantness of the stimulus
  - **Arousal:** the intensity of emotion provoked by the stimulus
  - **Dominance:** the degree of control exerted by the stimulus

### Sparse Embeddings

- Represent a word as a sparse, long vector correponsing to words in the vocabulary or documents in a collection
- e.g. TF-IDF, PPMI

### Dense Embeddings

- Short embeddings, with number of dimensions $d$ ranging from 50-1000, rather than the much larger vocabulary size |V| or number of documents $D$
- It turns out that dense vectors work better in every NLP task than sparse vectors

### Static Embeddings

- Each word has exactly one vector representation
- Cannot handle polysemy
- e.g. Word2Vec, GloVe, FastText

### Contextualized Embeddings

- Words get different vectors based on their context
- e.g. BERT, GPT

### Co-occurrence Matrix

- A way of representing how often words co-occur
- **Two popular matrices:** term-document matrix, term-term matrix

### Term-Document Matrix

- Originally defined as a means of finding similar documents for the task of document information retrieval
- **$|V|$ rows:** each row represents a word in the vocabulary
- **$D$ columns:** each column represents a document from some collection of documents

### Term-Term / Word-Word / Term-Context Matrix

- The columns are labeled by words rather than documents
- Dimensionality of $|V| \times |V|$ and each cell records the number of times the row (target) word and the column (context) word co-occur in some context in some training corpus
- The context could be the document, however it is most common to use a window around the word

### Cosine Similarity

$$
\text{cosine}(\bold{v}, \bold{w}) = \frac{\bold{v} \cdot \bold{w}}{|\bold{v}||\bold{w}|}
$$

- Cosine of the angle between the vectors
- The cosine value ranges from 1 for vectors pointing in the same direction, through 0 for orthogonal vectors, to -1 for vectors pointing in opposite directions
- But since raw frequency values are non-negative, the cosine for these vectors ranges from 0-1

### Semantic Properties of Embeddings

#### Size of the context window

- Shorter context windows tend to lead to representations that are a bit more syntactic, since the information is coming from immediately nearby words
- When the vectors are computed from short context windows, the most similar words to a target word $w$ tend to be semantically similar words with the same parts of speech
- When vectors are computed from long context windows, the highest cosine words to a target word $w$ tend to be words that are topically related but not similar.

#### First-order co-occurrence

- Two words have first-order co-occurrence (sometimes called syntagmatic association) if they are typically nearby each other

#### Second-order co-occurrence

- Two words have second-order co-occurrence (sometimes called paradigmatic association) if they have similar neighbors

#### Analogy/Relational Similarity

**Parallelogram model:** for solving simple analogy problems of the form *a* is to *b* as *a** is to what?

$$
\bold{\hat{b}}^{*} = \argmin_{x}{\text{distance}(\bold{x}, \bold{b} - \bold{a} + \bold{a}^{*})}
$$

- e.g. Embeddings can roughly model relational similarity: ‘queen’ as the closest word to ‘king’ - ‘man’ + ‘woman’ implies the analogy *man:woman :: king:queen*

## Models

### Top-down (rule-based) tokenization

#### Penn Treebank Tokenization

- Separates out clitics (*doesn’t* becomes *does* plus *n’t*)
- Keeps hyphenated words together
- Separates out all punctuation

### Bottom-up Tokenization

- To deal with unknown word problem
- Induce sets of tokens that include tokens smaller than words, called subwords
- Most tokenization schemes have two parts:
- **Token learner:** takes a raw training corpus (sometimes pre-separated into words, for example by whitespace) and induces a vocabulary, a set of tokens
- **Token segmenter:** takes a raw test sentence and segments it into the tokens in the vocabulary

#### WordPiece

- TO-DO
- SentencePiece?

#### Byte-Pair Encoding (BPE)

**Token Learner:**

- The BPE token learner begins with a vocabulary that is just the set of all individual characters
- It then examines the training corpus, chooses the two symbols that are most frequently adjacent (say 'A', 'B')
- Adds a new merged symbol 'AB' to the vocabulary, and replaces every adjacent 'A', 'B' in the new corpus with the new 'AB'
- It continues to count and merge, creating new longer and longer character strings, until $k$ merges have been done, creating $k$ novel tokens
- The algorithm is usually run inside words (not merging across word boundaries),so the input corpus is first white-space-separated to give a set of strings, each corresponding to the characters of a word, plus a special end-of-word symbol *_*, and its
counts

**Token Segmenter:**

- The token segmenter just runs greedily on the merges we have learned from the training data on the test data
- Thus the frequencies in the test data don't play a role, just the frequencies in the training data
- First we segment each test sentence word into characters
- Then look of the most frequent pair of adjacent characters or subwords in the current segmentation that matches a learned merge
- Replace this pair with the corresponding merged token
- Continues the merging process until no more merges can be applied
- In real settings BPE is run with many thousands of merges on a very large input corpus. The result is that most words will be represented as full symbols, and only the very rare words (and unknown words) will have to be represented by their parts

#### Unigram Language Modeling

- Often use the name SentencePiece to simply mean unigram language modeling tokenization

### Term Frequency-Inverse Document Frequency (TF-IDF)

- To computer document similarity, word similarity
- **Motivation**: to balance these two conflicting constraints
  - Words that occur nearby frequently are more important than words that only appear once or twice
  - Words that are too frequent/ubiquitous are unimportant
- Usually when the dimensions are documents; term-document matrices
- **TF-IDF weighting:** the product of term frequency and document frequency

$$
w_{t,d} = \text{tf}_{t,d} \times \text{idf}_t
$$

#### Term Frequency

The frequency of the word $t$ in the document $d$:

$$
\text{tf}_{t,d} = \begin{cases}
  1 + \log_{10}{\text{count}(t, d)} & \text{if} ~ \text{count}(t, d) > 0 \\
  0 & \text{otherwise}
\end{cases}
$$

- Tells us how frequent the word is
- Words that occur more often in a document are likely to be informative about the document's contents
- Why $\log_{10}$ of the word frequency instead of the raw count? The intuition is that a word appearing 100 times in a document doesn't make that word 100 times more likely to be relevant to the meaning of the document

#### Document Frequency

- **$\text{df}_t$:** document frequency of a term $t$ is the number of documents it occurs in
- Give a higher weight to words that occur only in a few documents
- Terms that are limited to a few documents are useful for discriminating those documetns from the rest of the collection
- Terms that occur frequently across the entire collection aren't as helpful

**Inverse Document Frequency**:

$$
\text{idf}_t = \log_{10}{\left( \frac{N}{\text{df}_t} \right)}
$$

- $N$ is the total number of documents in the collection

### Positive Pointwise Mutual Information (PPMI)

$$
\text{PPMI}(w,c) = \max{\left( \log_{2}{\frac{P(w,c)}{P(w)P(c)}}, 0 \right)}
$$

- To compute word similarity
- Usually when the dimensions are words; term-term matrices
- **Intuition:** the best way to weigh the association between two words is to ask how much more the two words co-occur in our corpus than we would have a priori expected them to appear by by chance

#### Pointwise Mutual Information (PMI)

- A measure of how often two events $x$ and $y$ occur, compared with what we would expect if they were independent
- The numerator tells us how often we observed the two words together (assuming computed by MLE)
- The denominator tells us how often we would expect the two words to co-occur assuming they each occurred independently
- The ratio gives us an estimate of how much more the two words co-occur than we expect by chance
- PMI values range from negative to positive infinity
- But negative PMI values (which imply things are co-occurring less often than we would expect by chance) tend to be unreliable unless our corpora are enormous

PMI between a target word $w$ and a context word $c$:

$$
\text{PMI}(w,c) = \log_{2}{\frac{P(w,c)}{P(w)P(c)}}
$$

### Word2Vec

- **Intuition:** self-supervision
  - Instead of counting how often each word $w$ occurs near, say, *apricot*, we'll instread train a classifier on a binary prediction task: "Is word $w$ likely to show up near *apricot*?"
  - We don't actually care about this prediction task
  - Instead we'll take the learned classifier weights as embeddings

#### Skip-gram

**Intuition:**

1. Treat the target word and a neighboring context word as positive examples
2. Randomly sample other words in the lexicon to get negative samples
3. Use logistic regression to train a classifier to distinguish those two cases
4. Use the learned weights as the embeddings

$$
P(+|w,c_{1:L}) = \prod_{i=1}^{L}{\sigma(\bold{c_i} \cdot \bold{w})}
$$

- Skip-gram model learns two separate embeddings for each word $i$: the target embedding $\bold{w}_i$ and the context embedding $\bold{c}_i$
- Thus the parameters we need to learn are two matrices $\bold{W}$ (target matrix) and $\bold{C}$ (context matrix), each containing an embedding for every one of the $|V|$ words in the vocabulary $V$
- $L$ is the context window size
- We can represent word $i$ with the vector $\bold{w}_i + \bold{c}_i$, or just by the vector $\bold{w}_i$

**Loss Function:**

$$
L = - \log{\left[ P(+|w,c_{pos}) \prod_{i=1}^{k}P(-|w,c_{neg_i}) \right]}
$$

- Skip-gram with negative sampling (SGNS) uses more negative examples than positive examples
- For each $(w, c_{pos})$ we will create $k$ negative samples