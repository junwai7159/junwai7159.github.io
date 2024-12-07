# OCR

OCR mainly consists fo two algorithms

1. **Two-stage algorithms:**
   1. Include two task: text detection and recognition
2. **End-to-end algorithms:**
   1. Integrate detection and recognition in a unified framework
   2. The two parts share the same backbone network but have specialized modules for detectiona and recognition
   3. The model is smaller and the processing speed is faster

## Text Detection

Popular text detection algorithms can be roughly divided into: **regression-based** and **segmentation-based** algorithms

- **Regression-based:**
  - Draw on general object detection algorithms, realize detection box regression by setting the anchor, or directly perform pixel regression
  - Perform well on discerning **regularly-shaped texts**, but badly on irregularly-shaped texts
- **Segmentation-based:**
  - Can perform better in the detection of various scenes and texts of various shapes
  - Post-processing is complicated, thus may be slow in speed and cannot detect overlapped texts

## Text Recognition

Can be generally divided into: **Regular Text Recognition** and **Irregular Text Recognition** according to the contour of the text to be recognized

- **Regular text:** e.g. printed fonts, scanned text, etc. which are roughly horizontal
- **Irregular text:** often not in a horizontal position, and often curved, covered, and blurred

The algorithms of regular text recognition can be divided into two types according to the different decoding methods: **CTC-based** and **Seq2seq-based** algorithms

- **CTC-based:** CRNN + CTC
  - Introduce a space character
  - Labels do not require character level alignment
  - **Pros:** high efficiency, good for regular and long text
  - **Cons:** Do not use context information, and bad for irregular text
- **Seq2seq-based** Seq2seq + Attention
  - **Pros:** higher accuracy
  - **Cons:** Poor effect for too long or too short text

## Document Structured Recognition

### Layout Analysis

- To classify the content of document images into categories like plain texts, titles, tables, picturecs, etc.
- Current methods generally detect or segment them respectively

### Table Recognition

- To identify and transfer the table information of the document into an excel file

Current methods include:

1. Methods based on heuristic rules
2. CNN-based methods
3. GCN-based methods
4. End-to-end methods

### Key Information Extraction (KIE)

- An important task in Document VQA
- Refers to the extraction of the needed information from images, such as the name and ID number from ID cards
- The general KIE method is developed based on NER, but it only uses text information in the image without employing visual and structural information

KIE is usually divided into two sub-tasks for research:

1. **Semantic Entity Recognition (SER):** classifies each detected text; e.g. divides texts into names, IDs
2. **Relation Extraction (RE):** classifies each detected text; e.g. categorize texts into questions and answers, and then find the corresponding answer for each question

Current methods include:

1. Grid-based method
2. Token-based method
3. GCN-based method
4. End-to-end method

## End-to-end algorithms

The approach can be broadly classified into two categories:

1. End-to-end regular text recognition
2. End-to-end arbitrary-shaped text recognition

## References

- Dive into OCR