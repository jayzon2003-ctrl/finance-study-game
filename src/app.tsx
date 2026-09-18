import { useMemo, useState } from "react";
import { CHAPTERS, FORMULAS, QUESTIONS } from "./data";

type Screen = "map" | "skills" | "formulas";

type Progress = Record<string, number>;

const chapterColors: Record<number, string> = {
  1: "#FFC907",
  2: "#2E9DF7",
  3: "#4FCB53",
};

function App() {
  const [screen, setScreen] = useState<Screen>("map");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [showWorld, setShowWorld] = useState(false);

  const [progress, setProgress] = useState<Progress>(() => {
    try {
      const saved = localStorage.getItem("finance-world-progress");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const totalQuestions = QUESTIONS.length;
  const completedQuestions = Object.values(progress).reduce(
    (sum, value) => sum + value,
    0
  );

  const overallProgress =
    totalQuestions === 0
      ? 0
      : Math.min(100, Math.round((completedQuestions / totalQuestions) * 100));

  const chapterQuestionCounts = useMemo(() => {
    const counts: Record<number, number> = {};

    CHAPTERS.forEach((chapter) => {
      counts[chapter.id] = QUESTIONS.filter(
        (question) => question.chapter === chapter.id
      ).length;
    });

    return counts;
  }, []);

  function openChapter(chapterId: number) {
    setSelectedChapter(chapterId);
    setShowWorld(true);
  }

  function closeWorld() {
    setShowWorld(false);
    setSelectedChapter(null);
  }

  function updateProgress(questionId: string) {
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

  if (screen === "skills") {
    return (
      <SkillsScreen
        onBack={() => setScreen("map")}
        chapters={CHAPTERS}
        progress={progress}
      />
    );
  }

  if (screen === "formulas") {
    return (
      <FormulaScreen
        onBack={() => setScreen("map")}
        formulas={FORMULAS}
      />
    );
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">$</div>
          <div>
            <div className="brand-name">FINANCE WORLD</div>
            <div className="brand-subtitle">Corporate Finance Quest</div>
          </div>
        </div>

        <div className="player-stats">
          <div className="stat">
            <span className="stat-label">LEVEL</span>
            <strong>{Math.max(1, Math.floor(completedQuestions / 5) + 1)}</strong>
          </div>

          <div className="stat">
            <span className="stat-label">QUESTIONS</span>
            <strong>
              {completedQuestions}/{totalQuestions}
            </strong>
          </div>

          <div className="stat">
            <span className="stat-label">PROGRESS</span>
            <strong>{overallProgress}%</strong>
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
          className="nav-button"
          onClick={() => setScreen("skills")}
        >
          📈 My Skills
        </button>

        <button
          className="nav-button"
          onClick={() => setScreen("formulas")}
        >
          📘 Formula Book
        </button>
      </nav>

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-badge">EXAM PREP • CHAPTERS 1–3</div>

          <h1>Build Your Finance World</h1>

          <p>
            Master corporate finance one section at a time.
            Learn concepts, train formulas, solve calculations,
            and raise your skill levels before exam day.
          </p>

          <div className="hero-progress">
            <div className="hero-progress-header">
              <span>Overall Course Progress</span>
              <strong>{overallProgress}%</strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </section>

        <section className="section-heading">
          <div>
            <div className="eyebrow">THE WORLDS</div>
            <h2>Choose Your Chapter</h2>
          </div>

          <span className="question-count">
            {totalQuestions} practice questions loaded
          </span>
        </section>

        <section className="world-grid">
          {CHAPTERS.map((chapter, index) => {
            const isLocked = index > 0;
            const questionCount = chapterQuestionCounts[chapter.id] || 0;

            return (
              <article
                key={chapter.id}
                className={`world-card ${isLocked ? "locked" : ""}`}
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
                  {isLocked ? "🔒 LOCKED" : "✓ AVAILABLE"}
                </div>

                <h3>{chapter.title}</h3>

                <p>{chapter.description}</p>

                <div className="world-meta">
                  <span>{questionCount} questions</span>
                  <span>{chapter.sections.length} sections</span>
                </div>

                <button
                  className="world-button"
                  disabled={isLocked}
                  onClick={() => openChapter(chapter.id)}
                >
                  {isLocked ? "Complete Previous World" : "Enter World →"}
                </button>
              </article>
            );
          })}
        </section>

        <section className="quick-actions">
          <div className="section-heading">
            <div>
              <div className="eyebrow">TRAINING</div>
              <h2>Choose Your Training</h2>
            </div>
          </div>

          <div className="action-grid">
            <button
              className="action-card"
              onClick={() => setScreen("skills")}
            >
              <span className="action-icon">🎯</span>
              <div>
                <strong>Raise My Skills</strong>
                <p>Focus on the concepts you understand least.</p>
              </div>
            </button>

            <button
              className="action-card"
              onClick={() => setScreen("formulas")}
            >
              <span className="action-icon">🧮</span>
              <div>
                <strong>Formula Training</strong>
                <p>Review the formulas you need for the exam.</p>
              </div>
            </button>

            <button
              className="action-card"
              onClick={() => openChapter(1)}
            >
              <span className="action-icon">⚔️</span>
              <div>
                <strong>Study Run</strong>
                <p>Enter a chapter and practice its questions.</p>
              </div>
            </button>
          </div>
        </section>
      </main>

      <footer>
        <span>Finance World</span>
        <span>Corporate Finance • Exam Prep</span>
      </footer>

      {showWorld && selectedChapter !== null && (
        <WorldModal
          chapterId={selectedChapter}
          onClose={closeWorld}
          progress={progress}
          onAnswer={updateProgress}
        />
      )}
    </div>
  );
}

function WorldModal({
  chapterId,
  onClose,
  progress,
  onAnswer,
}: {
  chapterId: number;
  onClose: () => void;
  progress: Progress;
  onAnswer: (questionId: string) => void;
}) {
  const chapter = CHAPTERS.find((item) => item.id === chapterId);

  const questions = QUESTIONS.filter(
    (question) => question.chapter === chapterId
  );

  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const sectionQuestions = selectedSection
    ? questions.filter((question) => question.section === selectedSection)
    : [];

  if (!chapter) return null;

  return (
    <div className="modal-backdrop">
      <div className="world-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <div
            className="modal-world-number"
            style={{ backgroundColor: chapterColors[chapterId] }}
          >
            {chapterId}
          </div>

          <div>
            <div className="eyebrow">WORLD {chapterId}</div>
            <h2>{chapter.title}</h2>
            <p>{chapter.description}</p>
          </div>
        </div>

        {!selectedSection ? (
          <>
            <h3 className="modal-section-title">
              Choose a Section
            </h3>

            <div className="section-list">
              {chapter.sections.map((section, index) => {
                const sectionQs = questions.filter(
                  (question) => question.section === section
                );

                const completed = sectionQs.filter(
                  (question) => progress[question.id]
                ).length;

                return (
                  <button
                    key={section}
                    className="section-node"
                    onClick={() => setSelectedSection(section)}
                  >
                    <span className="node-number">{index + 1}</span>

                    <span className="node-info">
                      <strong>{section}</strong>
                      <small>
                        {completed}/{sectionQs.length} practiced
                      </small>
                    </span>

                    <span className="node-arrow">→</span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <QuestionList
            chapter={chapterId}
            section={selectedSection}
            questions={sectionQuestions}
            onBack={() => setSelectedSection(null)}
            onAnswer={onAnswer}
            progress={progress}
          />
        )}
      </div>
    </div>
  );
}

function QuestionList({
  chapter,
  section,
  questions,
  onBack,
  onAnswer,
  progress,
}: {
  chapter: number;
  section: string;
  questions: typeof QUESTIONS;
  onBack: () => void;
  onAnswer: (questionId: string) => void;
  progress: Progress;
}) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  if (questions.length === 0) {
    return (
      <div>
        <button className="back-button" onClick={onBack}>
          ← Back to sections
        </button>

        <h3>No questions found for this section.</h3>
      </div>
    );
  }

  const question = questions[current];
  const correct = selected === question.answer;

  function chooseAnswer(index: number) {
    if (answered) return;

    setSelected(index);
    setAnswered(true);

    if (index === question.answer) {
      onAnswer(question.id);
    }
  }

  function nextQuestion() {
    setSelected(null);
    setAnswered(false);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  }

  return (
    <div className="question-area">
      <button className="back-button" onClick={onBack}>
        ← Back to sections
      </button>

      <div className="question-topline">
        <span>
          Chapter {chapter} • {section}
        </span>

        <span>
          {current + 1}/{questions.length}
        </span>
      </div>

      <div className="question-progress">
        <div
          className="question-progress-fill"
          style={{
            width: `${((current + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="question-card">
        <div className="question-type">
          {question.type.toUpperCase()}
        </div>

        <h3>{question.question}</h3>

        <div className="answer-options">
          {question.options.map((option, index) => {
            let className = "answer-option";

            if (answered && index === question.answer) {
              className += " correct";
            }

            if (answered && index === selected && !correct) {
              className += " incorrect";
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => chooseAnswer(index)}
                disabled={answered}
              >
                <span className="answer-letter">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            className={`explanation ${
              correct ? "explanation-correct" : "explanation-incorrect"
            }`}
          >
            <strong>{correct ? "Correct!" : "Review This One"}</strong>

            <p>{question.explanation}</p>

            {question.formula && (
              <div className="formula-callout">
                <span>Formula</span>
                <code>{question.formula}</code>
              </div>
            )}

            {current < questions.length - 1 ? (
              <button className="next-button" onClick={nextQuestion}>
                Next Question →
              </button>
            ) : (
              <div className="complete-message">
                🎉 Section complete! You've reached the end of this run.
              </div>
            )}
          </div>
        )}
      </div>

      {progress[question.id] ? (
        <div className="previously-practiced">
          ✓ You've practiced this concept before.
        </div>
      ) : null}
    </div>
  );
}

function SkillsScreen({
  onBack,
  chapters,
  progress,
}: {
  onBack: () => void;
  chapters: typeof CHAPTERS;
  progress: Progress;
}) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">$</div>
          <div>
            <div className="brand-name">FINANCE WORLD</div>
            <div className="brand-subtitle">My Skills</div>
          </div>
        </div>

        <button className="header-back" onClick={onBack}>
          ← Study Map
        </button>
      </header>

      <main className="main-content">
        <section className="hero-section compact">
          <div className="hero-badge">MASTERY TRACKER</div>

          <h1>Raise Your Skills</h1>

          <p>
            Your understanding will eventually be tracked separately
            for each finance skill.
          </p>
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

        {chapters.map((chapter) => {
          const chapterQuestions = QUESTIONS.filter(
            (question) => question.chapter === chapter.id
          );

          const practiced = chapterQuestions.filter(
            (question) => progress[question.id]
          ).length;

          return (
            <section className="skill-chapter" key={chapter.id}>
              <div className="skill-chapter-header">
                <div>
                  <span className="eyebrow">
                    WORLD {chapter.id}
                  </span>
                  <h2>{chapter.title}</h2>
                </div>

                <strong>
                  {practiced}/{chapterQuestions.length} practiced
                </strong>
              </div>

              {chapter.sections.map((section) => {
                const sectionQs = chapterQuestions.filter(
                  (question) => question.section === section
                );

                const sectionPracticed = sectionQs.filter(
                  (question) => progress[question.id]
                ).length;

                const percentage =
                  sectionQs.length === 0
                    ? 0
                    : Math.round(
                        (sectionPracticed / sectionQs.length) * 100
                      );

                return (
                  <div className="skill-row" key={section}>
                    <div className="skill-info">
                      <strong>{section}</strong>
                      <span>
                        {sectionPracticed}/{sectionQs.length} practiced
                      </span>
                    </div>

                    <div className="skill-bar">
                      <div
                        className="skill-bar-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <button
                      className="train-button"
                      onClick={onBack}
                    >
                      Train
                    </button>
                  </div>
                );
              })}
            </section>
          );
        })}
      </main>

      <footer>
        <span>Finance World</span>
        <span>Mastery • Practice • Retrieval</span>
      </footer>
    </div>
  );
}

function FormulaScreen({
  onBack,
  formulas,
}: {
  onBack: () => void;
  formulas: typeof FORMULAS;
}) {
  const chapters = [...new Set(formulas.map((formula) => formula.chapter))];

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">ƒ</div>
          <div>
            <div className="brand-name">FINANCE WORLD</div>
            <div className="brand-subtitle">Formula Book</div>
          </div>
        </div>

        <button className="header-back" onClick={onBack}>
          ← Study Map
        </button>
      </header>

      <main className="main-content">
        <section className="hero-section compact">
          <div className="hero-badge">EXAM FORMULAS</div>

          <h1>Formula Book</h1>

          <p>
            Your formulas are organized by chapter so you can
            review them before calculation questions.
          </p>
        </section>

        {chapters.map((chapter) => {
          const chapterFormulas = formulas.filter(
            (formula) => formula.chapter === chapter
          );

          return (
            <section className="formula-section" key={chapter}>
              <div className="section-heading">
                <div>
                  <div className="eyebrow">CHAPTER {chapter}</div>
                  <h2>
                    {CHAPTERS.find((item) => item.id === chapter)?.title}
                  </h2>
                </div>

                <span className="question-count">
                  {chapterFormulas.length} formulas
                </span>
              </div>

              <div className="formula-grid">
                {chapterFormulas.map((formula) => (
                  <article className="formula-card" key={formula.id}>
                    <div className="formula-card-top">
                      <span>{formula.name}</span>
                      <span>CH. {formula.chapter}</span>
                    </div>

                    <div className="formula-display">
                      {formula.formula}
                    </div>

                    <p>{formula.description}</p>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </main>

      <footer>
        <span>Finance World</span>
        <span>Formula Training</span>
      </footer>
    </div>
  );
}

export default App;
