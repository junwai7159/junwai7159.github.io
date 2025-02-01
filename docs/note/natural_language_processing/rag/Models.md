# Models

## Best Match 25 (BM25)

- Sometimes called Okapi BM25, after the Okapi IR system
- Adds two parameters:
  - $k$: adjust the balance between tf and idf
  - $b$: controls the important of document length normalization
- $|d_{\text{avg}}|$: the average document length in the collection

The BM25 score for a query $q$ and document $d$ is:

$$\text{score}(q, d) = \sum_{t \in q}{\log{\left(\frac{N}{df_t}\right)} \cdot \frac{tf_{t, d}}{k(1 - b + b \cdot \frac{|d|}{|d_{\text{avg}}|}) + tf_{t,d}}}$$

- When $k = 0$, BM25 reverts to no use of term frequency, just a binary selection of terms in the query (plus idf)
- A large $k$ results in raw term frequency (plus idf)
- $b$ ranges from 1 (scaling by document length) to 0 (no length scaling)

## Hierarchical Navigable Small World (HNSW)

https://www.pinecone.io/learn/series/faiss/hnsw/

### Probability skip lists

### Navigable small world (NSW) graphs

## FAISS

- Standalone vector indices

## GraphRAG

## RAG Indexing

## RAG Retrieval

## RAG Generation

## RAG Routing

## RAG Query Translation

## RAG Query Construction