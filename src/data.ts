export type Question = {
  id: string;
  chapter: number;
  section: string;
  skill: string;
  type: "concept" | "calculation" | "formula" | "application";
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  formula?: string;
};

export type Formula = {
  id: string;
  chapter: number;
  name: string;
  formula: string;
  use: string;
};

/*
  FINANCE WORLD QUESTION DATABASE

  The questions below are based on the Chapter 1–3 course material
  provided for this study project.

  They are original practice questions based on the material,
  rather than copied textbook questions.
*/

export const QUESTIONS: Question[] = [
  // ============================================================
  // CHAPTER 1
  // ============================================================

  {
    id: "c1-001",
    chapter: 1,
    section: "Finance: A Quick Look",
    skill: "Areas of Finance",
    type: "concept",
    question:
      "Which area of finance focuses on financial assets such as stocks and bonds?",
    options: [
      "Investments",
      "Working capital management",
      "Financial accounting",
      "Operations management",
    ],
    answer: 0,
    explanation:
      "Investments focuses on financial assets such as stocks and bonds, including valuation and the relationship between risk and return.",
  },

  {
    id: "c1-002",
    chapter: 1,
    section: "Finance: A Quick Look",
    skill: "Financial Institutions",
    type: "concept",
    question:
      "Which of the following is an example of a financial institution?",
    options: [
      "Bank",
      "Manufacturing plant",
      "Grocery store",
      "Construction site",
    ],
    answer: 0,
    explanation:
      "Banks, insurance companies, and brokerage firms are examples of financial institutions.",
  },

  {
    id: "c1-003",
    chapter: 1,
    section: "Finance: A Quick Look",
    skill: "International Finance",
    type: "application",
    question:
      "A finance professional who trades currencies would most directly work in which area?",
    options: [
      "International finance",
      "Cost accounting",
      "Capital budgeting",
      "Working capital management",
    ],
    answer: 0,
    explanation:
      "International finance includes issues involving exchange rates, political risk, and international business environments.",
  },

  {
    id: "c1-004",
    chapter: 1,
    section: "Corporate Finance and the Financial Manager",
    skill: "Financial Manager Roles",
    type: "concept",
    question:
      "Which position is usually the top financial manager in a corporation?",
    options: ["CFO", "Controller", "Auditor", "Production manager"],
    answer: 0,
    explanation:
      "The Chief Financial Officer, or CFO, is usually the top financial manager.",
  },

  {
    id: "c1-005",
    chapter: 1,
    section: "Corporate Finance and the Financial Manager",
    skill: "Treasurer vs Controller",
    type: "concept",
    question:
      "Which responsibility is most closely associated with the treasurer?",
    options: [
      "Cash management",
      "Tax accounting only",
      "Cost accounting only",
      "Preparing production schedules",
    ],
    answer: 0,
    explanation:
      "Treasury responsibilities include cash management, credit management, capital expenditures, and financial planning.",
  },

  {
    id: "c1-006",
    chapter: 1,
    section: "Corporate Finance and the Financial Manager",
    skill: "Treasurer vs Controller",
    type: "concept",
    question:
      "Which responsibility is most closely associated with the controller?",
    options: [
      "Financial accounting",
      "Cash management",
      "Credit management",
      "Capital expenditures",
    ],
    answer: 0,
    explanation:
      "The controller is responsible for areas including taxes, cost accounting, financial accounting, and data processing.",
  },

  {
    id: "c1-007",
    chapter: 1,
    section: "Corporate Finance and the Financial Manager",
    skill: "Capital Budgeting",
    type: "concept",
    question:
      "Capital budgeting primarily asks which question?",
    options: [
      "Which long-term investments should the business take on?",
      "How should employees be scheduled today?",
      "Which products should be advertised?",
      "How should inventory be counted?",
    ],
    answer: 0,
    explanation:
      "Capital budgeting concerns decisions about long-term investments and projects.",
  },

  {
    id: "c1-008",
    chapter: 1,
    section: "Corporate Finance and the Financial Manager",
    skill: "Capital Structure",
    type: "concept",
    question:
      "Capital structure decisions concern:",
    options: [
      "How the firm's assets should be financed",
      "Which customers should receive discounts",
      "How products should be packaged",
      "How inventory should be physically stored",
    ],
    answer: 0,
    explanation:
      "Capital structure concerns how the firm finances its assets, including the use of debt and equity.",
  },

  {
    id: "c1-009",
    chapter: 1,
    section: "Corporate Finance and the Financial Manager",
    skill: "Working Capital Management",
    type: "concept",
    question:
      "Working capital management primarily concerns:",
    options: [
      "Day-to-day financial activities",
      "Only long-term investments",
      "Only issuing common stock",
      "International exchange rates",
    ],
    answer: 0,
    explanation:
      "Working capital management deals with the firm's day-to-day financial activities.",
  },

  {
    id: "c1-010",
    chapter: 1,
    section: "Forms of Business Organization",
    skill: "Sole Proprietorship",
    type: "concept",
    question:
      "Which statement describes a sole proprietorship?",
    options: [
      "The owner has unlimited personal liability",
      "The business is always taxed twice",
      "Ownership must be divided among shareholders",
      "The business has unlimited life",
    ],
    answer: 0,
    explanation:
      "A major disadvantage of a sole proprietorship is unlimited liability for the owner.",
  },

  {
    id: "c1-011",
    chapter: 1,
    section: "Forms of Business Organization",
    skill: "Corporation",
    type: "concept",
    question:
      "A corporation is best described as:",
    options: [
      "A separate legal entity",
      "An extension of the owner's personal bank account",
      "A business with only one possible owner",
      "A business with unlimited personal liability",
    ],
    answer: 0,
    explanation:
      "A corporation is a separate legal entity from its owners.",
  },

  {
    id: "c1-012",
    chapter: 1,
    section: "Forms of Business Organization",
    skill: "Corporation Advantages",
    type: "concept",
    question:
      "Which is an advantage of the corporate form of organization?",
    options: [
      "Limited liability",
      "Unlimited personal liability",
      "Difficult transfer of ownership",
      "Limited life",
    ],
    answer: 0,
    explanation:
      "Corporations provide limited liability and generally have unlimited life and easier transfer of ownership.",
  },

  {
    id: "c1-013",
    chapter: 1,
    section: "The Goal of Financial Management",
    skill: "Goal of Financial Management",
    type: "concept",
    question:
      "According to the course material, the primary goal of financial management is to:",
    options: [
      "Maximize the current value per share of existing stock",
      "Maximize the number of employees",
      "Minimize all business expenses regardless of consequences",
      "Maximize sales at any cost",
    ],
    answer: 0,
    explanation:
      "The goal is to maximize the current value per share of existing stock, or the market value of existing owners' equity.",
  },

  {
    id: "c1-014",
    chapter: 1,
    section: "Agency Problem and Control of the Corporation",
    skill: "Agency Problem",
    type: "concept",
    question:
      "The agency problem exists because:",
    options: [
      "Managers and owners may have conflicting interests",
      "Customers always control managers",
      "Creditors own all corporations",
      "Employees automatically become shareholders",
    ],
    answer: 0,
    explanation:
      "Stockholders are principals and managers are agents. Their interests can conflict, creating agency costs.",
  },

  {
    id: "c1-015",
    chapter: 1,
    section: "Agency Problem and Control of the Corporation",
    skill: "Stakeholders",
    type: "concept",
    question:
      "Which person or group is considered a stakeholder other than a stockholder or creditor?",
    options: [
      "Employee",
      "Stock certificate",
      "Balance sheet",
      "Share price",
    ],
    answer: 0,
    explanation:
      "Stakeholders can include employees, customers, suppliers, and government entities that may have claims on the firm's cash flows.",
  },

  {
    id: "c1-016",
    chapter: 1,
    section: "Financial Markets and the Corporation",
    skill: "Primary vs Secondary Markets",
    type: "concept",
    question:
      "What is the primary market?",
    options: [
      "A market where securities are originally sold by the issuer",
      "A market where only used equipment is sold",
      "A market for employee wages",
      "A market for consumer groceries",
    ],
    answer: 0,
    explanation:
      "The primary market is where securities are originally sold by the issuing company.",
  },

  {
    id: "c1-017",
    chapter: 1,
    section: "Financial Markets and the Corporation",
    skill: "Sarbanes-Oxley Act",
    type: "concept",
    question:
      "The Sarbanes-Oxley Act of 2002 was enacted in response to concerns about:",
    options: [
      "Accounting fraud and financial malpractice",
      "International shipping costs",
      "Retail inventory shortages",
      "Employee scheduling",
    ],
    answer: 0,
    explanation:
      "The act strengthened protections against accounting fraud and financial malpractice following major corporate scandals.",
  },

  // --- FNAN 300 Exam 1 Practice Questions ---

  {
    id: "c1-e01",
    chapter: 1,
    section: "Forms of Business Organization",
    skill: "Sole Proprietorship",
    type: "concept",
    question:
      "Margie opened a used bookstore and is both the 100 percent owner and the store's manager. Which type of business entity does Margie own if she is personally liable for all the store's debts?",
    options: [
      "Sole proprietorship",
      "Limited partnership",
      "Corporation",
      "Joint stock company",
      "General partnership",
    ],
    answer: 0,
    explanation:
      "A sole proprietorship means the owner has unlimited personal liability for all business debts. Margie is the sole owner and manager with personal liability, which is the defining characteristic of a sole proprietorship.",
  },

  {
    id: "c1-e02",
    chapter: 1,
    section: "Agency Problem and Control of the Corporation",
    skill: "Agency Problem",
    type: "concept",
    question:
      "The potential conflict of interest between a firm's owners and its managers is referred to as which type of conflict?",
    options: [
      "Organizational",
      "Structural",
      "Formative",
      "Agency",
      "Territorial",
    ],
    answer: 3,
    explanation:
      "The agency problem (or agency conflict) arises because stockholders (principals) and managers (agents) may have conflicting interests. Managers may act in their own self-interest rather than maximizing shareholder value.",
  },

  {
    id: "c1-e03",
    chapter: 1,
    section: "The Goal of Financial Management",
    skill: "Goal of Financial Management",
    type: "concept",
    question:
      "The goal of financial management is to increase the:",
    options: [
      "future value of the firm's total equity",
      "book value of equity",
      "dividends paid per share",
      "current market value per share",
      "number of shares outstanding",
    ],
    answer: 3,
    explanation:
      "The goal of financial management is to maximize the current market value per share of existing stock, which is equivalent to maximizing the market value of existing owners' equity.",
  },

  // ============================================================
  // CHAPTER 2
  // ============================================================

  {
    id: "c2-001",
    chapter: 2,
    section: "The Balance Sheet",
    skill: "Balance Sheet Identity",
    type: "formula",
    question:
      "A firm has total assets of $500,000 and total liabilities of $220,000. What is total stockholders' equity?",
    options: ["$280,000", "$320,000", "$720,000", "$220,000"],
    answer: 0,
    explanation:
      "Assets = Liabilities + Equity. Therefore, Equity = $500,000 − $220,000 = $280,000.",
    formula: "Assets = Liabilities + Stockholders' Equity",
  },

  {
    id: "c2-002",
    chapter: 2,
    section: "The Balance Sheet",
    skill: "Net Working Capital",
    type: "calculation",
    question:
      "A firm has current assets of $120,000 and current liabilities of $70,000. What is net working capital?",
    options: ["$50,000", "$190,000", "$70,000", "$120,000"],
    answer: 0,
    explanation:
      "NWC = Current Assets − Current Liabilities = $120,000 − $70,000 = $50,000.",
    formula: "NWC = CA − CL",
  },

  {
    id: "c2-003",
    chapter: 2,
    section: "The Balance Sheet",
    skill: "Net Working Capital",
    type: "calculation",
    question:
      "A firm has net working capital of $12,000 and current liabilities of $17,000. What are current assets?",
    options: ["$29,000", "$5,000", "$12,000", "$17,000"],
    answer: 0,
    explanation:
      "NWC = CA − CL. Rearranging gives CA = NWC + CL = $12,000 + $17,000 = $29,000.",
    formula: "CA = NWC + CL",
  },

  {
    id: "c2-004",
    chapter: 2,
    section: "Book Values and Market Values",
    skill: "Book vs Market Value",
    type: "concept",
    question:
      "Which value represents the amount at which an asset could actually be bought or sold in the market?",
    options: ["Market value", "Book value", "Historical value", "Tax value"],
    answer: 0,
    explanation:
      "Market value represents the current price at which an asset could be bought or sold.",
  },

  {
    id: "c2-005",
    chapter: 2,
    section: "Book Values and Market Values",
    skill: "Book vs Market Value",
    type: "concept",
    question:
      "Which value is generally more relevant for financial decision-making?",
    options: ["Market value", "Book value", "Original cost", "Tax basis"],
    answer: 0,
    explanation:
      "Market value is generally more relevant for financial decisions because it reflects current economic value.",
  },

  {
    id: "c2-006",
    chapter: 2,
    section: "The Income Statement",
    skill: "Income Statement",
    type: "concept",
    question:
      "The income statement primarily measures:",
    options: [
      "Revenues and expenses over a period",
      "Assets and liabilities at one point in time",
      "Only cash held by the company",
      "Only stockholders' equity",
    ],
    answer: 0,
    explanation:
      "The income statement reports revenues and expenses over a period and arrives at net income.",
  },

  {
    id: "c2-007",
    chapter: 2,
    section: "The Income Statement",
    skill: "Net Income",
    type: "calculation",
    question:
      "If a firm has revenue of $900,000 and total expenses of $650,000, what is net income?",
    options: ["$250,000", "$1,550,000", "$650,000", "$900,000"],
    answer: 0,
    explanation:
      "Net Income = Revenue − Expenses = $900,000 − $650,000 = $250,000.",
    formula: "Net Income = Revenue − Expenses",
  },

  {
    id: "c2-008",
    chapter: 2,
    section: "Taxes",
    skill: "Marginal vs Average Tax Rate",
    type: "concept",
    question:
      "The marginal tax rate is the:",
    options: [
      "Percentage of tax paid on the next dollar earned",
      "Total tax divided by total assets",
      "Average tax paid on all previous years",
      "Tax rate applied only to dividends",
    ],
    answer: 0,
    explanation:
      "The marginal tax rate is the percentage of tax paid on the next dollar earned.",
  },

  {
    id: "c2-009",
    chapter: 2,
    section: "Taxes",
    skill: "Marginal vs Average Tax Rate",
    type: "calculation",
    question:
      "A taxpayer owes $16,569 in taxes on taxable income of $100,000. What is the average tax rate?",
    options: ["16.57%", "24.00%", "8.28%", "21.00%"],
    answer: 0,
    explanation:
      "Average tax rate = Total taxes / Taxable income = $16,569 / $100,000 = 16.57%.",
    formula: "Average Tax Rate = Total Taxes / Taxable Income",
  },

  {
    id: "c2-010",
    chapter: 2,
    section: "Taxes",
    skill: "Marginal vs Average Tax Rate",
    type: "concept",
    question:
      "In the course's $100,000 taxable-income tax example, what was the marginal tax rate?",
    options: ["24%", "16.57%", "21%", "10%"],
    answer: 0,
    explanation:
      "In the course example using the 2021 tax brackets, the marginal rate at $100,000 of taxable income was 24%.",
  },

  {
    id: "c2-011",
    chapter: 2,
    section: "Cash Flow",
    skill: "Operating Cash Flow",
    type: "calculation",
    question:
      "A firm has EBIT of $500,000, depreciation of $80,000, and taxes of $120,000. What is operating cash flow?",
    options: ["$460,000", "$580,000", "$340,000", "$540,000"],
    answer: 0,
    explanation:
      "OCF = EBIT + Depreciation − Taxes = $500,000 + $80,000 − $120,000 = $460,000.",
    formula: "OCF = EBIT + Depreciation − Taxes",
  },

  {
    id: "c2-012",
    chapter: 2,
    section: "Cash Flow",
    skill: "Net Capital Spending",
    type: "calculation",
    question:
      "Beginning net fixed assets are $800,000, ending net fixed assets are $900,000, and depreciation is $70,000. What is net capital spending?",
    options: ["$170,000", "$30,000", "$100,000", "$970,000"],
    answer: 0,
    explanation:
      "NCS = Ending NFA − Beginning NFA + Depreciation = $900,000 − $800,000 + $70,000 = $170,000.",
    formula: "NCS = Ending NFA − Beginning NFA + Depreciation",
  },

  {
    id: "c2-013",
    chapter: 2,
    section: "Cash Flow",
    skill: "Change in NWC",
    type: "calculation",
    question:
      "Beginning NWC is $190,000 and ending NWC is $240,000. What is the change in NWC?",
    options: ["$50,000", "$430,000", "$190,000", "$240,000"],
    answer: 0,
    explanation:
      "ΔNWC = Ending NWC − Beginning NWC = $240,000 − $190,000 = $50,000.",
    formula: "ΔNWC = Ending NWC − Beginning NWC",
  },

  {
    id: "c2-014",
    chapter: 2,
    section: "Cash Flow",
    skill: "Cash Flow from Assets",
    type: "calculation",
    question:
      "If OCF is $460,000, NCS is $170,000, and ΔNWC is $50,000, what is cash flow from assets?",
    options: ["$240,000", "$680,000", "$340,000", "$290,000"],
    answer: 0,
    explanation:
      "CFFA = OCF − NCS − ΔNWC = $460,000 − $170,000 − $50,000 = $240,000.",
    formula: "CFFA = OCF − NCS − ΔNWC",
  },

  {
    id: "c2-015",
    chapter: 2,
    section: "Cash Flow",
    skill: "Cash Flow to Creditors",
    type: "calculation",
    question:
      "A firm paid $70,000 in interest and borrowed a net $25,000. What is cash flow to creditors?",
    options: ["$45,000", "$95,000", "$25,000", "$70,000"],
    answer: 0,
    explanation:
      "CF/CR = Interest Paid − Net New Borrowing = $70,000 − $25,000 = $45,000.",
    formula: "CF/CR = Interest Paid − Net New Borrowing",
  },

  {
    id: "c2-016",
    chapter: 2,
    section: "Cash Flow",
    skill: "Cash Flow to Stockholders",
    type: "calculation",
    question:
      "A firm paid $60,000 in dividends and raised $15,000 in net new equity. What is cash flow to stockholders?",
    options: ["$45,000", "$75,000", "$15,000", "$60,000"],
    answer: 0,
    explanation:
      "CF/SH = Dividends Paid − Net New Equity Raised = $60,000 − $15,000 = $45,000.",
    formula: "CF/SH = Dividends Paid − Net New Equity Raised",
  },

  {
    id: "c2-017",
    chapter: 2,
    section: "Cash Flow",
    skill: "Cash Flow Identity",
    type: "calculation",
    question:
      "If cash flow to creditors is $45,000 and cash flow to stockholders is $45,000, what is cash flow from assets?",
    options: ["$90,000", "$0", "$45,000", "$2,025,000"],
    answer: 0,
    explanation:
      "CFFA = CF/CR + CF/SH = $45,000 + $45,000 = $90,000.",
    formula: "CFFA = CF/CR + CF/SH",
  },

  {
    id: "c2-018",
    chapter: 2,
    section: "Cash Flow",
    skill: "Cash Flow Summary",
    type: "concept",
    question:
      "Which expression correctly calculates cash flow from assets?",
    options: [
      "OCF − NCS − ΔNWC",
      "OCF + NCS + ΔNWC",
      "NCS − OCF − ΔNWC",
      "OCF − NCS + ΔNWC",
    ],
    answer: 0,
    explanation:
      "Cash flow from assets equals operating cash flow minus net capital spending minus the change in net working capital.",
    formula: "CFFA = OCF − NCS − ΔNWC",
  },

  {
    id: "c2-019",
    chapter: 2,
    section: "Cash Flow",
    skill: "Cash Flow Example",
    type: "calculation",
    question:
      "In the Dole Cola example from the course material, what was cash flow from assets?",
    options: ["−$165", "$165", "$275", "$400"],
    answer: 0,
    explanation:
      "The Dole Cola example showed OCF of $275, NCS of $400, and ΔNWC of $40. Therefore CFFA = $275 − $400 − $40 = −$165.",
    formula: "CFFA = OCF − NCS − ΔNWC",
  },

  // --- FNAN 300 Exam 1 Practice Questions ---

  {
    id: "c2-e01",
    chapter: 2,
    section: "Cash Flow",
    skill: "Change in NWC",
    type: "calculation",
    question:
      "At the beginning of the year, a firm has current assets of $317 and current liabilities of $221. At the end of the year, the current assets are $471 and the current liabilities are $261. What is the change in net working capital?",
    options: [
      "−$164",
      "$114",
      "$154",
      "$194",
      "$0",
    ],
    answer: 1,
    explanation:
      "NWC = CA − CL. Beginning NWC = $317 − $221 = $96. Ending NWC = $471 − $261 = $210. Change in NWC = $210 − $96 = $114.",
    formula: "ΔNWC = (Ending CA − Ending CL) − (Beginning CA − Beginning CL)",
  },

  {
    id: "c2-e02",
    chapter: 2,
    section: "Cash Flow",
    skill: "Cash Flow from Assets",
    type: "calculation",
    question:
      "Rousey, Inc. had a cash flow to creditors of $17,055 and a cash flow to stockholders of $7,685 over the past year. The company also had net fixed assets of $49,755 at the beginning of the year and $57,190 at the end of the year. Additionally, the company had a depreciation expense of $12,300 and an operating cash flow of $51,270. What was the change in net working capital during the year?",
    options: [
      "$5,363",
      "$9,370",
      "$6,070",
      "$7,435",
      "$6,795",
    ],
    answer: 4,
    explanation:
      "CFFA = CF/CR + CF/SH = $17,055 + $7,685 = $24,740. NCS = Ending FA − Beginning FA + Depreciation = $57,190 − $49,755 + $12,300 = $19,735. ΔNWC = OCF − NCS − CFFA = $51,270 − $19,735 − $24,740 = $6,795.",
    formula: "ΔNWC = OCF − NCS − CFFA",
  },

  {
    id: "c2-e03",
    chapter: 2,
    section: "Cash Flow",
    skill: "Cash Flow to Stockholders",
    type: "calculation",
    question:
      "During the past year, a company had cash flow to creditors, operating cash flow, and net capital spending of $28,670, $62,875, and $24,680, respectively. The net working capital at the beginning of the year was $10,873 and it was $12,100 at the end of the year. What was the company's cash flow to stockholders during the year?",
    options: [
      "$9,525",
      "$1,227",
      "$6,552",
      "$8,298",
      "$10,752",
    ],
    answer: 3,
    explanation:
      "ΔNWC = $12,100 − $10,873 = $1,227. CFFA = OCF − NCS − ΔNWC = $62,875 − $24,680 − $1,227 = $36,968. CF/SH = CFFA − CF/CR = $36,968 − $28,670 = $8,298.",
    formula: "CF/SH = CFFA − CF/CR",
  },

  // ============================================================
  // CHAPTER 3
  // ============================================================

  {
    id: "c3-001",
    chapter: 3,
    section: "Standardized Financial Statements",
    skill: "Common-Size Balance Sheet",
    type: "concept",
    question:
      "On a common-size balance sheet, each account is generally expressed as a percentage of:",
    options: [
      "Total assets",
      "Sales",
      "Net income",
      "Current liabilities",
    ],
    answer: 0,
    explanation:
      "Common-size balance sheets express each account as a percentage of total assets.",
  },

  {
    id: "c3-002",
    chapter: 3,
    section: "Standardized Financial Statements",
    skill: "Common-Size Income Statement",
    type: "concept",
    question:
      "On a common-size income statement, each line item is generally expressed as a percentage of:",
    options: ["Sales", "Total assets", "Equity", "Cash"],
    answer: 0,
    explanation:
      "Common-size income statements express each line item as a percentage of sales or revenue.",
  },

  {
    id: "c3-003",
    chapter: 3,
    section: "Standardized Financial Statements",
    skill: "Common-Size Statements",
    type: "calculation",
    question:
      "If total equity is $200,000 and total assets are $299,100, what is equity as a percentage of total assets?",
    options: ["66.87%", "33.13%", "149.55%", "20.00%"],
    answer: 0,
    explanation:
      "Common-size equity = Equity / Total Assets = $200,000 / $299,100 ≈ 66.87%.",
    formula: "Common-Size Percentage = Account / Total Assets",
  },

  {
    id: "c3-004",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "Ratio Categories",
    type: "concept",
    question:
      "Which ratio category focuses on short-term solvency?",
    options: [
      "Liquidity ratios",
      "Market value ratios",
      "Profitability ratios",
      "Asset management ratios",
    ],
    answer: 0,
    explanation:
      "Liquidity ratios measure the firm's ability to meet short-term obligations.",
  },

  {
    id: "c3-005",
    chapter: 3,
    section: "Liquidity Ratios",
    skill: "Current Ratio",
    type: "calculation",
    question:
      "A company has current assets of $240,000 and current liabilities of $120,000. What is its current ratio?",
    options: ["2.00", "0.50", "1.50", "3.00"],
    answer: 0,
    explanation:
      "Current Ratio = CA / CL = $240,000 / $120,000 = 2.00.",
    formula: "Current Ratio = CA / CL",
  },

  {
    id: "c3-006",
    chapter: 3,
    section: "Liquidity Ratios",
    skill: "Quick Ratio",
    type: "calculation",
    question:
      "A company has current assets of $240,000, inventory of $60,000, and current liabilities of $120,000. What is the quick ratio?",
    options: ["1.50", "2.00", "0.50", "2.50"],
    answer: 0,
    explanation:
      "Quick Ratio = (CA − Inventory) / CL = ($240,000 − $60,000) / $120,000 = 1.50.",
    formula: "Quick Ratio = (CA − Inventory) / CL",
  },

  {
    id: "c3-007",
    chapter: 3,
    section: "Liquidity Ratios",
    skill: "Cash Ratio",
    type: "calculation",
    question:
      "A company has cash of $36,000 and current liabilities of $120,000. What is the cash ratio?",
    options: ["0.30", "3.33", "0.60", "1.20"],
    answer: 0,
    explanation:
      "Cash Ratio = Cash / CL = $36,000 / $120,000 = 0.30.",
    formula: "Cash Ratio = Cash / CL",
  },

  {
    id: "c3-008",
    chapter: 3,
    section: "Financial Leverage Ratios",
    skill: "Total Debt Ratio",
    type: "calculation",
    question:
      "A firm has total assets of $500,000 and total equity of $300,000. What is its total debt ratio?",
    options: ["40%", "60%", "20%", "80%"],
    answer: 0,
    explanation:
      "Debt = Assets − Equity = $500,000 − $300,000 = $200,000. Debt ratio = $200,000 / $500,000 = 40%.",
    formula: "Total Debt Ratio = (TA − TE) / TA",
  },

  {
    id: "c3-009",
    chapter: 3,
    section: "Financial Leverage Ratios",
    skill: "Debt-to-Equity Ratio",
    type: "calculation",
    question:
      "A firm has total debt of $200,000 and total equity of $300,000. What is the debt-to-equity ratio?",
    options: ["0.67", "1.50", "0.40", "0.33"],
    answer: 0,
    explanation:
      "D/E = Total Debt / Total Equity = $200,000 / $300,000 ≈ 0.67.",
    formula: "D/E = TD / TE",
  },

  {
    id: "c3-010",
    chapter: 3,
    section: "Financial Leverage Ratios",
    skill: "Equity Multiplier",
    type: "calculation",
    question:
      "A firm has total assets of $500,000 and total equity of $300,000. What is the equity multiplier?",
    options: ["1.67", "0.60", "2.00", "0.67"],
    answer: 0,
    explanation:
      "EM = TA / TE = $500,000 / $300,000 ≈ 1.67.",
    formula: "EM = TA / TE",
  },

  {
    id: "c3-011",
    chapter: 3,
    section: "Financial Leverage Ratios",
    skill: "Times Interest Earned",
    type: "calculation",
    question:
      "A firm has EBIT of $400,000 and interest expense of $50,000. What is times interest earned?",
    options: ["8.00", "0.125", "4.50", "450"],
    answer: 0,
    explanation:
      "TIE = EBIT / Interest = $400,000 / $50,000 = 8.00.",
    formula: "TIE = EBIT / Interest",
  },

  {
    id: "c3-012",
    chapter: 3,
    section: "Financial Leverage Ratios",
    skill: "Cash Coverage",
    type: "calculation",
    question:
      "A firm has EBIT of $400,000, depreciation of $80,000, and interest of $50,000. What is cash coverage?",
    options: ["9.60", "8.00", "6.40", "10.00"],
    answer: 0,
    explanation:
      "Cash Coverage = (EBIT + Depreciation) / Interest = ($400,000 + $80,000) / $50,000 = 9.60.",
    formula: "Cash Coverage = (EBIT + Depreciation) / Interest",
  },

  {
    id: "c3-013",
    chapter: 3,
    section: "Asset Management Ratios",
    skill: "Inventory Turnover",
    type: "calculation",
    question:
      "A firm has COGS of $600,000 and inventory of $100,000. What is inventory turnover?",
    options: ["6.00", "0.17", "5.00", "60.00"],
    answer: 0,
    explanation:
      "Inventory Turnover = COGS / Inventory = $600,000 / $100,000 = 6.00 times.",
    formula: "Inventory Turnover = COGS / Inventory",
  },

  {
    id: "c3-014",
    chapter: 3,
    section: "Asset Management Ratios",
    skill: "Days Sales in Inventory",
    type: "calculation",
    question:
      "If inventory turnover is 6.00, approximately how many days of inventory are held?",
    options: ["60.83 days", "6 days", "365 days", "43.80 days"],
    answer: 0,
    explanation:
      "Days' Sales in Inventory = 365 / 6 = approximately 60.83 days.",
    formula: "Days' Sales in Inventory = 365 / Inventory Turnover",
  },

  {
    id: "c3-015",
    chapter: 3,
    section: "Asset Management Ratios",
    skill: "Receivables Turnover",
    type: "calculation",
    question:
      "A firm has sales of $900,000 and accounts receivable of $150,000. What is receivables turnover?",
    options: ["6.00", "0.17", "7.50", "5.00"],
    answer: 0,
    explanation:
      "Receivables Turnover = Sales / Accounts Receivable = $900,000 / $150,000 = 6.00.",
    formula: "Receivables Turnover = Sales / AR",
  },

  {
    id: "c3-016",
    chapter: 3,
    section: "Asset Management Ratios",
    skill: "Days Sales in Receivables",
    type: "calculation",
    question:
      "If receivables turnover is 6.00, approximately how many days of sales are represented by receivables?",
    options: ["60.83 days", "6 days", "36.50 days", "12 days"],
    answer: 0,
    explanation:
      "Days' Sales in Receivables = 365 / 6 = approximately 60.83 days.",
    formula: "Days' Sales in Receivables = 365 / Receivables Turnover",
  },

  {
    id: "c3-017",
    chapter: 3,
    section: "Asset Management Ratios",
    skill: "Payables Turnover",
    type: "calculation",
    question:
      "A firm has COGS of $600,000 and accounts payable of $100,000. What is payables turnover?",
    options: ["6.00", "0.17", "5.00", "60.00"],
    answer: 0,
    explanation:
      "Payables Turnover = COGS / Accounts Payable = $600,000 / $100,000 = 6.00.",
    formula: "Payables Turnover = COGS / AP",
  },

  {
    id: "c3-018",
    chapter: 3,
    section: "Asset Management Ratios",
    skill: "Days Costs in Payables",
    type: "calculation",
    question:
      "If payables turnover is 6.00, approximately how many days of costs are represented by payables?",
    options: ["60.83 days", "6 days", "30 days", "365 days"],
    answer: 0,
    explanation:
      "Days' Costs in Payables = 365 / 6 = approximately 60.83 days.",
    formula: "Days' Costs in Payables = 365 / Payables Turnover",
  },

  {
    id: "c3-019",
    chapter: 3,
    section: "Asset Management Ratios",
    skill: "Total Asset Turnover",
    type: "calculation",
    question:
      "A firm has sales of $1,000,000 and total assets of $500,000. What is total asset turnover?",
    options: ["2.00", "0.50", "1.50", "500.00"],
    answer: 0,
    explanation:
      "TAT = Sales / Total Assets = $1,000,000 / $500,000 = 2.00.",
    formula: "TAT = Sales / TA",
  },

  {
    id: "c3-020",
    chapter: 3,
    section: "Asset Management Ratios",
    skill: "Capital Intensity",
    type: "calculation",
    question:
      "If total asset turnover is 2.00, what is the capital intensity ratio?",
    options: ["0.50", "2.00", "4.00", "0.25"],
    answer: 0,
    explanation:
      "Capital Intensity Ratio = 1 / TAT = 1 / 2 = 0.50.",
    formula: "Capital Intensity Ratio = 1 / TAT",
  },

  {
    id: "c3-021",
    chapter: 3,
    section: "Profitability Ratios",
    skill: "Profit Margin",
    type: "calculation",
    question:
      "A firm has net income of $80,000 and sales of $1,000,000. What is profit margin?",
    options: ["8%", "12.5%", "80%", "0.80%"],
    answer: 0,
    explanation:
      "PM = Net Income / Sales = $80,000 / $1,000,000 = 8%.",
    formula: "PM = NI / Sales",
  },

  {
    id: "c3-022",
    chapter: 3,
    section: "Profitability Ratios",
    skill: "Return on Assets",
    type: "calculation",
    question:
      "A firm has net income of $80,000 and total assets of $500,000. What is ROA?",
    options: ["16%", "8%", "26.67%", "6.25%"],
    answer: 0,
    explanation:
      "ROA = Net Income / Total Assets = $80,000 / $500,000 = 16%.",
    formula: "ROA = NI / TA",
  },

  {
    id: "c3-023",
    chapter: 3,
    section: "Profitability Ratios",
    skill: "Return on Equity",
    type: "calculation",
    question:
      "A firm has net income of $80,000 and total equity of $300,000. What is ROE?",
    options: ["26.67%", "16%", "8%", "37.50%"],
    answer: 0,
    explanation:
      "ROE = Net Income / Total Equity = $80,000 / $300,000 ≈ 26.67%.",
    formula: "ROE = NI / TE",
  },

  {
    id: "c3-024",
    chapter: 3,
    section: "Market Value Ratios",
    skill: "Earnings Per Share",
    type: "calculation",
    question:
      "A firm has net income of $120,000 and 30,000 shares outstanding. What is EPS?",
    options: ["$4.00", "$0.25", "$30.00", "$3.00"],
    answer: 0,
    explanation:
      "EPS = NI / Shares Outstanding = $120,000 / 30,000 = $4.00.",
    formula: "EPS = NI / Shares Outstanding",
  },

  {
    id: "c3-025",
    chapter: 3,
    section: "Market Value Ratios",
    skill: "Price-Earnings Ratio",
    type: "calculation",
    question:
      "If price per share is $60 and EPS is $4, what is the P/E ratio?",
    options: ["15.00", "64.00", "0.067", "240.00"],
    answer: 0,
    explanation:
      "P/E = Price Per Share / EPS = $60 / $4 = 15.00.",
    formula: "P/E = PPS / EPS",
  },

  {
    id: "c3-026",
    chapter: 3,
    section: "Market Value Ratios",
    skill: "Price-to-Sales Ratio",
    type: "calculation",
    question:
      "A firm's price per share is $60 and sales per share are $30. What is its price-to-sales ratio?",
    options: ["2.00", "0.50", "30.00", "90.00"],
    answer: 0,
    explanation:
      "Price/Sales = Price Per Share / Sales Per Share = $60 / $30 = 2.00.",
    formula: "Price/Sales = PPS / Sales Per Share",
  },

  {
    id: "c3-027",
    chapter: 3,
    section: "Market Value Ratios",
    skill: "Book Value Per Share",
    type: "calculation",
    question:
      "A firm has total equity of $300,000 and 30,000 shares outstanding. What is book value per share?",
    options: ["$10.00", "$30.00", "$1.00", "$300.00"],
    answer: 0,
    explanation:
      "Book Value Per Share = Total Equity / Shares Outstanding = $300,000 / 30,000 = $10.00.",
    formula: "BVPS = TE / Shares Outstanding",
  },

  {
    id: "c3-028",
    chapter: 3,
    section: "Market Value Ratios",
    skill: "Market-to-Book",
    type: "calculation",
    question:
      "If price per share is $60 and book value per share is $10, what is market-to-book?",
    options: ["6.00", "0.17", "50.00", "70.00"],
    answer: 0,
    explanation:
      "Market-to-Book = Price Per Share / Book Value Per Share = $60 / $10 = 6.00.",
    formula: "Market-to-Book = PPS / BVPS",
  },

  {
    id: "c3-029",
    chapter: 3,
    section: "Market Value Ratios",
    skill: "Enterprise Value",
    type: "calculation",
    question:
      "A firm has total market value of stock of $1,000,000, liabilities of $400,000, and cash of $100,000. What is enterprise value?",
    options: ["$1,300,000", "$1,500,000", "$700,000", "$1,000,000"],
    answer: 0,
    explanation:
      "Enterprise Value = Market Value of Stock + Liabilities − Cash = $1,000,000 + $400,000 − $100,000 = $1,300,000.",
    formula: "EV = Market Value of Stock + Liabilities − Cash",
  },

  {
    id: "c3-030",
    chapter: 3,
    section: "Market Value Ratios",
    skill: "EBITDA",
    type: "calculation",
    question:
      "A firm has EBIT of $400,000 and depreciation and amortization of $100,000. What is EBITDA?",
    options: ["$500,000", "$300,000", "$400,000", "$100,000"],
    answer: 0,
    explanation:
      "EBITDA = EBIT + Depreciation & Amortization = $400,000 + $100,000 = $500,000.",
    formula: "EBITDA = EBIT + Depreciation & Amortization",
  },

  {
    id: "c3-031",
    chapter: 3,
    section: "Market Value Ratios",
    skill: "EBITDA Ratio",
    type: "calculation",
    question:
      "If enterprise value is $1,300,000 and EBITDA is $500,000, what is the EBITDA ratio?",
    options: ["2.60", "0.38", "1.80", "6.50"],
    answer: 0,
    explanation:
      "EV/EBITDA = $1,300,000 / $500,000 = 2.60.",
    formula: "EBITDA Ratio = Enterprise Value / EBITDA",
  },

  {
    id: "c3-032",
    chapter: 3,
    section: "The DuPont Identity",
    skill: "DuPont Identity",
    type: "formula",
    question:
      "Which formula correctly represents the DuPont identity for ROE?",
    options: [
      "ROE = Profit Margin × Total Asset Turnover × Equity Multiplier",
      "ROE = Profit Margin + Total Asset Turnover + Equity Multiplier",
      "ROE = Current Ratio × Quick Ratio",
      "ROE = EBIT / Interest",
    ],
    answer: 0,
    explanation:
      "The DuPont identity breaks ROE into profit margin, total asset turnover, and equity multiplier.",
    formula: "ROE = PM × TAT × EM",
  },

  {
    id: "c3-033",
    chapter: 3,
    section: "The DuPont Identity",
    skill: "DuPont Identity",
    type: "calculation",
    question:
      "If profit margin is 8%, total asset turnover is 2.00, and equity multiplier is 1.67, approximately what is ROE?",
    options: ["26.72%", "16.00%", "8.00%", "20.00%"],
    answer: 0,
    explanation:
      "ROE ≈ 0.08 × 2.00 × 1.67 = 0.2672, or approximately 26.72%.",
    formula: "ROE = PM × TAT × EM",
  },

  {
    id: "c3-034",
    chapter: 3,
    section: "The DuPont Identity",
    skill: "DuPont Components",
    type: "concept",
    question:
      "In the DuPont identity, profit margin primarily reflects:",
    options: [
      "Operating efficiency and cost control",
      "How quickly inventory is physically counted",
      "The number of shareholders",
      "The firm's stock price",
    ],
    answer: 0,
    explanation:
      "Profit margin reflects operating efficiency and cost control.",
  },

  {
    id: "c3-035",
    chapter: 3,
    section: "The DuPont Identity",
    skill: "DuPont Components",
    type: "concept",
    question:
      "In the DuPont identity, total asset turnover primarily reflects:",
    options: [
      "Asset-use efficiency",
      "Tax bracket selection",
      "Stock price volatility",
      "Interest expense only",
    ],
    answer: 0,
    explanation:
      "Total asset turnover measures how efficiently the firm uses its assets to generate sales.",
  },

  {
    id: "c3-036",
    chapter: 3,
    section: "The DuPont Identity",
    skill: "DuPont Components",
    type: "concept",
    question:
      "In the DuPont identity, the equity multiplier represents:",
    options: [
      "Financial leverage",
      "Inventory turnover",
      "Profit margin",
      "Market share",
    ],
    answer: 0,
    explanation:
      "The equity multiplier reflects financial leverage and equals 1 + D/E.",
    formula: "EM = 1 + D/E",
  },

  {
    id: "c3-037",
    chapter: 3,
    section: "Using Financial Statement Information",
    skill: "Benchmarking",
    type: "concept",
    question:
      "Comparing a firm's financial ratios across several years is called:",
    options: [
      "Time-trend analysis",
      "Primary market analysis",
      "Capital budgeting",
      "Tax averaging",
    ],
    answer: 0,
    explanation:
      "Time-trend analysis examines how financial measures change over time.",
  },

  {
    id: "c3-038",
    chapter: 3,
    section: "Using Financial Statement Information",
    skill: "Benchmarking",
    type: "concept",
    question:
      "Peer group analysis compares a firm with:",
    options: [
      "Similar companies",
      "Only its own previous year",
      "Only its suppliers",
      "Only government agencies",
    ],
    answer: 0,
    explanation:
      "Peer group analysis compares a firm with similar companies.",
  },

  {
    id: "c3-039",
    chapter: 3,
    section: "Using Financial Statement Information",
    skill: "Financial Statement Limitations",
    type: "concept",
    question:
      "Which can make financial ratio comparisons difficult?",
    options: [
      "Different accounting procedures",
      "Identical accounting procedures",
      "Identical fiscal years",
      "Identical business structures",
    ],
    answer: 0,
    explanation:
      "Different accounting procedures can make comparisons between companies more difficult.",
  },

  {
    id: "c3-040",
    chapter: 3,
    section: "Using Financial Statement Information",
    skill: "Financial Statement Limitations",
    type: "concept",
    question:
      "Why can seasonal variations create problems when comparing financial statements?",
    options: [
      "A firm's financial position can differ substantially depending on when it is measured",
      "Seasonal businesses never have assets",
      "Seasonal businesses cannot calculate ratios",
      "Seasonality eliminates all accounting information",
    ],
    answer: 0,
    explanation:
      "Seasonal variations can cause financial statement values to change significantly depending on the measurement date.",
  },

  // --- FNAN 300 Exam 1 Practice Questions ---

  {
    id: "c3-e01",
    chapter: 3,
    section: "Standardized Financial Statements",
    skill: "Common-Size Balance Sheet",
    type: "concept",
    question:
      "Common-size financial statements present all balance sheet account values as a percentage of:",
    options: [
      "the forecasted budget",
      "sales",
      "total equity",
      "total assets",
      "last year's account value",
    ],
    answer: 3,
    explanation:
      "Common-size balance sheets express every account as a percentage of total assets, making it easy to compare the composition of assets and liabilities across time or across firms.",
  },

  {
    id: "c3-e02",
    chapter: 3,
    section: "Standardized Financial Statements",
    skill: "Common-Size Statements",
    type: "concept",
    question:
      "A common-size balance sheet helps financial managers determine:",
    options: [
      "which customers are paying on a timely basis",
      "if costs are increasing faster or slower than sales",
      "if changes are occurring in a firm's mix of assets",
      "if a firm is generating more or less sales per dollar of assets than in prior years",
      "the rate at which the firm's dividend payout is changing",
    ],
    answer: 2,
    explanation:
      "By expressing each balance sheet item as a percentage of total assets, a common-size balance sheet reveals shifts in the firm's asset mix over time, such as changes in the proportion of inventory, receivables, or fixed assets.",
  },

  {
    id: "c3-e03",
    chapter: 3,
    section: "Using Financial Statement Information",
    skill: "Financial Statement Analysis",
    type: "concept",
    question:
      "Financial statement analysis:",
    options: [
      "is primarily used to identify account values that meet the normal standards",
      "is limited to internal use by a firm's managers",
      "provides useful information that can serve as a basis for forecasting future performance",
      "provides useful information to shareholders but not to debt holders",
      "is enhanced by comparing results to those of a firm's peers but not by comparing results to prior periods",
    ],
    answer: 2,
    explanation:
      "Financial statement analysis provides useful information to both internal and external users, including managers, shareholders, and creditors. It serves as a basis for forecasting future performance and is enhanced by both peer group and time-trend comparisons.",
  },

  {
    id: "c3-e04",
    chapter: 3,
    section: "Financial Leverage Ratios",
    skill: "Total Debt Ratio",
    type: "calculation",
    question:
      "Tony's Machinery has total equity of $815,280, long-term debt of $391,900, net working capital of $49,500, and total assets of $1,292,485. What is the total debt ratio?",
    options: [
      ".50",
      ".37",
      ".64",
      ".46",
      ".60",
    ],
    answer: 1,
    explanation:
      "Total Debt Ratio = (Total Assets − Total Equity) / Total Assets = ($1,292,485 − $815,280) / $1,292,485 = $477,205 / $1,292,485 ≈ .37.",
    formula: "Total Debt Ratio = (TA − TE) / TA",
  },

  {
    id: "c3-e05",
    chapter: 3,
    section: "Profitability Ratios",
    skill: "Return on Equity",
    type: "calculation",
    question:
      "Windswept, Inc. had net income of $1,046 million in 2017. Its balance sheet shows common stock of $3,060 million and retained earnings of $930 million. What is the return on equity for 2017?",
    options: [
      "32.28%",
      "34.18%",
      "56.05%",
      "26.22%",
      "42.98%",
    ],
    answer: 3,
    explanation:
      "ROE = Net Income / Total Equity. Total Equity = Common Stock + Retained Earnings = $3,060 + $930 = $3,990. ROE = $1,046 / $3,990 = 26.22%.",
    formula: "ROE = NI / TE",
  },
];

export const FORMULAS: Formula[] = [
  {
    id: "f2-001",
    chapter: 2,
    name: "Balance Sheet Identity",
    formula: "Assets = Liabilities + Stockholders' Equity",
    use: "Use when solving for assets, liabilities, or equity.",
  },

  {
    id: "f2-002",
    chapter: 2,
    name: "Net Working Capital",
    formula: "NWC = Current Assets − Current Liabilities",
    use: "Use to measure the firm's short-term financial position.",
  },

  {
    id: "f2-003",
    chapter: 2,
    name: "Net Income",
    formula: "Net Income = Revenue − Expenses",
    use: "Use to calculate the bottom-line income reported on the income statement.",
  },

  {
    id: "f2-004",
    chapter: 2,
    name: "Average Tax Rate",
    formula: "Average Tax Rate = Total Taxes / Taxable Income",
    use: "Use to find the percentage of taxable income paid in taxes overall.",
  },

  {
    id: "f2-005",
    chapter: 2,
    name: "Operating Cash Flow",
    formula: "OCF = EBIT + Depreciation − Taxes",
    use: "Use to calculate cash generated by the firm's operations.",
  },

  {
    id: "f2-006",
    chapter: 2,
    name: "Net Capital Spending",
    formula:
      "NCS = Ending Net Fixed Assets − Beginning Net Fixed Assets + Depreciation",
    use: "Use to calculate spending on fixed assets during the period.",
  },

  {
    id: "f2-007",
    chapter: 2,
    name: "Change in NWC",
    formula: "ΔNWC = Ending NWC − Beginning NWC",
    use: "Use when determining how much net working capital changed.",
  },

  {
    id: "f2-008",
    chapter: 2,
    name: "Cash Flow from Assets",
    formula: "CFFA = OCF − NCS − ΔNWC",
    use: "Use to determine the cash flow generated by the firm's assets.",
  },

  {
    id: "f2-009",
    chapter: 2,
    name: "Cash Flow to Creditors",
    formula: "CF/CR = Interest Paid − Net New Borrowing",
    use: "Use to calculate cash flow paid to creditors.",
  },

  {
    id: "f2-010",
    chapter: 2,
    name: "Cash Flow to Stockholders",
    formula: "CF/SH = Dividends Paid − Net New Equity Raised",
    use: "Use to calculate cash flow paid to stockholders.",
  },

  {
    id: "f2-011",
    chapter: 2,
    name: "Cash Flow Identity",
    formula: "CFFA = CF/CR + CF/SH",
    use: "Use to connect cash flow from assets with cash flows to creditors and stockholders.",
  },

  {
    id: "f3-001",
    chapter: 3,
    name: "Common-Size Balance Sheet",
    formula: "Common-Size Percentage = Account / Total Assets",
    use: "Use to express balance sheet accounts as percentages of total assets.",
  },

  {
    id: "f3-002",
    chapter: 3,
    name: "Common-Size Income Statement",
    formula: "Common-Size Percentage = Line Item / Sales",
    use: "Use to express income statement items as percentages of sales.",
  },

  {
    id: "f3-003",
    chapter: 3,
    name: "Current Ratio",
    formula: "Current Ratio = CA / CL",
    use: "Measures short-term liquidity.",
  },

  {
    id: "f3-004",
    chapter: 3,
    name: "Quick Ratio",
    formula: "Quick Ratio = (CA − Inventory) / CL",
    use: "Measures liquidity while excluding inventory.",
  },

  {
    id: "f3-005",
    chapter: 3,
    name: "Cash Ratio",
    formula: "Cash Ratio = Cash / CL",
    use: "Measures liquidity using cash relative to current liabilities.",
  },

  {
    id: "f3-006",
    chapter: 3,
    name: "Total Debt Ratio",
    formula: "Total Debt Ratio = (TA − TE) / TA",
    use: "Measures the portion of assets financed with debt.",
  },

  {
    id: "f3-007",
    chapter: 3,
    name: "Debt-to-Equity Ratio",
    formula: "D/E = TD / TE",
    use: "Measures debt relative to equity.",
  },

  {
    id: "f3-008",
    chapter: 3,
    name: "Equity Multiplier",
    formula: "EM = TA / TE",
    use: "Measures financial leverage.",
  },

  {
    id: "f3-009",
    chapter: 3,
    name: "Times Interest Earned",
    formula: "TIE = EBIT / Interest",
    use: "Measures the firm's ability to cover interest obligations using EBIT.",
  },

  {
    id: "f3-010",
    chapter: 3,
    name: "Cash Coverage",
    formula: "Cash Coverage = (EBIT + Depreciation) / Interest",
    use: "Measures ability to cover interest using EBIT plus depreciation.",
  },

  {
    id: "f3-011",
    chapter: 3,
    name: "Inventory Turnover",
    formula: "Inventory Turnover = COGS / Inventory",
    use: "Measures how many times inventory is sold or replaced.",
  },

  {
    id: "f3-012",
    chapter: 3,
    name: "Days' Sales in Inventory",
    formula: "Days' Sales in Inventory = 365 / Inventory Turnover",
    use: "Estimates how long inventory sits before being sold.",
  },

  {
    id: "f3-013",
    chapter: 3,
    name: "Receivables Turnover",
    formula: "Receivables Turnover = Sales / Accounts Receivable",
    use: "Measures how quickly receivables are collected.",
  },

  {
    id: "f3-014",
    chapter: 3,
    name: "Days' Sales in Receivables",
    formula: "Days' Sales in Receivables = 365 / Receivables Turnover",
    use: "Estimates the average collection period.",
  },

  {
    id: "f3-015",
    chapter: 3,
    name: "Payables Turnover",
    formula: "Payables Turnover = COGS / Accounts Payable",
    use: "Measures how quickly the firm pays suppliers.",
  },

  {
    id: "f3-016",
    chapter: 3,
    name: "Days' Costs in Payables",
    formula: "Days' Costs in Payables = 365 / Payables Turnover",
    use: "Estimates how long costs remain in accounts payable.",
  },

  {
    id: "f3-017",
    chapter: 3,
    name: "Total Asset Turnover",
    formula: "TAT = Sales / Total Assets",
    use: "Measures how efficiently assets generate sales.",
  },

  {
    id: "f3-018",
    chapter: 3,
    name: "Capital Intensity Ratio",
    formula: "Capital Intensity Ratio = 1 / TAT",
    use: "Measures the amount of assets needed to generate a dollar of sales.",
  },

  {
    id: "f3-019",
    chapter: 3,
    name: "Profit Margin",
    formula: "PM = Net Income / Sales",
    use: "Measures profit earned per dollar of sales.",
  },

  {
    id: "f3-020",
    chapter: 3,
    name: "Return on Assets",
    formula: "ROA = Net Income / Total Assets",
    use: "Measures profit earned relative to total assets.",
  },

  {
    id: "f3-021",
    chapter: 3,
    name: "Return on Equity",
    formula: "ROE = Net Income / Total Equity",
    use: "Measures profit earned relative to stockholders' equity.",
  },

  {
    id: "f3-022",
    chapter: 3,
    name: "Earnings Per Share",
    formula: "EPS = Net Income / Shares Outstanding",
    use: "Measures earnings attributable to each share.",
  },

  {
    id: "f3-023",
    chapter: 3,
    name: "Price-Earnings Ratio",
    formula: "P/E = Price Per Share / EPS",
    use: "Relates market price per share to earnings per share.",
  },

  {
    id: "f3-024",
    chapter: 3,
    name: "Price-to-Sales Ratio",
    formula: "Price/Sales = PPS / Sales Per Share",
    use: "Relates market price per share to sales per share.",
  },

  {
    id: "f3-025",
    chapter: 3,
    name: "Book Value Per Share",
    formula: "BVPS = Total Equity / Shares Outstanding",
    use: "Calculates book value attributable to each share.",
  },

  {
    id: "f3-026",
    chapter: 3,
    name: "Market-to-Book",
    formula: "Market-to-Book = PPS / BVPS",
    use: "Compares market value per share with book value per share.",
  },

  {
    id: "f3-027",
    chapter: 3,
    name: "Enterprise Value",
    formula:
      "EV = Market Value of Stock + Liabilities − Cash",
    use: "Measures the value of the operating business after accounting for debt and cash.",
  },

  {
    id: "f3-028",
    chapter: 3,
    name: "EBITDA",
    formula: "EBITDA = EBIT + Depreciation & Amortization",
    use: "Measures earnings before interest, taxes, depreciation, and amortization.",
  },

  {
    id: "f3-029",
    chapter: 3,
    name: "EBITDA Ratio",
    formula: "EBITDA Ratio = Enterprise Value / EBITDA",
    use: "Relates enterprise value to EBITDA.",
  },

  {
    id: "f3-030",
    chapter: 3,
    name: "DuPont Identity",
    formula: "ROE = PM × TAT × EM",
    use: "Breaks ROE into profit margin, asset-use efficiency, and financial leverage.",
  },
];

export const CHAPTERS = [
  {
    number: 1,
    title: "Introduction to Corporate Finance",
    color: "gold",
  },
  {
    number: 2,
    title: "Financial Statements, Cash Flow, and Taxes",
    color: "blue",
  },
  {
    number: 3,
    title: "Working with Financial Statements",
    color: "green",
  },
];
