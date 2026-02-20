# ⚡ How to Add New Pages - Quick Reference

## The Exact Steps (Copy & Paste Ready)

### Step 1: Create Your Markdown File

Create a new file: `src/your-page-name.md`

```markdown
---
title: Your Page Title
description: Short description for Google/social media
date: 2025-02-20
author: Atharva Attarde
slug: your-page-name
---

# Your Page Title

Your content goes here...

## Section 2

More content...
```

✅ **Required fields:**
- `title` - What appears at the top of the page
- `description` - SEO/social media preview
- `slug` - Used for the filename (becomes `your-page-name.html`)
- `author` - Your name
- `date` - Publication date (YYYY-MM-DD)

### Step 2: Run the Build

```powershell
npm run build
```

This converts your `.md` file to `.html` automatically.

### Step 3: Push to GitHub

```powershell
git add .
git commit -m "Add: Your Page Title"
git push
```

Done! Your page is live! 🎉

---

## File Naming Rules

| ❌ Don't | ✅ Do |
|---------|-------|
| `My Page.md` | `my-page.md` |
| `MYPAGE.md` | `my-page.md` |
| `my_page.md` | `my-page.md` |
| `Page #1.md` | `page-1.md` |

**Rule:** Lowercase letters, numbers, and hyphens only. No spaces, underscores, or special characters.

---

## Markdown Syntax Cheat Sheet

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`inline code`

- Bullet point
- Another point

1. Numbered item
2. Another item

[Link text](https://example.com)
![Image alt text](path/to/image.jpg)

\`\`\`python
code block here
\`\`\`

> Blockquote

---
Horizontal divider
```

---

## Common Questions

**Q: Where do I put images?**
A: Create an `assets/images/` folder and reference them:
```markdown
![My image](assets/images/my-image.jpg)
```

**Q: How do I link to another page?**
A: Use the slug name:
```markdown
[Read my other post](./my-other-post.html)
```

**Q: Page not showing up?**
A: 
1. Make sure file is in `src/` folder
2. Run `npm run build` again
3. Refresh your browser (Ctrl+Shift+Delete to clear cache)

**Q: Can I use HTML in my markdown?**
A: Yes! Write HTML directly in the markdown if needed.

**Q: How do I edit an existing page?**
A: Edit the `.md` file in `src/`, then run `npm run build` again.

---

## Example: Full Blog Post

**Filename:** `src/getting-started-with-python.md`

```markdown
---
title: Getting Started with Python
description: A beginner's guide to learning Python programming
date: 2025-02-20
author: Atharva Attarde
slug: getting-started-with-python
---

# Getting Started with Python

Python is an excellent first programming language...

## Why Python?

- Easy to learn
- Great community
- Lots of libraries

## Installation

Visit [python.org](https://python.org) and download the latest version.

### On Windows

\`\`\`
1. Download the installer
2. Run it
3. Check "Add Python to PATH"
4. Click Install
\`\`\`

### On Mac/Linux

\`\`\`bash
# Using Homebrew (Mac)
brew install python3

# Using apt (Linux)
sudo apt install python3
\`\`\`

## Your First Program

\`\`\`python
print("Hello, Python!")
\`\`\`

## What's Next?

- [Official Python Tutorial](https://python.org/tutorial)
- [Python Documentation](https://docs.python.org)

Happy coding! 🐍
```

After saving this file, run:
```powershell
npm run build
```

And your new page appears as `getting-started-with-python.html`!

---

## Useful Commands

```powershell
# Build once (converts all markdown to HTML)
npm run build

# Auto-rebuild whenever you save a file
npm run watch

# View what npm scripts are available
npm run
```

---

**That's really all there is to it!** Write markdown, run build, push to GitHub. Your site auto-deploys on every push. 🚀
