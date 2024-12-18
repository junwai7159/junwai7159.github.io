# Tricks

## Data Augmentation

### MixUp

- Generates a weighted combination of random image pairs

### CutMix

- Cuts part of an image and replace it with a patch from another image

### CutOut

### AutoAugment

### RandAugment

- Applies a series of random augmentations such as rotation, translation, and shear

### Random Erasing

- Randomly selects a rectangle region in an image and erases its pixels with random values

### Repeated Augmentation

## Regularization

### Stochastic Depth

### Label Smoothing

## Normalization

### BatchNorm

### LayerNorm

### LayerScale

## Determining the optimal sample size

- TODO

## FixRes

- It is desirable to use a lower training resolution and fine-tune the network at the larger resolution
- This speeds up the full training and improves the accuracy under prevailing data augmentation schemes