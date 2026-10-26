(function (P3) {
  'use strict';

  P3.registerPaper({
    id: 'english-p2-eoy-2',
    subject: 'english',
    subjectName: 'English',
    title: 'English Paper 2 · End-of-Year Practice Paper 2',
    durationMin: 75,
    totalMarks: 50,
    instructions: [
      'This paper has 6 parts. Answer ALL questions.',
      'Check your spelling and punctuation.',
      'Synthesis and comprehension answers that do not match the model answer exactly will be marked by you after you submit.'
    ],
    sections: [
      {
        id: 'A',
        title: 'Grammar MCQ',
        subtitle: 'Questions 1 to 10',
        marksNote: '1 mark each. (10 marks)',
        instructions: 'Choose the correct answer and fill in the blank.',
        questions: [
          { id: 'q1', num: '1', type: 'mcq', marks: 1,
            prompt: 'My sister ______ her teeth twice a day.',
            options: ['brush', 'brushes', 'brushing', 'brushed'], answer: 1 },
          { id: 'q2', num: '2', type: 'mcq', marks: 1,
            prompt: 'The children ______ in the pool when it started to rain.',
            options: ['is swimming', 'are swimming', 'were swimming', 'swims'], answer: 2 },
          { id: 'q3', num: '3', type: 'mcq', marks: 1,
            prompt: 'I have ______ umbrella in my bag.',
            options: ['a', 'an', 'the', 'some'], answer: 1 },
          { id: 'q4', num: '4', type: 'mcq', marks: 1,
            prompt: 'Mother bought a dozen ______ from the market.',
            options: ['egg', 'an egg', 'eggs', 'the egg'], answer: 2 },
          { id: 'q5', num: '5', type: 'mcq', marks: 1,
            prompt: 'Ben and Ali are good friends. ______ often play football together.',
            options: ['Them', 'Their', 'They', 'He'], answer: 2 },
          { id: 'q6', num: '6', type: 'mcq', marks: 1,
            prompt: 'The cat is hiding ______ the bed.',
            options: ['under', 'at', 'of', 'to'], answer: 0 },
          { id: 'q7', num: '7', type: 'mcq', marks: 1,
            prompt: 'Today is the ______ day of the year!',
            options: ['hot', 'hotter', 'hottest', 'most hot'], answer: 2 },
          { id: 'q8', num: '8', type: 'mcq', marks: 1,
            prompt: '"______ do you go to school?" "I go by bus."',
            options: ['What', 'How', 'Which', 'Who'], answer: 1 },
          { id: 'q9', num: '9', type: 'mcq', marks: 1,
            prompt: 'Dad will buy me a bicycle ______ I do well in my exams.',
            options: ['if', 'but', 'or', 'so'], answer: 0 },
          { id: 'q10', num: '10', type: 'mcq', marks: 1,
            prompt: 'Each of the pupils ______ a new pencil.',
            options: ['have', 'having', 'are having', 'has'], answer: 3 }
        ]
      },
      {
        id: 'B',
        title: 'Vocabulary MCQ',
        subtitle: 'Questions 11 to 15',
        marksNote: '1 mark each. (5 marks)',
        instructions: 'Choose the word or phrase that best completes the sentence.',
        questions: [
          { id: 'q11', num: '11', type: 'mcq', marks: 1,
            prompt: 'The ______ checked my temperature and gave me some medicine.',
            options: ['doctor', 'chef', 'pilot', 'plumber'], answer: 0 },
          { id: 'q12', num: '12', type: 'mcq', marks: 1,
            prompt: 'Please speak ______ in the library.',
            options: ['loudly', 'softly', 'angrily', 'rudely'], answer: 1 },
          { id: 'q13', num: '13', type: 'mcq', marks: 1,
            prompt: 'The puppy ______ its tail happily when it saw its owner.',
            options: ['waved', 'nodded', 'clapped', 'wagged'], answer: 3 },
          { id: 'q14', num: '14', type: 'mcq', marks: 1,
            prompt: 'We must ______ our hands with soap before we eat.',
            options: ['wear', 'wave', 'wash', 'wipe out'], answer: 2 },
          { id: 'q15', num: '15', type: 'mcq', marks: 1,
            prompt: 'The firemen worked hard to ______ the fire.',
            options: ['put out', 'put on', 'put up', 'put away'], answer: 0 }
        ]
      },
      {
        id: 'C',
        title: 'Grammar Cloze',
        subtitle: 'Questions 16 to 25',
        marksNote: '1 mark each. (10 marks)',
        instructions: 'Fill in each blank with a word from the box. Each word can be used only once. Some words will not be used.',
        questions: [
          { id: 'cloze', num: '16–25', type: 'cloze',
            wordBank: ['after', 'and', 'a', 'an', 'her', 'his', 'was', 'were', 'played', 'plays', 'when', 'out', 'to', 'the', 'but', 'of'],
            passage: 'Yesterday {16} Mei\'s ninth birthday. She invited five of {17} friends to a party at home. Her mother baked a big chocolate cake {18} decorated it with strawberries.' +
              '\n\nWhen the guests arrived, they {19} games in the living room. Everyone laughed {20} Jun Hao fell off his chair during musical chairs!' +
              '\n\nAt four o\'clock, Mei\'s father brought {21} the cake. Everyone sang "Happy Birthday" {22} her. Mei closed her eyes, made {23} wish and blew out the candles. ' +
              '{24} the party, Mei thanked her parents. It was {25} happiest day of her year.',
            blanks: [
              { n: 16, answer: 'was' }, { n: 17, answer: 'her' }, { n: 18, answer: 'and' }, { n: 19, answer: 'played' },
              { n: 20, answer: 'when' }, { n: 21, answer: 'out' }, { n: 22, answer: 'to' }, { n: 23, answer: 'a' },
              { n: 24, answer: 'after' }, { n: 25, answer: 'the' }
            ] }
        ]
      },
      {
        id: 'D',
        title: 'Editing for Spelling',
        subtitle: 'Questions 26 to 31',
        marksNote: '1 mark each. (6 marks)',
        instructions: 'Each underlined word is spelt wrongly. Write the correct spelling in the box.',
        questions: [
          { id: 'edit', num: '26–31', type: 'editing',
            passage: 'During the school [26:holliday], my family went to Sentosa. The weather was hot and [27:sunney]. ' +
              'My brother and I built a sandcastle near the [28:watter]. Suddenly, a big wave came and [29:destroied] our castle! ' +
              'We were [30:dissapointed], but we soon started [31:bilding] a new one.',
            items: [
              { n: 26, answer: 'holiday' }, { n: 27, answer: 'sunny' }, { n: 28, answer: 'water' },
              { n: 29, answer: 'destroyed' }, { n: 30, answer: 'disappointed' }, { n: 31, answer: 'building' }
            ] }
        ]
      },
      {
        id: 'E',
        title: 'Synthesis and Transformation',
        subtitle: 'Questions 32 to 35',
        marksNote: '2 marks each. (8 marks)',
        instructions: 'Rewrite the sentences using the word(s) given. Your answer must have the same meaning as the given sentence(s).',
        questions: [
          { id: 'q32', num: '32', type: 'rewrite', marks: 2,
            prompt: 'The girl is singing. She is my cousin.', instruction: 'Use: <strong>who</strong>',
            answers: ['The girl who is singing is my cousin.'],
            model: 'The girl <mark>who</mark> is singing is my cousin.',
            tip: '"The girl is my cousin who is singing" changes the meaning slightly — 1 mark.' },
          { id: 'q33', num: '33', type: 'rewrite', marks: 2,
            prompt: 'Tom did not do his homework. His teacher was angry.', instruction: 'Use: <strong>so</strong>',
            answers: ['Tom did not do his homework, so his teacher was angry.', 'Tom didn\'t do his homework, so his teacher was angry.'],
            model: 'Tom did not do his homework, <mark>so</mark> his teacher was angry.' },
          { id: 'q34', num: '34', type: 'rewrite', marks: 2,
            prompt: 'Siti is taller than Rani.', instruction: 'Use: <strong>not as … as</strong>',
            answers: ['Rani is not as tall as Siti.'],
            model: 'Rani is <mark>not as</mark> tall <mark>as</mark> Siti.',
            tip: '"Siti is not as tall as Rani" reverses the meaning — 0 marks.' },
          { id: 'q35', num: '35', type: 'rewrite', marks: 2,
            prompt: 'We finished our lunch. Then we went to the playground.', instruction: 'Begin with: <strong>After</strong> …',
            answers: ['After we finished our lunch, we went to the playground.', 'After finishing our lunch, we went to the playground.', 'After we had finished our lunch, we went to the playground.'],
            model: '<mark>After</mark> we finished our lunch, we went to the playground.' }
        ]
      },
      {
        id: 'F',
        title: 'Comprehension',
        subtitle: 'Questions 36 to 43',
        marksNote: '(11 marks)',
        instructions: 'Read the story carefully, then answer the questions. Answer in complete sentences.',
        passage: {
          title: 'The Little Gardener',
          paragraphs: [
            'Every Saturday, Arif visited his grandfather, who lived in a ground-floor flat with a small garden. Grandpa grew all kinds of plants there: chilli plants, pandan, lime trees and even a tall papaya tree.',
            'One Saturday, Grandpa handed Arif a small pot of soil and a packet of seeds. "These are bean seeds," he said. "If you take good care of them, you will have your very own plant."',
            'Arif pushed three seeds gently into the soil and watered them. He placed the pot on the windowsill of his bedroom, where it could get plenty of sunlight.',
            'For the first few days, nothing happened. Arif checked the pot every morning before school. "Why isn\'t it growing?" he grumbled. His mother smiled. "Be patient, Arif. Good things take time."',
            'On the sixth day, Arif let out a shout of joy. Two tiny green shoots had pushed their way out of the soil! He rang Grandpa, who chuckled on the phone. "Remember to water them, but not too much," Grandpa reminded him.',
            'Weeks later, the bean plant had grown so tall that it needed a stick to hold it up. When Arif brought it to Grandpa\'s flat, Grandpa patted him on the back. "Now you are a real gardener," he said proudly.'
          ]
        },
        questions: [
          { id: 'q36', num: '36', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'What did Grandpa give Arif?', marks: 1,
              model: 'He gave Arif a <mark>small pot of soil</mark> and a <mark>packet of (bean) seeds</mark>.',
              tip: 'Both things are needed for the mark.' }] },
          { id: 'q37', num: '37', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'Why did Arif put the pot on the windowsill?', marks: 1,
              model: 'So that the seeds could get <mark>plenty of sunlight</mark>.' }] },
          { id: 'q38', num: '38', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'Give <strong>two</strong> pieces of evidence from paragraph 4 which show that Arif was impatient.', marks: 2, lines: 3,
              model: '1. He <mark>checked the pot every morning</mark> before school.<br>2. He <mark>grumbled</mark>, "<mark>Why isn\'t it growing?</mark>"',
              tip: '1 mark for each piece of evidence.' }] },
          { id: 'q39', num: '39', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'Which word in paragraph 5 tells you that Grandpa laughed quietly?', marks: 1,
              model: '<mark>chuckled</mark>' }] },
          { id: 'q40', num: '40', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'What did Mother mean when she said, "Good things take time"?', marks: 2, lines: 3,
              model: 'She meant that the seeds <mark>needed time to grow</mark>, so Arif had to <mark>wait patiently</mark>.',
              tip: '1 mark for "the plant needs time to grow", 1 mark for "Arif must be patient / wait".' }] },
          { id: 'q41', num: '41', type: 'tf', marks: 2,
            prompt: 'Read the statements. Choose <strong>True</strong> or <strong>False</strong>.',
            items: [
              { id: 'a', statement: 'All three seeds grew into shoots.', answer: 'F' },
              { id: 'b', statement: 'The bean plant needed something to hold it up when it grew tall.', answer: 'T' }
            ] },
          { id: 'q42', num: '42', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'Why did Grandpa say, "Now you are a real gardener"?', marks: 1,
              model: 'Because Arif had <mark>taken good care of the seeds</mark> and <mark>grown the plant</mark> by himself.' }] },
          { id: 'q43', num: '43', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'How did Grandpa feel at the end of the story?', marks: 1,
              model: 'He felt <mark>proud</mark> (of Arif).' }] }
        ]
      }
    ]
  });
})(window.P3);
