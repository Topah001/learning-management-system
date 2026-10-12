# Open Study — Learning Management System

A beginner-scale static course platform with three short introductory courses, two text lessons per course, and a three-question multiple-choice quiz for each. Learners mark lessons complete, submit answers for an automatically calculated score, revisit lessons, and retry quizzes. Completion percentages and the latest quiz score per course are saved in this browser’s local storage.

## Scope and limitations

This is a local learning prototype, not a hosted LMS: it has no accounts, instructor tools, server, remote authoring, certificates, or cross-device sync. Course material is bundled in `courses.js`; progress is local to this browser. The latest submitted quiz attempt is saved, and any submitted attempt marks that course’s quiz step complete. There is no pass/fail threshold.

## Run

Open `index.html` in a modern browser. No installation, credentials, or server is needed. Clearing browser site data resets learner progress.

## Practical validation

Open a course, read its lessons, mark each complete, and verify catalog progress updates and unlocks the quiz. Submit all correct choices and confirm a 100% score persists after reload. Retry with incorrect answers and verify the new score is calculated and saved. Return to the catalog and reopen the course to confirm completed lessons remain marked.
