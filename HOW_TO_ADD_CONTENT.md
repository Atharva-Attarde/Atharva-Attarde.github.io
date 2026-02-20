# How to Add New Content

## Quick Start: Add a New Page

### Step 1: Create Your Markdown File
Create a new `.md` file in the `src/` folder:

```
src/
  ├── your-page-title.md
  └── another-page.md
```

### Step 2: Write Your Markdown Content

**Template for a new page:**

```markdown
---
title: Your Page Title
description: A short description for SEO
date: 2025-02-20
author: Atharva Attarde
---

# Your Page Title

Write your content here in Markdown.

## Section 2

More content...

### Subsection

- Bullet points
- Work great
- In markdown
```

### Step 3: Generate HTML

Run the build script:

```powershell
node build.js
```

This will:
- Convert all `.md` files in `src/` to HTML
- Create pages in the root directory
- Update navigation menus automatically

### Step 4: Commit & Push

```powershell
git add .
git commit -m "Add new page: Your Page Title"
git push
```

---

## Markdown Format Reference

### Front Matter (Metadata)
```markdown
---
title: Page Title
description: SEO description
date: YYYY-MM-DD
author: Your Name
---
```

### Content Examples

#### Headings
```markdown
# H1 - Page Title
## H2 - Section
### H3 - Subsection
```

#### Lists
```markdown
- Bullet point
- Another point

1. Numbered item
2. Another item
```

#### Links & Images
```markdown
[Link text](https://example.com)
![Alt text](path/to/image.jpg)
```

#### Code Blocks
```markdown
\`\`\`python
def hello():
    print("Hello, world!")
\`\`\`
```

#### Emphasis
```markdown
**bold text**
*italic text*
`inline code`
```

---

## File Organization

### Current Structure:
```
.
├── src/                          # Your markdown source files
│   ├── page-title.md
│   └── another-page.md
├── build.js                      # Auto-builds HTML from markdown
├── index.html                    # Generated homepage
├── page-title.html              # Generated from src/page-title.md
└── assets/                       # CSS, JS, images
    ├── css/
    ├── js/
    └── svg/
```

---

## Editing Pages

To **edit an existing page**:
1. Edit the `.md` file in `src/`
2. Run `node build.js` again
3. Commit and push

**Always edit the `.md` files, not the `.html` files** - changes to HTML will be overwritten on next build.

---

## Adding Images

1. Store images in `assets/images/`
2. Reference in markdown:
```markdown
![Description](assets/images/my-image.jpg)
```

---

## Updating Navigation

Edit `build.js` to add your new page to the navigation:

```javascript
// In the nav section, add your page:
const pages = [
  { title: 'Home', url: '/' },
  { title: 'Your New Page', url: '/your-new-page.html' },
];
```

---

## Troubleshooting

**Page not appearing?**
- Make sure file is in `src/` folder
- Re-run `node build.js`
- Check browser cache (Ctrl+Shift+Delete)

**Markdown not formatting correctly?**
- Check your markdown syntax
- Make sure front matter is between `---` lines
- No special characters in filenames (use lowercase + hyphens)

**Questions?** Refer to [CommonMark markdown guide](https://commonmark.org/)
