# Concept

## Information access

- The freedom or ability to identify, obtain and make use of database or information effectively
- The most common current use of machine translation
- Improvements in machine translation can help reduce the digital divide in information access: that fact that much more information is available in English and other languages spoken in wealthy countries

## Word Order Typology

1. **SVO:** e.g. German, French, English, Mandarin
2. **SOV:** e.g. Hindi, Japanese
3. **VSO:** e.g. Irish, Arabic

- SOV = Subject-Verb-Object
- Two languages that share their basic word order type often have other similarities
- e.g. VO languages generally have prepositions, whereas OV languages generally have postpositions

## Lexical Divergences

- Languages differ in lexically dividing up the conceptual space, either one-to-many or even many-to-many translation
- Sometimes one language places more grammatical constraints on word choise than another
- One language may have a lexical gap, where no word or phrase, short of an explanatory footnote, can express the exact meaning of a word in the other language
- The field of MT and Word Sense Disambiguation are closely linked
- Languages differ in how the conceptual properties of an event are mapped onto specific words:
  - **Verb-framed languages:** e.g. Spanish
  - **Satellite-framed languages:** e.g. English

## Morphological Typology

Morphologically, languages are often characterized along two dimensions of variation:

1. **The number of morphemes per word**
   1. **Isolating languages:** e.g. Vietnamese and Cantonese, in which each word generally has one morpheme
   2. **Polysynthetic languages** e.g. Siberian Yupik ("Eskimo"), in which a single word may have very many morphemes, corresponding to a whole sentence in English
2. **The degree to which morphemes are segmentatble**
   1. **Agglutinative languages:** e.g. Turkish, in which morphemes have relatively clean boundaries
   2. **Fusion languages:** e.g. Russian, in which a single affix may conflate multiple morphemes

- Translating between languages with rich morphology requires dealing with structure below the word level
- Thus generally use subword models like WordPiece or BPE

## Referential Density

- The differences in frequencies of omission across pro-drop languages, e.g. Japanese and Chinese tend to omit far more than Spanish
- **Pro-drop languages:** languages that can omit pronouns
- Languages that tend to use more pronouns are more referentially dense than those that use more zeros
- **Cold languages:** referentially sparse languages, e.g. Chinese or Japanese, require the hearer to do more inferential work to recover antecedents
- **Hot languages:** languages that are more explicit and make it easier for the hearer

## MT Evaluation

- chrF, BLEU