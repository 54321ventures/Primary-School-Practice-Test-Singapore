(function () {
  'use strict';
  var P3 = window.P3, esc = P3.esc;
  var app = document.getElementById('app');
  var STORE_KEY = 'lianhuaP3.v1';
  var DRAFT_KEY = 'lianhuaP3.draft.';
  var UNLOCK_KEY = 'lianhuaP3.parentUnlocked';
  var SUBJECT_ICONS = { maths: '➗', science: '🔬', english: '📖', composition: '✏️' };

  // ================================================================ Storage
  // localStorage, with an in-memory fallback so the app still works in private mode.
  var mem = {};
  var warnedStorage = false;
  function readRaw(k) {
    try { var v = localStorage.getItem(k); if (v != null) return v; } catch (e) { /* blocked */ }
    return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null;
  }
  function getJSON(k, fallback) {
    var raw = readRaw(k);
    if (raw == null) return fallback;
    try { return JSON.parse(raw); } catch (e) { return fallback; }
  }
  function setJSON(k, v) {
    var s = JSON.stringify(v);
    mem[k] = s;
    try { localStorage.setItem(k, s); } catch (e) {
      if (!warnedStorage) { warnedStorage = true; toast('Warning: this browser is not saving work permanently. Use Export in the parent dashboard before closing.', 'warn', 8000); }
    }
  }
  function del(k) { delete mem[k]; try { localStorage.removeItem(k); } catch (e) { /* ignore */ } }

  function store() {
    var s = getJSON(STORE_KEY, null);
    if (!s || !Array.isArray(s.attempts)) s = { attempts: [], settings: {} };
    if (!s.settings) s.settings = {};
    return s;
  }
  function saveStore(s) { setJSON(STORE_KEY, s); }
  function getAttempt(id) { return store().attempts.filter(function (a) { return a.id === id; })[0]; }
  function saveAttempt(a) {
    var s = store(), i = s.attempts.findIndex(function (x) { return x.id === a.id; });
    if (i >= 0) s.attempts[i] = a; else s.attempts.push(a);
    saveStore(s);
  }

  // ================================================================ Helpers
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function fmtClock(sec) { return pad(Math.floor(sec / 60)) + ':' + pad(sec % 60); }
  function fmtDuration(sec) {
    sec = Math.max(0, Math.round(sec || 0));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m ? m + ' min' + (s ? ' ' + s + ' s' : '') : s + ' s';
  }
  function fmtDate(iso) {
    if (!iso) return '';
    var d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' +
      d.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true });
  }
  function wordCount(t) { var m = String(t || '').trim().match(/\S+/g); return m ? m.length : 0; }
  function isBlank(v) { return v == null || String(v).trim() === ''; }
  function multiline(t) { return esc(t).replace(/\n/g, '<br>'); }

  var toastTimer;
  function toast(msg, kind, ms) {
    var el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'toast show ' + (kind || '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.className = 'toast'; }, ms || 4000);
  }

  var QUOTES = [
    ['It always seems impossible until it is done.', 'Nelson Mandela'],
    ['The more that you read, the more things you will know.', 'Dr Seuss'],
    ['You\'re braver than you believe, stronger than you seem, and smarter than you think.', 'A. A. Milne'],
    ['Mistakes are proof that you are trying.', 'Anonymous'],
    ['A person who never made a mistake never tried anything new.', 'Albert Einstein'],
    ['Little by little, one travels far.', 'J. R. R. Tolkien']
  ];
  function quote() {
    var q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    return '<blockquote class="quote">“' + esc(q[0]) + '”<cite>— ' + esc(q[1]) + '</cite></blockquote>';
  }

  // ================================================================ Timer
  var timer = null;
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
  function startTimer(el, remaining, onTick, onExpire) {
    stopTimer();
    var rem = remaining, last = Date.now();
    var warned = { 600: rem <= 600, 300: rem <= 300 };
    function render() {
      el.textContent = fmtClock(rem);
      el.classList.toggle('low', rem <= 300);
    }
    render();
    if (rem <= 0) { onExpire(); return; }
    timer = setInterval(function () {
      var d = Math.floor((Date.now() - last) / 1000);
      if (d < 1) return;
      last += d * 1000;
      rem = Math.max(0, rem - d);
      render();
      onTick(rem);
      [600, 300].forEach(function (t) {
        if (!warned[t] && rem <= t) { warned[t] = true; toast((t / 60) + ' minutes left — time to check your answers!', 'warn'); }
      });
      if (rem <= 0) { stopTimer(); onExpire(); }
    }, 250);
  }

  // ================================================================ Marking engine
  // A "unit" is the smallest thing that earns marks (one MCQ, one step-part, one cloze blank …).
  function units(paper) {
    var out = [];
    paper.sections.forEach(function (sec) {
      sec.questions.forEach(function (q) {
        function add(key, marks, mode, extra) {
          var u = { key: key, sec: sec.id, marks: marks, mode: mode, q: q };
          for (var k in extra) u[k] = extra[k];
          out.push(u);
        }
        switch (q.type) {
          case 'mcq': case 'short': add(q.id, q.marks, 'auto'); break;
          case 'rewrite': add(q.id, q.marks, 'rewrite'); break;
          case 'steps':
            q.parts.forEach(function (p) {
              add(q.id + '.' + p.id, p.steps.reduce(function (t, s) { return t + s.marks; }, 0), 'auto', { part: p });
            });
            break;
          case 'open': q.parts.forEach(function (p) { add(q.id + '.' + p.id, p.marks, 'self', { part: p }); }); break;
          case 'cloze': q.blanks.forEach(function (b) { add(q.id + '.' + b.n, 1, 'auto', { blank: b }); }); break;
          case 'editing': q.items.forEach(function (b) { add(q.id + '.' + b.n, 1, 'auto', { blank: b }); }); break;
          case 'tf': q.items.forEach(function (it) { add(q.id + '.' + it.id, q.marks / q.items.length, 'auto', { item: it }); }); break;
        }
      });
    });
    return out;
  }

  function stepCorrect(q, part, step, A) {
    return P3.checkShort(step.check || 'number', A[q.id + '.' + part.id + '.' + step.id], step.answers);
  }

  // Returns marks for an auto-marked unit.
  function autoMark(u, A) {
    var q = u.q;
    switch (q.type) {
      case 'mcq': return String(A[q.id]) === String(q.answer) ? u.marks : 0;
      case 'short': return P3.checkShort(q.check || 'number', A[q.id], q.answers) ? u.marks : 0;
      case 'steps': {
        var steps = u.part.steps, last = steps[steps.length - 1];
        // A correct final answer earns the whole part; otherwise each correct step earns its own marks.
        if (stepCorrect(q, u.part, last, A)) return u.marks;
        return steps.reduce(function (t, s) { return t + (stepCorrect(q, u.part, s, A) ? s.marks : 0); }, 0);
      }
      case 'cloze': return P3.norm.text(A[u.key]) === P3.norm.text(u.blank.answer) ? 1 : 0;
      case 'editing': return P3.norm.compact(A[u.key]) === P3.norm.compact(u.blank.answer) ? 1 : 0;
      case 'tf': return A[u.key] === u.item.answer ? u.marks : 0;
    }
    return 0;
  }

  function rewriteMatches(q, ans) {
    return !isBlank(ans) && q.answers.some(function (a) { return P3.norm.text(a) === P3.norm.text(ans); });
  }

  function totals(paper, attempt) {
    var secs = {}, total = 0;
    paper.sections.forEach(function (s) { secs[s.id] = { got: 0, max: 0 }; });
    units(paper).forEach(function (u) {
      var m = attempt.marks[u.key] || 0;
      secs[u.sec].got += m; secs[u.sec].max += u.marks; total += m;
    });
    return { total: total, sections: secs };
  }

  function answerableKeys(paper) {
    var keys = [];
    units(paper).forEach(function (u) {
      if (u.q.type === 'steps') u.part.steps.forEach(function (s) { keys.push(u.key + '.' + s.id); });
      else keys.push(u.key);
    });
    return keys;
  }

  // ================================================================ Rendering: questions (exam mode)
  function val(A, k) { return A[k] == null ? '' : A[k]; }
  function marksTag(m) { return '<span class="qmarks">[' + m + ']</span>'; }
  function figure(html) { return html ? '<div class="figure">' + html + '</div>' : ''; }

  function ansInput(key, A, o) {
    o = o || {};
    var mode = o.check === 'number' ? 'decimal' : 'text';
    return '<div class="ans-line"><span class="ans-label">' + (o.label || 'Ans:') + '</span>' +
      (o.prefix ? '<span class="affix">' + esc(o.prefix) + '</span>' : '') +
      '<input class="ans" type="text" autocomplete="off" spellcheck="false" inputmode="' + mode + '" data-key="' + key +
      '" value="' + esc(val(A, key)) + '" aria-label="Answer">' +
      (o.unit ? '<span class="affix">' + esc(o.unit) + '</span>' : '') + '</div>';
  }

  function textArea(key, A, rows, placeholder) {
    return '<textarea class="ans-area" rows="' + (rows || 2) + '" data-key="' + key + '" placeholder="' + esc(placeholder || '') + '">' +
      esc(val(A, key)) + '</textarea>';
  }

  function renderQuestion(q, A) {
    var h = '';
    switch (q.type) {
      case 'mcq':
        h += '<div class="qtext">' + q.prompt + '</div>' + figure(q.figure);
        h += '<div class="options ' + (q.optionLayout === 'grid' ? 'options-grid' : '') + '">';
        q.options.forEach(function (opt, i) {
          h += '<label class="opt"><input type="radio" name="' + q.id + '" data-key="' + q.id + '" value="' + i + '"' +
            (String(A[q.id]) === String(i) ? ' checked' : '') + '><span class="optnum">(' + (i + 1) + ')</span><span class="opttext">' + opt + '</span></label>';
        });
        h += '</div>';
        return qWrap(q, h, q.marks);
      case 'short':
        h += '<div class="qtext">' + q.prompt + '</div>' + figure(q.figure) + ansInput(q.id, A, q);
        return qWrap(q, h, q.marks);
      case 'steps': {
        var total = 0;
        h += '<div class="qtext">' + q.prompt + '</div>' + figure(q.figure);
        h += '<label class="working-label">Working</label>' + textArea(q.id + '.working', A, 4, 'Show your working here (number sentences, a model drawing in words …)');
        q.parts.forEach(function (p) {
          h += '<div class="part">' + (p.label || p.prompt ? '<div class="part-q"><b>' + p.label + '</b> ' + (p.prompt || '') + '</div>' : '');
          p.steps.forEach(function (s) {
            total += s.marks;
            h += '<div class="step">' + ansInput(q.id + '.' + p.id + '.' + s.id, A, { label: s.label, prefix: s.prefix, unit: s.unit, check: s.check || 'number' }) +
              '<span class="step-marks">' + s.marks + ' m</span></div>';
          });
          h += '</div>';
        });
        return qWrap(q, h, total);
      }
      case 'open': {
        var t = 0;
        if (q.prompt) h += '<div class="qtext">' + q.prompt + '</div>';
        h += figure(q.figure);
        q.parts.forEach(function (p) {
          t += p.marks;
          h += '<div class="part"><div class="part-q">' + (p.label ? '<b>' + p.label + '</b> ' : '') + p.prompt +
            ' <span class="part-marks">[' + p.marks + ']</span></div>' + textArea(q.id + '.' + p.id, A, p.lines || 2) + '</div>';
        });
        return qWrap(q, h, t);
      }
      case 'rewrite':
        h += '<div class="qtext rewrite-src">' + esc(q.prompt) + '</div><div class="rewrite-ins">' + q.instruction + '</div>' + textArea(q.id, A, 2);
        return qWrap(q, h, q.marks);
      case 'tf':
        h += '<div class="qtext">' + q.prompt + '</div><table class="tf-table"><thead><tr><th>Statement</th><th>True</th><th>False</th></tr></thead><tbody>';
        q.items.forEach(function (it) {
          var k = q.id + '.' + it.id;
          h += '<tr><td>(' + it.id + ') ' + esc(it.statement) + '</td>' +
            ['T', 'F'].map(function (v) {
              return '<td class="tf-cell"><input type="radio" name="' + k + '" data-key="' + k + '" value="' + v + '"' + (A[k] === v ? ' checked' : '') +
                ' aria-label="' + (v === 'T' ? 'True' : 'False') + '"></td>';
            }).join('') + '</tr>';
        });
        h += '</tbody></table>';
        return qWrap(q, h, q.marks);
      case 'cloze': {
        h += '<div class="word-bank">' + q.wordBank.map(function (w, i) {
          return '<span class="wb-word"><b>' + String.fromCharCode(65 + i) + '</b> ' + esc(w) + '</span>';
        }).join('') + '</div>';
        var opts = q.wordBank.map(function (w, i) { return { v: w, t: String.fromCharCode(65 + i) + '  ' + w }; });
        h += '<div class="passage cloze">' + clozeHtml(q.passage, function (n) {
          var k = q.id + '.' + n;
          return '<span class="blank"><b>(' + n + ')</b><select data-key="' + k + '" aria-label="Blank ' + n + '"><option value="">——</option>' +
            opts.map(function (o) { return '<option value="' + esc(o.v) + '"' + (A[k] === o.v ? ' selected' : '') + '>' + esc(o.t) + '</option>'; }).join('') +
            '</select></span>';
        }) + '</div>';
        return qWrap(q, h, q.blanks.length, true);
      }
      case 'editing': {
        h += '<div class="passage editing">' + editingHtml(q.passage) + '</div><div class="edit-grid">';
        q.items.forEach(function (it) {
          var k = q.id + '.' + it.n;
          h += '<label class="edit-cell"><span>(' + it.n + ')</span><input class="ans" type="text" autocomplete="off" spellcheck="false" autocapitalize="off" data-key="' + k +
            '" value="' + esc(val(A, k)) + '"></label>';
        });
        h += '</div>';
        return qWrap(q, h, q.items.length, true);
      }
    }
    return '';
  }

  function clozeHtml(passage, blankFn) {
    return passage.split('\n\n').map(function (para) {
      return '<p>' + esc(para).replace(/\{(\d+)\}/g, function (_, n) { return blankFn(+n); }) + '</p>';
    }).join('');
  }
  function editingHtml(passage) {
    return '<p>' + esc(passage).replace(/\[(\d+):([^\]]+)\]/g, function (_, n, w) {
      return '<span class="misspelt"><u>' + w + '</u><sup>(' + n + ')</sup></span>';
    }) + '</p>';
  }

  function qWrap(q, inner, marks, wide) {
    return '<div class="q' + (wide ? ' q-wide' : '') + '" id="q-' + q.id + '"><div class="qnum">' + q.num + '</div><div class="qbody">' + inner +
      '</div>' + marksTag(marks) + '</div>';
  }

  function renderPassage(p) {
    return '<div class="reading"><h3>' + esc(p.title) + '</h3>' + p.paragraphs.map(function (t, i) {
      return '<p><span class="para-no">' + (i + 1) + '</span>' + esc(t) + '</p>';
    }).join('') + '</div>';
  }

  function renderSection(sec, A) {
    var h = '<section class="paper-section" id="sec-' + sec.id + '"><header class="sec-head"><h2>' + esc(sec.title) +
      (sec.subtitle ? ' <span class="sec-sub">' + esc(sec.subtitle) + '</span>' : '') + '</h2>' +
      '<p class="sec-marks">' + esc(sec.marksNote || '') + '</p><p class="sec-ins">' + esc(sec.instructions || '') + '</p></header>';
    if (sec.passage) h += renderPassage(sec.passage);
    sec.questions.forEach(function (q) { h += renderQuestion(q, A); });
    return h + '</section>';
  }

  // ================================================================ Views
  function setTitle(t) { document.title = t ? t + ' · P3 Practice' : 'P3 Practice Papers'; }

  function viewHome() {
    setTitle('');
    var s = store();
    var h = '<section class="hero"><h1>Hello, P3 champion! 👋</h1><p>Practise for the <strong>End-of-Year Exam</strong> with papers in the Lianhua Primary School P3 format. Pick a paper, keep an eye on the timer and do your best!</p></section>';
    h += '<div class="cards">';
    P3.paperOrder.forEach(function (id) {
      var p = P3.papers[id];
      var mine = s.attempts.filter(function (a) { return a.paperId === id && a.status === 'complete'; });
      var best = mine.reduce(function (b, a) { return Math.max(b, a.score); }, -1);
      var draft = getJSON(DRAFT_KEY + id, null);
      h += '<article class="card card-' + p.subject + '"><div class="card-icon">' + SUBJECT_ICONS[p.subject] + '</div><h2>' + esc(p.subjectName) + '</h2>' +
        '<p class="card-title">' + esc(p.title.split('·')[1] || p.title) + '</p>' +
        '<ul class="card-meta"><li>⏱ ' + fmtDuration(p.durationMin * 60) + '</li><li>📝 ' + p.totalMarks + ' marks</li></ul>' +
        '<p class="card-format">' + p.sections.map(function (sec) { return esc(sec.title + (sec.subtitle ? ' – ' + sec.subtitle : '')); }).join('<br>') + '</p>' +
        (best >= 0 ? '<p class="best">Best score: <strong>' + best + ' / ' + p.totalMarks + '</strong></p>' : '') +
        '<a class="btn" href="#/paper/' + id + '">' + (draft ? 'Continue paper ▶' : 'Start paper') + '</a></article>';
    });
    P3.compositionOrder.forEach(function (id) {
      var c = P3.compositions[id];
      var draft = getJSON(DRAFT_KEY + id, null);
      h += '<article class="card card-composition"><div class="card-icon">' + SUBJECT_ICONS.composition + '</div><h2>English Paper 1</h2>' +
        '<p class="card-title">Composition: ' + esc(c.title) + '</p>' +
        '<ul class="card-meta"><li>⏱ ' + c.durationMin + ' min</li><li>📝 ' + c.totalMarks + ' marks</li></ul>' +
        '<p class="card-format">3 pictures with helping words<br>Planning checklist<br>Your parent will mark this</p>' +
        '<a class="btn" href="#/write/' + id + '">' + (draft ? 'Continue writing ▶' : 'Start writing') + '</a></article>';
    });
    h += '</div>';
    var recent = s.attempts.slice().sort(function (a, b) { return b.submittedAt < a.submittedAt ? -1 : 1; }).slice(0, 5);
    if (recent.length) {
      h += '<section class="panel"><h2>My recent work</h2><ul class="recent">' + recent.map(function (a) {
        var link = a.status === 'self-marking' ? '#/mark/' + a.id : '#/result/' + a.id;
        var status = a.kind === 'composition' ? (a.status === 'reviewed' ? 'Marked by parent: ' + compScore(a) + ' / 20' : 'Waiting for parent to mark')
          : a.status === 'self-marking' ? '<strong>Finish marking ▶</strong>' : a.score + ' / ' + a.totalMarks;
        return '<li><a href="' + link + '"><span>' + (SUBJECT_ICONS[a.kind === 'composition' ? 'composition' : a.subject] || '') + ' ' + esc(a.title) + '</span><span class="muted">' + fmtDate(a.submittedAt) + '</span><span>' + status + '</span></a></li>';
      }).join('') + '</ul></section>';
    }
    app.innerHTML = h;
  }

  function viewPaperIntro(id) {
    var p = P3.papers[id];
    if (!p) return viewNotFound();
    setTitle(p.title);
    var draft = getJSON(DRAFT_KEY + id, null);
    var h = '<section class="panel intro"><p class="crumb"><a href="#/">← Home</a></p><h1>' + SUBJECT_ICONS[p.subject] + ' ' + esc(p.title) + '</h1>' +
      '<div class="intro-facts"><div><b>' + fmtDuration(p.durationMin * 60) + '</b><span>Time allowed</span></div><div><b>' + p.totalMarks + '</b><span>Total marks</span></div>' +
      '<div><b>' + units(p).length + '</b><span>Things to answer</span></div></div>' +
      '<table class="data-table"><thead><tr><th>Section</th><th>Format</th><th>Marks</th></tr></thead><tbody>' +
      p.sections.map(function (s) {
        var max = units(p).filter(function (u) { return u.sec === s.id; }).reduce(function (t, u) { return t + u.marks; }, 0);
        return '<tr><td>' + esc(s.title) + '</td><td>' + esc(s.subtitle || '') + '</td><td>' + max + '</td></tr>';
      }).join('') + '</tbody></table>' +
      '<h3>Instructions</h3><ol>' + p.instructions.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') +
      '<li>The timer starts when you press Start. If you leave the page, the timer pauses and your answers are saved.</li><li>When time is up, the paper is handed in automatically.</li></ol>';
    if (draft) {
      h += '<div class="btn-row"><a class="btn" href="#/exam/' + id + '">Continue (' + fmtClock(draft.remaining) + ' left)</a>' +
        '<button class="btn btn-ghost" id="restart">Start again from the beginning</button></div>';
    } else {
      h += '<div class="btn-row"><a class="btn btn-big" href="#/exam/' + id + '">Start the paper ▶</a></div>';
    }
    h += '</section>';
    app.innerHTML = h;
    var r = document.getElementById('restart');
    if (r) r.onclick = function () {
      if (confirm('Throw away your saved answers and start again?')) { del(DRAFT_KEY + id); location.hash = '#/exam/' + id; }
    };
  }

  function viewExam(id) {
    var paper = P3.papers[id];
    if (!paper) return viewNotFound();
    setTitle(paper.title);
    var dk = DRAFT_KEY + id;
    var draft = getJSON(dk, null);
    if (!draft) {
      draft = { paperId: id, startedAt: new Date().toISOString(), remaining: paper.durationMin * 60, answers: {} };
      setJSON(dk, draft);
    }
    var keys = answerableKeys(paper);
    var submitted = false;

    var h = '<div class="exam-bar"><div class="exam-title">' + SUBJECT_ICONS[paper.subject] + ' ' + esc(paper.subjectName) + '</div>' +
      '<div class="exam-progress"><span id="prog"></span><div class="progress"><div id="progbar"></div></div></div>' +
      '<div class="timer" id="timer" aria-live="off" title="Time left"></div><button class="btn btn-small" id="submitTop">Submit</button></div>';
    h += '<article class="paper"><header class="paper-head"><h1>' + esc(paper.title) + '</h1><p>Time: ' + fmtDuration(paper.durationMin * 60) +
      ' · Total: ' + paper.totalMarks + ' marks</p></header>';
    paper.sections.forEach(function (s) { h += renderSection(s, draft.answers); });
    h += '<div class="end-paper"><p>— End of paper —</p><p>Check your work before you submit.</p><button class="btn btn-big" id="submitBottom">Submit paper</button></div></article>';
    app.innerHTML = h;

    function save() { setJSON(dk, draft); }
    function progress() {
      var done = keys.filter(function (k) { return !isBlank(draft.answers[k]); }).length;
      document.getElementById('prog').textContent = done + ' / ' + keys.length + ' answered';
      document.getElementById('progbar').style.width = (100 * done / keys.length) + '%';
      return done;
    }
    function onEdit(e) {
      var k = e.target.dataset && e.target.dataset.key;
      if (!k) return;
      if (e.target.type === 'radio' && !e.target.checked) return;
      draft.answers[k] = e.target.value;
      save(); progress();
    }
    var paperEl = app.querySelector('.paper');
    paperEl.addEventListener('input', onEdit);
    paperEl.addEventListener('change', onEdit);
    progress();

    function submit(timedOut) {
      if (submitted) return;
      if (!timedOut) {
        var left = keys.length - progress();
        var msg = left ? 'You have ' + left + ' unanswered item' + (left > 1 ? 's' : '') + '. Submit anyway?' : 'Submit your paper now?';
        if (!confirm(msg)) return;
      }
      submitted = true;
      stopTimer();
      submitPaper(paper, draft, !!timedOut);
    }
    document.getElementById('submitTop').onclick = function () { submit(false); };
    document.getElementById('submitBottom').onclick = function () { submit(false); };
    startTimer(document.getElementById('timer'), draft.remaining, function (rem) { draft.remaining = rem; save(); },
      function () { toast('Time\'s up! Pens down. ✋', 'warn', 6000); submit(true); });
  }

  function submitPaper(paper, draft, timedOut) {
    var A = draft.answers, marks = {};
    units(paper).forEach(function (u) {
      if (u.mode === 'auto') marks[u.key] = autoMark(u, A);
      else if (u.mode === 'rewrite' && rewriteMatches(u.q, A[u.key])) marks[u.key] = u.marks;
      else if (isBlank(A[u.key])) marks[u.key] = 0; // nothing to self-mark
    });
    var autoKeys = Object.keys(marks);
    var attempt = {
      id: uid(), kind: 'paper', paperId: paper.id, subject: paper.subject, title: paper.title,
      startedAt: draft.startedAt, submittedAt: new Date().toISOString(),
      timeLimitSec: paper.durationMin * 60, timeUsedSec: paper.durationMin * 60 - draft.remaining, timedOut: timedOut,
      answers: A, marks: marks, autoKeys: autoKeys, totalMarks: paper.totalMarks, score: 0,
      status: 'complete'
    };
    var needSelf = units(paper).some(function (u) { return !(u.key in marks); });
    if (needSelf) attempt.status = 'self-marking';
    else attempt.score = totals(paper, attempt).total;
    saveAttempt(attempt);
    del(DRAFT_KEY + paper.id);
    location.hash = needSelf ? '#/mark/' + attempt.id : '#/result/' + attempt.id;
  }

  // ---------------------------------------------------------------- Self-marking
  function markButtons(key, max, current) {
    var h = '<div class="mark-btns" role="radiogroup" aria-label="Marks">';
    for (var m = 0; m <= max; m++) {
      h += '<label class="mark-btn"><input type="radio" name="m-' + key + '" data-mark="' + key + '" value="' + m + '"' + (current === m ? ' checked' : '') + '><span>' + m + '</span></label>';
    }
    return h + '</div>';
  }

  function questionContext(u) {
    var q = u.q, h = '<div class="ctx-num">Q' + q.num + (u.part && u.part.label ? ' ' + u.part.label : '') + '</div>';
    if (q.type === 'rewrite') return h + '<div class="qtext">' + esc(q.prompt) + '</div><div class="rewrite-ins">' + q.instruction + '</div>';
    if (q.prompt) h += '<div class="qtext">' + q.prompt + '</div>';
    h += figure(q.figure);
    if (u.part) h += '<div class="part-q">' + u.part.prompt + '</div>';
    return h;
  }

  function viewSelfMark(id) {
    var a = getAttempt(id);
    if (!a) return viewNotFound();
    var paper = P3.papers[a.paperId];
    setTitle('Mark your answers');
    var todo = units(paper).filter(function (u) { return a.autoKeys.indexOf(u.key) < 0; });
    var h = '<section class="panel"><h1>✅ Time to mark your own answers</h1>' +
      '<p>Compare your answer with the model answer. The <mark>highlighted words</mark> are the <strong>keywords</strong> — your answer needs these ideas to get the marks. Be honest — that is how you improve!</p>' +
      '<p class="muted">The other questions have already been marked for you.</p></section>';
    todo.forEach(function (u) {
      var model = u.part ? u.part.model : u.q.model;
      var tip = u.part ? u.part.tip : u.q.tip;
      h += '<article class="mark-card">' + questionContext(u) +
        '<div class="mark-grid"><div><h4>Your answer</h4><div class="your-ans">' + multiline(a.answers[u.key]) + '</div></div>' +
        '<div><h4>Model answer</h4><div class="model-ans">' + model + '</div>' + (tip ? '<p class="tip">💡 ' + tip + '</p>' : '') + '</div></div>' +
        '<div class="mark-row"><span>How many marks did you earn? (out of ' + u.marks + ')</span>' + markButtons(u.key, u.marks, a.marks[u.key]) + '</div></article>';
    });
    h += '<div class="btn-row center"><button class="btn btn-big" id="finish">Finish marking</button></div>';
    app.innerHTML = h;
    app.addEventListener('change', function onMark(e) {
      if (!e.target.dataset || !e.target.dataset.mark) return;
      a.marks[e.target.dataset.mark] = +e.target.value;
      saveAttempt(a);
    });
    document.getElementById('finish').onclick = function () {
      var missing = todo.filter(function (u) { return a.marks[u.key] == null; });
      if (missing.length) {
        toast('Please give marks for every answer (' + missing.length + ' left).', 'warn');
        var first = document.querySelector('[name="m-' + missing[0].key + '"]');
        if (first) first.closest('.mark-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }
      a.selfMarkedKeys = todo.map(function (u) { return u.key; });
      a.status = 'complete';
      a.score = totals(paper, a).total;
      saveAttempt(a);
      location.hash = '#/result/' + a.id;
    };
  }

  // ---------------------------------------------------------------- Review (results + parent)
  function mk(got, max) {
    var cls = got >= max ? 'ok' : got > 0 ? 'part' : 'no';
    return '<span class="mk ' + cls + '">' + fmtMark(got) + ' / ' + fmtMark(max) + '</span>';
  }
  function fmtMark(n) { return Math.round(n * 10) / 10; }
  function shown(v) { return isBlank(v) ? '<em class="muted">(no answer)</em>' : multiline(v); }

  function reviewQuestion(q, a, editable) {
    var A = a.answers, M = a.marks, h = '', got = 0, max = 0;
    function editOrMark(key, m) {
      if (editable) {
        var opts = '';
        for (var i = 0; i <= m; i++) opts += '<option value="' + i + '"' + ((M[key] || 0) === i ? ' selected' : '') + '>' + i + '</option>';
        return '<label class="edit-mark">Marks: <select data-edit="' + key + '">' + opts + '</select> / ' + m + '</label>';
      }
      return mk(M[key] || 0, m);
    }
    switch (q.type) {
      case 'mcq':
        got = M[q.id] || 0; max = q.marks;
        h += '<div class="qtext">' + q.prompt + '</div>' + figure(q.figure) + '<div class="options ' + (q.optionLayout === 'grid' ? 'options-grid' : '') + '">' +
          q.options.map(function (o, i) {
            var picked = String(A[q.id]) === String(i), right = q.answer === i;
            return '<div class="opt review ' + (right ? 'right' : picked ? 'wrong' : '') + '"><span class="optnum">(' + (i + 1) + ')</span><span class="opttext">' + o + '</span>' +
              (right ? '<span class="flag">✓ correct</span>' : picked ? '<span class="flag">your choice</span>' : '') + '</div>';
          }).join('') + '</div>' + (isBlank(A[q.id]) ? '<p class="muted">No option chosen.</p>' : '');
        break;
      case 'short':
        got = M[q.id] || 0; max = q.marks;
        h += '<div class="qtext">' + q.prompt + '</div>' + figure(q.figure) +
          '<table class="rv"><tr><th>Your answer</th><td>' + shown(A[q.id]) + '</td></tr><tr><th>Correct answer</th><td>' +
          esc((q.prefix || '') + q.answers[0] + (q.unit ? ' ' + q.unit : '')) + '</td></tr></table>';
        break;
      case 'steps':
        h += '<div class="qtext">' + q.prompt + '</div>' + figure(q.figure);
        h += '<div class="working-review"><h4>Working</h4>' + shown(A[q.id + '.working']) + '</div>';
        q.parts.forEach(function (p) {
          var k = q.id + '.' + p.id, pm = p.steps.reduce(function (t, s) { return t + s.marks; }, 0);
          got += M[k] || 0; max += pm;
          h += '<div class="part">' + (p.label || p.prompt ? '<div class="part-q"><b>' + p.label + '</b> ' + (p.prompt || '') + '</div>' : '') +
            '<table class="rv steps-rv"><thead><tr><th>Step</th><th>Your answer</th><th>Correct</th><th></th></tr></thead><tbody>' +
            p.steps.map(function (s) {
              var ok = stepCorrect(q, p, s, A);
              return '<tr><td>' + esc(s.label) + ' <span class="muted">(' + s.marks + ' m)</span></td><td>' + shown(A[k + '.' + s.id]) + '</td><td>' +
                esc((s.prefix || '') + s.answers[0] + (s.unit ? ' ' + s.unit : '')) + '</td><td>' + (ok ? '✅' : '❌') + '</td></tr>';
            }).join('') + '</tbody></table><div class="part-score">Part marks: ' + mk(M[k] || 0, pm) + '</div></div>';
        });
        h += '<div class="solution"><h4>Model working</h4>' + q.solution + '</div>';
        break;
      case 'open':
        if (q.prompt) h += '<div class="qtext">' + q.prompt + '</div>';
        h += figure(q.figure);
        q.parts.forEach(function (p) {
          var k = q.id + '.' + p.id;
          got += M[k] || 0; max += p.marks;
          h += '<div class="part"><div class="part-q">' + (p.label ? '<b>' + p.label + '</b> ' : '') + p.prompt + '</div>' +
            '<div class="mark-grid"><div><h4>Answer</h4><div class="your-ans">' + shown(A[k]) + '</div></div><div><h4>Model answer</h4><div class="model-ans">' + p.model + '</div>' +
            (p.tip ? '<p class="tip">💡 ' + p.tip + '</p>' : '') + '</div></div>' + editOrMark(k, p.marks) + '</div>';
        });
        break;
      case 'rewrite':
        got = M[q.id] || 0; max = q.marks;
        h += '<div class="qtext">' + esc(q.prompt) + '</div><div class="rewrite-ins">' + q.instruction + '</div>' +
          '<div class="mark-grid"><div><h4>Answer</h4><div class="your-ans">' + shown(A[q.id]) + '</div></div><div><h4>Model answer</h4><div class="model-ans">' + q.model + '</div>' +
          (q.tip ? '<p class="tip">💡 ' + q.tip + '</p>' : '') + '</div></div>' +
          (a.autoKeys.indexOf(q.id) >= 0 && (M[q.id] || 0) === q.marks ? '<p class="muted">Matched a model answer — marked automatically.</p>' : '') + editOrMark(q.id, q.marks);
        break;
      case 'tf':
        h += '<div class="qtext">' + q.prompt + '</div><table class="rv"><thead><tr><th>Statement</th><th>Your answer</th><th>Correct</th></tr></thead><tbody>' +
          q.items.map(function (it) {
            var k = q.id + '.' + it.id; got += M[k] || 0; max += q.marks / q.items.length;
            var name = { T: 'True', F: 'False' };
            return '<tr class="' + (A[k] === it.answer ? 'row-ok' : 'row-no') + '"><td>' + esc(it.statement) + '</td><td>' + (name[A[k]] || '—') + '</td><td>' + name[it.answer] + '</td></tr>';
          }).join('') + '</tbody></table>';
        break;
      case 'cloze': case 'editing': {
        var list = q.type === 'cloze' ? q.blanks : q.items;
        if (q.type === 'cloze') h += '<div class="passage cloze">' + clozeHtml(q.passage, function (n) { return '<b class="blank-num">(' + n + ')</b>______'; }) + '</div>';
        else h += '<div class="passage editing">' + editingHtml(q.passage) + '</div>';
        h += '<table class="rv"><thead><tr><th>No.</th><th>Your answer</th><th>Correct</th></tr></thead><tbody>' +
          list.map(function (b) {
            var k = q.id + '.' + b.n; got += M[k] || 0; max += 1;
            return '<tr class="' + (M[k] ? 'row-ok' : 'row-no') + '"><td>' + b.n + '</td><td>' + shown(A[k]) + '</td><td>' + esc(b.answer) + '</td></tr>';
          }).join('') + '</tbody></table>';
        break;
      }
    }
    return '<div class="q review-q"><div class="qnum">' + q.num + '</div><div class="qbody">' + h + '</div><div class="qmarks">' + mk(got, max) + '</div></div>';
  }

  function reviewPaper(paper, a, editable) {
    return paper.sections.map(function (sec) {
      return '<section class="paper-section"><header class="sec-head"><h2>' + esc(sec.title) + (sec.subtitle ? ' <span class="sec-sub">' + esc(sec.subtitle) + '</span>' : '') + '</h2></header>' +
        (sec.passage ? '<details class="reading-toggle"><summary>Show the passage</summary>' + renderPassage(sec.passage) + '</details>' : '') +
        sec.questions.map(function (q) { return reviewQuestion(q, a, editable); }).join('') + '</section>';
    }).join('');
  }

  function scoreSummary(paper, a) {
    var t = totals(paper, a), pct = Math.round(100 * t.total / paper.totalMarks);
    return '<div class="score-wrap"><div class="score-ring" style="--p:' + pct + '"><div><b>' + fmtMark(t.total) + '</b><span>/ ' + paper.totalMarks + '</span></div></div>' +
      '<table class="data-table sec-table"><thead><tr><th>Section</th><th>Marks</th></tr></thead><tbody>' +
      paper.sections.map(function (s) { return '<tr><td>' + esc(s.title) + '</td><td>' + mk(t.sections[s.id].got, t.sections[s.id].max) + '</td></tr>'; }).join('') +
      '</tbody></table></div>' +
      '<p class="muted">Time used: ' + fmtDuration(a.timeUsedSec) + ' of ' + fmtDuration(a.timeLimitSec) + (a.timedOut ? ' (time ran out)' : '') + ' · Submitted ' + fmtDate(a.submittedAt) + '</p>';
  }

  function cheer(pct) {
    if (pct >= 90) return '🌟 Outstanding! You really know your stuff.';
    if (pct >= 75) return '🎉 Great work! A few more careful checks and you\'ll be at the top.';
    if (pct >= 50) return '👍 Good effort! Look at the questions you missed and try them again.';
    return '💪 Keep going! Every mistake you fix today is a mark you\'ll earn in the real exam.';
  }

  function viewResult(id) {
    var a = getAttempt(id);
    if (!a) return viewNotFound();
    if (a.kind === 'composition') return viewCompositionDone(a);
    if (a.status === 'self-marking') { location.hash = '#/mark/' + id; return; }
    var paper = P3.papers[a.paperId];
    setTitle('Results');
    var pct = Math.round(100 * a.score / a.totalMarks);
    app.innerHTML = '<section class="panel result"><p class="crumb"><a href="#/">← Home</a></p><h1>' + SUBJECT_ICONS[paper.subject] + ' ' + esc(paper.title) + '</h1>' +
      scoreSummary(paper, a) + '<p class="cheer">' + cheer(pct) + '</p>' + quote() +
      '<div class="btn-row"><a class="btn" href="#/paper/' + paper.id + '">Try this paper again</a><a class="btn btn-ghost" href="#/">Back to home</a></div></section>' +
      '<h2 class="review-h">Check your answers</h2><article class="paper">' + reviewPaper(paper, a, false) + '</article>';
  }

  // ---------------------------------------------------------------- Composition
  function viewComposition(id) {
    var c = P3.compositions[id];
    if (!c) return viewNotFound();
    setTitle('Composition: ' + c.title);
    var dk = DRAFT_KEY + id;
    var draft = getJSON(dk, null);
    var pictures = '<div class="panels">' + c.panels.join('') + '</div>';
    var words = '<div class="helping"><h3>Helping words</h3><div class="hw-list">' + c.helpingWords.map(function (w) { return '<span>' + esc(w) + '</span>'; }).join('') + '</div></div>';

    if (!draft) {
      app.innerHTML = '<section class="panel intro"><p class="crumb"><a href="#/">← Home</a></p><h1>✏️ English Paper 1 · Composition</h1>' +
        '<h2 class="comp-title">' + esc(c.title) + '</h2><p>' + c.instruction + '</p>' + pictures + words +
        '<div class="intro-facts"><div><b>' + c.durationMin + ' min</b><span>Time allowed</span></div><div><b>' + c.totalMarks + '</b><span>Marks (marked by your parent)</span></div><div><b>' + c.minWords + '+</b><span>Words</span></div></div>' +
        '<p>Spend about <strong>10 minutes planning</strong> with the checklist, <strong>35 minutes writing</strong> and <strong>5 minutes checking</strong>.</p>' +
        '<div class="btn-row"><button class="btn btn-big" id="go">Start the 50-minute timer ▶</button></div></section>';
      document.getElementById('go').onclick = function () {
        setJSON(dk, { promptId: id, startedAt: new Date().toISOString(), remaining: c.durationMin * 60, text: '', notes: '', checklist: {} });
        viewComposition(id);
      };
      return;
    }

    var submitted = false;
    var h = '<div class="exam-bar"><div class="exam-title">✏️ Composition</div><div class="exam-progress"><span id="wc"></span></div>' +
      '<div class="timer" id="timer"></div><button class="btn btn-small" id="submitTop">Hand in</button></div>';
    h += '<div class="comp-layout"><aside class="comp-side"><h2 class="comp-title">' + esc(c.title) + '</h2><p>' + c.instruction + '</p>' + pictures + words +
      '<div class="checklist"><h3>Planning checklist</h3>' + c.checklist.map(function (item, i) {
        return '<label><input type="checkbox" data-check="' + i + '"' + (draft.checklist[i] ? ' checked' : '') + '> ' + esc(item) + '</label>';
      }).join('') + '</div>' +
      '<label class="working-label" for="notes">Planning notes</label><textarea id="notes" class="ans-area" rows="6" placeholder="Who? Where? When? What happened? How did they feel?">' + esc(draft.notes) + '</textarea></aside>' +
      '<section class="comp-main"><label class="working-label" for="story">My composition</label>' +
      '<textarea id="story" class="story" spellcheck="false" placeholder="Write your story here. Remember to leave a blank line between paragraphs.">' + esc(draft.text) + '</textarea>' +
      '<p class="muted">Spell-check is turned off, just like in the real exam. Your writing is saved automatically.</p>' +
      '<div class="btn-row"><button class="btn btn-big" id="submitBottom">Hand in my composition</button></div></section></div>';
    app.innerHTML = h;

    var story = document.getElementById('story'), notes = document.getElementById('notes');
    function save() { setJSON(dk, draft); }
    function wc() {
      var n = wordCount(draft.text);
      document.getElementById('wc').innerHTML = '<b>' + n + '</b> words' + (n < c.minWords ? ' <span class="muted">(aim for ' + c.minWords + '+)</span>' : ' ✅');
    }
    story.addEventListener('input', function () { draft.text = story.value; save(); wc(); });
    notes.addEventListener('input', function () { draft.notes = notes.value; save(); });
    app.querySelectorAll('[data-check]').forEach(function (cb) {
      cb.addEventListener('change', function () { draft.checklist[cb.dataset.check] = cb.checked; save(); });
    });
    wc();

    function submit(timedOut) {
      if (submitted) return;
      if (!timedOut && !confirm('Hand in your composition now? You will not be able to change it after this.')) return;
      submitted = true;
      stopTimer();
      draft.text = story.value; draft.notes = notes.value;
      var a = {
        id: uid(), kind: 'composition', subject: 'english', promptId: id, title: 'Composition: ' + c.title,
        startedAt: draft.startedAt, submittedAt: new Date().toISOString(),
        timeLimitSec: c.durationMin * 60, timeUsedSec: c.durationMin * 60 - draft.remaining, timedOut: timedOut,
        text: draft.text, notes: draft.notes, checklist: draft.checklist, wordCount: wordCount(draft.text),
        totalMarks: c.totalMarks, status: 'awaiting-review', review: null
      };
      saveAttempt(a);
      del(dk);
      location.hash = '#/result/' + a.id;
    }
    document.getElementById('submitTop').onclick = function () { submit(false); };
    document.getElementById('submitBottom').onclick = function () { submit(false); };
    startTimer(document.getElementById('timer'), draft.remaining, function (rem) { draft.remaining = rem; save(); },
      function () { toast('Time\'s up! Your composition has been handed in. ✋', 'warn', 6000); submit(true); });
    story.focus();
  }

  function compScore(a) { return a.review ? (+a.review.content || 0) + (+a.review.language || 0) : 0; }

  function viewCompositionDone(a) {
    setTitle('Composition handed in');
    var reviewed = a.status === 'reviewed';
    app.innerHTML = '<section class="panel result"><p class="crumb"><a href="#/">← Home</a></p><h1>✏️ ' + esc(a.title) + '</h1>' +
      (reviewed
        ? '<div class="score-wrap"><div class="score-ring" style="--p:' + Math.round(100 * compScore(a) / 20) + '"><div><b>' + compScore(a) + '</b><span>/ 20</span></div></div>' +
          '<table class="data-table sec-table"><tbody><tr><td>Content</td><td>' + esc(a.review.content) + ' / 10</td></tr><tr><td>Language</td><td>' + esc(a.review.language) + ' / 10</td></tr></tbody></table></div>' +
          (a.review.comment ? '<div class="parent-note"><h3>Note from your parent</h3><p>' + multiline(a.review.comment) + '</p></div>' : '')
        : '<p class="cheer">🎉 Well done! Your composition has been saved. Your parent will read it and give you marks and feedback.</p>') +
      '<p class="muted">' + a.wordCount + ' words · Time used: ' + fmtDuration(a.timeUsedSec) + (a.timedOut ? ' (time ran out)' : '') + '</p>' + quote() +
      '<div class="btn-row"><a class="btn btn-ghost" href="#/">Back to home</a></div></section>' +
      '<article class="panel"><h2>My composition</h2><div class="story-view">' + multiline(a.text) + '</div></article>';
  }

  // ---------------------------------------------------------------- Parent dashboard
  function parentLocked() {
    var pin = store().settings.pin;
    if (!pin) return false;
    try { return sessionStorage.getItem(UNLOCK_KEY) !== '1'; } catch (e) { return mem[UNLOCK_KEY] !== '1'; }
  }
  function unlockParent() { try { sessionStorage.setItem(UNLOCK_KEY, '1'); } catch (e) { mem[UNLOCK_KEY] = '1'; } }

  function viewPinGate(next) {
    setTitle('Parent dashboard');
    app.innerHTML = '<section class="panel narrow"><h1>🔒 Parent dashboard</h1><p>Enter the parent PIN to continue.</p>' +
      '<form id="pinForm" class="pin-form"><input id="pin" type="password" inputmode="numeric" autocomplete="off" aria-label="PIN"><button class="btn">Unlock</button></form></section>';
    document.getElementById('pin').focus();
    document.getElementById('pinForm').onsubmit = function (e) {
      e.preventDefault();
      if (document.getElementById('pin').value === store().settings.pin) { unlockParent(); next(); }
      else toast('That PIN is not right.', 'warn');
    };
  }

  function viewParent() {
    if (parentLocked()) return viewPinGate(viewParent);
    setTitle('Parent dashboard');
    var s = store();
    var all = s.attempts.slice().sort(function (a, b) { return b.submittedAt < a.submittedAt ? -1 : 1; });
    var h = '<section class="panel"><h1>👪 Parent dashboard</h1><p class="muted">All work is saved in this browser on this device. Use Export to back up or move it to another device.</p>';

    // Summary by subject
    h += '<div class="summary">';
    [['maths', 'Mathematics'], ['science', 'Science'], ['english', 'English Paper 2']].forEach(function (pair) {
      var list = all.filter(function (a) { return a.kind === 'paper' && a.subject === pair[0] && a.status === 'complete'; });
      var best = list.reduce(function (b, a) { return Math.max(b, a.score); }, 0);
      var avg = list.length ? list.reduce(function (t, a) { return t + a.score; }, 0) / list.length : 0;
      h += '<div class="sum-card card-' + pair[0] + '"><h3>' + SUBJECT_ICONS[pair[0]] + ' ' + pair[1] + '</h3>' +
        (list.length ? '<p><b>' + list.length + '</b> attempt' + (list.length > 1 ? 's' : '') + '</p><p>Latest: <b>' + fmtMark(list[0].score) + '</b> / 50</p><p>Best: <b>' + fmtMark(best) + '</b> · Average: <b>' + fmtMark(avg) + '</b></p>' +
          '<div class="trend">' + list.slice(0, 8).reverse().map(function (a) { return '<span style="height:' + Math.max(6, 100 * a.score / a.totalMarks) + '%" title="' + fmtMark(a.score) + ' / ' + a.totalMarks + '"></span>'; }).join('') + '</div>'
          : '<p class="muted">No attempts yet.</p>') + '</div>';
    });
    var comps = all.filter(function (a) { return a.kind === 'composition'; });
    var pending = comps.filter(function (a) { return a.status !== 'reviewed'; });
    h += '<div class="sum-card card-composition"><h3>✏️ Compositions</h3><p><b>' + comps.length + '</b> written</p><p><b>' + pending.length + '</b> waiting for you to mark</p></div></div></section>';

    if (pending.length) {
      h += '<section class="panel attention"><h2>📬 Compositions to review</h2><ul class="recent">' + pending.map(function (a) {
        return '<li><a href="#/attempt/' + a.id + '"><span>' + esc(a.title) + '</span><span class="muted">' + fmtDate(a.submittedAt) + '</span><span>' + a.wordCount + ' words · <strong>Review ▶</strong></span></a></li>';
      }).join('') + '</ul></section>';
    }

    h += '<section class="panel"><h2>All attempts</h2>';
    if (!all.length) h += '<p class="muted">Nothing here yet. Once your child submits a paper or composition, it will appear here.</p>';
    else {
      h += '<div class="table-scroll"><table class="data-table attempts"><thead><tr><th>Date</th><th>Paper</th><th>Score</th><th>Time used</th><th>Status</th><th></th></tr></thead><tbody>' +
        all.map(function (a) {
          var score = a.kind === 'composition' ? (a.status === 'reviewed' ? compScore(a) + ' / 20' : '—') : a.status === 'complete' ? fmtMark(a.score) + ' / ' + a.totalMarks : '—';
          var status = { complete: 'Marked', 'self-marking': 'Self-marking not finished', 'awaiting-review': 'Needs your review', reviewed: 'Reviewed' }[a.status] || a.status;
          return '<tr><td>' + fmtDate(a.submittedAt) + '</td><td>' + esc(a.title) + '</td><td>' + score + '</td><td>' + fmtDuration(a.timeUsedSec) + (a.timedOut ? ' ⏰' : '') +
            '</td><td>' + status + (a.parentAdjusted ? ' · adjusted' : '') + '</td><td><a href="#/attempt/' + a.id + '">View</a></td></tr>';
        }).join('') + '</tbody></table></div>';
    }
    h += '</section>';

    h += '<section class="panel"><h2>⚙️ Settings</h2><div class="settings">' +
      '<div><h3>Parent PIN</h3><p class="muted">Stops casual peeking at answers and reviews. (It is a gentle lock, not real security.)</p>' +
      '<form id="pinSet" class="pin-form"><input id="newPin" type="password" inputmode="numeric" placeholder="' + (s.settings.pin ? 'New PIN (blank = remove)' : 'Set a PIN') + '"><button class="btn btn-small">Save PIN</button></form></div>' +
      '<div><h3>Back up</h3><p class="muted">Download all attempts and compositions as a file, or restore from one.</p>' +
      '<div class="btn-row"><button class="btn btn-small" id="exportBtn">Export data</button><label class="btn btn-small btn-ghost">Import data<input type="file" id="importFile" accept="application/json,.json" hidden></label></div></div>' +
      '<div><h3>Start fresh</h3><p class="muted">Delete every attempt on this device.</p><button class="btn btn-small btn-danger" id="wipe">Delete all data</button></div></div></section>';
    app.innerHTML = h;

    document.getElementById('pinSet').onsubmit = function (e) {
      e.preventDefault();
      var st = store(), v = document.getElementById('newPin').value.trim();
      st.settings.pin = v; saveStore(st); unlockParent();
      toast(v ? 'PIN saved.' : 'PIN removed.');
      viewParent();
    };
    document.getElementById('exportBtn').onclick = function () {
      var blob = new Blob([JSON.stringify(store(), null, 2)], { type: 'application/json' });
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'p3-practice-backup-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(function () { URL.revokeObjectURL(link.href); }, 1000);
    };
    document.getElementById('importFile').onchange = function (e) {
      var file = e.target.files[0];
      if (!file) return;
      file.text().then(function (txt) {
        var data = JSON.parse(txt);
        if (!data || !Array.isArray(data.attempts)) throw new Error('bad file');
        var st = store(), ids = {};
        st.attempts.forEach(function (a) { ids[a.id] = true; });
        var added = data.attempts.filter(function (a) { return a && a.id && !ids[a.id]; });
        st.attempts = st.attempts.concat(added);
        saveStore(st);
        toast('Imported ' + added.length + ' new item' + (added.length === 1 ? '' : 's') + '.');
        viewParent();
      }).catch(function () { toast('Sorry, that file could not be read.', 'warn'); });
    };
    document.getElementById('wipe').onclick = function () {
      if (!confirm('Delete ALL attempts and compositions on this device? This cannot be undone. (Tip: export first.)')) return;
      var st = store(); st.attempts = []; saveStore(st);
      toast('All data deleted.');
      viewParent();
    };
  }

  function viewParentAttempt(id) {
    if (parentLocked()) return viewPinGate(function () { viewParentAttempt(id); });
    var a = getAttempt(id);
    if (!a) return viewNotFound();
    setTitle('Review: ' + a.title);
    var back = '<p class="crumb"><a href="#/parent">← Parent dashboard</a></p>';

    if (a.kind === 'composition') {
      var c = P3.compositions[a.promptId] || { title: a.title, panels: [], helpingWords: [], checklist: [] };
      var r = a.review || { content: '', language: '', comment: '' };
      var ticked = c.checklist.map(function (item, i) { return '<li class="' + (a.checklist && a.checklist[i] ? 'done' : 'notdone') + '">' + esc(item) + '</li>'; }).join('');
      var used = c.helpingWords.filter(function (w) { return a.text.toLowerCase().indexOf(w.toLowerCase()) >= 0; });
      app.innerHTML = '<section class="panel">' + back + '<h1>✏️ ' + esc(a.title) + '</h1>' +
        '<p class="muted">Submitted ' + fmtDate(a.submittedAt) + ' · ' + a.wordCount + ' words · Time used ' + fmtDuration(a.timeUsedSec) + (a.timedOut ? ' (ran out of time)' : '') + '</p>' +
        '<details><summary>Show the pictures and helping words</summary><div class="panels">' + c.panels.join('') + '</div><p>Helping words: ' + c.helpingWords.map(esc).join(', ') + '</p></details>' +
        '<div class="comp-review"><div><h2>Composition</h2><div class="story-view">' + shown(a.text) + '</div></div>' +
        '<aside><h3>Planning notes</h3><div class="your-ans">' + shown(a.notes) + '</div><h3>Checklist</h3><ul class="checklist-review">' + ticked + '</ul>' +
        '<h3>Helping words used</h3><p>' + (used.length ? used.map(esc).join(', ') : '<span class="muted">none detected</span>') + ' <span class="muted">(' + used.length + ' of ' + c.helpingWords.length + ')</span></p></aside></div>' +
        '<form id="compMark" class="comp-mark"><h2>Your marking</h2>' +
        '<div class="rubric"><label>Content <input type="number" min="0" max="10" step="1" id="mContent" value="' + esc(r.content) + '"> / 10</label>' +
        '<label>Language <input type="number" min="0" max="10" step="1" id="mLanguage" value="' + esc(r.language) + '"> / 10</label></div>' +
        '<details class="rubric-help"><summary>Marking guide</summary><p><b>Content (10):</b> relevant to all 3 pictures; clear beginning, problem, solution and ending; interesting details, feelings and dialogue.</p>' +
        '<p><b>Language (10):</b> correct grammar and past tense; spelling and punctuation; varied vocabulary and sentence beginnings; paragraphs.</p>' +
        '<p>Bands: 17–20 excellent · 13–16 good · 9–12 fair · below 9 needs work.</p></details>' +
        '<label class="working-label" for="mComment">Comments for your child</label><textarea id="mComment" class="ans-area" rows="4">' + esc(r.comment) + '</textarea>' +
        '<div class="btn-row"><button class="btn">Save marks</button></div></form></section>';
      document.getElementById('compMark').onsubmit = function (e) {
        e.preventDefault();
        var content = +document.getElementById('mContent').value, language = +document.getElementById('mLanguage').value;
        if (!(content >= 0 && content <= 10 && language >= 0 && language <= 10)) { toast('Marks must be between 0 and 10.', 'warn'); return; }
        a.review = { content: content, language: language, comment: document.getElementById('mComment').value, reviewedAt: new Date().toISOString() };
        a.status = 'reviewed';
        saveAttempt(a);
        toast('Marks saved. Your child can now see them on the home page.');
        viewParentAttempt(id);
      };
      return;
    }

    var paper = P3.papers[a.paperId];
    if (!paper) return viewNotFound();
    var h = '<section class="panel">' + back + '<h1>' + SUBJECT_ICONS[paper.subject] + ' ' + esc(paper.title) + '</h1>';
    if (a.status === 'self-marking') h += '<p class="warn-box">Your child has not finished self-marking this paper. Marks for open-ended answers can be set below.</p>';
    else h += scoreSummary(paper, a);
    h += '<p class="muted">You can change the marks for open-ended answers (self-marked or synthesis) below. Click <b>Save changes</b> when done.</p>' +
      '<label class="working-label" for="pNote">Parent note</label><textarea id="pNote" class="ans-area" rows="2">' + esc(a.parentNote || '') + '</textarea>' +
      '<div class="btn-row"><button class="btn" id="saveEdits">Save changes</button></div></section>' +
      '<article class="paper">' + reviewPaper(paper, a, true) + '</article>' +
      '<div class="btn-row center"><button class="btn" id="saveEdits2">Save changes</button></div>';
    app.innerHTML = h;
    function saveEdits() {
      app.querySelectorAll('[data-edit]').forEach(function (sel) {
        var k = sel.dataset.edit, v = +sel.value;
        if (a.marks[k] !== v) {
          if (a.marks[k] != null) a.parentAdjusted = true;
          a.marks[k] = v;
        }
      });
      a.parentNote = document.getElementById('pNote').value;
      if (a.status === 'self-marking') {
        var missing = units(paper).some(function (u) { return a.marks[u.key] == null; });
        if (!missing) a.status = 'complete';
      }
      a.score = totals(paper, a).total;
      saveAttempt(a);
      toast('Saved.');
      viewParentAttempt(id);
    }
    document.getElementById('saveEdits').onclick = saveEdits;
    document.getElementById('saveEdits2').onclick = saveEdits;
  }

  function viewNotFound() {
    setTitle('Not found');
    app.innerHTML = '<section class="panel narrow"><h1>Hmm, that page is missing 🤔</h1><p><a class="btn" href="#/">Go home</a></p></section>';
  }

  // ================================================================ Router
  function route() {
    stopTimer();
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    var view = parts[0], id = decodeURIComponent(parts[1] || '');
    document.querySelectorAll('.topnav a').forEach(function (a) {
      a.classList.toggle('active', (view === 'parent' || view === 'attempt') ? a.getAttribute('href') === '#/parent' : a.getAttribute('href') === '#/');
    });
    // Replace the app element to drop listeners from the previous view.
    var fresh = app.cloneNode(false);
    app.parentNode.replaceChild(fresh, app);
    app = fresh;
    switch (view) {
      case '': viewHome(); break;
      case 'paper': viewPaperIntro(id); break;
      case 'exam': viewExam(id); break;
      case 'mark': viewSelfMark(id); break;
      case 'result': viewResult(id); break;
      case 'write': viewComposition(id); break;
      case 'parent': viewParent(); break;
      case 'attempt': viewParentAttempt(id); break;
      default: viewNotFound();
    }
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);
  route();
})();
