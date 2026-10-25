(function (P3) {
  'use strict';
  var F = P3.fig;

  function table(head, rows) {
    return '<table class="data-table"><thead><tr>' + head.map(function (h) { return '<th>' + h + '</th>'; }).join('') +
      '</tr></thead><tbody>' + rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table>';
  }
  var Y = '✓', N = '✗';

  P3.registerPaper({
    id: 'science-eoy-1',
    subject: 'science',
    subjectName: 'Science',
    title: 'Science · End-of-Year Practice Paper 1',
    durationMin: 60,
    totalMarks: 50,
    instructions: [
      'This paper has 2 sections: A and B.',
      'Answer ALL questions.',
      'In Section B, write in full sentences and use science words (keywords).',
      'After you submit, you will mark Section B yourself using the model answers.'
    ],
    sections: [
      {
        id: 'A',
        title: 'Section A',
        subtitle: 'Multiple-choice questions',
        marksNote: 'Questions 1 to 15 carry 2 marks each. (30 marks)',
        instructions: 'For each question, four options are given. One of them is the correct answer. Choose the correct option (1, 2, 3 or 4).',
        questions: [
          { id: 'q1', num: '1', type: 'mcq', marks: 2,
            prompt: 'Which of the following is true of <strong>all</strong> living things?',
            options: ['They can move from place to place.', 'They need food, air and water.', 'They have leaves.', 'They lay eggs.'], answer: 1 },
          { id: 'q2', num: '2', type: 'mcq', marks: 2,
            prompt: 'Which one of the following is a <strong>non-living</strong> thing?',
            options: ['Mushroom', 'Seed', 'Rock', 'Bacteria'], answer: 2 },
          { id: 'q3', num: '3', type: 'mcq', marks: 2,
            prompt: 'Which group of living things can make their own food?',
            options: ['Fungi', 'Animals', 'Plants', 'Bacteria'], answer: 2 },
          { id: 'q4', num: '4', type: 'mcq', marks: 2,
            prompt: 'Which statement about mushrooms is correct?',
            options: ['They are plants because they grow from the ground.', 'They reproduce by spores.', 'They make their own food.', 'They have flowers.'], answer: 1 },
          { id: 'q5', num: '5', type: 'mcq', marks: 2,
            prompt: 'Ali left a piece of bread in a warm, damp cupboard. After a few days, black fuzzy patches grew on it. What were the patches?',
            options: ['Bacteria', 'Mould, a type of fungus', 'Moss', 'Dust'], answer: 1 },
          { id: 'q6', num: '6', type: 'mcq', marks: 2,
            prompt: 'Animal X has a beak, its body is covered with feathers and it lays eggs. Which group does Animal X belong to?',
            options: ['Mammals', 'Birds', 'Reptiles', 'Insects'], answer: 1 },
          { id: 'q7', num: '7', type: 'mcq', marks: 2,
            prompt: 'An animal has 3 body parts and 6 legs. Which animal could it be?',
            options: ['Spider', 'Butterfly', 'Centipede', 'Snail'], answer: 1 },
          { id: 'q8', num: '8', type: 'mcq', marks: 2,
            prompt: 'A window pane must let light pass through and must be waterproof. Which material is the most suitable?',
            options: ['Wood', 'Glass', 'Cloth', 'Metal'], answer: 1 },
          { id: 'q9', num: '9', type: 'mcq', marks: 2,
            prompt: 'Which part of a plant takes in water and mineral salts from the soil?',
            options: ['Leaf', 'Stem', 'Root', 'Flower'], answer: 2 },
          { id: 'q10', num: '10', type: 'mcq', marks: 2,
            prompt: 'Sam tested four materials. His results are shown in the table. Which material is the most suitable for making a raft?',
            figure: table(['Material', 'Floats on water', 'Waterproof', 'Strong'],
              [['A', Y, N, Y], ['B', N, Y, Y], ['C', Y, Y, N], ['D', Y, Y, Y]]),
            options: ['A', 'B', 'C', 'D'], answer: 3 },
          { id: 'q11', num: '11', type: 'mcq', marks: 2,
            prompt: 'Which animal has a <strong>three-stage</strong> life cycle?',
            options: ['Butterfly', 'Mosquito', 'Cockroach', 'Beetle'], answer: 2 },
          { id: 'q12', num: '12', type: 'mcq', marks: 2,
            prompt: 'The life cycle of a mosquito is: egg → larva → pupa → adult. At which stage does the mosquito swim about in water <strong>and</strong> feed?',
            options: ['Egg', 'Larva', 'Pupa', 'Adult'], answer: 1 },
          { id: 'q13', num: '13', type: 'mcq', marks: 2,
            prompt: 'Which shows the correct order of the life cycle of a flowering plant?',
            options: ['Seedling → seed → young plant → adult plant', 'Seed → young plant → seedling → adult plant',
              'Seed → seedling → young plant → adult plant', 'Adult plant → seedling → seed → young plant'], answer: 2 },
          { id: 'q14', num: '14', type: 'mcq', marks: 2,
            prompt: 'Which object will be attracted by a magnet?',
            options: ['Plastic ruler', 'Iron nail', 'Aluminium can', 'Wooden pencil'], answer: 1 },
          { id: 'q15', num: '15', type: 'mcq', marks: 2,
            prompt: 'The N pole of Magnet P is placed near end X of Magnet Q. The two magnets push each other away (repel). What is end X?',
            figure: F.magnets(),
            options: ['N pole', 'S pole', 'It could be either pole.', 'It is not a pole.'], answer: 0 }
        ]
      },
      {
        id: 'B',
        title: 'Section B',
        subtitle: 'Structured questions',
        marksNote: 'Questions 16 to 21 carry 3 or 4 marks each. (20 marks)',
        instructions: 'Write your answers in the boxes. Use complete sentences and science words. You will mark this section yourself after you submit.',
        questions: [
          { id: 'q16', num: '16', type: 'open',
            prompt: 'The diagram shows a plant.',
            figure: F.plant(),
            parts: [
              { id: 'a', label: '(a)', prompt: 'Name part D.', marks: 1,
                model: 'Part D is the <mark>root</mark>.' },
              { id: 'b', label: '(b)', prompt: 'State <strong>two</strong> functions of part D.', marks: 2, lines: 3,
                model: '1. It <mark>holds the plant firmly</mark> in the soil.<br>2. It <mark>takes in water</mark> and <mark>mineral salts</mark> from the soil.',
                tip: '1 mark for each correct function.' }
            ] },
          { id: 'q17', num: '17', type: 'open',
            prompt: 'Mei placed three similar slices of bread in different places for 5 days. Her results are shown below.' +
              table(['Slice', 'Condition', 'Amount of mould after 5 days'],
                [['A', 'Dry, in a warm cupboard', 'None'], ['B', 'Damp, in a warm cupboard', 'A lot'], ['C', 'Damp, in a refrigerator', 'Very little']]),
            parts: [
              { id: 'a', label: '(a)', prompt: 'Which slice of bread had the most mould?', marks: 1,
                model: 'Slice <mark>B</mark>.' },
              { id: 'b', label: '(b)', prompt: 'Based on her results, what <strong>two</strong> conditions does mould need to grow well?', marks: 2, lines: 3,
                model: 'Mould needs <mark>water / moisture</mark> and <mark>warmth</mark> to grow well.',
                tip: '1 mark for water (moisture/damp), 1 mark for warmth. "Air" or "food" is true but not shown by this experiment.' }
            ] },
          { id: 'q18', num: '18', type: 'open',
            prompt: 'Look at these living things: <em>cat, whale, eagle, ant, mushroom</em>.',
            parts: [
              { id: 'a', label: '(a)', prompt: 'Which <strong>one</strong> of them is <strong>not</strong> an animal?', marks: 1,
                model: 'The <mark>mushroom</mark> (it is a fungus).' },
              { id: 'b', label: '(b)', prompt: 'The cat and the whale are mammals. State <strong>two</strong> characteristics of mammals.', marks: 2, lines: 3,
                model: 'Any two:<br>• They have <mark>hair or fur</mark> on their bodies.<br>• Most <mark>give birth to young alive</mark>.<br>• Their young <mark>feed on mother\'s milk</mark>.',
                tip: '1 mark for each correct characteristic. "They breathe" is not special to mammals.' }
            ] },
          { id: 'q19', num: '19', type: 'open',
            prompt: 'Raj placed three pieces of cloth, W, X and Y, over three cups. He poured 50 ml of water onto each piece of cloth and measured how much water dripped into each cup.' +
              table(['Cloth', 'Water collected in cup'], [['W', '45 ml'], ['X', '0 ml'], ['Y', '20 ml']]),
            parts: [
              { id: 'a', label: '(a)', prompt: 'Which cloth is waterproof?', marks: 1,
                model: 'Cloth <mark>X</mark>, because <mark>no water passed through</mark> it.' },
              { id: 'b', label: '(b)', prompt: 'State <strong>one</strong> thing Raj must keep the same to make his experiment fair.', marks: 1,
                model: 'Any one: the <mark>amount of water poured</mark> / the <mark>size of the cloth</mark> / the <mark>size of the cup</mark> / the <mark>time</mark> he waited.',
                tip: 'Do NOT accept "the type of cloth" — that is what he is changing.' },
              { id: 'c', label: '(c)', prompt: 'Which cloth is the most suitable for making a raincoat? Explain your answer.', marks: 1, lines: 2,
                model: 'Cloth X, because it is <mark>waterproof</mark> and will <mark>keep the wearer dry</mark>.',
                tip: 'The mark is for the reason, not just the letter.' }
            ] },
          { id: 'q20', num: '20', type: 'open',
            prompt: 'The diagram shows the life cycle of a butterfly.',
            figure: F.butterflyCycle(),
            parts: [
              { id: 'a', label: '(a)', prompt: 'Name stage C.', marks: 1,
                model: 'Stage C is the <mark>pupa</mark>.' },
              { id: 'b', label: '(b)', prompt: 'At which stage (A, B, C or D) does the butterfly eat leaves a lot?', marks: 1,
                model: 'Stage <mark>B</mark> — the <mark>larva / caterpillar</mark>.' },
              { id: 'c', label: '(c)', prompt: 'State <strong>one</strong> difference between the life cycle of a butterfly and the life cycle of a cockroach.', marks: 2, lines: 3,
                model: 'The butterfly has <mark>four stages</mark> but the cockroach has <mark>three stages</mark>.<br><em>or</em> The butterfly has a <mark>pupa stage</mark> but the cockroach <mark>does not</mark>.<br><em>or</em> The young cockroach (nymph) <mark>looks like the adult</mark>, but the caterpillar <mark>does not look like</mark> the adult butterfly.',
                tip: 'Full marks only if BOTH animals are described. 1 mark if only one animal is described.' }
            ] },
          { id: 'q21', num: '21', type: 'open',
            prompt: 'Lily used three magnets, A, B and C, to pick up paper clips. Her results are shown below.' +
              table(['Magnet', 'Number of paper clips picked up'], [['A', '12'], ['B', '5'], ['C', '20']]),
            parts: [
              { id: 'a', label: '(a)', prompt: 'Which magnet is the strongest? Give a reason for your answer.', marks: 2, lines: 2,
                model: 'Magnet <mark>C</mark>. It <mark>picked up the most paper clips</mark>.',
                tip: '1 mark for C, 1 mark for the reason.' },
              { id: 'b', label: '(b)', prompt: 'Lily hung a bar magnet freely from a string. In which direction will it point when it stops moving?', marks: 1,
                model: 'It will point in the <mark>North–South</mark> direction.' },
              { id: 'c', label: '(c)', prompt: 'State <strong>one</strong> way magnets are used in everyday life.', marks: 1,
                model: 'Any one: <mark>magnetic door / fridge door</mark> seals, <mark>compass</mark>, <mark>fridge magnets</mark>, magnetic <mark>pencil case</mark>, picking up <mark>pins</mark>, etc.' }
            ] }
        ]
      }
    ]
  });
})(window.P3);
