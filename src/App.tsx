import { useState } from "react";

type Screen = "map" | "skills" | "formulas";

const chapters = [
  {
    number: 1,
    title: "Introduction to Corporate Finance",
    sections: [
      "Finance: A Quick Look",
      "Corporate Finance and the Financial Manager",
      "Forms of Business Organization",
      "The Goal of Financial Management",
      "Agency Problem and Control of the Corporation",
      "Financial Markets and the Corporation",
    ],
  },
  {
    number: 2,
    title: "Financial Statements, Cash Flow, and Taxes",
    sections: [
      "The Balance Sheet",
      "Book Values and Market Values",
      "The Income Statement",
      "Taxes",
      "Cash Flow",
    ],
  },
  {
    number: 3,
    title: "Working with Financial Statements",
    sections: [
      "Standardized Financial Statements",
      "Ratio Analysis",
      "Liquidity Ratios",
      "Financial Leverage Ratios",
      "Asset Management Ratios",
      "Profitability Ratios",
      "Market Value Ratios",
      "The DuPont Identity",
      "Using Financial Statement Information",
    ],
  },
];

const formulas = [
  {
    chapter: 2,
    name: "Net Working Capital",
    formula: "NWC = Current Assets − Current Liabilities",
  },
  {
    chapter: 2,
    name: "Operating Cash Flow",
    formula: "OCF = EBIT + Depreciation − Taxes",
  },
  {
    chapter: 2,
    name: "Net Capital Spending",
    formula:
      "NCS = Ending Net Fixed Assets − Beginning Net Fixed Assets + Depreciation",
  },
  {
    chapter: 2,
    name: "Change in Net Working Capital",
    formula: "ΔNWC = Ending NWC − Beginning NWC",
  },
  {
    chapter: 2,
    name: "Cash Flow from Assets",
    formula: "CFFA = OCF − NCS − ΔNWC",
  },
  {
    chapter: 2,
    name: "Cash Flow to Creditors",
    formula: "CF/CR = Interest Paid − Net New Borrowing",
  },
  {
    chapter: 2,
    name: "Cash Flow to Stockholders",
    formula: "CF/SH = Dividends Paid − Net New Equity Raised",
  },
  {
    chapter: 2,
    name: "Cash Flow Identity",
    formula: "CFFA = CF/CR + CF/SH",
  },
  {
    chapter: 3,
    name: "Current Ratio",
    formula: "Current Ratio = Current Assets / Current Liabilities",
  },
  {
    chapter: 3,
    name: "Quick Ratio",
    formula: "Quick Ratio = (Current Assets − Inventory) / Current Liabilities",
  },
  {
    chapter: 3,
    name: "Cash Ratio",
    formula: "Cash Ratio = Cash / Current Liabilities",
  },
  {
    chapter: 3,
    name: "Total Debt Ratio",
    formula: "Total Debt Ratio = (Total Assets − Total Equity) / Total Assets",
  },
  {
    chapter: 3,
    name: "Debt-to-Equity Ratio",
    formula: "D/E = Total Debt / Total Equity",
  },
  {
    chapter: 3,
    name: "Equity Multiplier",
    formula: "EM = Total Assets / Total Equity",
  },
  {
    chapter: 3,
    name: "Times Interest Earned",
    formula: "TIE = EBIT / Interest",
  },
  {
    chapter: 3,
    name: "Cash Coverage",
    formula: "Cash Coverage = (EBIT + Depreciation) / Interest",
  },
  {
    chapter: 3,
    name: "Inventory Turnover",
    formula: "Inventory Turnover = COGS / Inventory",
  },
  {
    chapter: 3,
    name: "Days' Sales in Inventory",
    formula: "Days' Sales in Inventory = 365 / Inventory Turnover",
  },
  {
    chapter: 3,
    name: "Receivables Turnover",
    formula: "Receivables Turnover = Sales / Accounts Receivable",
  },
  {
    chapter: 3,
    name: "Days' Sales in Receivables",
    formula: "Days' Sales in Receivables = 365 / Receivables Turnover",
  },
  {
    chapter: 3,
    name: "Payables Turnover",
    formula: "Payables Turnover = COGS / Accounts Payable",
  },
  {
    chapter: 3,
    name: "Days' Costs in Payables",
    formula: "Days' Costs in Payables = 365 / Payables Turnover",
  },
  {
    chapter: 3,
    name: "Total Asset Turnover",
    formula: "TAT = Sales / Total Assets",
  },
  {
    chapter: 3,
    name: "Capital Intensity Ratio",
    formula: "Capital Intensity Ratio = 1 / Total Asset Turnover",
  },
  {
    chapter: 3,
    name: "Profit Margin",
    formula: "PM = Net Income / Sales",
  },
  {
    chapter: 3,
    name: "Return on Assets",
    formula: "ROA = Net Income / Total Assets",
  },
  {
    chapter: 3,
    name: "Return on Equity",
    formula: "ROE = Net Income / Total Equity",
  },
  {
    chapter: 3,
    name: "Earnings Per Share",
    formula: "EPS = Net Income / Shares Outstanding",
  },
  {
    chapter: 3,
    name: "Price-Earnings Ratio",
    formula: "P/E = Price Per Share / EPS",
  },
  {
    chapter: 3,
    name: "Book Value Per Share",
    formula: "Book Value Per Share = Total Equity / Shares Outstanding",
  },
  {
    chapter: 3,
    name: "Market-to-Book",
    formula: "Market-to-Book = Price Per Share / Book Value Per Share",
  },
  {
    chapter: 3,
    name: "DuPont Identity",
    formula: "ROE = Profit Margin × Total Asset Turnover × Equity Multiplier",
  },
];

function App() {
  const [screen, setScreen] = useState<Screen>("map");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const openChapter = (chapter: number) => {
    setSelectedChapter(chapter);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div>
          <div className="logo">FINANCE WORLD</div>
          <div className="subtitle">Corporate Finance Study Quest</div>
        </div>

        <div className="player-stats">
          <div className="stat">
            <span>XP</span>
            <strong>0</strong>
          </div>

          <div className="stat">
            <span>STREAK</span>
            <strong>0</strong>
          </div>

          <div className="stat">
            <span>LEVEL</span>
            <strong>1</strong>
          </div>
        </div>
      </header>

      <nav className="navigation">
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
          className={screen === "formulas" ? "nav-button active" : "nav-button"}
          onClick={() => setScreen("formulas")}
        >
          📘 Formula Book
        </button>
      </nav>

      {screen === "map" && (
        <main className="main-content">
          <section className="hero">
            <div className="hero-badge">EXAM PREP • CHAPTERS 1–3</div>

            <h1>Build Your Finance Skills</h1>

            <p>
              Travel through each chapter, master individual concepts, practice
              formulas, and prepare for your exam.
            </p>
          </section>

          <section className="world-map">
            <div className="section-heading">
              <div>
                <h2>Finance World Map</h2>
                <p>
                  Complete each section to build coverage and increase mastery.
                </p>
              </div>
            </div>

            <div className="chapter-grid">
              {chapters.map((chapter) => (
                <div className="chapter-card" key={chapter.number}>
                  <div className="chapter-number">
                    WORLD {chapter.number}
                  </div>

                  <h3>{chapter.title}</h3>

                  <div className="progress-container">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: "0%" }} />
                    </div>
                    <span>0%</span>
                  </div>

                  <div className="section-list">
                    {chapter.sections.map((section, index) => (
                      <button
                        className={
                          index === 0
                            ? "section-node unlocked"
                            : "section-node locked"
                        }
                        key={section}
                        onClick={() => index === 0 && openChapter(chapter.number)}
                      >
                        <span className="node-number">{index + 1}</span>

                        <span className="node-text">{section}</span>

                        <span className="node-status">
                          {index === 0 ? "▶" : "🔒"}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    className="chapter-button"
                    onClick={() => openChapter(chapter.number)}
                  >
                    Enter World {chapter.number}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="quick-actions">
            <button className="action-card" onClick={() => setScreen("skills")}>
              <span className="action-icon">🎯</span>
              <div>
                <strong>Raise My Skills</strong>
                <p>Practice your weakest finance concepts.</p>
              </div>
            </button>

            <button
              className="action-card"
              onClick={() => setScreen("formulas")}
            >
              <span className="action-icon">🧮</span>
              <div>
                <strong>Formula Training</strong>
                <p>Build formula recognition and recall.</p>
              </div>
            </button>
          </section>

          {selectedChapter && (
            <div className="modal-backdrop">
              <div className="chapter-modal">
                <button
                  className="close-button"
                  onClick={() => setSelectedChapter(null)}
                >
                  ×
                </button>

                <div className="hero-badge">
                  WORLD {selectedChapter}
                </div>

                <h2>{chapters[selectedChapter - 1].title}</h2>

                <p>
                  This world contains {chapters[selectedChapter - 1].sections.length}{" "}
                  study sections.
                </p>

                <div className="mode-grid">
                  <button className="mode-card">
                    <span>📚</span>
                    <strong>Study Run</strong>
                    <small>Learn and practice concepts.</small>
                  </button>

                  <button className="mode-card">
                    <span>🎯</span>
                    <strong>Skill Training</strong>
                    <small>Target individual weaknesses.</small>
                  </button>

                  <button className="mode-card">
                    <span>👑</span>
                    <strong>Chapter Boss</strong>
                    <small>Unlock after completing the world.</small>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {screen === "skills" && (
        <main className="main-content">
          <section className="page-header">
            <div className="hero-badge">PLAYER DEVELOPMENT</div>
            <h1>My Finance Skills</h1>
            <p>
              Your understanding is tracked separately for each finance skill.
            </p>
          </section>

          <div className="mastery-scale">
            <div>
              <span className="mastery-level level-0">0</span>
              <strong>Not Learned</strong>
            </div>
            <div>
              <span className="mastery-level level-1">1</span>
              <strong>Familiar</strong>
            </div>
            <div>
              <span className="mastery-level level-2">2</span>
              <strong>Developing</strong>
            </div>
            <div>
              <span className="mastery-level level-3">3</span>
              <strong>Proficient</strong>
            </div>
            <div>
              <span className="mastery-level level-4">4</span>
              <strong>Mastered</strong>
            </div>
          </div>

          <div className="skill-section">
            {[1, 2, 3].map((chapterNumber) => {
              const chapter = chapters[chapterNumber - 1];

              return (
                <div className="skill-chapter" key={chapterNumber}>
                  <h2>World {chapterNumber}</h2>

                  {chapter.sections.map((section, index) => (
                    <div className="skill-row" key={section}>
                      <div className="skill-name">
                        <span>{index + 1}</span>
                        <div>
                          <strong>{section}</strong>
                          <small>Understanding Level 0 / 4</small>
                        </div>
                      </div>

                      <div className="skill-progress">
                        <div
                          className="skill-progress-fill"
                          style={{ width: "0%" }}
                        />
                      </div>

                      <button className="train-button">Train</button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </main>
      )}

      {screen === "formulas" && (
        <main className="main-content">
          <section className="page-header">
            <div className="hero-badge">FORMULA TRAINING</div>
            <h1>Formula Book</h1>
            <p>
              Learn the formula, recognize when to use it, then practice
              calculations.
            </p>
          </section>

          {[2, 3].map((chapterNumber) => (
            <section className="formula-section" key={chapterNumber}>
              <h2>Chapter {chapterNumber}</h2>

              <div className="formula-grid">
                {formulas
                  .filter((formula) => formula.chapter === chapterNumber)
                  .map((formula) => (
                    <div className="formula-card" key={formula.name}>
                      <div className="formula-title">
                        <span>ƒx</span>
                        <strong>{formula.name}</strong>
                      </div>

                      <div className="formula">
                        {formula.formula}
                      </div>

                      <div className="formula-level">
                        Formula Mastery: <strong>0 / 4</strong>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </main>
      )}

      <footer className="footer">
        <span>Finance World</span>
        <span>Built for Corporate Finance Exam Prep</span>
      </footer>
    </div>
  );
}

export default App;
