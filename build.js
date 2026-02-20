#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configure marked for better output
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Helper: Parse front matter (YAML) from markdown
function parseFrontMatter(content) {
  const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return { metadata: {}, content: content };
  }
  
  const metadata = {};
  const frontMatter = match[1];
  const bodyContent = match[2];
  
  // Parse YAML-like front matter
  frontMatter.split(/\r?\n/).forEach(line => {
    if (line.trim()) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > -1) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
        metadata[key] = value;
      }
    }
  });
  
  return { metadata, content: bodyContent };
}

// Helper: Generate page template
function generateHTML(metadata, htmlContent) {
  const title = metadata.title || 'Page';
  const description = metadata.description || '';
  const canonicalUrl = `https://Atharva-Attarde.github.io/${metadata.slug || ''}`;
  const date = metadata.date || new Date().toISOString().split('T')[0];
  
  return `<!DOCTYPE html><html lang="en-gb"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} - Atharva's Blog</title><meta name="description" content="${description}"><meta name="generator" content="Publii Open-Source CMS for Static Site"><link rel="canonical" href="${canonicalUrl}"><link rel="alternate" type="application/atom+xml" href="https://Atharva-Attarde.github.io/feed.xml" title="Atharva's Blog - RSS"><link rel="alternate" type="application/json" href="https://Atharva-Attarde.github.io/feed.json" title="Atharva's Blog - JSON"><meta property="og:title" content="${title}"><meta property="og:site_name" content="Atharva's Blog"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonicalUrl}"><meta property="og:type" content="article"><meta name="twitter:card" content="summary"><meta name="twitter:site" content="@AtharvaAttarde"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><link rel="stylesheet" href="https://Atharva-Attarde.github.io/assets/css/style.css?v=fafdaaaf21e0ae9678e49280e0b8d62b"><noscript><style>img[loading] {opacity: 1;}</style></noscript></head><body class="page-template"><header class="top js-header"><a class="logo" href="https://Atharva-Attarde.github.io/">Atharva's Blog</a><nav class="navbar js-navbar"><button class="navbar__toggle js-toggle" aria-label="Menu" aria-haspopup="true" aria-expanded="false"><span class="navbar__toggle-box"><span class="navbar__toggle-inner">Menu</span></span></button><ul class="navbar__menu"><li><a href="https://Atharva-Attarde.github.io/" target="_self">Home</a></li><li class="active"><a href="https://Atharva-Attarde.github.io/${metadata.slug || ''}.html" target="_self">${title}</a></li></ul></nav><div class="search"><div class="search__overlay js-search-overlay"><div class="wrapper search__overlay-inner"></div></div><button class="search__btn btn--icon js-search-btn" aria-label="Search"><svg height="18" width="18" role="presentation" focusable="false"><use xlink:href="https://Atharva-Attarde.github.io/assets/svg/svg-map.svg#search"/></svg></button></div></header><main class="page"><article class="content"><div class="hero hero--noimage"><header class="hero__content hero__content--centered"><div class="wrapper"><h1>${title}</h1><p>${description}</p></div></header></div><div class="entry-wrapper content__entry">${htmlContent}</div></article></main><footer class="footer"><div class="wrapper"><nav class="footer__nav"><ul><li><a href="https://Atharva-Attarde.github.io/" class="al" target="_self">Home</a></li><li class="active"><a href="https://Atharva-Attarde.github.io/${metadata.slug || ''}.html" class="al" target="_self">${title}</a></li></ul></nav><div class="footer__copyright"><p>© 2025 Atharva Attarde. All rights reserved.</p></div><div class="footer__social"><a href="https://x.com/AtharvaAttarde" aria-label="X"><svg><use xlink:href="https://Atharva-Attarde.github.io/assets/svg/svg-map.svg#twitter"/></svg> </a><a href="www.linkedin.com/in/atharva-attarde-769728219" aria-label="LinkedIn"><svg><use xlink:href="https://Atharva-Attarde.github.io/assets/svg/svg-map.svg#linkedin"/></svg></a></div><button id="backToTop" class="footer__bttop" aria-label="Back to top" title="Back to top"><svg width="20" height="20"><use xlink:href="https://Atharva-Attarde.github.io/assets/svg/svg-map.svg#toparrow"/></svg></button></div></footer><script defer="defer" src="https://Atharva-Attarde.github.io/assets/js/scripts.min.js?v=700105c316933a8202041b6415abb233"></script><script>window.publiiThemeMenuConfig={mobileMenuMode:'sidebar',animationSpeed:300,submenuWidth: 'auto',doubleClickTime:500,mobileMenuExpandableSubmenus:true,relatedContainerForOverlayMenuSelector:'.top'};</script><script>var images = document.querySelectorAll('img[loading]');for (var i = 0; i < images.length; i++) {if (images[i].complete) {images[i].classList.add('is-loaded');} else {images[i].addEventListener('load', function () {this.classList.add('is-loaded');}, false);}}}</script></body></html>`;
}

// Main build function
function build() {
  const srcDir = path.join(__dirname, 'src');
  const outDir = __dirname;
  
  // Ensure src directory exists
  if (!fs.existsSync(srcDir)) {
    console.log('✓ No src/ folder found. Create one and add .md files to begin.');
    return;
  }
  
  // Get all markdown files
  const mdFiles = fs.readdirSync(srcDir)
    .filter(file => file.endsWith('.md'))
    .sort();
  
  if (mdFiles.length === 0) {
    console.log('✓ No markdown files in src/ yet. Add some to get started!');
    return;
  }
  
  console.log(`📝 Found ${mdFiles.length} markdown file(s). Processing...\n`);
  
  mdFiles.forEach(file => {
    const filePath = path.join(srcDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { metadata, content } = parseFrontMatter(fileContent);
    
    // Set slug from filename if not in metadata
    if (!metadata.slug) {
      metadata.slug = file.replace('.md', '').toLowerCase();
    }
    
    // Convert markdown to HTML
    const htmlContent = marked(content);
    const fullHTML = generateHTML(metadata, htmlContent);
    
    // Write output file
    const outputFile = path.join(outDir, `${metadata.slug}.html`);
    fs.writeFileSync(outputFile, fullHTML);
    
    console.log(`✓ Generated: ${metadata.slug}.html (${metadata.title})`);
  });
  
  console.log('\n✨ Build complete!');
}

// Run build
build();
