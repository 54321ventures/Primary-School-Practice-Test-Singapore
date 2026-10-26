# P3 Practice Papers (Lianhua Primary School EOY format, 2026)

Timed, self-contained practice papers for a Primary 3 pupil, laid out like the
Lianhua Primary School P3 End-of-Year Exam. It's plain HTML, CSS and JavaScript:
no build step, no server and no account. Open `index.html` and start.

## What's inside

| Paper | Time | Marks | Format | Marking |
|---|---|---|---|---|
| **Mathematics** (Practice Papers 1 & 2) | 1 h 20 min | 50 | A: 12 MCQ (2 m each) · B: 12 short-answer (1 m) · C: 4 structured (3–4 m) | Automatic. Section C gives marks for each correct step, and a correct final answer earns the whole part |
| **Science** (Practice Paper 1) | 1 h | 50 | A: 15 MCQ (2 m) · B: 6 structured questions (20 m) | MCQ automatic. Section B is self-marked against model answers with **highlighted keywords** |
| **English Paper 2** (Practice Papers 1 & 2) | 1 h 15 min | 50 | Grammar MCQ (10) · Vocabulary MCQ (5) · Grammar cloze (10) · Editing for spelling (6) · Synthesis & transformation (8) · Comprehension (11) | Automatic, except comprehension and any synthesis answer that doesn't match a model answer, which are self-marked |
| **English Paper 1: Composition** (3 prompts) | 50 min | 20 | 3-picture prompt, helping words, planning checklist, planning notes | **Not auto-marked.** Saved for the parent to mark (Content /10, Language /10, plus comments) |
| **华文 Chinese Paper 2** (Practice Paper 1) | 1 h | 50 | 语文应用 MCQ (10 × 2 m) · 短文填空 (5 × 2 m) · 完成对话 (3 × 2 m) · 阅读理解一 MCQ (3 × 2 m) · 阅读理解二 open-ended (4 × 2 m) | MCQ and cloze automatic. 阅读理解二 is self-marked against model answers with keywords |
| **华文 Chinese Paper 1: 看图作文** (1 prompt) | 50 min | 20 | 4 pictures, 提示词语, 写作检查表, planning notes; counted in characters (字), 150+ | **Not auto-marked.** Saved for the parent to mark |

The brief gave no Chinese format, so the Chinese papers follow a typical
Singapore P3 school paper. If Lianhua's own paper differs, change the
`chinese` entry in `tools/validate.js` and the paper file to match. The Chinese
oral and listening components aren't included.

Topics follow Primary Mathematics 3A/3B and the P3 Science syllabus: numbers to
10 000, the four operations, money, the 6/7/8/9 times tables, bar models, bar
graphs, angles, parallel and perpendicular lines, fractions, length/mass/volume,
area and perimeter, and time; living and non-living things, classifying living
things (plants, animals, fungi, bacteria), materials, life cycles, magnets, and
plant parts.

### How a paper works

1. Pick a paper and press **Start**. The countdown runs in the sticky bar, with
   warnings at 10 and 5 minutes. When time runs out, the paper is handed in
   automatically.
2. Answers save as he types. If the page is closed, the timer pauses, and he can
   carry on later from the same point.
3. After submitting he gets the auto-marked score. Science, comprehension and
   unmatched synthesis answers go to a **self-marking** screen: his answer sits
   next to the model answer, he picks 0, 1 or 2 marks, and then he sees the full
   review with the model working.

### Parent dashboard

Open it from the top bar (`#/parent`). It has:

- Per-subject summary: number of attempts, latest, best and average score, and a mini trend chart
- **Compositions to review**: the full text, his planning notes and ticked checklist, which helping words he used, a marking guide, and boxes for marks and comments. He sees your marks and comments on his home page afterwards.
- Every attempt, with his answers next to the correct ones. You can **change any self-marked score** (they're flagged "adjusted") and leave a note.
- Settings: an optional **parent PIN**, **Export / Import** of all data as JSON, and *Delete all data*.

> Through the claude.ai link, work is saved to the claude.ai account. When
> `index.html` is opened directly, work is stored in that browser's
> `localStorage` only. Use **Export** to keep a backup or to move the data.

## Running it

- **On an iPad or phone (easiest):** open the private claude.ai link
  https://claude.ai/artifact/UcM2hEs17qwTa1wf6wvpZz in Safari (signed in to
  claude.ai) or in the Claude app, then use Share → *Add to Home Screen*. Work
  done there is saved to the claude.ai account, so the parent dashboard shows
  the same results on any device that is signed in to that account. To update
  the link after changing a paper, run `node tools/build-artifact.js` and
  republish `dist/p3-practice.html` to the same URL.
- **Locally:** double-click `index.html`. It works offline from `file://`. The
  Nunito font is the only online resource, and the page falls back to the system
  font without it.
- **Hosted:** switch on GitHub Pages for this repository (Settings → Pages →
  deploy from branch, root folder). The papers are then at
  `https://<user>.github.io/<repo>/`.

## Adding more papers

Each paper is one file in `js/papers/` that calls `P3.registerPaper({...})`.
Add a `<script>` tag for it in `index.html`. Question types:

| Type | Use | Key fields |
|---|---|---|
| `mcq` | Any multiple-choice question | `options` (4), `answer` (0-based index), `marks` |
| `short` | Typed answer | `answers` (accepted list), `check`: `number` · `text` · `fraction` · `line` · `duration` (answer in minutes), optional `unit` / `prefix` |
| `steps` | Maths structured question | `parts[].steps[]`, each with `label`, `answers`, `marks`; plus `solution` |
| `open` | Self-marked written answer | `parts[]`, each with `prompt`, `marks`, and `model` (wrap keywords in `<mark>`), optional `tip` |
| `rewrite` | Synthesis/transformation | `answers` (auto-accepted), `model`, `instruction` |
| `cloze` | Grammar cloze with word box | `wordBank`, `passage` with `{16}` blanks, `blanks[]`, optional `marksEach` (default 1) |
| `editing` | Spelling editing | `passage` with `[26:feild]` tokens, `items[]` |
| `tf` | True/False table | `items[]` with `answer: 'T' \| 'F'` |

Diagrams are SVG helpers in `js/figures.js`. Composition prompts live in
`js/compositions/prompts.js`.

Before you commit, run the format checker:

```sh
node tools/validate.js
```

It checks section counts, question types, durations and 50-mark totals against
the Lianhua format. It also checks that every answer passes its own marker, that
every cloze answer is in the word box, and that every model answer has
highlighted keywords.
