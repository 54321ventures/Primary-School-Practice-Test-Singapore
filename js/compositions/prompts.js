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
    subject: 'english',
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
    subject: 'english',
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

  P3.registerComposition({
    id: 'comp-broken-vase',
    subject: 'english',
    title: 'An Accident at Home',
    durationMin: 50,
    totalMarks: 20,
    instruction: 'Look at the pictures below. Write a composition of at least <strong>80 words</strong> about what happened. ' +
      'You may use the helping words to help you. You may also write about what happened before or after.',
    panels: F.vasePanels(),
    helpingWords: ['living room', 'football', 'vase', 'crash', 'shattered', 'guilty', 'apologised', 'forgave'],
    checklist: checklist,
    minWords: 80
  });

  P3.registerComposition({
    id: 'zh-comp-kite',
    subject: 'chinese',
    lang: 'zh',
    title: '帮助别人',
    durationMin: 50,
    totalMarks: 20,
    instruction: '仔细看下面的四幅图，然后以<strong>《帮助别人》</strong>为题，写一篇不少于 <strong>150 个字</strong>的作文。你可以使用提示词语。',
    panels: F.kitePanels(),
    helpingWords: ['星期天', '公园', '放风筝', '挂在树上', '伤心', '竹竿', '小心翼翼', '感激', '助人为乐'],
    checklist: [
      '我仔细看了四幅图。',
      '我写了时间、地点和人物。',
      '开头：我写了事情是怎样开始的。',
      '经过：我写了发生了什么问题，怎样解决。',
      '结尾：我写了人物的心情和感受。',
      '我用了至少四个提示词语。',
      '我用了好词好句，也写了人物的对话。',
      '我分了段落（至少四段）。',
      '我检查了错别字和标点符号。'
    ],
    minWords: 150
  });
})(window.P3);
