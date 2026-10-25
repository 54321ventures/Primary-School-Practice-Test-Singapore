(function (P3) {
  'use strict';
  var f = P3.frac, F = P3.fig;

  var booksGraph = F.barGraph({
    title: 'Number of books read in June',
    labels: ['Ali', 'Bala', 'Cindy', 'Dev'],
    values: [12, 8, 14, 6],
    max: 16, step: 2,
    yLabel: 'Number of books', xLabel: 'Pupil'
  });

  P3.registerPaper({
    id: 'maths-eoy-1',
    subject: 'maths',
    subjectName: 'Mathematics',
    title: 'Mathematics · End-of-Year Practice Paper 1',
    durationMin: 80,
    totalMarks: 50,
    instructions: [
      'This paper has 3 sections: A, B and C.',
      'Answer ALL questions.',
      'Calculators are NOT allowed.',
      'In Section C, show your working clearly. Marks are given for each correct step.'
    ],
    sections: [
      {
        id: 'A',
        title: 'Section A',
        subtitle: 'Multiple-choice questions',
        marksNote: 'Questions 1 to 12 carry 2 marks each. (24 marks)',
        instructions: 'For each question, four options are given. One of them is the correct answer. Choose the correct option (1, 2, 3 or 4).',
        questions: [
          { id: 'q1', num: '1', type: 'mcq', marks: 2,
            prompt: 'In 7 085, the digit 8 stands for ______.',
            options: ['8', '80', '800', '8 000'], answer: 1 },
          { id: 'q2', num: '2', type: 'mcq', marks: 2,
            prompt: 'Which number is the same as 4 thousands 6 tens 3 ones?',
            options: ['463', '4 063', '4 603', '4 630'], answer: 1 },
          { id: 'q3', num: '3', type: 'mcq', marks: 2,
            prompt: 'What is 1 000 more than 8 976?',
            options: ['8 986', '9 076', '9 976', '18 976'], answer: 2 },
          { id: 'q4', num: '4', type: 'mcq', marks: 2,
            prompt: 'Which one of the following is <strong>not</strong> a multiple of 6?',
            options: ['36', '42', '46', '54'], answer: 2 },
          { id: 'q5', num: '5', type: 'mcq', marks: 2,
            prompt: 'What is the missing number in the box?<div class="sum-line">63 ÷ <span class="box-blank"></span> = 9</div>',
            options: ['6', '7', '8', '9'], answer: 1 },
          { id: 'q6', num: '6', type: 'mcq', marks: 2,
            prompt: 'Mei paid $10 for a box of crayons that cost $3.65. How much change did she get?',
            options: ['$6.35', '$6.45', '$7.35', '$7.45'], answer: 0 },
          { id: 'q7', num: '7', type: 'mcq', marks: 2,
            prompt: 'Which fraction is equivalent to ' + f(2, 3) + '?',
            options: [f(3, 4), f(4, 6), f(4, 9), f(6, 8)], answer: 1 },
          { id: 'q8', num: '8', type: 'mcq', marks: 2,
            prompt: 'Which is the largest fraction?',
            options: [f(3, 10), f(3, 5), f(3, 8), f(3, 4)], answer: 3 },
          { id: 'q9', num: '9', type: 'mcq', marks: 2,
            prompt: 'A movie started at 7.45 p.m. It lasted 1 h 35 min. At what time did the movie end?',
            options: ['8.20 p.m.', '9.10 p.m.', '9.20 p.m.', '9.30 p.m.'], answer: 2 },
          { id: 'q10', num: '10', type: 'mcq', marks: 2,
            prompt: 'Which one of the following angles is <strong>greater than</strong> a right angle?',
            options: [F.angle(45), F.angle(90), F.angle(120), F.angle(60)], answer: 2, optionLayout: 'grid' },
          { id: 'q11', num: '11', type: 'mcq', marks: 2,
            prompt: 'A bag of rice has a mass of 2 kg 50 g. What is its mass in grams?',
            options: ['250 g', '2 005 g', '2 050 g', '2 500 g'], answer: 2 },
          { id: 'q12', num: '12', type: 'mcq', marks: 2,
            prompt: 'The figure below is made up of 1-cm squares. What is the area of the shaded figure?',
            figure: F.gridShape(4, 6, [[0, 1], [0, 2], [0, 3], [0, 4], [1, 1], [1, 2], [2, 1], [2, 2]]),
            options: ['8 cm²', '12 cm²', '14 cm²', '16 cm²'], answer: 0 }
        ]
      },
      {
        id: 'B',
        title: 'Section B',
        subtitle: 'Short-answer questions',
        marksNote: 'Questions 13 to 24 carry 1 mark each. (12 marks)',
        instructions: 'Write your answer in the box. Give the unit where it is not printed.',
        questions: [
          { id: 'q13', num: '13', type: 'short', marks: 1, check: 'text',
            prompt: 'Write 6 040 in words.',
            answers: ['six thousand and forty', 'six thousand forty'] },
          { id: 'q14', num: '14', type: 'short', marks: 1, check: 'number',
            prompt: 'What is the missing number in the number pattern?<div class="sum-line">2 450, 2 700, 2 950, ______, 3 450</div>',
            answers: ['3200'] },
          { id: 'q15', num: '15', type: 'short', marks: 1, check: 'number',
            prompt: 'Find the value of 3 206 + 1 897.', answers: ['5103'] },
          { id: 'q16', num: '16', type: 'short', marks: 1, check: 'number',
            prompt: 'Find the value of 5 000 − 2 368.', answers: ['2632'] },
          { id: 'q17', num: '17', type: 'short', marks: 1, check: 'number',
            prompt: 'Find the value of 427 × 6.', answers: ['2562'] },
          { id: 'q18', num: '18', type: 'short', marks: 1, check: 'number',
            prompt: 'Find the value of 852 ÷ 4.', answers: ['213'] },
          { id: 'q19', num: '19', type: 'short', marks: 1, check: 'number', unit: 'cents',
            prompt: 'Write $5.05 in cents.', answers: ['505'] },
          { id: 'q20', num: '20', type: 'short', marks: 1, check: 'fraction',
            prompt: 'Find the value of ' + f(3, 8) + ' + ' + f(1, 4) + '. Give your answer in its simplest form. <span class="hint">(Type a fraction like 2/3.)</span>',
            answers: ['5/8'] },
          { id: 'q21', num: '21', type: 'short', marks: 1, check: 'number', unit: 'ml',
            prompt: 'A jug contains 3 ℓ 45 ml of water. Express this volume in millilitres.',
            answers: ['3045'] },
          { id: 'q22', num: '22', type: 'short', marks: 1, check: 'number', unit: 'books',
            prompt: 'The bar graph shows the number of books 4 pupils read in June. How many more books did Cindy read than Dev?',
            figure: booksGraph, answers: ['8'] },
          { id: 'q23', num: '23', type: 'short', marks: 1, check: 'number', unit: 'books',
            prompt: 'Use the bar graph in Question 22. How many books did the 4 pupils read altogether?',
            answers: ['40'] },
          { id: 'q24', num: '24', type: 'short', marks: 1, check: 'line',
            prompt: 'In the figure below, which line is parallel to AB?',
            figure: F.trapezium(), answers: ['CD'] }
        ]
      },
      {
        id: 'C',
        title: 'Section C',
        subtitle: 'Structured questions',
        marksNote: 'Questions 25 to 28 carry 3 or 4 marks each. (14 marks)',
        instructions: 'Show your working clearly in the working box. Write the answer for each step. You get marks for each correct step, so do not skip any!',
        questions: [
          { id: 'q25', num: '25', type: 'steps',
            prompt: 'Mrs Tan baked 465 cookies. She sold 288 of them. She packed the remaining cookies equally into 3 boxes. How many cookies were there in each box?',
            parts: [{ id: 'a', label: '', steps: [
              { id: 's1', label: 'Step 1: Number of cookies left', check: 'number', unit: 'cookies', answers: ['177'], marks: 1 },
              { id: 's2', label: 'Step 2: Number of cookies in each box', check: 'number', unit: 'cookies', answers: ['59'], marks: 2 }
            ] }],
            solution: '465 − 288 = 177 cookies left<br>177 ÷ 3 = <strong>59</strong> cookies in each box' },
          { id: 'q26', num: '26', type: 'steps',
            prompt: 'Ben had $50. He bought a storybook for $12.85 and a pencil case for $9.40. How much money did he have left?',
            parts: [{ id: 'a', label: '', steps: [
              { id: 's1', label: 'Step 1: Total cost of the two items', check: 'number', prefix: '$', answers: ['22.25'], marks: 1 },
              { id: 's2', label: 'Step 2: Money left', check: 'number', prefix: '$', answers: ['27.75'], marks: 2 }
            ] }],
            solution: '$12.85 + $9.40 = $22.25<br>$50.00 − $22.25 = <strong>$27.75</strong>' },
          { id: 'q27', num: '27', type: 'steps',
            prompt: 'There are 3 times as many red beads as blue beads in a box. There are 248 more red beads than blue beads.',
            parts: [
              { id: 'a', label: '(a)', prompt: 'How many blue beads are there?', steps: [
                { id: 's1', label: 'Number of blue beads', check: 'number', unit: 'beads', answers: ['124'], marks: 2 }
              ] },
              { id: 'b', label: '(b)', prompt: 'How many beads are there altogether?', steps: [
                { id: 's1', label: 'Step 1: Number of red beads', check: 'number', unit: 'beads', answers: ['372'], marks: 1 },
                { id: 's2', label: 'Step 2: Total number of beads', check: 'number', unit: 'beads', answers: ['496'], marks: 1 }
              ] }
            ],
            solution: F.barModel() + '<br>(a) 3 units − 1 unit = 2 units = 248<br>1 unit = 248 ÷ 2 = <strong>124</strong> blue beads' +
              '<br>(b) Red beads = 3 × 124 = 372<br>Total = 372 + 124 = <strong>496</strong> beads' },
          { id: 'q28', num: '28', type: 'steps',
            prompt: 'A rectangular garden is 9 m long and 6 m wide.',
            parts: [
              { id: 'a', label: '(a)', prompt: 'What is the perimeter of the garden?', steps: [
                { id: 's1', label: 'Perimeter of the garden', check: 'number', unit: 'm', answers: ['30'], marks: 1 }
              ] },
              { id: 'b', label: '(b)', prompt: 'A square flower bed of side 3 m is in the garden. What is the area of the garden that is <strong>not</strong> covered by the flower bed?', steps: [
                { id: 's1', label: 'Step 1: Area of the garden', check: 'number', unit: 'm²', answers: ['54'], marks: 1 },
                { id: 's2', label: 'Step 2: Area of the flower bed', check: 'number', unit: 'm²', answers: ['9'], marks: 1 },
                { id: 's3', label: 'Step 3: Area not covered', check: 'number', unit: 'm²', answers: ['45'], marks: 1 }
              ] }
            ],
            solution: '(a) 9 + 6 + 9 + 6 = <strong>30 m</strong><br>(b) Garden: 9 × 6 = 54 m²<br>Flower bed: 3 × 3 = 9 m²<br>Not covered: 54 − 9 = <strong>45 m²</strong>' }
        ]
      }
    ]
  });
})(window.P3);
