import { useMemo, useState } from "react";
import { CHAPTERS, FORMULAS, QUESTIONS } from "./data";

type Screen = "map" | "skills" | "formulas" | "study";

function App() {
  const [screen, setScreen] = useState<Screen>("map");

  const [selectedChapter, setSelectedChapter] = useState<number | null>(
    null
  );

  const [selectedSection, setSelectedSection] = useState<string | null>(
    null
  );

  const [mastery, setMastery] = useState<Record<string, number>>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("finance-world-mastery") || "{}"
      );
    } catch {
      return {};
    }
  });

  const startStudy = (
    chapter: number | null = null,
    section: string | null = null,
    autoStart = true
  ) => {
    setSelectedChapter(chapter);
    setSelectedSection(section);
    setAutoStartStudy(autoStart);
    setScreen("study");
  };

  const [autoStartStudy, setAutoStartStudy] = useState(true);

  const updateMastery = (skill: string, correct: boolean) => {
    if (!correct) return;

    setMastery((previous) => {
      const updated = {
        ...previous,
        [skill]: Math.min((previous[skill] || 0) + 1, 4),
      };

      localStorage.setItem(
        "finance-world-mastery",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  return (
    <div className="app-shell">
      {/* TOP BAR */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">$</div>

          <div>
            <strong>FINANCE WORLD</strong>
            <span>Corporate Finance Training</span>
          </div>
        </div>

        <div className="player-stats">
          <div className="stat">
            <small>LEVEL</small>
            <strong>1</strong>
          </div>

          <div className="stat">
            <small>XP</small>
            <strong>
              {Object.values(mastery).reduce(
                (total, value) => total + value,
                0
              ) * 25}
            </strong>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="main-nav">
        <button
          className={`nav-button ${
            screen === "map" ? "active" : ""
          }`}
          onClick={() => setScreen("map")}
        >
          🗺️ Study Map
        </button>

        <button
          className={`nav-button ${
            screen === "study" ? "active" : ""
          }`}
          onClick={() => startStudy()}
        >
          ⚔️ Study Run
        </button>

        <button
          className={`nav-button ${
            screen === "skills" ? "active" : ""
          }`}
          onClick={() => setScreen("skills")}
        >
          🎯 My Skills
        </button>

        <button
          className={`nav-button ${
            screen === "formulas" ? "active" : ""
          }`}
          onClick={() => setScreen("formulas")}
        >
          📖 Formula Book
        </button>
      </nav>

      {/* SCREENS */}
      {screen === "map" && (
        <StudyMap onStart={startStudy} />
      )}

      {screen === "study" && (
        <StudyRun
          selectedChapter={selectedChapter}
          selectedSection={selectedSection}
          autoStart={autoStartStudy}
          onStart={startStudy}
          onExit={() => setScreen("map")}
          onCorrect={updateMastery}
        />
      )}

      {screen === "skills" && (
        <SkillsScreen
          mastery={mastery}
          onTrain={startStudy}
        />
      )}

      {screen === "formulas" && <FormulaBook />}
    </div>
  );
}

/* =========================================================
   STUDY MAP
========================================================= */

function StudyMap({
  onStart,
}: {
  onStart: (
    chapter?: number | null,
    section?: string | null,
    autoStart?: boolean
  ) => void;
}) {
  const totalQuestions = QUESTIONS.length;

  return (
    <main className="main-content">
      <section className="hero-section">
        <div className="hero-badge">
          ⚡ EXAM TRAINING MODE
        </div>

        <h1>Finance World</h1>

        <p>
          Master corporate finance through practice,
          calculations, formulas, and repeated retrieval.
        </p>

        <div className="hero-progress">
          <div className="progress-label">
            <span>Course Progress</span>
            <strong>START HERE</strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: "0%" }}
            />
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
          <span className="eyebrow">
            YOUR JOURNEY
          </span>

          <h2>Finance Worlds</h2>
        </div>

        <span>
          {totalQuestions} questions loaded
        </span>
      </section>

      <section className="world-grid">
        {CHAPTERS.map((chapter) => {
          const chapterQuestions = QUESTIONS.filter(
            (question) =>
              question.chapter === chapter.number
          );

          const sections = Array.from(
            new Set(
              chapterQuestions.map(
                (question) => question.section
              )
            )
          );

          return (
            <article
              className="world-card"
              key={chapter.number}
            >
              <div
                className="world-number"
                style={{
                  borderColor: chapter.color,
                }}
              >
                {chapter.number}
              </div>

              <div className="world-status">
                WORLD {chapter.number}
              </div>

              <h3>{chapter.title}</h3>

              <div className="world-meta">
                <span>
                  {sections.length} sections
                </span>

                <span>
                  {chapterQuestions.length} questions
                </span>
              </div>

              <button
                className="world-button"
                onClick={() =>
                  onStart(chapter.number, null, true)
                }
              >
                START CHAPTER →
              </button>

              <button
                className="secondary-button"
                onClick={() =>
                  onStart(chapter.number, null, false)
                }
              >
                CHOOSE SECTION
              </button>
            </article>
          );
        })}
      </section>

      <section className="quick-actions">
        <div className="section-heading">
          <div>
            <span className="eyebrow">
              TRAINING CENTER
            </span>

            <h2>Quick Actions</h2>
          </div>
        </div>

        <div className="action-grid">
          <button
            className="action-card"
            onClick={() => onStart()}
          >
            <div className="action-icon">
              ⚔️
            </div>

            <strong>Study Run</strong>

            <span>
              Practice all available questions
            </span>
          </button>

          <button
            className="action-card"
            onClick={() => onStart(1)}
          >
            <div className="action-icon">
              📘
            </div>

            <strong>Chapter 1</strong>

            <span>
              Financial management fundamentals
            </span>
          </button>

          <button
            className="action-card"
            onClick={() => onStart(2)}
          >
            <div className="action-icon">
              🧮
            </div>

            <strong>Chapter 2</strong>

            <span>
              Financial statements and cash flow
            </span>
          </button>

          <button
            className="action-card"
            onClick={() => onStart(3)}
          >
            <div className="action-icon">
              📊
            </div>

            <strong>Chapter 3</strong>

            <span>
              Financial statement analysis
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   STUDY RUN
========================================================= */

function StudyRun({
  selectedChapter,
  selectedSection,
  autoStart,
  onStart,
  onExit,
  onCorrect,
}: {
  selectedChapter: number | null;
  selectedSection: string | null;
  autoStart: boolean;

  onStart: (
    chapter?: number | null,
    section?: string | null,
    autoStart?: boolean
  ) => void;

  onExit: () => void;

  onCorrect: (
    skill: string,
    correct: boolean
  ) => void;
}) {
  const [chapterChoice, setChapterChoice] = useState<
    number | "all"
  >(selectedChapter ?? "all");

  const [sectionChoice, setSectionChoice] =
    useState<string>(
      selectedSection ?? "all"
    );

  const [started, setStarted] = useState(autoStart);

  const [questionNumber, setQuestionNumber] =
    useState(0);

  const [selectedAnswer, setSelectedAnswer] =
    useState<number | null>(null);

  const [answered, setAnswered] =
    useState(false);

  const [score, setScore] = useState(0);

  const [finished, setFinished] =
    useState(false);

  const availableSections = useMemo(() => {
    const filtered = QUESTIONS.filter(
      (question) =>
        chapterChoice === "all" ||
        question.chapter === chapterChoice
    );

    return Array.from(
      new Set(
        filtered.map(
          (question) => question.section
        )
      )
    );
  }, [chapterChoice]);

  const runQuestions = useMemo(() => {
    return QUESTIONS.filter((question) => {
      const chapterMatches =
        chapterChoice === "all" ||
        question.chapter === chapterChoice;

      const sectionMatches =
        sectionChoice === "all" ||
        question.section === sectionChoice;

      return (
        chapterMatches && sectionMatches
      );
    });
  }, [chapterChoice, sectionChoice]);

  const question =
    runQuestions[questionNumber];

  const beginRun = () => {
    setQuestionNumber(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setStarted(true);
  };

  const answerQuestion = (answer: number) => {
    if (answered || !question) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    const correct =
      answer === question.answer;

    if (correct) {
      setScore(
        (currentScore) =>
          currentScore + 1
      );
    }

    onCorrect(
      question.skill,
      correct
    );
  };

  const nextQuestion = () => {
    if (
      questionNumber >=
      runQuestions.length - 1
    ) {
      setFinished(true);
      return;
    }

    setQuestionNumber(
      (current) => current + 1
    );

    setSelectedAnswer(null);
    setAnswered(false);
  };

  /* SETUP SCREEN */

  if (!started) {
    return (
      <main className="main-content">
        <section className="study-run-start">
          <span className="eyebrow">
            TRAINING MODE
          </span>

          <h1>Study Run</h1>

          <p>
            Choose exactly what you want to
            practice.
          </p>

          <div className="study-controls">
            <label>
              Chapter

              <select
                value={chapterChoice}
                onChange={(event) => {
                  const value =
                    event.target.value;

                  if (value === "all") {
                    setChapterChoice("all");
                  } else {
                    setChapterChoice(
                      Number(value)
                    );
                  }

                  setSectionChoice("all");
                }}
              >
                <option value="all">
                  All Chapters
                </option>

                {CHAPTERS.map(
                  (chapter) => (
                    <option
                      key={chapter.number}
                      value={
                        chapter.number
                      }
                    >
                      Chapter{" "}
                      {chapter.number}
                    </option>
                  )
                )}
              </select>
            </label>

            <label>
              Section

              <select
                value={sectionChoice}
                onChange={(event) =>
                  setSectionChoice(
                    event.target.value
                  )
                }
              >
                <option value="all">
                  All Sections
                </option>

                {availableSections.map(
                  (section) => (
                    <option
                      key={section}
                      value={section}
                    >
                      {section}
                    </option>
                  )
                )}
              </select>
            </label>
          </div>

          <div className="study-run-summary">
            <strong>
              {runQuestions.length} questions
            </strong>

            <span>
              Ready to begin training.
            </span>
          </div>

          <button
            className="world-button"
            onClick={beginRun}
            disabled={
              runQuestions.length === 0
            }
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

  /* FINISHED SCREEN */

  if (finished) {
    const percentage =
      runQuestions.length === 0
        ? 0
        : Math.round(
            (score /
              runQuestions.length) *
              100
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

          <button
            className="world-button"
            onClick={beginRun}
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
        </section>
      </main>
    );
  }

  /* QUESTION SCREEN */

  if (!question) {
    return (
      <main className="main-content">
        <section className="question-card">
          <h1>
            No questions found.
          </h1>

          <button
            className="world-button"
            onClick={() =>
              setStarted(false)
            }
          >
            CHANGE TRAINING
          </button>
        </section>
      </main>
    );
  }

  const correct =
    selectedAnswer ===
    question.answer;

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
          Question{" "}
          {questionNumber + 1} of{" "}
          {runQuestions.length}
        </span>
      </div>

      <div className="question-progress">
        <div
          className="question-progress-fill"
          style={{
            width: `${
              ((questionNumber + 1) /
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

          <span>
            {question.type}
          </span>

          <span>
            SCORE: {score}
          </span>
        </div>

        <article className="question-card">
          <div className="question-type">
            {question.skill}
          </div>

          <h1>
            {question.question}
          </h1>

          <div className="answer-options">
            {question.options.map(
              (option, index) => {
                let className =
                  "answer-option";

                if (answered) {
                  if (
                    index ===
                    question.answer
                  ) {
                    className +=
                      " correct";
                  } else if (
                    index ===
                    selectedAnswer
                  ) {
                    className +=
                      " incorrect";
                  }
                }

                return (
                  <button
                    key={index}
                    className={
                      className
                    }
                    disabled={answered}
                    onClick={() =>
                      answerQuestion(
                        index
                      )
                    }
                  >
                    <span className="answer-letter">
                      {String.fromCharCode(
                        65 + index
                      )}
                    </span>

                    <span>
                      {option}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          {answered && (
            <div className="explanation">
              <strong>
                {correct
                  ? "✓ Correct!"
                  : "✗ Not quite."}
              </strong>

              <p>
                {question.explanation}
              </p>

              {question.formula && (
                <div className="formula-callout">
                  <strong>
                    Formula
                  </strong>

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
              onClick={
                nextQuestion
              }
            >
              {questionNumber >=
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

/* =========================================================
   MY SKILLS
========================================================= */

function SkillsScreen({
  mastery,
  onTrain,
}: {
  mastery: Record<string, number>;

  onTrain: (
    chapter?: number | null,
    section?: string | null,
    autoStart?: boolean
  ) => void;
}) {
  const sectionsByChapter =
    CHAPTERS.map((chapter) => {
      const questions =
        QUESTIONS.filter(
          (question) =>
            question.chapter ===
            chapter.number
        );

      return {
        chapter,
        sections:
          Array.from(
            new Set(
              questions.map(
                (question) =>
                  question.section
              )
            )
          ),
      };
    });

  return (
    <main className="main-content">
      <section className="section-heading">
        <div>
          <span className="eyebrow">
            MASTERY TRACKER
          </span>

          <h1>My Skills</h1>

          <p>
            Choose a section and train it
            directly.
          </p>
        </div>
      </section>

      <div className="mastery-scale">
        <div>
          <strong>0</strong>
          <span>
            Not Learned
          </span>
        </div>

        <div>
          <strong>1</strong>
          <span>Familiar</span>
        </div>

        <div>
          <strong>2</strong>
          <span>
            Developing
          </span>
        </div>

        <div>
          <strong>3</strong>
          <span>
            Proficient
          </span>
        </div>

        <div>
          <strong>4</strong>
          <span>
            Mastered
          </span>
        </div>
      </div>

      {sectionsByChapter.map(
        ({ chapter, sections }) => (
          <section
            className="skill-chapter"
            key={chapter.number}
          >
            <div className="skill-chapter-header">
              <div>
                <span>
                  CHAPTER{" "}
                  {chapter.number}
                </span>

                <h2>
                  {chapter.title}
                </h2>
              </div>
            </div>

            {sections.map(
              (section) => {
                const sectionQuestions =
                  QUESTIONS.filter(
                    (question) =>
                      question.chapter ===
                        chapter.number &&
                      question.section ===
                        section
                  );

                const skills =
                  Array.from(
                    new Set(
                      sectionQuestions.map(
                        (question) =>
                          question.skill
                      )
                    )
                  );

                const average =
                  skills.length === 0
                    ? 0
                    : skills.reduce(
                        (
                          total,
                          skill
                        ) =>
                          total +
                          (mastery[
                            skill
                          ] || 0),
                        0
                      ) /
                      skills.length;

                const percentage =
                  (average / 4) *
                  100;

                return (
                  <div
                    className="skill-row"
                    key={section}
                  >
                    <div className="skill-info">
                      <strong>
                        {section}
                      </strong>

                      <span>
                        {
                          sectionQuestions.length
                        }{" "}
                        questions
                      </span>
                    </div>

                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    <button
                      className="train-button"
                      onClick={() =>
                        onTrain(
                          chapter.number,
                          section,
                          true
                        )
                      }
                    >
                      TRAIN →
                    </button>
                  </div>
                );
              }
            )}
          </section>
        )
      )}
    </main>
  );
}

/* =========================================================
   FORMULA BOOK
========================================================= */

function FormulaBook() {
  return (
    <main className="main-content">
      <section className="section-heading">
        <div>
          <span className="eyebrow">
            REFERENCE
          </span>

          <h1>Formula Book</h1>

          <p>
            Keep the formulas available while
            you study.
          </p>
        </div>
      </section>

      <div className="formula-grid">
        {FORMULAS.map((formula) => (
          <article
            className="formula-card"
            key={formula.id}
          >
            <div className="formula-card-top">
              <span>
                CHAPTER{" "}
                {formula.chapter}
              </span>
            </div>

            <h3>
              {formula.name}
            </h3>

            <div className="formula-display">
              {formula.formula}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default App;
