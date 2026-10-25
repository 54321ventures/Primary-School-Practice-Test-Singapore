// Shared registry and helpers. Loaded first; paper files register themselves here.
window.P3 = window.P3 || { papers: {}, paperOrder: [], compositions: {}, compositionOrder: [], fig: {} };

(function (P3) {
  'use strict';

  P3.registerPaper = function (paper) {
    P3.papers[paper.id] = paper;
    P3.paperOrder.push(paper.id);
  };

  P3.registerComposition = function (prompt) {
    P3.compositions[prompt.id] = prompt;
    P3.compositionOrder.push(prompt.id);
  };

  P3.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  // Stacked fraction for question text, e.g. P3.frac(3, 4)
  P3.frac = function (n, d) {
    return '<span class="frac" role="math" aria-label="' + n + ' over ' + d + '">' +
      '<span class="frac-n">' + n + '</span><span class="frac-d">' + d + '</span></span>';
  };

  P3.norm = {
    // Loose text match: case, punctuation and extra spaces are ignored.
    text: function (s) {
      return String(s == null ? '' : s)
        .toLowerCase()
        .replace(/[‘’`]/g, "'")
        .replace(/[–—-]/g, ' ')
        .replace(/[.,!?;:"()]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    },
    // "2 632", "2,632", "$27.75", "45 m²", "505 cents" -> number; anything else -> null
    number: function (s) {
      var t = String(s == null ? '' : s).replace(/[\s,$]/g, '').replace(/[a-zA-Z²ℓ]+\.?$/, '');
      if (!/^-?\d+(\.\d+)?$/.test(t) && !/^-?\.\d+$/.test(t)) return null;
      return parseFloat(t);
    },
    compact: function (s) {
      return String(s == null ? '' : s).toLowerCase().replace(/\s+/g, '');
    }
  };

  // Checks a typed short answer against the list of accepted answers.
  P3.checkShort = function (check, input, answers) {
    if (input == null || String(input).trim() === '') return false;
    switch (check) {
      case 'number': {
        var v = P3.norm.number(input);
        return v !== null && answers.some(function (a) { return Math.abs(parseFloat(a) - v) < 1e-9; });
      }
      case 'fraction': {
        var f = P3.norm.compact(input);
        return answers.some(function (a) { return P3.norm.compact(a) === f; });
      }
      case 'line': {
        // A line can be named either way round: CD = DC
        var letters = String(input).toUpperCase().replace(/LINE/g, '').replace(/[^A-Z]/g, '');
        if (letters.length !== 2) return false;
        var key = letters.split('').sort().join('');
        return answers.some(function (a) { return a.toUpperCase().split('').sort().join('') === key; });
      }
      default: {
        var t = P3.norm.text(input);
        return answers.some(function (a) { return P3.norm.text(a) === t; });
      }
    }
  };
})(window.P3);
