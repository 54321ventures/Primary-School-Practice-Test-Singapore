#!/usr/bin/env node
// Checks every paper against the Lianhua P3 EOY format and sanity-checks the marking data.
// Usage: node tools/validate.js
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]).filter((s) => s !== 'js/app.js');

const ctx = { window: {}, console };
vm.createContext(ctx);
for (const s of scripts) vm.runInContext(fs.readFileSync(path.join(root, s), 'utf8'), ctx, { filename: s });
const P3 = ctx.window.P3;

// Expected formats: [section id, question type, count of questions, marks]
const FORMATS = {
  maths: { duration: 80, total: 50, sections: [['A', 'mcq', 12], ['B', 'short', 12], ['C', 'steps', 4]] },
  science: { duration: 60, total: 50, sections: [['A', 'mcq', 15], ['B', 'open', 6]] },
  english: { duration: 75, total: 50, sections: [['A', 'mcq'], ['B', 'mcq'], ['C', 'cloze'], ['D', 'editing'], ['E', 'rewrite'], ['F']] }
};

let errors = 0;
const fail = (msg) => { errors++; console.error('  ✗ ' + msg); };

function questionMarks(q) {
  switch (q.type) {
    case 'mcq': case 'short': case 'rewrite': case 'tf': return q.marks;
    case 'steps': return q.parts.reduce((t, p) => t + p.steps.reduce((u, s) => u + s.marks, 0), 0);
    case 'open': return q.parts.reduce((t, p) => t + p.marks, 0);
    case 'cloze': return q.blanks.length;
    case 'editing': return q.items.length;
    default: return NaN;
  }
}

for (const id of P3.paperOrder) {
  const p = P3.papers[id];
  console.log(`${id}`);
  const fmt = FORMATS[p.subject];
  if (p.durationMin !== fmt.duration) fail(`duration ${p.durationMin} min, expected ${fmt.duration}`);
  const ids = new Set();
  let total = 0;
  p.sections.forEach((sec, i) => {
    const [sid, type, count] = fmt.sections[i] || [];
    if (sec.id !== sid) fail(`section ${i} id ${sec.id}, expected ${sid}`);
    if (count && sec.questions.length !== count) fail(`section ${sec.id} has ${sec.questions.length} questions, expected ${count}`);
    let secMarks = 0;
    for (const q of sec.questions) {
      if (ids.has(q.id)) fail(`duplicate id ${q.id}`);
      ids.add(q.id);
      if (type && q.type !== type) fail(`${q.id} is ${q.type}, expected ${type}`);
      const m = questionMarks(q);
      if (!(m > 0)) fail(`${q.id} has no marks`);
      secMarks += m;
      if (q.type === 'mcq' && !(q.answer >= 0 && q.answer < q.options.length)) fail(`${q.id} answer index out of range`);
      if (q.type === 'mcq' && q.options.length !== 4) fail(`${q.id} should have 4 options`);
      if (q.type === 'short' && !P3.checkShort(q.check || 'number', q.answers[0], q.answers)) fail(`${q.id} first answer does not pass its own check`);
      if (q.type === 'steps') q.parts.forEach((pt) => pt.steps.forEach((s) => {
        if (!P3.checkShort(s.check || 'number', s.answers[0], s.answers)) fail(`${q.id}.${pt.id}.${s.id} answer fails its check`);
      }));
      if (q.type === 'open') q.parts.forEach((pt) => { if (!/<mark>/.test(pt.model)) fail(`${q.id}.${pt.id} model answer has no highlighted keywords`); });
      if (q.type === 'cloze') {
        q.blanks.forEach((b) => {
          if (!q.wordBank.includes(b.answer)) fail(`cloze ${b.n} answer "${b.answer}" not in word bank`);
          if (!q.passage.includes('{' + b.n + '}')) fail(`cloze ${b.n} missing from passage`);
        });
        const used = q.blanks.map((b) => b.answer);
        if (new Set(used).size !== used.length) fail('cloze answers repeat a word');
      }
      if (q.type === 'editing') q.items.forEach((b) => { if (!q.passage.includes('[' + b.n + ':')) fail(`editing ${b.n} missing from passage`); });
      if (q.type === 'tf') q.items.forEach((it) => { if (!['T', 'F'].includes(it.answer)) fail(`${q.id}.${it.id} answer must be T or F`); });
    }
    console.log(`  Section ${sec.id}: ${sec.questions.length} question(s), ${secMarks} marks`);
    total += secMarks;
  });
  if (total !== p.totalMarks || total !== fmt.total) fail(`total marks ${total}, expected ${fmt.total}`);
  else console.log(`  Total: ${total} marks ✓`);
}

for (const id of P3.compositionOrder) {
  const c = P3.compositions[id];
  console.log(id);
  if (c.durationMin !== 50) fail('composition should be 50 minutes');
  if (c.totalMarks !== 20) fail('composition should be 20 marks');
  if (c.panels.length !== 3) fail('composition should have 3 pictures');
  if (!c.helpingWords.length || !c.checklist.length) fail('composition needs helping words and a checklist');
  console.log(`  ${c.panels.length} pictures, ${c.helpingWords.length} helping words ✓`);
}

// Normaliser spot checks
const checks = [
  ['number', '2 632', ['2632'], true], ['number', '$27.75', ['27.75'], true], ['number', '45 m²', ['45'], true],
  ['number', '505 cents', ['505'], true], ['number', '3,045', ['3045'], true], ['number', '30m', ['30'], true],
  ['number', 'abc', ['1'], false], ['number', '', ['0'], false], ['fraction', ' 5 / 8 ', ['5/8'], true],
  ['line', 'DC', ['CD'], true], ['line', 'line cd', ['CD'], true], ['line', 'AD', ['CD'], false],
  ['text', 'Six thousand and forty.', ['six thousand and forty'], true]
];
for (const [type, input, answers, expected] of checks) {
  if (P3.checkShort(type, input, answers) !== expected) fail(`checkShort(${type}, ${JSON.stringify(input)}) should be ${expected}`);
}

if (errors) { console.error(`\n${errors} problem(s) found.`); process.exit(1); }
console.log('\nAll papers match the Lianhua P3 EOY format. ✓');
