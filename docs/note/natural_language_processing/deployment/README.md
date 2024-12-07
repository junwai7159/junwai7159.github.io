# Deployment

## Concepts

### Calculate GPU memory for serving LLMs

https://www.substratus.ai/blog/calculating-gpu-memory-for-llm

### Precision

- fp, bp, int, mixed, fixed
- As a rule of thumb, look for at least 4-bit quantized models, these models have a good balance between compression and accuracy

### GGUF

- A GGUF model represents a compressed version of its original counterpart through quantization, which reduced the number of bits needed to represent the parameters of an LLM

## Framework

### llama.cpp