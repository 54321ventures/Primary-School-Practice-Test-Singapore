#!/usr/bin/env node
// Bundles index.html, the stylesheet and every script into one self-contained page
// (dist/p3-practice.html) for publishing as a claude.ai artifact.
// Usage: node tools/build-artifact.js
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const html = read('index.html');

const css = read('css/styles.css');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map((m) => {
  const src = read(m[1]);
  if (/<\/script/i.test(src)) throw new Error(m[1] + ' contains a closing script tag');
  return '<script>/* ' + m[1] + ' */\n' + src + '</script>';
});
const body = html.slice(html.indexOf('<body>') + 6, html.indexOf('<script')).trim();
const fonts = html.match(/<link rel="stylesheet" href="(https:\/\/fonts\.googleapis\.com[^"]+)">/)[1];

// The artifact host adds the doctype, <html>, <head> and <body> itself.
const out = [
  '<title>P3 Practice Papers</title>',
  '<meta name="claude:viewport-fit-sides" content="cover">',
  '<link rel="stylesheet" href="' + fonts + '">',
  '<style>\n' + css + '</style>',
  body,
  ...scripts
].join('\n');

fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/p3-practice.html'), out);
console.log('Wrote dist/p3-practice.html (' + Math.round(out.length / 1024) + ' KB)');
