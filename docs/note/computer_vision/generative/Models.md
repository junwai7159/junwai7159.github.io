# Models

## GAN

## Variational Autoencoders (VAE)

## Autoencoders

![vae1](./media/vae1.png)

- Primarily used for unsupervised learning and dimensionality reduction
- To encode input data into a lower-dimensional representation and then decode it back to the original data
- Aims to minimize the reconstruction error
- Lack the probabilistic nature, it is deterministic

## VAEs

![vae1](./media/vae2.png)

- Able to generate new data samples by sampling from a learned distribution in the latent space rather than from a latent vector
- Models the latent space as a probability distribution
- The latent space serves as a continuous, structured representation of the input data
- Loss function = reconstruction loss + latent loss (KL divergence)
- Small latent loss tends to result in generated images closely resembling those present in the training set but lacking in visual quality
- Small reconstruction loss leads to well-reconstructed images during training but hampers the generation of novel images that deviate significantly from the training set

## Diffusion

- The forward process: diffusion
- The reverse process: denoising

1. DDPM
2. NCSN
3. SDE