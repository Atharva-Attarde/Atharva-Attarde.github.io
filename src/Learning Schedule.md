---
title: Constant vs Linear vs Cosine Noise Schedules in Diffusion Models
description: A mathematical and intuitive comparison of constant, linear, and cosine beta schedules in diffusion models, focusing on SNR behavior and training stability.
date: 2025-02-20
author: Atharva Attarde
---

# Constant vs Linear vs Cosine Noise Schedules in Diffusion Models

In diffusion models, the **noise schedule** controls how information is gradually destroyed during the forward process.  
While the forward equation looks simple:

\[
z_t = \sqrt{1-\beta_t} z_{t-1} + \sqrt{\beta_t}\,\epsilon_t
\]

the choice of **how βₜ changes over time** dramatically affects training stability and sample quality.

This post explains the mathematical difference between:

- Constant schedule  
- Linear schedule  
- Cosine schedule  

and why modern diffusion models prefer cosine.

---

## Recap: Where the Schedule Matters

Define:

\[
\alpha_t = 1 - \beta_t
\]

\[
\bar{\alpha}_t = \prod_{s=1}^{t} \alpha_s
\]

Then:

\[
z_t = \sqrt{\bar{\alpha}_t} x_0 + \sqrt{1-\bar{\alpha}_t}\,\epsilon
\]

The **Signal-to-Noise Ratio (SNR)** is:

\[
\text{SNR}_t = \frac{\bar{\alpha}_t}{1-\bar{\alpha}_t}
\]

Everything about training depends on how SNR decays over time.

---

# 1. Constant β Schedule

\[
\beta_t = \beta
\]

Then:

\[
\bar{\alpha}_t = (1-\beta)^t
\]

For small β:

\[
\bar{\alpha}_t \approx e^{-\beta t}
\]

So signal decays **exponentially**.

### What Happens?

- Early steps → almost no corruption
- Middle steps → sudden signal collapse
- Late steps → almost pure noise

This means:
- Many timesteps are redundant
- Only a narrow band contributes meaningful learning
- Gradients become imbalanced

Constant β works — but inefficiently.

---

# 2. Linear β Schedule

\[
\beta_t = \beta_{\min} + \frac{t}{T}(\beta_{\max}-\beta_{\min})
\]

Now:

\[
\log \bar{\alpha}_t \approx -\sum_{s=1}^{t} \beta_s
\]

Since the sum of a linear sequence is quadratic:

\[
\sum_{s=1}^{t} \beta_s \sim at + bt^2
\]

So:

\[
\bar{\alpha}_t \sim e^{-at - bt^2}
\]

### What Changes?

- Early corruption is gentle
- Later corruption accelerates
- Signal destruction spreads more smoothly across time

This distributes learning difficulty more evenly than constant β.

Linear schedule was used in the original DDPM paper.

---

# 3. Cosine Schedule

The cosine schedule defines:

\[
\bar{\alpha}_t = \cos^2\left(\frac{t/T + s}{1+s} \cdot \frac{\pi}{2}\right)
\]

for small offset \(s\).

Instead of defining β directly, it defines \(\bar{\alpha}_t\) smoothly.

### Why This Is Better

Cosine schedule approximately makes:

\[
\log(\text{SNR}_t)
\]

decrease linearly with t.

That means:

- Equal difficulty per timestep
- Balanced gradients
- No abrupt signal collapse
- Better sample quality

Empirically, cosine outperforms linear.

---

# Visual Comparison (Conceptual)

| Schedule | Signal Decay | Learning Balance |
|----------|--------------|-----------------|
| Constant | Pure exponential | Poor |
| Linear | Accelerating decay | Better |
| Cosine | Near-linear log-SNR | Best |

---

# Why SNR Is the Real Objective

The real goal is not “increase β”.

The goal is:

> Make log SNR decrease smoothly and evenly across timesteps.

Because the model learns to denoise at every timestep,  
we want each step to contribute equally to learning.

Cosine scheduling achieves this best.

---

# Practical Summary

- Constant β → mathematically valid but inefficient.
- Linear β → smoother corruption, better stability.
- Cosine → best empirical performance, balanced denoising difficulty.

Modern diffusion models (e.g., improved DDPM variants) prefer cosine schedules for this reason.

---

## Minimal Python Example (Plot Schedules)

```python
import numpy as np
import matplotlib.pyplot as plt

T = 1000
beta_const = np.ones(T) * 0.01
beta_linear = np.linspace(0.0001, 0.02, T)

plt.plot(beta_const, label="Constant")
plt.plot(beta_linear, label="Linear")
plt.legend()
plt.show()
```

---

# Final Insight

Noise scheduling is not just a detail.

It shapes:

- Information destruction
- Gradient distribution
- Reverse process difficulty
- Final sample quality

The diffusion model works because the forward process is carefully engineered —  
and the noise schedule is central to that engineering.