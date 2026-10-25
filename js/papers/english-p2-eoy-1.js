(function (P3) {
  'use strict';

  P3.registerPaper({
    id: 'english-p2-eoy-1',
    subject: 'english',
    subjectName: 'English',
    title: 'English Paper 2 · End-of-Year Practice Paper 1',
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
            prompt: 'My brother and I ______ to school every morning.',
            options: ['walk', 'walks', 'walking', 'is walking'], answer: 0 },
          { id: 'q2', num: '2', type: 'mcq', marks: 1,
            prompt: 'There ______ some milk left in the fridge.',
            options: ['are', 'is', 'were', 'have'], answer: 1 },
          { id: 'q3', num: '3', type: 'mcq', marks: 1,
            prompt: 'Mei Ling ______ her homework before she went out to play yesterday.',
            options: ['finish', 'finishes', 'finished', 'finishing'], answer: 2 },
          { id: 'q4', num: '4', type: 'mcq', marks: 1,
            prompt: 'Look! The cat ______ up the tree.',
            options: ['climb', 'climbs', 'is climbing', 'climbed'], answer: 2 },
          { id: 'q5', num: '5', type: 'mcq', marks: 1,
            prompt: 'The children shared the cake among ______.',
            options: ['themselves', 'himself', 'itself', 'ourselves'], answer: 0 },
          { id: 'q6', num: '6', type: 'mcq', marks: 1,
            prompt: 'We waited at the bus stop ______ thirty minutes.',
            options: ['since', 'for', 'at', 'on'], answer: 1 },
          { id: 'q7', num: '7', type: 'mcq', marks: 1,
            prompt: 'Ravi is the ______ boy in our class.',
            options: ['tall', 'taller', 'tallest', 'most tall'], answer: 2 },
          { id: 'q8', num: '8', type: 'mcq', marks: 1,
            prompt: '______ of these two pencils is yours?',
            options: ['Who', 'Whose', 'Which', 'What'], answer: 2 },
          { id: 'q9', num: '9', type: 'mcq', marks: 1,
            prompt: 'She did not bring an umbrella, ______ she got wet in the rain.',
            options: ['but', 'so', 'because', 'or'], answer: 1 },
          { id: 'q10', num: '10', type: 'mcq', marks: 1,
            prompt: 'There are ______ apples than oranges in the basket.',
            options: ['much', 'more', 'many', 'most'], answer: 1 }
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
            prompt: 'The little boy was ______ when he could not find his mother at the supermarket.',
            options: ['frightened', 'delighted', 'proud', 'bored'], answer: 0 },
          { id: 'q12', num: '12', type: 'mcq', marks: 1,
            prompt: 'The ______ of the ship told the sailors to lower the sails.',
            options: ['pilot', 'captain', 'driver', 'conductor'], answer: 1 },
          { id: 'q13', num: '13', type: 'mcq', marks: 1,
            prompt: 'Please ______ the lights when you leave the room.',
            options: ['switch on', 'switch off', 'turn up', 'put on'], answer: 1 },
          { id: 'q14', num: '14', type: 'mcq', marks: 1,
            prompt: 'The tired hiker ______ slowly up the steep hill.',
            options: ['dashed', 'trudged', 'raced', 'zoomed'], answer: 1 },
          { id: 'q15', num: '15', type: 'mcq', marks: 1,
            prompt: 'Grandma\'s curry smelled so ______ that our mouths watered.',
            options: ['delicious', 'awful', 'noisy', 'sour'], answer: 0 }
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
            wordBank: ['after', 'and', 'a', 'an', 'them', 'they', 'was', 'were', 'went', 'goes', 'when', 'of', 'very', 'the', 'but', 'with'],
            passage: 'Last Saturday, Jun Wei {16} to the zoo with his parents. When they arrived, the zoo {17} already crowded with visitors. ' +
              'They went to see the elephants first. One of {18} was spraying water with its trunk. Jun Wei laughed {19} some of the water landed on his father!' +
              '\n\nAfter that, they visited the reptile house. Jun Wei was not afraid {20} the snakes. He pressed his nose against the glass {21} looked at a huge python.' +
              '\n\nAt noon, they had lunch at a café. Jun Wei ate {22} plate of chicken rice. {23} lunch, they watched an animal show. The sea lions were {24} clever. ' +
              'When it was time to go home, Jun Wei did not want to leave. It was {25} best day of his holidays.',
            blanks: [
              { n: 16, answer: 'went' }, { n: 17, answer: 'was' }, { n: 18, answer: 'them' }, { n: 19, answer: 'when' },
              { n: 20, answer: 'of' }, { n: 21, answer: 'and' }, { n: 22, answer: 'a' }, { n: 23, answer: 'after' },
              { n: 24, answer: 'very' }, { n: 25, answer: 'the' }
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
            passage: 'Mrs Lim\'s class went on a [26:feild] trip to the Botanic Gardens. The pupils were very [27:exsited]. ' +
              'They saw many [28:beautyful] flowers and tall trees. Their teacher told them to stay [29:togather] and not to wander off. ' +
              'At the lake, they fed the fish with [30:peices] of bread. Everyone agreed that it was a [31:wonderfull] day.',
            items: [
              { n: 26, answer: 'field' }, { n: 27, answer: 'excited' }, { n: 28, answer: 'beautiful' },
              { n: 29, answer: 'together' }, { n: 30, answer: 'pieces' }, { n: 31, answer: 'wonderful' }
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
            prompt: 'Sam was late for school. He missed the bus.', instruction: 'Use: <strong>because</strong>',
            answers: ['Sam was late for school because he missed the bus.', 'Because he missed the bus, Sam was late for school.', 'Because Sam missed the bus, he was late for school.'],
            model: 'Sam was late for school <mark>because</mark> he missed the bus.',
            tip: '2 marks: correct and complete. 1 mark: one small mistake (e.g. spelling or a missing full stop). 0 marks: meaning changed.' },
          { id: 'q33', num: '33', type: 'rewrite', marks: 2,
            prompt: 'Ali washed his hands. Then he ate his lunch.', instruction: 'Begin with: <strong>Before</strong> …',
            answers: ['Before Ali ate his lunch, he washed his hands.', 'Before he ate his lunch, Ali washed his hands.', 'Before eating his lunch, Ali washed his hands.'],
            model: '<mark>Before</mark> Ali ate his lunch, he washed his hands.',
            tip: 'The washing must still happen first. "Before Ali washed his hands, he ate his lunch" gets 0.' },
          { id: 'q34', num: '34', type: 'rewrite', marks: 2,
            prompt: 'Mary likes to sing. Mary likes to dance.', instruction: 'Use: <strong>both … and</strong>',
            answers: ['Mary likes both singing and dancing.', 'Mary likes both to sing and to dance.', 'Mary likes to both sing and dance.', 'Mary likes both to sing and dance.'],
            model: 'Mary likes <mark>both</mark> singing <mark>and</mark> dancing.' },
          { id: 'q35', num: '35', type: 'rewrite', marks: 2,
            prompt: 'The box is very heavy. Jane cannot carry it.', instruction: 'Use: <strong>too … to</strong>',
            answers: ['The box is too heavy for Jane to carry.'],
            model: 'The box is <mark>too</mark> heavy for Jane <mark>to</mark> carry.',
            tip: 'Do not add "it" at the end ("…for Jane to carry it" gets 1 mark).' }
        ]
      },
      {
        id: 'F',
        title: 'Comprehension',
        subtitle: 'Questions 36 to 43',
        marksNote: '(11 marks)',
        instructions: 'Read the story carefully, then answer the questions. Answer in complete sentences.',
        passage: {
          title: 'Misty',
          paragraphs: [
            'It had been raining all afternoon. Priya was sitting by the window, watching raindrops race down the glass, when she heard a faint cry coming from the drain outside her block.',
            '"Did you hear that, Mum?" she asked. Her mother shook her head and continued folding the laundry.',
            'Priya grabbed her umbrella and hurried downstairs. The cry grew louder as she got closer to the drain. Peering in, she saw a tiny grey kitten clinging to a broken branch. The water was rising quickly, and the kitten\'s fur was soaked.',
            'Priya knew she could not reach it on her own. She ran to the guardhouse and told Mr Rahman, the security guard, what she had seen. Without wasting a second, he picked up a long-handled net and followed her.',
            'Carefully, Mr Rahman lowered the net into the drain. The kitten was frightened and kept backing away. Priya knelt down and spoke softly to it. "It\'s okay, little one. We\'re here to help you." Slowly, the kitten crept onto the net, and Mr Rahman lifted it out.',
            'Priya wrapped the shivering kitten in her jacket and brought it home. Her mother was surprised at first, but when she saw how weak the kitten was, she quickly fetched a towel, a saucer of water and some soft food.',
            'The next day, Priya and her mother put up posters around the neighbourhood. Nobody came forward to claim the kitten. A week later, Mum smiled and said, "I think she has found her new home." Priya named the kitten Misty, because she had been found on a grey and rainy day.'
          ]
        },
        questions: [
          { id: 'q36', num: '36', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'Why did Priya hurry downstairs?', marks: 1,
              model: 'She <mark>heard a faint cry</mark> coming from the <mark>drain</mark> outside her block.' }] },
          { id: 'q37', num: '37', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'Where exactly was the kitten when Priya found it?', marks: 1,
              model: 'It was <mark>in the drain</mark>, <mark>clinging to a broken branch</mark>.',
              tip: 'Both details are needed for the mark.' }] },
          { id: 'q38', num: '38', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'Give <strong>two</strong> reasons why the kitten was in danger.', marks: 2, lines: 3,
              model: '1. The <mark>water was rising quickly</mark>.<br>2. The kitten was <mark>clinging to a broken branch</mark> / its <mark>fur was soaked</mark>.',
              tip: '1 mark for each reason.' }] },
          { id: 'q39', num: '39', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'Which word in paragraph 5 tells you that the kitten moved slowly and carefully?', marks: 1,
              model: '<mark>crept</mark>' }] },
          { id: 'q40', num: '40', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'How did Priya help Mr Rahman to rescue the kitten?', marks: 2, lines: 3,
              model: 'She <mark>knelt down and spoke softly</mark> to the kitten to <mark>calm it</mark>, so it <mark>crept onto the net</mark>.',
              tip: '1 mark for what she did, 1 mark for how it helped. (Telling Mr Rahman about the kitten also helped — accept for 1 mark.)' }] },
          { id: 'q41', num: '41', type: 'tf', marks: 2,
            prompt: 'Read the statements. Choose <strong>True</strong> or <strong>False</strong>.',
            items: [
              { id: 'a', statement: 'Mr Rahman took a long time before he went to help Priya.', answer: 'F' },
              { id: 'b', statement: 'Priya and her mother tried to find the kitten\'s owner.', answer: 'T' }
            ] },
          { id: 'q42', num: '42', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'What did Mum mean when she said, "I think she has found her new home"?', marks: 1,
              model: 'Mum meant that the family would <mark>keep the kitten</mark> / the kitten would <mark>stay with them</mark> as their pet.' }] },
          { id: 'q43', num: '43', type: 'open',
            parts: [{ id: 'a', label: '', prompt: 'Why did Priya name the kitten Misty?', marks: 1,
              model: 'Because she had been found on a <mark>grey and rainy day</mark>.' }] }
        ]
      }
    ]
  });
})(window.P3);
