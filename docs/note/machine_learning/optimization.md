# Optimization

## Convex Optimization

## Optimizers

### Stochastic Gradient Descent (SGD)

### Adam

### RMSProp

### Sharpness-Aware Minimization (SAM)

- Simply minimizing commonly used loss functions (e.g. cross-entropy) on the training set is typically not sufficient to achieve satisfactory generalization
- The training loss landscapes of today's models are commonly complex and non-convex, with a multiplicity of local and global minima, and with different global minima yielding models with different generalization abilities
- SAM functions by seeking parameters that lie in the neighborhoods having uniformly low loss value (rather than parameters that only themselves have low loss value)