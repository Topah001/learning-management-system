(() => {
  const courses = OpenStudyCourses.courses;
  const KEY = 'openstudy-progress-v1';
  let progress = { completedLessons: {}, quizScores: {} };
  let currentId = null;
  try { const saved = JSON.parse(localStorage.getItem(KEY) || 'null'); if (saved && saved.completedLessons && saved.quizScores) progress = saved; } catch { /* Begin with empty local progress. */ }
  const safe = (text) => String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  function notify(message) {
    const el = document.querySelector('#toast');
    el.textContent = message; el.classList.add('visible');
    clearTimeout(notify.timer); notify.timer = setTimeout(() => el.classList.remove('visible'), 2500);
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(progress)); }
    catch { notify('Browser storage unavailable; progress may not persist.'); }
  }
  function renderCatalog() {
    document.querySelector('#course-summary').textContent = `${courses.length} short courses`;
    document.querySelector('#course-list').innerHTML = courses.map((course) => {
      const state = OpenStudy.courseProgress(course, progress);
      return `<article class="course-card"><div class="course-art ${course.color}"><span>${course.symbol}</span><small>${course.topic}</small></div><div class="course-body"><div class="course-meta"><span>${course.level}</span><span>${course.duration}</span></div><h3>${safe(course.title)}</h3><p>${safe(course.description)}</p><div class="progress-copy"><span>${state.percent === 100 ? 'Complete' : `${state.percent}% complete`}</span><span>${state.completed}/${state.total} steps</span></div><div class="track"><span style="width:${state.percent}%\"></span></div><button class="course-button" data-course=\"${course.id}\">${state.completed ? 'Continue learning' : 'Start course'} <b>→</b></button></div></article>`;
    }).join('');
  }
  function renderCourse() {
    const section = document.querySelector('#course-view');
    const course = courses.find((item) => item.id === currentId);
    if (!course) { section.hidden = true; section.innerHTML = ''; return; }
    section.hidden = false;
    const completed = new Set(progress.completedLessons[course.id] || []);
    const score = progress.quizScores[course.id];
    const quizOpen = course.lessons.every((lesson) => completed.has(lesson.id));
    section.innerHTML = `<div class="view-heading"><div><button id="back" class="back">← All courses</button><p class="eyebrow">${course.topic}</p><h2>${safe(course.title)}</h2><p>${safe(course.description)}</p></div><span class="view-symbol ${course.color}">${course.symbol}</span></div><div class="lesson-layout"><nav class="lesson-nav"><p>COURSE CONTENT</p>${course.lessons.map((lesson, i) => `<button class="lesson-link ${i === 0 ? 'selected' : ''}" data-lesson="${lesson.id}"><span>${completed.has(lesson.id) ? '✓' : `0${i + 1}`}</span>${safe(lesson.title)}</button>`).join('')}<button class="lesson-link ${quizOpen ? '' : 'locked'}" data-quiz ${quizOpen ? '' : 'disabled'}><span>${score ? '✓' : '✦'}</span>Quick quiz</button></nav><div id="lesson-content" class="lesson-content"></div></div>`;
    section.querySelector('#back').addEventListener('click', () => { currentId = null; renderCourse(); document.querySelector('#catalog').scrollIntoView({ behavior: 'smooth' }); });
    section.querySelectorAll('[data-lesson]').forEach((button) => button.addEventListener('click', () => renderLesson(course, button.dataset.lesson)));
    section.querySelector('[data-quiz]').addEventListener('click', () => { if (quizOpen) renderQuiz(course); });
    renderLesson(course, course.lessons.find((lesson) => !completed.has(lesson.id))?.id || course.lessons[0].id);
  }
  function renderLesson(course, id) {
    const lesson = course.lessons.find((item) => item.id === id);
    const area = document.querySelector('#lesson-content');
    if (!lesson || !area) return;
    document.querySelectorAll('.lesson-link').forEach((button) => button.classList.toggle('selected', button.dataset.lesson === id));
    const done = (progress.completedLessons[course.id] || []).includes(id);
    area.innerHTML = `<p class="eyebrow">LESSON ${course.lessons.indexOf(lesson) + 1} OF ${course.lessons.length}</p><h3>${safe(lesson.title)}</h3><p class="lesson-text">${safe(lesson.text)}</p><aside class="tip">✦ &nbsp; Take your time. Revisit any lesson whenever you need a refresher.</aside><button id="complete" class="complete" ${done ? 'disabled' : ''}>${done ? 'Lesson completed ✓' : 'Mark as complete'}　→</button>`;
    area.querySelector('#complete').addEventListener('click', () => { progress = OpenStudy.markLesson(progress, course.id, lesson.id); save(); renderCatalog(); renderCourse(); notify('Lesson marked complete. Nice work!'); });
  }
  function renderQuiz(course) {
    const area = document.querySelector('#lesson-content');
    document.querySelectorAll('.lesson-link').forEach((button) => button.classList.toggle('selected', button.hasAttribute('data-quiz')));
    const previous = progress.quizScores[course.id];
    area.innerHTML = `<p class="eyebrow">A QUICK CHECK-IN</p><h3>Put it into practice</h3><p class="lesson-text">Choose one answer for each question, then see how you did.</p>${previous ? `<p class="previous">Last score: <strong>${previous.percent}%</strong> (${previous.correct}/${previous.total})</p>` : ''}<form id="quiz-form">${course.quiz.map((q, i) => `<fieldset><legend>${i + 1}. ${safe(q.question)}</legend>${q.options.map((option, n) => `<label><input type="radio" name="q${i}" value="${n}" required> ${safe(option)}</label>`).join('')}</fieldset>`).join('')}<button class="complete">Check my answers　→</button><p id="quiz-result" aria-live="polite"></p></form>`;
    area.querySelector('#quiz-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const answers = course.quiz.map((_, i) => new FormData(event.currentTarget).get(`q${i}`));
      const result = OpenStudy.scoreQuiz(course.quiz, answers);
      progress = { ...progress, quizScores: { ...progress.quizScores, [course.id]: result } };
      save(); renderCatalog();
      area.querySelector('#quiz-result').textContent = `You got ${result.correct} of ${result.total} correct (${result.percent}%). ${result.percent === 100 ? 'Excellent work!' : 'Review a lesson and try again whenever you like.'}`;
      document.querySelector('[data-quiz] span').textContent = '✓';
      notify('Your quiz score has been saved.');
    });
  }
  document.querySelector('#course-list').addEventListener('click', (event) => {
    const button = event.target.closest('[data-course]');
    if (!button) return;
    currentId = button.dataset.course; renderCourse();
    document.querySelector('#course-view').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  renderCatalog();
})();
