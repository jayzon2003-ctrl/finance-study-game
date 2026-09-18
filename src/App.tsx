import { useMemo, useState } from "react";
import { CHAPTERS, FORMULAS, QUESTIONS } from "./data";

type Screen = "map" | "skills" | "formulas" | "study";

type Progress = Record<string, number>;

const chapterColors: Record<number, string> = {
  1: "#FFC907",
  2: "#2E9DF7",
  3: "#4FCB53",
};

function App() {
  const [screen, setScreen] = useState<Screen>("map");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const [progress, setProgress] = useState<Progress>(() => {
    try {
      return JSON.parse(localStorage.getItem("finance-world-progress") || "{}");
    } catch {
      return {};
    }
  });

  const saveProgress = (next: Progress) => {
    setProgress(next);
    localStorage.setItem("finance-world-progress", JSON.stringify(next));
  };

  const startStudy = (chapter?: number, section?: string) => {
    setSelectedChapter(chapter ?? null);
    setSelectedSection(section ?? null);
    setScreen("study");
  };

  const recordSkill = (skill: string, correct: boolean) => {
    if (!correct) return;

    const current = progress[skill] ?? 0;
    const next = Math.min(current + 1, 4);

    if (next !== current) {
      saveProgress({
        ...progress,
        [skill]: next,
      });
    }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">$</div>
          <div>
            <strong>FINANCE WORLD</strong>
            <span>Corporate Finance Training</span>
          </div>
        </div>

        <div className="player-stats">
          <div>
            <small>LEVEL</small>
            <strong>1</strong>
          </div>

          <div>
            <small>XP</small>
            <strong>
              {Object.values(progress).reduce((a, b) => a + b, 0) * 25}
            </strong>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <button
          className={`nav-button ${screen === "map" ? "active" : ""}`}
          onClick={() => setScreen("map")}
        >
          🗺️ Study Map
        </button>

        <button
          className={`nav-button ${screen === "skills" ? "active" : ""}`}
          onClick={() => setScreen("skills")}
        >
          🎯 My Skills
        </button>

        <button
          className={`nav-button ${screen === "formulas" ? "active" : ""}`}
          onClick={() => setScreen("formulas")}
        >
          📖 Formula Book
        </button>

        <button
          className={`nav-button ${screen === "study" ? "active" : ""}`}
          onClick={() => startStudy()}
        >
          ⚔️ Study Run
        </button>
      </nav>

      {screen === "map" && (
        <StudyMap
          onStart={startStudy}
          onOpenChapter={(chapter) => {
            setSelectedChapter(chapter);
          }}
        />
      )}

      {screen === "skills" && (
        <SkillsScreen
          progress={progress}
          onTrain={(chapter, section) => startStudy(chapter, section)}
        />
      )}

      {screen === "formulas" && <FormulaBook />}

      {screen === "study" && (
        <StudyRun
          selectedChapter={selectedChapter}
          selectedSection={selectedSection}
          onExit={() => setScreen("map")}
          onRecordSkill={recordSkill}
        />
      )}
    </div>
  );
}

/* =========================================================
   STUDY MAP
========================================================= */

function StudyMap({
  onStart,
  onOpenChapter,
}: {
  onStart: (chapter?: number, section?: string) => void;
  onOpenChapter: (chapter: number) => void;
}) {
  const totalQuestions = QUESTIONS.length;

  return (
    <main className="main-content">
      <section className="hero-section">
        <div className="hero-badge">⚡ EXAM TRAINING MODE</div>

        <h1>Build Your Finance Power</h1>

        <p>
          Master Chapters 1–3 through practice, calculation, retrieval, and
          repeated training.
        </p>

        <div className="hero-progress">
          <div className="progress-label">
            <span>Course Progress</span>
            <strong>0%</strong>
          </div>

          <div className="progress-track">
            <div className="progress-fill" style={{ width: "0%" }} />
          </div>
        </div>

        <button
          className="world-button"
          onClick={() => onStart()}
        >
          ⚔️ START STUDY RUN
        </button>
      </section>

      <section className="section-heading">
        <div>
          <span className="eyebrow">YOUR JOURNEY</span>
          <h2>Finance Worlds</h2>
        </div>

        <span>{totalQuestions} practice questions loaded</span>
      </section>

      <section className="world-grid">
        {CHAPTERS.map((chapter) => {
          const color = chapterColors[chapter.id] || "#FFC907";

          return (
            <article className="world-card" key={chapter.id}>
              <div
                className="world-number"
                style={{ borderColor: color }}
              >
                {chapter.id}
              </div>

              <div className="world-status">WORLD {chapter.id}</div>

              <h3>{chapter.title}</h3>

              <p>{chapter.description}</p>

              <div className="world-meta">
                <span>{chapter.sections.length} sections</span>

                <span>
                  {
                    QUESTIONS.filter(
                      (q) => q.chapter === chapter.id
                    ).length
                  }{" "}
                  questions
                </span>
              </div>

              <button
                className="world-button"
                onClick={() => onOpenChapter(chapter.id)}
              >
                ENTER WORLD →
              </button>

              {chapter.id === 1 && (
                <button
                  className="secondary-button"
                  onClick={() => onStart(1)}
                >
                  Start Chapter 1
                </button>
              )}

              {chapter.id === 2 && (
                <button
                  className="secondary-button"
                  onClick={() => onStart(2)}
                >
                  Start Chapter 2
                </button>
              )}

              {chapter.id === 3 && (
                <button
                  className="secondary-button"
                  onClick={() => onStart(3)}
                >
                  Start Chapter 3
                </button>
              )}
            </article>
          );
        })}
      </section>

      <section className="quick-actions">
        <div className="section-heading">
          <div>
            <span className="eyebrow">TRAINING CENTER</span>
            <h2>Quick Actions</h2>
          </div>
        </div>

        <div className="action-grid">
          <button
            className="action-card"
            onClick={() => onStart()}
          >
            <div className="action-icon">⚔️</div>
            <strong>Study Run</strong>
            <span>Practice mixed questions</span>
          </button>

          <button
            className="action-card"
            onClick={() => onStart(2)}
          >
            <div className="action-icon">🧮</div>
            <strong>Calculation Run</strong>
            <span>Practice Chapter 2 calculations</span>
          </button>

          <button
            className="action-card"
            onClick={() => onStart(3)}
          >
            <div className="action-icon">📊</div>
            <strong>Ratio Run</strong>
            <span>Practice Chapter 3 ratios</span>
          </button>

          <button
            className="action-card"
            onClick={() => onStart()}
          >
            <div className="action-icon">🔥</div>
            <strong>Exam Warm-Up</strong>
            <span>Start immediately</span>
          </button>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   SKILLS
========================================================= */

function SkillsScreen({
  progress,
  onTrain,
}: {
  progress: Progress;
  onTrain: (chapter: number, section: string) => void;
}) {
  return (
    <main className="main-content">
      <section className="section-heading">
        <div>
          <span className="eyebrow">MASTERY TRACKER</span>
          <h1>My Skills</h1>
          <p>
            Train individual topics and build your mastery from Not Learned
            to Mastered.
          </p>
        </div>
      </section>

      <div className="mastery-scale">
        <div>
          <strong>0</strong>
          <span>Not Learned</span>
        </div>

        <div>
          <strong>1</strong>
          <span>Familiar</span>
        </div>

        <div>
          <strong>2</strong>
          <span>Developing</span>
        </div>

        <div>
          <strong>3</strong>
          <span>Proficient</span>
        </div>

        <div>
          <strong>4</strong>
          <span>Mastered</span>
        </div>
      </div>

      {CHAPTERS.map((chapter) => (
        <section className="skill-chapter" key={chapter.id}>
          <div className="skill-chapter-header">
            <div>
              <span>CHAPTER {chapter.id}</span>
              <h2>{chapter.title}</h2>
            </div>
          </div>

          {chapter.sections.map((section) => {
            const skillQuestions = QUESTIONS.filter(
              (q) =>
                q.chapter === chapter.id &&
                q.section === section
            );

            const skills = Array.from(
              new Set(skillQuestions.map((q) => q.skill))
            );

            return (
              <div className="skill-row" key={section}>
                <div className="skill-info">
                  <strong>{section}</strong>

                  <span>
                    {skillQuestions.length} questions
                  </span>

                  {skills.length > 0 && (
                    <small>
                      Skills: {skills.join(", ")}
                    </small>
                  )}
                </div>

                <div className="skill-bar">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: `${Math.min(
                        100,
                        ((skills.reduce(
                          (sum, skill) =>
                            sum + (progress[skill] ?? 0),
                          0
                        ) /
                          Math.max(skills.length, 1)) /
                          4) *
                          100
                      )}%`,
                    }}
                  />
                </div>

                <button
                  className="train-button"
                  onClick={() =>
                    onTrain(chapter.id, section)
                  }
                >
                  TRAIN →
                </button>
              </div>
            );
          })}
        </section>
      ))}
    </main>
  );
}

/* =========================================================
   FORMULA BOOK
========================================================= */

function FormulaBook() {
  const chapterNumbers = Array.from(
    new Set(FORMULAS.map((formula) => formula.chapter))
  );

  return (
    <main className="main-content">
      <section className="section-heading">
        <div>
          <span className="eyebrow">REFERENCE</span>
          <h1>Formula Book</h1>
          <p>
            Your Chapter 2 and Chapter 3 formulas in one place.
          </p>
        </div>
      </section>

      {chapterNumbers.map((chapter) => (
        <section className="formula-section" key={chapter}>
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                CHAPTER {chapter}
              </span>
              <h2>
                {CHAPTERS.find((c) => c.id === chapter)?.title}
              </h2>
            </div>
          </div>

          <div className="formula-grid">
            {FORMULAS.filter(
              (formula) => formula.chapter === chapter
            ).map((formula) => (
              <article
                className="formula-card"
                key={formula.id}
              >
                <div className="formula-card-top">
                  <span>{formula.name}</span>
                </div>

                <div className="formula-display">
                  {formula.formula}
                </div>

                {formula.description && (
                  <p>{formula.description}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

/* =========================================================
   STUDY RUN
========================================================= */

function StudyRun({
  selectedChapter,
  selectedSection,
  onExit,
  onRecordSkill,
}: {
  selectedChapter: number | null;
  selectedSection: string | null;
  onExit: () => void;
  onRecordSkill: (skill: string, correct: boolean) => void;
}) {
  const [chapterChoice, setChapterChoice] = useState<
    number | "all"
  >(selectedChapter ?? "all");

  const [sectionChoice, setSectionChoice] = useState(
    selectedSection ?? "all"
  );

  const [started, setStarted] = useState(
    selectedChapter !== null || selectedSection !== null
  );

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<
    number | null
  >(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const availableSections = useMemo(() => {
    const chapter =
      chapterChoice === "all"
        ? null
        : chapterChoice;

    const sections = QUESTIONS.filter(
      (q) =>
        chapter === null ||
        q.chapter === chapter
    ).map((q) => q.section);

    return Array.from(new Set(sections));
  }, [chapterChoice]);

  const runQuestions = useMemo(() => {
    return QUESTIONS.filter((q) => {
      const chapterMatch =
        chapterChoice === "all" ||
        q.chapter === chapterChoice;

      const sectionMatch =
        sectionChoice === "all" ||
        q.section === sectionChoice;

      return chapterMatch && sectionMatch;
    });
  }, [chapterChoice, sectionChoice]);

  const question = runQuestions[questionIndex];

  const startRun = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
    setFinished(false);
    setStarted(true);
  };

  const chooseAnswer = (index: number) => {
    if (answered || !question) return;

    setSelectedAnswer(index);
    setAnswered(true);

    const correct = index === question.answer;

    if (correct) {
      setScore((current) => current + 1);
    }

    onRecordSkill(question.skill, correct);
  };

  const nextQuestion = () => {
    if (questionIndex >= runQuestions.length - 1) {
      setFinished(true);
      return;
    }

    setQuestionIndex((current) => current + 1);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  if (!started) {
    return (
      <main className="main-content">
        <section className="study-run-start">
          <span className="eyebrow">TRAINING MODE</span>

          <h1>Study Run</h1>

          <p>
            Choose what you want to practice, then start your
            run.
          </p>

          <div className="study-controls">
            <label>
              Chapter
              <select
                value={chapterChoice}
                onChange={(event) => {
                  const value = event.target.value;

                  if (value === "all") {
                    setChapterChoice("all");
                  } else {
                    setChapterChoice(Number(value));
                  }

                  setSectionChoice("all");
                }}
              >
                <option value="all">
                  All Chapters
                </option>

                {CHAPTERS.map((chapter) => (
                  <option
                    value={chapter.id}
                    key={chapter.id}
                  >
                    Chapter {chapter.id}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Section
              <select
                value={sectionChoice}
                onChange={(event) =>
                  setSectionChoice(event.target.value)
                }
              >
                <option value="all">
                  All Sections
                </option>

                {availableSections.map((section) => (
                  <option value={section} key={section}>
                    {section}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="study-run-summary">
            <strong>
              {runQuestions.length} questions
            </strong>

            <span>
              This run will test the selected material.
            </span>
          </div>

          <button
            className="world-button"
            onClick={startRun}
            disabled={runQuestions.length === 0}
          >
            ⚔️ BEGIN RUN
          </button>

          <button
            className="secondary-button"
            onClick={onExit}
          >
            ← BACK TO MAP
          </button>
        </section>
      </main>
    );
  }

  if (finished) {
    const percentage =
      runQuestions.length === 0
        ? 0
        : Math.round(
            (score / runQuestions.length) * 100
          );

    return (
      <main className="main-content">
        <section className="score-display">
          <span className="eyebrow">
            RUN COMPLETE
          </span>

          <h1>Training Complete</h1>

          <div className="big-score">
            {score}/{runQuestions.length}
          </div>

          <h2>{percentage}%</h2>

          <p>
            You completed this training run.
          </p>

          <div className="score-actions">
            <button
              className="world-button"
              onClick={startRun}
            >
              🔄 RUN AGAIN
            </button>

            <button
              className="secondary-button"
              onClick={() => {
                setStarted(false);
                setFinished(false);
              }}
            >
              CHANGE TRAINING
            </button>

            <button
              className="secondary-button"
              onClick={onExit}
            >
              ← STUDY MAP
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!question) {
    return (
      <main className="main-content">
        <section className="question-card">
          <h1>No questions found</h1>
          <button
            className="world-button"
            onClick={() => setStarted(false)}
          >
            CHANGE TRAINING
          </button>
        </section>
      </main>
    );
  }

  const isCorrect =
    selectedAnswer === question.answer;

  return (
    <main className="main-content">
      <div className="header-back">
        <button
          className="secondary-button"
          onClick={onExit}
        >
          ← EXIT RUN
        </button>

        <span>
          Question {questionIndex + 1} of{" "}
          {runQuestions.length}
        </span>
      </div>

      <div className="question-progress">
        <div className="question-progress-fill"
          style={{
            width: `${
              ((questionIndex + 1) /
                runQuestions.length) *
              100
            }%`,
          }}
        />
      </div>

      <section className="question-area">
        <div className="question-topline">
          <span>
            CHAPTER {question.chapter}
          </span>

          <span>{question.type}</span>

          <span>
            Score: {score}
          </span>
        </div>

        <article className="question-card">
          <div className="question-type">
            {question.skill}
          </div>

          <h1>{question.question}</h1>

          <div className="answer-options">
            {question.options.map(
              (option, index) => {
                let className = "answer-option";

                if (answered) {
                  if (index === question.answer) {
                    className += " correct";
                  } else if (
                    index === selectedAnswer
                  ) {
                    className += " incorrect";
                  }
                }

                return (
                  <button
                    key={index}
                    className={className}
                    onClick={() =>
                      chooseAnswer(index)
                    }
                    disabled={answered}
                  >
                    <span className="answer-letter">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span>{option}</span>
                  </button>
                );
              }
            )}
          </div>

          {answered && (
            <div
              className={`explanation ${
                isCorrect
                  ? "explanation-correct"
                  : "explanation-incorrect"
              }`}
            >
              <strong>
                {isCorrect
                  ? "✓ Correct!"
                  : "✗ Not quite."}
              </strong>

              <p>{question.explanation}</p>

              {question.formula && (
                <div className="formula-callout">
                  <strong>Formula</strong>
                  <span>
                    {question.formula}
                  </span>
                </div>
              )}
            </div>
          )}

          {answered && (
            <button
              className="next-button"
              onClick={nextQuestion}
            >
              {questionIndex >=
              runQuestions.length - 1
                ? "FINISH RUN →"
                : "NEXT QUESTION →"}
            </button>
          )}
        </article>
      </section>
    </main>
  );
}

export default App;
