(function (P3) {
  'use strict';

  P3.registerPaper({
    id: 'chinese-p2-eoy-1',
    subject: 'chinese',
    subjectName: '华文 Chinese',
    title: '华文 试卷二 · 年终考试 练习卷一',
    lang: 'zh',
    durationMin: 60,
    totalMarks: 50,
    instructions: [
      '这份试卷共有五个部分。请回答所有问题。(5 parts, answer ALL questions.)',
      '选择题：选出正确的答案。(MCQ: choose the correct answer.)',
      '阅读理解二：用完整的句子回答。交卷后，你要自己批改这个部分。(Comprehension 2: answer in full sentences; you will mark it yourself after submitting.)',
      '请用中文键盘（拼音）输入答案。(Use the Chinese Pinyin keyboard to type.)'
    ],
    sections: [
      {
        id: 'A',
        title: '一、语文应用',
        subtitle: 'Language use (MCQ) · 第 1–10 题',
        marksNote: '每题 2 分。(20 分)',
        instructions: '选出正确的答案。',
        questions: [
          { id: 'q1', num: '1', type: 'mcq', marks: 2,
            prompt: '选出画线词语的正确汉语拼音：<br>妹妹喜欢吃<u>苹果</u>。',
            options: ['pín guǒ', 'píng guō', 'píng guǒ', 'pīng guǒ'], answer: 2 },
          { id: 'q2', num: '2', type: 'mcq', marks: 2,
            prompt: '选出画线词语的正确汉语拼音：<br>我们要<u>爱护</u>花草树木。',
            options: ['ài hù', 'ài hú', 'āi hù', 'ài fù'], answer: 0 },
          { id: 'q3', num: '3', type: 'mcq', marks: 2,
            prompt: '选出正确的字：<br>下雨了，弟弟忘了带雨______，全身都湿透了。',
            options: ['散', '伞', '三', '山'], answer: 1 },
          { id: 'q4', num: '4', type: 'mcq', marks: 2,
            prompt: '选出正确的字：<br>今天是星期天，我们一家人______公园去玩。',
            options: ['道', '倒', '刀', '到'], answer: 3 },
          { id: 'q5', num: '5', type: 'mcq', marks: 2,
            prompt: '选出正确的量词：<br>桌子上有一______书。',
            options: ['只', '本', '条', '张'], answer: 1 },
          { id: 'q6', num: '6', type: 'mcq', marks: 2,
            prompt: '选出正确的量词：<br>河里有三______小鱼在游来游去。',
            options: ['头', '件', '条', '本'], answer: 2 },
          { id: 'q7', num: '7', type: 'mcq', marks: 2,
            prompt: '“美丽”的近义词是______。',
            options: ['漂亮', '难看', '高兴', '干净'], answer: 0 },
          { id: 'q8', num: '8', type: 'mcq', marks: 2,
            prompt: '选出正确的词语：<br>哥哥每天早上都______地做运动，所以身体很健康。',
            options: ['伤心', '认真', '生气', '害怕'], answer: 1 },
          { id: 'q9', num: '9', type: 'mcq', marks: 2,
            prompt: '选出正确的关联词：<br>______外面下着大雨，______我们还是准时到了学校。',
            options: ['因为……所以……', '虽然……但是……', '一边……一边……', '如果……就……'], answer: 1 },
          { id: 'q10', num: '10', type: 'mcq', marks: 2,
            prompt: '哪一个句子是<strong>正确</strong>的？',
            options: ['我昨天会去图书馆借书。', '弟弟把饭吃得很饱饱。', '他高高兴兴的走回家。', '我们一起把教室打扫得干干净净。'], answer: 3 }
        ]
      },
      {
        id: 'B',
        title: '二、短文填空',
        subtitle: 'Cloze passage · 第 11–15 题',
        marksNote: '每题 2 分。(10 分)',
        instructions: '从框里选出正确的词语，填在空格里。每个词语只能用一次。',
        questions: [
          { id: 'cloze', num: '11–15', type: 'cloze', marksEach: 2,
            wordBank: ['带', '美丽', '听', '开心', '但是', '因为', '看见', '生气'],
            passage: '星期六早上，天气很好。爸爸妈妈{11}我和妹妹去植物园玩。植物园里有很多{12}的花，红的、黄的、紫的，真好看！我们一边走，一边{13}小鸟唱歌。' +
              '\n\n中午，我们坐在大树下，{14}地吃着妈妈准备的三明治。回家的时候，大家都很累，{15}心里非常快乐。',
            blanks: [
              { n: 11, answer: '带' }, { n: 12, answer: '美丽' }, { n: 13, answer: '听' },
              { n: 14, answer: '开心' }, { n: 15, answer: '但是' }
            ] }
        ]
      },
      {
        id: 'C',
        title: '三、完成对话',
        subtitle: 'Complete the dialogue · 第 16–18 题',
        marksNote: '每题 2 分。(6 分)',
        instructions: '选出最适合的句子，完成对话。',
        questions: [
          { id: 'q16', num: '16', type: 'mcq', marks: 2,
            prompt: '小明：你的新书包真好看！<br>小华：______',
            options: ['不客气。', '对不起。', '谢谢你！这是妈妈送给我的。', '我不喜欢书包。'], answer: 2 },
          { id: 'q17', num: '17', type: 'mcq', marks: 2,
            prompt: '老师：你今天为什么迟到了？<br>学生：______',
            options: ['老师，早上好！', '对不起，老师，我今天起床晚了。', '我明天会去学校。', '我很喜欢上学。'], answer: 1 },
          { id: 'q18', num: '18', type: 'mcq', marks: 2,
            prompt: '妈妈：外面下雨了，你出门要记得带雨伞。<br>孩子：______',
            options: ['今天天气很热。', '我没有雨衣。', '雨伞是蓝色的。', '好的，妈妈，我知道了。'], answer: 3 }
        ]
      },
      {
        id: 'D',
        title: '四、阅读理解（一）',
        subtitle: 'Comprehension 1 (MCQ) · 第 19–21 题',
        marksNote: '每题 2 分。(6 分)',
        instructions: '阅读短文，然后选出正确的答案。',
        passage: {
          title: '小狗旺旺',
          paragraphs: [
            '小明家有一只小白狗，名叫旺旺。旺旺的毛白白的，耳朵长长的，十分可爱。',
            '每天放学回家，旺旺都会跑到门口，摇着尾巴欢迎小明。小明做完功课后，就会带旺旺到楼下的公园散步。',
            '有一天，旺旺生病了，不吃东西也不想玩。小明很着急，马上和爸爸带旺旺去看兽医。兽医给旺旺打了一针，还叮嘱小明要让旺旺多休息。过了几天，旺旺的病好了，又能和小明一起玩了。'
          ]
        },
        questions: [
          { id: 'q19', num: '19', type: 'mcq', marks: 2,
            prompt: '旺旺是什么样子的？',
            options: ['黑黑的毛，短短的耳朵', '白白的毛，长长的耳朵', '白白的毛，短短的尾巴', '黄黄的毛，长长的耳朵'], answer: 1 },
          { id: 'q20', num: '20', type: 'mcq', marks: 2,
            prompt: '小明什么时候带旺旺去散步？',
            options: ['上学以前', '吃早餐的时候', '做完功课以后', '睡觉以前'], answer: 2 },
          { id: 'q21', num: '21', type: 'mcq', marks: 2,
            prompt: '旺旺生病的时候，小明的心情怎么样？',
            options: ['很高兴', '很生气', '很害怕', '很着急'], answer: 3 }
        ]
      },
      {
        id: 'E',
        title: '五、阅读理解（二）',
        subtitle: 'Comprehension 2 (open-ended) · 第 22–25 题',
        marksNote: '每题 2 分。(8 分)',
        instructions: '阅读短文，然后用完整的句子回答问题。',
        passage: {
          title: '一次难忘的接力赛',
          paragraphs: [
            '学校举行了一年一度的运动会。三年级的接力赛是最后一个项目，同学们都非常期待。',
            '我们班的选手是志强、美玲、阿德和我。比赛开始了，志强跑得飞快，第一个把接力棒交给美玲。可是，美玲在转弯的时候不小心摔倒了，膝盖也擦破了。我们班一下子落到了最后。',
            '美玲没有放弃。她咬紧牙关，马上站起来继续跑。看到她这么勇敢，大家都大声为她加油。阿德和我也拼命地跑，最后我们班得了第二名。',
            '虽然我们没有拿到第一名，但是老师说我们是最棒的，因为我们永不放弃。'
          ]
        },
        questions: [
          { id: 'q22', num: '22', type: 'open',
            parts: [{ id: 'a', label: '', prompt: '美玲在比赛中遇到了什么事？', marks: 2, lines: 2,
              model: '美玲在转弯的时候不小心<mark>摔倒</mark>了，<mark>膝盖</mark>也<mark>擦破</mark>了。',
              tip: '写出“摔倒”得 1 分，写出“膝盖擦破了”得 1 分。' }] },
          { id: 'q23', num: '23', type: 'open',
            parts: [{ id: 'a', label: '', prompt: '美玲摔倒后做了什么？这说明她是一个怎样的人？', marks: 2, lines: 3,
              model: '她咬紧牙关，马上<mark>站起来继续跑</mark>。（1 分）<br>这说明她是一个<mark>勇敢</mark>、<mark>不放弃</mark>的人。（1 分）' }] },
          { id: 'q24', num: '24', type: 'open',
            parts: [{ id: 'a', label: '', prompt: '他们班最后得了第几名？老师为什么说他们是最棒的？', marks: 2, lines: 3,
              model: '他们班得了<mark>第二名</mark>。（1 分）<br>因为他们<mark>永不放弃</mark>。（1 分）' }] },
          { id: 'q25', num: '25', type: 'open',
            parts: [{ id: 'a', label: '', prompt: '你从这个故事中学到了什么？', marks: 2, lines: 3,
              model: '我学到了遇到困难的时候，<mark>不要放弃</mark>，要<mark>坚持到底</mark>。<br><em>或</em> 同学们要<mark>互相鼓励</mark>，<mark>团结合作</mark>。',
              tip: '道理合理得 1 分，句子完整、说得清楚再得 1 分。' }] }
        ]
      }
    ]
  });
})(window.P3);
