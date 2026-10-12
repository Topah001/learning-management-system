(function (root) {
  function markLesson(progress, courseId, lessonId) {
    const completed = new Set(progress.completedLessons[courseId] || []);
    completed.add(lessonId);
    return { ...progress, completedLessons: { ...progress.completedLessons, [courseId]: [...completed] } };
  }
  function scoreQuiz(questions, answers) {
    const correct = questions.reduce((sum, question, index) => sum + (Number(answers[index]) === question.answer ? 1 : 0), 0);
    return { correct, total: questions.length, percent: questions.length ? Math.round(correct / questions.length * 100) : 0 };
  }
  function courseProgress(course, progress) {
    const lessons = progress.completedLessons[course.id] || [];
    const quizDone = Object.prototype.hasOwnProperty.call(progress.quizScores, course.id);
    const total = course.lessons.length + 1;
    return { completed: lessons.length + Number(quizDone), total, percent: Math.round((lessons.length + Number(quizDone)) / total * 100), quizDone };
  }
  const api = { markLesson, scoreQuiz, courseProgress };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.OpenStudy = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
