
# Models

## Training Algorithms

### Maximal Update Parameterization

### Knowledge Distillation

- Extract valuable knowledge from a large and complex teacher model and transferring it to a smaller and more efficient student model
- The essence of this technique is to have the student model learn to approximate the behavior and predictions of the teacher

### Two Stage Pre-training Strategy

- Training a model in two distinct phases
- During the pretraining phase, MiniCPM only uses large-scale coarse-quality pre-training data, which is abudant and can support continuous training when provided with more computational resources
- During the annealing phase, we use diverse and high-quality knowdledge and ability-oriented SFT data, mixed into the pre-training data

## Model

- NVIDIA/Hymba-1.5B