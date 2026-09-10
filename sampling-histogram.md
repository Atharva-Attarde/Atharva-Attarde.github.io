---
layout: page
title: "Signal Amplitude Distribution Simulator"
permalink: /sampling-histogram/
---

### Real-Time Signal Sampling &amp; Probability Density Function (PDF) Analysis

Understanding how continuous analog waveforms transform into discrete amplitude probability densities.

🔗 **Direct Web App:** [Open Fullscreen Simulator]({{ '/assets/Samplpling_histogra.html' | relative_url }})

---

{% include sampling-histogram-demo.html %}

---

### 🧠 Theory &amp; Mathematical Derivation

When analyzing analog signals $x(t)$ in digital signal processing and telecommunications, we often need to characterize the probability $p(x)dx$ of finding the signal's instantaneous voltage at amplitude $x$.

#### 1. Sine Wave ($x(t) = A \sin(\omega t)$)
For a pure harmonic tone, the signal velocity is given by the time derivative:
$$\frac{dx}{dt} = A \omega \cos(\omega t) = \omega \sqrt{A^2 - x^2}$$

The probability density function $f_X(x)$ is inversely proportional to the speed $|\frac{dx}{dt}|$ at which the wave traverses that voltage level:
$$f_X(x) = \frac{1}{\pi \sqrt{A^2 - x^2}}, \quad \text{for } |x| < A$$

* **Why the peaks at $\pm A$?** The derivative $\frac{dx}{dt} \to 0$ at the crests and troughs, meaning the waveform spends the maximum time near extreme amplitudes.

---

#### 2. Triangle Wave
A triangle wave has a constant absolute rate of change $|\frac{dx}{dt}| = 4 A f_0$. Because the speed across all voltage levels is constant, every amplitude slice receives an equal number of samples:
$$f_X(x) = \frac{1}{2A}, \quad \text{for } |x| \le A$$
* This yields a flat, uniform probability distribution.

---

#### 3. Gaussian Noise
Thermal and channel noise follow a normal distribution modeled by the Box-Muller transform:
$$f_X(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{(x - \mu)^2}{2\sigma^2}}$$
* Most samples cluster near zero mean ($\mu = 0$) with exponentially decreasing tails.

---

### 🛠️ Practical Engineering Applications
* **ADC Quantization &amp; Clipping Analysis:** Optimizing dynamic range and avoiding saturation in analog-to-digital converters.
* **Crest Factor &amp; PAPR Reduction:** Measuring Peak-to-Average Power Ratio in OFDM and RF power amplifier design.
* **Audio Dynamic Range Compression:** Calibrating knee thresholds and RMS detectors in audio production pipelines.

<p style="text-align: center; margin-top: 30px;">
  <a href="{{ '/' | relative_url }}" class="hero-btn hero-btn-primary" style="display: inline-block; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: 600;">
    &larr; Return to Home &amp; Projects
  </a>
</p>
