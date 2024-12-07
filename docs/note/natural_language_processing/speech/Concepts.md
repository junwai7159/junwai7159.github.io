# Concepts

## Automatic Speech Recognition (ASR)

- To process human speech into readable text (sequenes of graphemes)
- Also known as speech-to-text
- Generally based on the encoder-decoder architecture
- **Speaker-independent:** trained on large corpora with thousands of hours of speech from many speakers

### Task Variation

1. **Vocabulary size**
   1. Open-ended tasks like transcribing videos or conversations are much harder
2. **Who the speaker is talking to**
   1. Humans speaking to machines (either read speech or talking to a dialogue system) are easier to recognize than humans speaking to humans (conversational speech)
3. **Channel and noise**
4. **Accent or speaker-class characteristics**

### Evaluation: Word Error Rate

- How much the word string returned by the recognizer (the hypothesized word string) differs from a reference transcription
- Compute the minimum edit distance to get the minimum number of word substituitions, word insertions, and word deletions necessary to map between the correct and hypothesized strings
- The standard method for computing WER is a free script called sclite

$$\text{Word Error Rate} = 100 \times \frac{\text{Insertions} + \text{Substitutions} + \text{Deletions}}{\text{Total Words in Correct Transcript}}$$

### Statistical Significance

- Matched-Pair Sentence Segment Word Error (MAPSSWE)
- McNemar's Test

## Log Mel Spectrum

- The first step in ASR is to transform the input waveform into a sequence of acoustic feature vectors, each vector representing the information in a small time window of the signal
- We represent sound waves by plotting the change in air pressure over time

### Sampling and Quantization

- Analog-to-digital conversion has two steps: sampling and frequency
- **Nyquist theorem:** e.g. most information in human speech is in frequencies below 10,000 Hz, thus a 20,000 Hz sampling rate would be necessary for complete accuracy
- Amplitude measurements are stored as integers, either 8-bit ($-128–127$) or 16-bit ($-32768–32767$)
- Once data is quantized, it is store in various formats: e.g. Microsoft's .wav and Apple's AIFF
  - **Sample rate:** e.g. 8 kHz
  - **Sample size:** e.g. 8-bit
  - **Number of channels:** e.g. for stereo data or for two-party conversations, we can store both channels in the same file or separate files
  - **Individual sample storage:** linear or compression, e.g. linear PCM, $\mu$-law

Compressing a linear PCM sample value $x$ to 8-bit $\mu$-law ($\mu = 255$):

$$F(x) = \frac{\text{sgn}(x) \log{(1 + \mu |x|)}}{\log{(1 + \mu)}}$$

### Windowing

- Extract spectral features from a small window of speech that characterizes part of a particular phoneme
- Inside this small window, the signal as stationary. By contrast, in general, speech is a non-stationary signal
- The speech extracted from each window is called a frame
- **Windowing parameters:** window/frame size, frame stride/shift/offset, shape of the window
- The rectangular window abruptly cuts off the signal at its boundaries, which creates problem during Fourier analysis
- Hamming window shrinks the values of the signal toward zero at the window boundaries, avoiding discontinuities

To extract the signal we multiply the value of the signal at time $n$, $s[n]$ by the value of the window at time $n$, $w[n]$

$$y[n] = w[n]s[n]$$

### Discrete Fourier Transform

- Extract spectral information from windowed signal, to know how much energy the signal contains at different frequency bands
- FFT to compute DFT, only works for values of $N$ that are powers of 2
- The results of the FFT tell us the energy at each frequency band

$$X[k] = \sum_{n=0}^{N-1}{x[n]\exp^{-j \frac{2\pi}{N}kn}}$$

### Mel Filter Bank and Log

- Human hearing is not equally sensitive at all frequency bands, it is less sensitive at higher frequencies
- Information in low frequencies (e.g. formants) is crucial for distinguishing vowels or nasals, while information in high frequencies (e.g. stop bursts or fricative noise) is less crucial for successful recognition
- The mel filter bank collect energy from each frequency band, spread logarithmically so that we have very fine resolution at low frequencies, and less resolution at high frequencies
- Then take the log of each mel spectrum values: human response to signal level is logarithmic, also makes the feature estimates less sensitive to variations in input such as power variations

The mel frequency $m$:

$$mel(f) = 1127 \ln{(1 + \frac{f}{700})}$$

## Text-to-speech (TTS)

- To process text into audible speech
- Like ASR systems, TTS systems are generally based on the encoder-decoder architecture
- **Speaker-dependent:** trained to have a consistent voice, on much less data, but all from one speaker

### Text Normalizaton

- Verbalize non-standard words, depends on its meaning (semiotic class)
- Normalization can be done by rule or by an encoder-decoder model

### Spectogram Prediction

- Maps from strings of letters to mel spectographs: sequences of mel spectral values over time
- e.g. Tacotron2

### Vocoding

- Generate waveforms from intermediate representations like mel spectograms
- e.g. Wavenet

### Evaluation

- Evaluated by human listeners
- Mean Opinion Score (MOS), usually on a scale from 1-5
- AB test to compare exactly two systems

## Wake Word Detection

- Detect a word or short phrase, usually in order to wake-up a voice-enable assistant
- e.g. Alexa, Siri, Google Assistant

## Voice Activity Detection (VAD)

- A process that identifies the presence or absence of human speech in an audio signal

## Speaker Diarization

- The task of determining 'who spoke when' in a long multi-speaker audio recording
- Marking the start and end of each speaker's turns in the interaction
- Often use VAD to find segments of continuous speech, extract speaker embedding vectors, and cluster the vectors to group together segments likely from the same speaker

## Speaker Recognition

- The task of identifying a speaker
- **Speaker verification:** make a binary decision (is this speaker $X$ or not?)
- **Speaker identification:** make a one of $N$ decision trying to match a speaker's voice against a database of many speakers
- **Language identification:** given a wavefile, identify which language is being spoken
