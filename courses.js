(function (root) {
  const courses = [
    { id: 'web-basics', title: 'Web design foundations', topic: 'DESIGN & TECHNOLOGY', level: 'Beginner', duration: '25 min', color: 'lavender', symbol: '✳', description: 'Learn how HTML and CSS work together to make a web page.', lessons: [
      { id: 'html', title: 'The bones of a web page', text: 'HTML (HyperText Markup Language) describes the structure and meaning of a page. Elements such as headings, paragraphs, and links are written with tags. A browser reads those tags and builds the document you see. Start by giving each page one clear main heading, then organize related ideas into sections.' },
      { id: 'css', title: 'A little style goes a long way', text: 'CSS (Cascading Style Sheets) controls how HTML looks: color, spacing, type, and layout. A rule selects an element and applies one or more declarations. Keep contrast high enough to read, and let flexible layouts adapt to smaller screens. Structure first; decoration second.' }
    ], quiz: [
      { question: 'Which language describes the structure of a web page?', options: ['CSS', 'HTML', 'SQL'], answer: 1 },
      { question: 'What does CSS primarily control?', options: ['Visual presentation', 'Database records', 'Internet speed'], answer: 0 },
      { question: 'What is a good starting point for accessible page structure?', options: ['Several main headings', 'One clear main heading', 'No headings'], answer: 1 }
    ] },
    { id: 'everyday-data', title: 'Make sense of everyday data', topic: 'THINKING & NUMBERS', level: 'Beginner', duration: '20 min', color: 'peach', symbol: '⌁', description: 'Get comfortable with averages, comparisons, and useful questions.', lessons: [
      { id: 'questions', title: 'Start with a useful question', text: 'Data is information collected for a reason. Before looking at numbers, write down the question you hope to answer. Good questions are specific and fair, and help you decide which observations matter. A chart cannot rescue a misleading or incomplete question.' },
      { id: 'averages', title: 'Average or middle value?', text: 'The mean is the sum of values divided by their count. The median is the middle value after sorting. A very large or small outlier can pull the mean away from what is typical, while the median is less affected. The right summary depends on your data and question.' }
    ], quiz: [
      { question: 'What should you do before comparing data?', options: ['Pick a chart color', 'Write a clear question', 'Delete unusual values'], answer: 1 },
      { question: 'Which measure is usually less affected by one extreme outlier?', options: ['Median', 'Mean', 'Total'], answer: 0 },
      { question: 'How is the mean calculated?', options: ['The middle sorted value', 'The largest minus smallest', 'The sum divided by count'], answer: 2 }
    ] },
    { id: 'calm-focus', title: 'Build a calmer focus routine', topic: 'WELLBEING & WORK', level: 'Beginner', duration: '15 min', color: 'sage', symbol: '◌', description: 'Shape a gentle, realistic routine for doing one thing at a time.', lessons: [
      { id: 'one-task', title: 'Make space for one task', text: 'Focused work is easier when the next step is visible and distractions are reduced. Choose one small task, write down what “done” means, and move unrelated tabs or notifications out of view. A short, deliberate work period is a practical place to begin.' },
      { id: 'rest', title: 'Rest is part of the routine', text: 'Attention naturally rises and falls. A brief break after a focused interval can help you reset; stand, stretch, or look away from a screen. Use a routine as a flexible guide rather than a strict test. Adjust its length to fit your energy and responsibilities.' }
    ], quiz: [
      { question: 'What is a helpful first step for focused work?', options: ['Choose one small task', 'Open more tabs', 'Skip planning'], answer: 0 },
      { question: 'What can a short break help you do?', options: ['Avoid every distraction', 'Reset your attention', 'Guarantee perfect focus'], answer: 1 },
      { question: 'How should a focus routine be treated?', options: ['A flexible guide', 'A strict test', 'A replacement for rest'], answer: 0 }
    ] }
  ];
  const api = { courses };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.OpenStudyCourses = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
