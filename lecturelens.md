---
layout: page
title: "LectureLens"
permalink: /lecturelens/
---

### The Vision-LLM Powered STEM Audiobook Generator

Turn complex, math-heavy textbooks and scientific papers into spoken, professor-guided audio lectures.

🔗 **GitHub Repository:** [Atharva-Attarde/LectureLens](https://github.com/Atharva-Attarde/LectureLens) &nbsp;|&nbsp; 📜 **License:** MIT

---

{% include lecturelens-demo.html %}

---

### 👁️ Why Vision LLMs Change Everything

Traditional PDF-to-audio tools scrape raw text or use naive OCR. On academic textbooks and STEM papers, this fails completely:
* ❌ **Broken Reading Order:** Multi-column papers get read horizontally across columns, scrambling sentences into gibberish.
* ❌ **Corrupted Equations:** Fractions, summations, superscripts, and Greek symbols degrade into unpronounceable text soup.
* ❌ **Blind to Figures:** Graphs, circuit diagrams, and multi-panel waveforms are skipped entirely or read as nonsense axis numbers.

#### The LectureLens Vision-First Solution
Instead of scraping fragile text strings, LectureLens renders each page into a **high-resolution visual snapshot (150+ DPI)** and feeds it directly into a local Vision LLM (*Qwen2.5-VL / Qwen3.5* via Ollama):

1. **Understands Layout Hierarchy:** Reads complex multi-column layouts top-to-bottom, left-to-right without column bleeding.
2. **Pedagogical Diagram Walkthroughs:** Identifies multi-panel figures (e.g., Figure 1 Transformer Architecture, Encoder/Decoder stacks) and intuitively walks through connections and signals.
3. **Translates Formulas to Spoken English:** Turns complex notation ($\text{LayerNorm}(x + \text{Sublayer}(x))$, $\text{softmax}(\frac{QK^T}{\sqrt{d_k}})V$, $d_{\text{model}} = 512$) into fluid lecture speech.
4. **100% Local & Private:** Runs entirely on your local machine via [Ollama](https://ollama.com/) with zero cloud API keys or subscriptions.

---

### 🚀 Quick Start & CLI Usage

```bash
# 1. Clone the repository
git clone https://github.com/Atharva-Attarde/LectureLens.git
cd LectureLens

# 2. Install dependencies & pull vision model
pip install -r requirements.txt
ollama pull qwen3.8:latest

# 3. Generate page-by-page audio for a textbook chapter
python lecturelens.py textbook.pdf \
  --per-page \
  --pages "10-61" \
  --offset 23 \
  --model "qwen3.8:latest" \
  --out-dir ./Audiobook/MathChapters
```

---

<p style="text-align: center; margin-top: 30px;">
  <a href="https://github.com/Atharva-Attarde/LectureLens" class="ll-btn ll-btn-primary" style="font-size: 1rem; padding: 12px 24px;">
    ⭐ Explore LectureLens on GitHub
  </a>
</p>
