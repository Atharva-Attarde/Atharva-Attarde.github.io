# Content Management Workflow

## Setup (First Time Only)

```powershell
# 1. Install Node.js dependencies
npm install

# 2. Test the build
npm run build

# 3. Done! You're ready to add content
```

---

## Add New Content: 3 Simple Steps

### Step 1️⃣: Create a Markdown File

Create a new file in the `src/` folder with a `.md` extension:

```
src/my-great-post.md
```

### Step 2️⃣: Write Your Content

Use this template:

```markdown
---
title: My Great Post
description: A brief description for search engines
date: 2025-02-20
author: Atharva Attarde
slug: my-great-post
---

# My Great Post

Your amazing content goes here...

## Section Title

More content in Markdown format.
```

**Header fields explained:**
- `title` - Page title (appears in browser tab and header)
- `description` - SEO description (shown in search results)
- `date` - Publication date (YYYY-MM-DD)
- `author` - Author name
- `slug` - URL name (e.g., `my-great-post` → `my-great-post.html`)

### Step 3️⃣: Build and Publish

```powershell
# Convert markdown to HTML
npm run build

# Commit your changes
git add .
git commit -m "Add post: My Great Post"

# Push to GitHub (auto-deploys)
git push
```

---

## File Structure After Adding Content

Every time you run `npm run build`, markdown files are converted to HTML in the root:

```
.
├── src/
│   ├── my-great-post.md          (YOUR markdown source)
│   ├── another-post.md           (YOUR markdown source)
│   └── example-page.md           (template/reference)
│
├── my-great-post.html            (AUTO-GENERATED)
├── another-post.html             (AUTO-GENERATED)
├── example-page.html             (AUTO-GENERATED)
│
├── index.html                    (homepage)
├── build.js                      (the builder)
├── package.json                  (dependencies)
└── assets/                       (CSS, JS, images)
```

---

## Important Rules

✅ **DO:**
- Edit files in the **`src/` folder**
- Keep markdown filename lowercase: `my-post.md` (not `MyPost.md`)
- Use hyphens not spaces: `contact-page.md` (not `contact page.md`)
- Always run `npm run build` before pushing
- Check that HTML files were generated

❌ **DON'T:**
- Edit `.html` files directly (they get overwritten on rebuild)
- Use special characters in filenames
- Forget the front matter (`---` header block)
- Skip the `slug` field

---

## Optional: Auto-Rebuild on Save

Want your changes to build automatically as you type? 

```powershell
# Watch for changes and rebuild automatically
npm run watch
```

(Requires chokidar to be installed: already in `package.json`)

---

## Examples

### Example 1: Blog Post

**File:** `src/my-first-blog-post.md`

```markdown
---
title: My First Blog Post
description: An introduction to my thoughts on web development
date: 2025-02-20
author: Atharva Attarde
slug: my-first-blog-post
---

# My First Blog Post

I'm excited to share my thoughts on building modern websites...

## Why I Started Blogging

The reasons are many...

## Key Takeaways

1. Writing helps you think clearly
2. Sharing knowledge benefits others
3. You build a portfolio along the way

## Conclusion

Expect more posts coming soon!
```

### Example 2: Project Page

**File:** `src/my-python-project.md`

```markdown
---
title: My Python Project
description: A tool for processing CSV files efficiently
date: 2025-02-20
author: Atharva Attarde
slug: my-python-project
---

# My Python Project

This is a simple tool I built to solve a real problem.

## Features

- Lightning-fast CSV processing
- Supports large files
- Simple command-line interface

## How to Use

\`\`\`bash
python tool.py input.csv output.csv
\`\`\`

## Source Code

Check it out on [GitHub](https://github.com/yourusername/project)
```

---

## Troubleshooting

**"npm: command not found"**
→ Install Node.js from https://nodejs.org/

**"Module not found: marked"**
→ Run `npm install` first

**"HTML file didn't generate"**
→ Check markdown syntax, make sure front matter is between `---` lines

**"Page doesn't appear in navigation"**
→ Edit `build.js` if you want custom menu items, otherwise it auto-generates

---

## Quick Reference Cheat Sheet

| Task | Command |
|------|---------|
| First time setup | `npm install` |
| Build HTML from markdown | `npm run build` |
| Auto-rebuild on changes | `npm run watch` |
| Create new page | Create `src/page-name.md` |
| Edit existing page | Edit `src/page-name.md` then `npm run build` |

---

**That's it!** You're now equipped to manage your website in plain Markdown. Start by copying the example page template and writing your first post! 🚀
