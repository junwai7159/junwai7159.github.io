
# Models

## Training Algorithms

### Maximal Update Parameterization

### Knowledge Distillation

- Extract valuable knowledge from a large and complex teacher model and transferring it to a smaller and more efficient student model
- The essence of this technique is to have the student model learn to approximate the behavior and predictions of the teacher

#### Soft Distillation

The student tries to recreate the distribution predicted by the teacher:

$$\mathcal{L} = (1-\lambda) \mathcal{L}_{CE}(\text{softmax}(Z_s), y) + \lambda \tau^2 \text{KL}(\text{softmax}(Z_s / \tau), \text{softmax}(Z_t / \tau))$$

- The first term computes the cross-entropy loss of the student's prediction and ground truth labels
- The second term is the distillation component, it computes the KL divergence loss between the softmax of the student' and the teacher's logits
- The contribution of each term is controlled by a weight term lambda
- $\tau$ is the softmax temperature, $y$ is the ground truth

### Two Stage Pre-training Strategy

- Training a model in two distinct phases
- During the pretraining phase, MiniCPM only uses large-scale coarse-quality pre-training data, which is abudant and can support continuous training when provided with more computational resources
- During the annealing phase, we use diverse and high-quality knowdledge and ability-oriented SFT data, mixed into the pre-training data

## Model

- NVIDIA/Hymba-1.5B