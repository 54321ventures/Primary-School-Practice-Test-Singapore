(function (P3) {
  'use strict';
  var F = P3.fig;

  var checklist = [
    'I looked carefully at all three pictures.',
    'I know WHO is in my story and WHERE it happens.',
    'I know WHEN it happens (e.g. "Last Saturday afternoon …").',
    'Beginning: I planned how my story starts.',
    'Problem: I planned what goes wrong.',
    'Solution: I planned how the problem is solved.',
    'Ending: I planned how the characters feel at the end.',
    'I used at least 4 helping words.',
    'I used feeling words and some dialogue (speech).',
    'I wrote in paragraphs (at least 4).',
    'I checked my spelling, capital letters and full stops.',
    'I wrote in the past tense.'
  ];

  P3.registerComposition({
    id: 'comp-lost-wallet',
    title: 'The Lost Wallet',
    durationMin: 50,
    totalMarks: 20,
    instruction: 'Look at the pictures below. Write a composition of at least <strong>80 words</strong> about what happened. ' +
      'You may use the helping words to help you. You may also write about what happened before or after.',
    panels: F.walletPanels(),
    helpingWords: ['park bench', 'wallet', 'honest', 'police post', 'owner', 'grateful', 'relieved', 'right thing'],
    checklist: checklist,
    minWords: 80
  });

  P3.registerComposition({
    id: 'comp-market-help',
    title: 'Helping Someone in Need',
    durationMin: 50,
    totalMarks: 20,
    instruction: 'Look at the pictures below. Write a composition of at least <strong>80 words</strong> about what happened. ' +
      'You may use the helping words to help you. You may also write about what happened before or after.',
    panels: F.oranges(),
    helpingWords: ['market', 'elderly woman', 'tumbled', 'rolled', 'picked up', 'kind', 'thanked', 'warm feeling'],
    checklist: checklist,
    minWords: 80
  });
})(window.P3);
