# Concepts

## Frame

- Frames are knowledge structures representing the details of the user's task specification
- Each frame consists of a collection of slots, each of which can take a set of possible values
- Together a set of frames is sometimes called a domain ontology

## Task-oriented dialogue systems

- Converse with users to accomplish fixed tasks
- Relying on a data structure called the frame
- e.g. Siri, Alexa
- The frame and its slots specify what the system needs to know to perform its task

### Frames and Slot Filling

- The system's goal is to fill the slots in the frame with the fillers the user intends, and then perform the relevant action for the user
- Together, the domain classification and intent determination tasks decide which frame we are filling
- The simplest dialogue systems use handwritten rules for slot-filling, like regular expression
- But most systems use supervised machine-learning: each sentence in a training set is annotated with slots, domain, and intent and a sequence model maps from input words to slot fillers, domain and intent

### Evaluation

- Task error rate, or task success rate
- Slot error rate, the percentage of slots filled with the correct values
- Instead of error rate, slot precision, recall and F-socre can also be used
- Efficiency costs like the length of the dialogue in seconds or turns

## Properties of Human Conversation

### Turns

- A dialogue is a sequence of turns, each a single contribution from one speaker to the dialogue
- The system must know when to start and stop talking
- **Endpointing / endpoint detection :** spoken dialogue systems must detect whether a user is done speaking, so they can process the utterance and respond

### Speech Acts

- Each utterance in a dialogue is a kind of action being performed by the speaker
- These actions are called speech acts or dialogue acts
- **4 major classes:** constatives, directives, commissives, and acknowledgments

### Grounding

- Like all collective acts, it's important for the participants to establish what they both agree on, called the common ground
- Speakers do this by grounding each other's utterances
- Grounding means acknowledging that the hearer has understood the speaker

### Subdialogues and Dialogue Structure

- **Adjacency pairs** are composed of a first pair part and a second pair part:
  - QUESTIONS set up an expectation for an ANSWER
  - PROPOSALS are followed by ACCEPTANCE or REJECTION
  - COMPLIMENTS often give rise to DOWNPLAYERS
- Dialogue acts aren't always followed immediately by their second pair part, the two parts can be separated by a side sequence or subdialogue
- Subdialogues examples:
  - Correction subdialogue
  - Clarification question, which can form a subdialogue between a REQUEST and a RESPONSE
- Questions often have presequences

### Initiative

- Sometimes a conversation is completely controlled by one participant
- Normal human-human dialogue is mixed initiative
- The most primitive dialogue systems tend to use system-initiative, where the system asks a question and the user can't do anything until they answer it, or user-initiative like simple search engines, where the user specifies a query and the system passively responds
- Modern LLM-based dialogue systems, which come closer to using full mixed initiative, often don't have completely natural initiative switching

### Inference and Implicature

- Implicature means a particular class of licensed inferences
- Grice proposed that what enables hearers to draw these inferences is that conversation is guided by a set of maxims, general heuristics that play a guiding role in the interpretation of conversational utterances
- **Grice's maxims:** quantity, quality, relevance, manner

## Dialogue Acts

- A generalization of speech acts that also represent grounding
- The set of acts can be general, or can be designed for particular dialogue tasks
- Dialogue act detection is done just like domain or intent classification, by passing the input sentence through an encoder and adding an act classifier

## Dialogue State Tracker (DST)

- The job of the dialogue-state tracker is to determine the current state of the frame (the fillers of each slot), and the user's most recent dialogue
- The dialogue state is not just the slot-fillers in the current sentence; it includes the entire state of the frame at this point, summarizing all of the user's constraints

## Dialogue Policy

- Which act to generate
- In early commercial frame-based systems, the dialogue policy is simple: ask questions until all the slots are full, do a database query, then report back to the user
- A more sophisticated dialogue policy can help a system decide when to answer the user's question, when to instead ask the user a clarification question, and so on
- A dialogue policy thus decides what dialogue act to generate
- Choosing a dialogue act to generate, along with its arguments, is sometimes called **content planning**

## Natural Language Generation (NLG)

- Once a dialogue act has been chosen, we need to generate the text of the response to the user
- The part of the generation process is called sentence realization

## Delexicalize

- Generalize the training examples by replacing specific slot value words in the training set with a generic placeholder token representing the slot
- The decoder outputs the delexicalized English sentence, which can then relexicalize

## Chatbots

- Systems that can carry on extended conversations with the goal of mimicking the unstructure conversations or 'chats' characteristic of informal human-human interaction
- e.g. ELIZA, ChatGPT
- For training chatbots, it's most common to use the standard causal (decoder-only) language model

### Evaluating Chatbots

**Participant Evaluation:**

- The human who talked to the chatbot
- The human evaluator chats with the model and rates the chatbot on different dimensions on Likert scales

**Observer Evaluation:**

- A third party who reads a transcript of a human/chatbot conversation
- Use third party annotators to look at the text of a complete conversation
- The acute-eval metric where annotators look at two separate human-computer conversations and choose the system which performed better

## User-centered design

Dialogue systems are a kind of human-computer interaction, and general HCI principles apply in their design

1. Study the user and task
   1. Interviewing users
   2. Investigating similar systems
2. Build simulations and prototypes
   1. **The Wizard-of-Oz system:** the users interact with what they think is a program but is in fact a human "wizard" disguised by a software interface
3. Iteratively test the design on users
   1. Embedded user testing
   2. **Value sensitive design:** the benefits, harms and possible stakeholders of the resulting system