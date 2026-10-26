(function (P3) {
  'use strict';
  var f = P3.frac, F = P3.fig;

  var fruitGraph = F.barGraph({
    title: 'Favourite fruits of P3 pupils',
    labels: ['Apple', 'Banana', 'Mango', 'Orange'],
    values: [25, 15, 35, 20],
    max: 40, step: 5,
    yLabel: 'Number of pupils', xLabel: 'Fruit'
  });

  P3.registerPaper({
    id: 'maths-eoy-2',
    subject: 'maths',
    subjectName: 'Mathematics',
    title: 'Mathematics · End-of-Year Practice Paper 2',
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
            prompt: 'Which number is the same as 3 000 + 400 + 7?',
            options: ['3 470', '30 407', '3 047', '3 407'], answer: 3 },
          { id: 'q2', num: '2', type: 'mcq', marks: 2,
            prompt: 'Which digit is in the <strong>hundreds</strong> place in 5 928?',
            options: ['9', '5', '2', '8'], answer: 0 },
          { id: 'q3', num: '3', type: 'mcq', marks: 2,
            prompt: 'Which is the <strong>smallest</strong> number?',
            options: ['4 502', '4 205', '4 052', '4 250'], answer: 2 },
          { id: 'q4', num: '4', type: 'mcq', marks: 2,
            prompt: 'Which one of the following is equal to 8 × 7?',
            options: ['7 × 7 + 7', '8 × 6 + 6', '7 × 8 − 8', '8 × 8 − 7'], answer: 0 },
          { id: 'q5', num: '5', type: 'mcq', marks: 2,
            prompt: 'Mrs Lee shared 54 stickers equally among 6 children. How many stickers did each child get?',
            options: ['8', '9', '48', '60'], answer: 1 },
          { id: 'q6', num: '6', type: 'mcq', marks: 2,
            prompt: 'Find the value of $7.40 + $2.85.',
            options: ['$9.25', '$10.15', '$10.25', '$10.35'], answer: 2 },
          { id: 'q7', num: '7', type: 'mcq', marks: 2,
            prompt: 'The rectangle is divided into equal parts. What fraction of the rectangle is shaded?',
            figure: F.fractionBar(8, [0, 3, 6]),
            options: [f(3, 5), f(3, 8), f(5, 8), f(8, 3)], answer: 1 },
          { id: 'q8', num: '8', type: 'mcq', marks: 2,
            prompt: 'Find the value of ' + f(1, 2) + ' + ' + f(1, 8) + '.',
            options: [f(2, 10), f(2, 8), f(5, 8), f(3, 8)], answer: 2 },
          { id: 'q9', num: '9', type: 'mcq', marks: 2,
            prompt: 'Ali started his homework at 3.50 p.m. He finished at 5.15 p.m. How long did he take?',
            options: ['1 h 15 min', '1 h 25 min', '1 h 35 min', '2 h 25 min'], answer: 1 },
          { id: 'q10', num: '10', type: 'mcq', marks: 2,
            prompt: 'Which shape has <strong>exactly 2</strong> right angles?',
            options: [
              F.shape([[10, 10], [80, 10], [80, 80], [10, 80]]),
              F.shape([[10, 80], [80, 80], [10, 10]]),
              F.shape([[10, 10], [55, 10], [90, 80], [10, 80]]),
              F.shape([[45, 8], [88, 80], [2, 80]])
            ], answer: 2, optionLayout: 'grid' },
          { id: 'q11', num: '11', type: 'mcq', marks: 2,
            prompt: 'A ribbon is 3 m 8 cm long. What is its length in centimetres?',
            options: ['3 008 cm', '380 cm', '308 cm', '38 cm'], answer: 2 },
          { id: 'q12', num: '12', type: 'mcq', marks: 2,
            prompt: 'A bottle holds 750 ml of water. How much water do 4 such bottles hold?',
            options: ['3 ℓ', '2 ℓ 800 ml', '3 ℓ 75 ml', '30 ℓ'], answer: 0 }
        ]
      },
      {
        id: 'B',
        title: 'Section B',
        subtitle: 'Short-answer questions',
        marksNote: 'Questions 13 to 24 carry 1 mark each. (12 marks)',
        instructions: 'Write your answer in the box. Give the unit where it is not printed.',
        questions: [
          { id: 'q13', num: '13', type: 'short', marks: 1, check: 'number',
            prompt: 'Write <em>eight thousand and nine</em> in numerals.', answers: ['8009'] },
          { id: 'q14', num: '14', type: 'short', marks: 1, check: 'number',
            prompt: 'What is the value of the digit 6 in 6 215?', answers: ['6000'] },
          { id: 'q15', num: '15', type: 'short', marks: 1, check: 'number',
            prompt: 'Find the value of 4 735 + 2 486.', answers: ['7221'] },
          { id: 'q16', num: '16', type: 'short', marks: 1, check: 'number',
            prompt: 'Find the value of 7 003 − 2 457.', answers: ['4546'] },
          { id: 'q17', num: '17', type: 'short', marks: 1, check: 'number',
            prompt: 'Find the value of 309 × 8.', answers: ['2472'] },
          { id: 'q18', num: '18', type: 'short', marks: 1, check: 'number',
            prompt: 'Find the value of 945 ÷ 7.', answers: ['135'] },
          { id: 'q19', num: '19', type: 'short', marks: 1, check: 'number', prefix: '$',
            prompt: 'A sandwich costs $4.65 and a drink costs $1.80. What is the total cost?', answers: ['6.45'] },
          { id: 'q20', num: '20', type: 'short', marks: 1, check: 'fraction',
            prompt: 'Express ' + f(4, 12) + ' in its simplest form. <span class="hint">(Type a fraction like 2/3.)</span>', answers: ['1/3'] },
          { id: 'q21', num: '21', type: 'short', marks: 1, check: 'number', unit: 'g',
            prompt: 'A watermelon has a mass of 3 kg 250 g. A papaya has a mass of 1 kg 600 g. How much heavier is the watermelon than the papaya? Give your answer in grams.',
            answers: ['1650'] },
          { id: 'q22', num: '22', type: 'short', marks: 1, check: 'number', unit: 'pupils',
            prompt: 'The bar graph shows the favourite fruits of some P3 pupils. How many more pupils chose mango than banana?',
            figure: fruitGraph, answers: ['20'] },
          { id: 'q23', num: '23', type: 'short', marks: 1, check: 'number', unit: 'pupils',
            prompt: 'Use the bar graph in Question 22. How many pupils chose apple or orange altogether?', answers: ['45'] },
          { id: 'q24', num: '24', type: 'short', marks: 1, check: 'line',
            prompt: 'In the figure below, which line is <strong>perpendicular</strong> to PQ?',
            figure: F.trapezium({ labels: ['P', 'Q', 'R', 'S'], marks: false }), answers: ['PS'] }
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
            prompt: 'A bookshop had 2 450 books. It sold 1 375 books in the first week and 680 books in the second week. How many books were left?',
            parts: [{ id: 'a', label: '', steps: [
              { id: 's1', label: 'Step 1: Total number of books sold', check: 'number', unit: 'books', answers: ['2055'], marks: 1 },
              { id: 's2', label: 'Step 2: Number of books left', check: 'number', unit: 'books', answers: ['395'], marks: 2 }
            ] }],
            solution: '1 375 + 680 = 2 055 books sold<br>2 450 − 2 055 = <strong>395</strong> books left' },
          { id: 'q26', num: '26', type: 'steps',
            prompt: 'Each box has 8 packets of biscuits. Each packet has 6 biscuits. How many biscuits are there in 9 boxes?',
            parts: [{ id: 'a', label: '', steps: [
              { id: 's1', label: 'Step 1: Number of biscuits in 1 box', check: 'number', unit: 'biscuits', answers: ['48'], marks: 1 },
              { id: 's2', label: 'Step 2: Number of biscuits in 9 boxes', check: 'number', unit: 'biscuits', answers: ['432'], marks: 2 }
            ] }],
            solution: '8 × 6 = 48 biscuits in 1 box<br>48 × 9 = <strong>432</strong> biscuits' },
          { id: 'q27', num: '27', type: 'steps',
            prompt: 'Sam and Tom have 360 marbles altogether. Sam has 3 times as many marbles as Tom.',
            parts: [
              { id: 'a', label: '(a)', prompt: 'How many marbles does Tom have?', steps: [
                { id: 's1', label: 'Number of marbles Tom has', check: 'number', unit: 'marbles', answers: ['90'], marks: 2 }
              ] },
              { id: 'b', label: '(b)', prompt: 'How many more marbles does Sam have than Tom?', steps: [
                { id: 's1', label: 'Step 1: Number of marbles Sam has', check: 'number', unit: 'marbles', answers: ['270'], marks: 1 },
                { id: 's2', label: 'Step 2: How many more Sam has', check: 'number', unit: 'marbles', answers: ['180'], marks: 1 }
              ] }
            ],
            solution: F.totalModel({ big: 'Sam', small: 'Tom', times: 3, total: '360' }) +
              '<br>(a) 3 units + 1 unit = 4 units = 360<br>1 unit = 360 ÷ 4 = <strong>90</strong> marbles' +
              '<br>(b) Sam = 3 × 90 = 270<br>270 − 90 = <strong>180</strong> more marbles' },
          { id: 'q28', num: '28', type: 'steps',
            prompt: 'Mr Lim took his family to a concert. The concert started at 6.45 p.m. and ended at 9.10 p.m.',
            parts: [
              { id: 'a', label: '(a)', prompt: 'How long was the concert? <span class="hint">(Type like 1 h 30 min.)</span>', steps: [
                { id: 's1', label: 'Length of the concert', check: 'duration', answers: ['145'], display: '2 h 25 min', marks: 1 }
              ] },
              { id: 'b', label: '(b)', prompt: 'An adult ticket cost $18 and a child ticket cost $9. Mr Lim bought 2 adult tickets and 3 child tickets. How much did he pay altogether?', steps: [
                { id: 's1', label: 'Step 1: Cost of 2 adult tickets', check: 'number', prefix: '$', answers: ['36'], marks: 1 },
                { id: 's2', label: 'Step 2: Cost of 3 child tickets', check: 'number', prefix: '$', answers: ['27'], marks: 1 },
                { id: 's3', label: 'Step 3: Total amount paid', check: 'number', prefix: '$', answers: ['63'], marks: 1 }
              ] }
            ],
            solution: '(a) 6.45 p.m. → 8.45 p.m. is 2 h; 8.45 p.m. → 9.10 p.m. is 25 min. The concert was <strong>2 h 25 min</strong>.' +
              '<br>(b) 2 × $18 = $36<br>3 × $9 = $27<br>$36 + $27 = <strong>$63</strong>' }
        ]
      }
    ]
  });
})(window.P3);
