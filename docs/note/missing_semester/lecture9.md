
# Lecture 9: Security and Cryptography
## Entropy
- a measure of randomness
- measured in bits, determining the strength of a password
- equal to `log_2(# of possibilities)`
- the attacker knows the model of the password, not the randomness (e.g. Diceware) used to select a particular password
- how many bits of entropy is enough, depends on your threat model

## Hash functions
**Cryptographic hash function**
```
hash(value: array<byte>) -> vector<byte, N>  (for some fixed N)
```
- Maps data of arbitrary size to a fixed size
- SHA-1: maps arbitrary-sized inputs to 160-bit outputs (40 hexadecimal characters)
    - no longer a strong cryptographic hash function
- Properties:
    - deterministic
    - non-invertible
    - target collision resistant
    - collision resistant
- Applications:
    - Git, for content-addressed storage
    - short summary of the contents of a file
    - commitment schemes

**Example**:
```bash
$ printf 'hello' | sha1sum
aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
$ printf 'hello' | sha1sum
aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
$ printf 'Hello' | sha1sum 
f7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0
```

## Key derivation functions (KDFs)
- Deliberately slow to compute, in order to slow down offline brute-force attacks
- Applications:
    - Producing keys (similar properties as hash, e.g. fixed-length) from passphrases for use in other cryptographic algorithms  
        - e.g. generate key for symmetric cryptography
    - Storing login credentials
        - generate and store a random salt `salt = random()` for each user
        - store `KDF(password + salt)`
        - verify login attempts by recomputing the KDF given the entered password and the stored salt

## Symmetric cryptography
```
keygen() -> key  (this function is randomized)

encrypt(plaintext: array<byte>, key) -> array<byte>  (the ciphertext)
decrypt(ciphertext: array<byte>, key) -> array<byte>  (the plaintext)
```
- AES: symmetric cryptosystem
- Properties:
    - given the output (ciphertext), hard to determine the input (plaintext) without the key
    - decrypt function has the obvious correctness property, that `decrypt(encrypt(m, k), k) = m`
- Applications:
    - Encrypting files for storage in an untrusted cloud service

## Asymmetric cryptography
```
keygen() -> (public key, private key)  (this function is randomized)

encrypt(plaintext: array<byte>, public key) -> array<byte>  (the ciphertext)
decrypt(ciphertext: array<byte>, private key) -> array<byte>  (the plaintext)

sign(message: array<byte>, private key) -> array<byte>  (the signature)
verify(message: array<byte>, signature: array<byte>, public key) -> bool  (whether or not the signature is valid)
```
- RSA: asymmetric cryptosystem
- Private key is meant to kept private
- Public key can be publicly shared and it won't affect security (unlike in a symmetric cryptosystem)
- Hard to forge a signature (without private key)
- Properties:
    - a message can be encrypted using the public key
    - given the output (ciphertext), hard to determine the input (plaintext) without the private key
    - decrypt function has the obvious correctness property, that `decrypt(encrypt(m, public key), private key) = m`
    - no matter the message, without the private key, hard to produce signature such that `verify(message, signature, public key)` returns true
    - verify function has the obvious correctness property, that `verify(message, sign(message, private key), public key) = true`
- Applications:
    - PGP email encryption
    - Private messaging
    - Signing software

## Case studies
Detailed explanation at https://missing.csail.mit.edu/2020/security/:
- Password managers
- Two-factor authentication (2FA)
- Full disk encryption
- Private messaging
- SSH

## Exercises
TO-DO