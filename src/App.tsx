import { useMemo, useState } from "react";
import { CHAPTERS, FORMULAS, QUESTIONS } from "./data";

type Screen = "map" | "skills" | "formulas" | "study";

const chapterColors: Record<number, string> = {
  1: "#FFC907",
  2: "#2E9DF7",
  3: "#4FCB53",
};

function App() {
  const [screen, setScreen] = useState<Screen>("map");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const [progress, setProgress] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("finance-world-progress");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  function recordPractice(questionId: string) {
    const updated = {
      ...progress,
      [questionId]: (progress[questionId] || 0) + 1,
    };

    setProgress(updated);
    localStorage.setItem(
      "finance-world-progress",
      JSON.stringify(updated)
    );
  }

  function startSection(chapterId: number, section: string) {
    setSelectedChapter(chapterId);
    setSelectedSection(section);
    setScreen("study");
  }

  const practicedCount = Object.keys(progress).length;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">$</div>

          <div>
            <div className="brand-name">FINANCE WORLD</div>
            <div className="brand-subtitle">
              Corporate Finance Exam Prep
            </div>
          </div>
        </div>

        <div className="player-stats">
          <div className="stat">
            <span className="stat-label">PRACTICED</span>
            <strong>{practicedCount}</strong>
          </div>

          <div className="stat">
            <span className="stat-label">QUESTIONS</span>
            <strong>{QUESTIONS.length}</strong>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <button
          className={screen === "map" ? "nav-button active" : "nav-button"}
          onClick={() => setScreen("map")}
        >
          🗺️ Study Map
        </button>

        <button
          className={screen === "skills" ? "nav-button active" : "nav-button"}
          onClick={() => setScreen("skills")}
        >
          📈 My Skills
        </button>

        <button
          className={
            screen === "formulas" ? "nav-button active" : "nav-button"
          }
          onClick={() => setScreen("formulas")}
        >
          📘 Formula Book
        </button>
      </nav>

      {screen === "map" && (
        <StudyMap
          onStartSection={startSection}
          onStudyRun={() => setScreen("study")}
        />
      )}

      {screen === "skills" && (
        <SkillsScreen
          progress={progress}
          onStartSection={startSection}
        />
      )}

      {screen === "formulas" && (
        <FormulaScreen />
      )}

      {screen === "study" && (
        <StudyRun
          chapter={selectedChapter}
          section={selectedSection}
          onBack={() => {
            setScreen("map");
            setSelectedChapter(null);
            setSelectedSection(null);
          }}
          onStartSection={startSection}
          onPractice={recordPractice}
        />
      )}

      <footer>
        <span>Finance World</span>
        <span>Fundamentals of Corporate Finance • Chapters 1–3</span>
      </footer>
    </div>
  );
}

/* =========================
   STUDY MAP
========================= */

function StudyMap({
  onStartSection,
  onStudyRun,
}: {
  onStartSection: (chapter: number, section: string) => void;
  onStudyRun: () => void;
}) {
  return (
    <main className="main-content">
      <section className="hero-section">
        <div className="hero-badge">
          EXAM PREP • CHAPTERS 1–3
        </div>

        <h1>Finance World</h1>

        <p>
          Choose a chapter, choose a section, and start practicing.
          Every question is based on your Chapter 1–3 course material.
        </p>

        <button
          className="next-button"
          onClick={onStudyRun}
        >
          ⚡ Quick Study Run
        </button>
      </section>

      <section className="section-heading">
        <div>
          <div className="eyebrow">STUDY MAP</div>
          <h2>Choose Your World</h2>
        </div>
      </section>

      <div className="world-grid">
        {CHAPTERS.map((chapter) => (
          <article
            className="world-card"
            key={chapter.id}
            style={{
              borderTopColor: chapterColors[chapter.id],
            }}
          >
            <div
              className="world-number"
              style={{
                backgroundColor: chapterColors[chapter.id],
              }}
            >
              {chapter.id}
            </div>

            <div className="world-status">
              WORLD {chapter.id}
            </div>

            <h3>{chapter.title}</h3>

            <p>{chapter.description}</p>

            <div className="world-meta">
              <span>{chapter.sections.length} sections</span>

              <span>
                {
                  QUESTIONS.filter(
                    (q) => q.chapter === chapter.id
                  ).length
                } questions
              </span>
            </div>

            <div className="section-list">
              {chapter.sections.map((section, index) => (
                <button
                  key={section}
                  className="section-node"
                  onClick={() =>
                    onStartSection(chapter.id, section)
                  }
                >
                  <span className="node-number">
                    {index + 1}
                  </span>

                  <span className="node-info">
                    <strong>{section}</strong>
                    <small>Start practice →</small>
                  </span>

                  <span className="node-arrow">→</span>
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

/* =========================
   STUDY RUN
========================= */

function StudyRun({
  chapter,
  section,
  onBack,
  onStartSection,
  onPractice,
}: {
  chapter: number | null;
  section: string | null;
  onBack: () => void;
  onStartSection: (chapter: number, section: string) => void;
  onPractice: (questionId: string) => void;
}) {
  const [selectedChapter, setSelectedChapter] =
    useState<number | null>(chapter);

  const [selectedSection, setSelectedSection] =
    useState<string | null>(section);

  const [runStarted, setRunStarted] = useState(
    chapter !== null && section !== null
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] =
    useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const availableSections =
    selectedChapter !== null
      ? CHAPTERS.find(
          (c) => c.id === selectedChapter
        )?.sections || []
      : [];

  const questions = useMemo(() => {
    if (selectedChapter === null) return [];

    return QUESTIONS.filter(
      (q) =>
        q.chapter === selectedChapter &&
        (selectedSection === null ||
          q.section === selectedSection)
    );
  }, [selectedChapter, selectedSection]);

  if (!runStarted) {
    return (
      <main className="main-content">
        <section className="hero-section compact">
          <div className="hero-badge">
            CUSTOM STUDY RUN
          </div>

          <h1>Choose What to Study</h1>

          <p>
            Select a chapter and section. Then you'll
            immediately begin answering questions.
          </p>
        </section>

        <section className="section-heading">
          <div>
            <div className="eyebrow">STEP 1</div>
            <h2>Choose a Chapter</h2>
          </div>
        </section>

        <div className="world-grid">
          {CHAPTERS.map((c) => (
            <button
              key={c.id}
              className={`world-card ${
                selectedChapter === c.id ? "selected" : ""
              }`}
              style={{
                borderTopColor: chapterColors[c.id],
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedChapter(c.id);
                setSelectedSection(null);
              }}
            >
              <div
                className="world-number"
                style={{
                  backgroundColor: chapterColors[c.id],
                }}
              >
                {c.id}
              </div>

              <div className="world-status">
                CHAPTER {c.id}
              </div>

              <h3>{c.title}</h3>

              <p>{c.description}</p>
            </button>
          ))}
        </div>

        {selectedChapter !== null && (
          <>
            <section className="section-heading">
              <div>
                <div className="eyebrow">STEP 2</div>
                <h2>Choose a Section</h2>
              </div>
            </section>

            <div className="section-list">
              <button
                className="section-node"
                onClick={() => {
                  setSelectedSection(null);
                  setRunStarted(true);
                }}
              >
                <span className="node-number">★</span>

                <span className="node-info">
                  <strong>All Sections</strong>
                  <small>
                    Practice everything in this chapter
                  </small>
                </span>

                <span className="node-arrow">→</span>
              </button>

              {availableSections.map(
                (sectionName, index) => (
                  <button
                    key={sectionName}
                    className="section-node"
                    onClick={() => {
                      setSelectedSection(sectionName);
                      setRunStarted(true);
                    }}
                  >
                    <span className="node-number">
                      {index + 1}
                    </span>

                    <span className="node-info">
                      <strong>{sectionName}</strong>
                      <small>
                        Practice this section
                      </small>
                    </span>

                    <span className="node-arrow">
                      →
                    </span>
                  </button>
                )
              )}
            </div>
          </>
        )}

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Back to Study Map
        </button>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="main-content">
        <section className="hero-section compact">
          <h1>No questions found</h1>
          <p>
            This section does not currently have questions
            in the study database.
          </p>

          <button
            className="next-button"
            onClick={() => {
              setRunStarted(false);
              setSelectedSection(null);
            }}
          >
            Choose Another Section
          </button>
        </section>
      </main>
    );
  }

  const question = questions[currentQuestion];

  function chooseAnswer(index: number) {
    if (answered) return;

    setSelectedAnswer(index);
    setAnswered(true);

    if (index === question.answer) {
      setScore((previous) => previous + 1);
      onPractice(question.id);
    }
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
      setSelectedAnswer(null);
      setAnswered(false);
    }
  }

  const isCorrect =
    selectedAnswer === question.answer;

  const finished =
    currentQuestion === questions.length - 1 &&
    answered;

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-badge">
            RUN COMPLETE
          </div>

          <h1>Study Run Complete!</h1>

          <div className="score-display">
            <strong>{score}</strong>
            <span>
              / {questions.length} correct
            </span>
          </div>

          <p>
            You scored {percentage}%. Keep practicing
            the questions you missed so the concepts
            become easier to recall.
          </p>

          <div className="action-grid">
            <button
              className="action-card"
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setAnswered(false);
                setScore(0);
              }}
            >
              🔄 Run Again
            </button>

            <button
              className="action-card"
              onClick={() => {
                setRunStarted(false);
                setSelectedSection(null);
              }}
            >
              🗺️ Choose Another Section
            </button>

            <button
              className="action-card"
              onClick={onBack}
            >
              ← Study Map
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="main-content">
      <section className="question-area">
        <button
          className="back-button"
          onClick={() => {
            setRunStarted(false);
            setSelectedSection(null);
          }}
        >
          ← Change Section
        </button>

        <div className="question-topline">
          <span>
            Chapter {selectedChapter}
            {selectedSection
              ? ` • ${selectedSection}`
              : " • All Sections"}
          </span>

          <span>
            {currentQuestion + 1}/
            {questions.length}
          </span>
        </div>

        <div className="question-progress">
          <div
            className="question-progress-fill"
            style={{
              width: `${
                ((currentQuestion + 1) /
                  questions.length) *
                100
              }%`,
            }}
          />
        </div>

        <div className="question-card">
          <div className="question-type">
            {question.type.toUpperCase()}
          </div>

          <h3>{question.question}</h3>

          <div className="answer-options">
            {question.options.map(
              (option, index) => {
                let className =
                  "answer-option";

                if (
                  answered &&
                  index === question.answer
                ) {
                  className += " correct";
                }

                if (
                  answered &&
                  index === selectedAnswer &&
                  !isCorrect
                ) {
                  className += " incorrect";
                }

                return (
                  <button
                    key={index}
                    className={className}
                    disabled={answered}
                    onClick={() =>
                      chooseAnswer(index)
                    }
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
                  : "Review This One"}
              </strong>

              <p>{question.explanation}</p>

              {question.formula && (
                <div className="formula-callout">
                  <span>Formula</span>
                  <code>
                    {question.formula}
                  </code>
                </div>
              )}

              <div className="question-score">
                Score: {score}/
                {currentQuestion + 1}
              </div>

              <button
                className="next-button"
                onClick={nextQuestion}
              >
                Next Question →
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* =========================
   SKILLS
========================= */

function SkillsScreen({
  progress,
  onStartSection,
}: {
  progress: Record<string, number>;
  onStartSection: (
    chapter: number,
    section: string
  ) => void;
}) {
  return (
    <main className="main-content">
      <section className="hero-section compact">
        <div className="hero-badge">
          SKILL TRACKER
        </div>

        <h1>My Finance Skills</h1>

        <p>
          Practice each section to build familiarity
          and strengthen your understanding.
        </p>
      </section>

      {CHAPTERS.map((chapter) => (
        <section
          className="skill-chapter"
          key={chapter.id}
        >
          <div className="skill-chapter-header">
            <div>
              <div className="eyebrow">
                CHAPTER {chapter.id}
              </div>

              <h2>{chapter.title}</h2>
            </div>
          </div>

          {chapter.sections.map((section) => {
            const sectionQuestions =
              QUESTIONS.filter(
                (q) =>
                  q.chapter === chapter.id &&
                  q.section === section
              );

            const practiced =
              sectionQuestions.filter(
                (q) => progress[q.id]
              ).length;

            const percentage =
              sectionQuestions.length === 0
                ? 0
                : Math.round(
                    (practiced /
                      sectionQuestions.length) *
                      100
                  );

            return (
              <div
                className="skill-row"
                key={section}
              >
                <div className="skill-info">
                  <strong>{section}</strong>

                  <span>
                    {practiced}/
                    {sectionQuestions.length} practiced
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
                    onStartSection(
                      chapter.id,
                      section
                    )
                  }
                >
                  Train
                </button>
              </div>
            );
          })}
        </section>
      ))}
    </main>
  );
}

/* =========================
   FORMULAS
========================= */

function FormulaScreen() {
  const chapterNumbers = [
    ...new Set(
      FORMULAS.map((formula) => formula.chapter)
    ),
  ];

  return (
    <main className="main-content">
      <section className="hero-section compact">
        <div className="hero-badge">
          FORMULA REVIEW
        </div>

        <h1>Formula Book</h1>

        <p>
          Review the formulas from your Chapter 2
          and Chapter 3 course material.
        </p>
      </section>

      {chapterNumbers.map((chapter) => {
        const formulas =
          FORMULAS.filter(
            (formula) =>
              formula.chapter === chapter
          );

        return (
          <section
            className="formula-section"
            key={chapter}
          >
            <div className="section-heading">
              <div>
                <div className="eyebrow">
                  CHAPTER {chapter}
                </div>

                <h2>
                  {
                    CHAPTERS.find(
                      (c) => c.id === chapter
                    )?.title
                  }
                </h2>
              </div>

              <span className="question-count">
                {formulas.length} formulas
              </span>
            </div>

            <div className="formula-grid">
              {formulas.map((formula) => (
                <article
                  className="formula-card"
                  key={formula.id}
                >
                  <div className="formula-card-top">
                    <span>{formula.name}</span>

                    <span>
                      CH. {formula.chapter}
                    </span>
                  </div>

                  <div className="formula-display">
                    {formula.formula}
                  </div>

                  <p>
                    {formula.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}

export default App;
