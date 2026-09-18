import { useEffect, useMemo, useState } from "react";
import "./index.css";

type QuestionType =
  | "multiple"
  | "calculation"
  | "truefalse"
  | "formula"
  | "interpretation";

type Difficulty = "easy" | "medium" | "hard";

type Question = {
  id: string;
  chapter: number;
  section: string;
  skill: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
};

type Skill = {
  id: string;
  name: string;
  chapter: number;
  section: string;
  description: string;
};

type Formula = {
  name: string;
  formula: string;
  chapter: number;
  category: string;
};

const SKILLS: Skill[] = [
  // CHAPTER 1
  {
    id: "finance-areas",
    name: "Areas of Finance",
    chapter: 1,
    section: "Finance: A Quick Look",
    description: "Corporate finance, investments, financial institutions, and international finance.",
  },
  {
    id: "financial-manager",
    name: "Financial Manager",
    chapter: 1,
    section: "Corporate Finance",
    description: "CFO, Treasurer, and Controller responsibilities.",
  },
  {
    id: "financial-decisions",
    name: "Financial Decisions",
    chapter: 1,
    section: "Corporate Finance",
    description: "Capital budgeting, capital structure, and working capital management.",
  },
  {
    id: "business-organizations",
    name: "Forms of Business Organization",
    chapter: 1,
    section: "Forms of Business Organization",
    description: "Sole proprietorships, partnerships, corporations, and related structures.",
  },
  {
    id: "financial-goal",
    name: "Goal of Financial Management",
    chapter: 1,
    section: "Goal of Financial Management",
    description: "The goal of maximizing the current value per share of existing stock.",
  },
  {
    id: "agency-problem",
    name: "Agency Problem",
    chapter: 1,
    section: "Agency Problem and Control",
    description: "Conflicts between principals and agents.",
  },
  {
    id: "stakeholders",
    name: "Stakeholders",
    chapter: 1,
    section: "Agency Problem and Control",
    description: "Groups other than stockholders or creditors with potential claims on cash flows.",
  },
  {
    id: "financial-markets",
    name: "Financial Markets",
    chapter: 1,
    section: "Financial Markets and Corporation",
    description: "Primary, secondary, dealer, auction, listed, and OTC markets.",
  },

  // CHAPTER 2
  {
    id: "balance-sheet",
    name: "Balance Sheet",
    chapter: 2,
    section: "The Balance Sheet",
    description: "Assets, liabilities, equity, liquidity, and net working capital.",
  },
  {
    id: "book-market",
    name: "Book vs. Market Value",
    chapter: 2,
    section: "The Balance Sheet",
    description: "Accounting values versus economic market values.",
  },
  {
    id: "income-statement",
    name: "Income Statement",
    chapter: 2,
    section: "The Income Statement",
    description: "Revenue, expenses, net income, dividends, and retained earnings.",
  },
  {
    id: "taxes",
    name: "Taxes",
    chapter: 2,
    section: "Taxes",
    description: "Marginal and average tax rates and tax calculations.",
  },
  {
    id: "cash-flow-assets",
    name: "Cash Flow from Assets",
    chapter: 2,
    section: "Cash Flow",
    description: "OCF, NCS, change in NWC, and CFFA.",
  },
  {
    id: "cash-flow-creditors",
    name: "Cash Flow to Creditors",
    chapter: 2,
    section: "Cash Flow",
    description: "Interest paid and net new borrowing.",
  },
  {
    id: "cash-flow-stockholders",
    name: "Cash Flow to Stockholders",
    chapter: 2,
    section: "Cash Flow",
    description: "Dividends and net new equity.",
  },

  // CHAPTER 3
  {
    id: "common-size",
    name: "Common-Size Statements",
    chapter: 3,
    section: "Standardized Financial Statements",
    description: "Standardizing balance sheets and income statements.",
  },
  {
    id: "liquidity-ratios",
    name: "Liquidity Ratios",
    chapter: 3,
    section: "Ratio Analysis",
    description: "Current, quick, and cash ratios.",
  },
  {
    id: "leverage-ratios",
    name: "Financial Leverage",
    chapter: 3,
    section: "Ratio Analysis",
    description: "Debt ratio, debt-to-equity, equity multiplier, TIE, and cash coverage.",
  },
  {
    id: "inventory-ratios",
    name: "Inventory Ratios",
    chapter: 3,
    section: "Ratio Analysis",
    description: "Inventory turnover and days' sales in inventory.",
  },
  {
    id: "receivables-ratios",
    name: "Receivables Ratios",
    chapter: 3,
    section: "Ratio Analysis",
    description: "Receivables turnover and days' sales in receivables.",
  },
  {
    id: "asset-turnover",
    name: "Asset Turnover",
    chapter: 3,
    section: "Ratio Analysis",
    description: "Total asset turnover and capital intensity.",
  },
  {
    id: "profitability-ratios",
    name: "Profitability Ratios",
    chapter: 3,
    section: "Ratio Analysis",
    description: "Profit margin, ROA, and ROE.",
  },
  {
    id: "market-ratios",
    name: "Market Value Ratios",
    chapter: 3,
    section: "Ratio Analysis",
    description: "EPS, P/E, price/sales, market-to-book, and EBITDA ratio.",
  },
  {
    id: "dupont",
    name: "DuPont Identity",
    chapter: 3,
    section: "The DuPont Identity",
    description: "ROE = Profit Margin × Total Asset Turnover × Equity Multiplier.",
  },
  {
    id: "financial-analysis",
    name: "Financial Statement Analysis",
    chapter: 3,
    section: "Using Financial Statement Information",
    description: "Benchmarking, trends, peer groups, and analysis limitations.",
  },
];

const FORMULAS: Formula[] = [
  {
    name: "Balance Sheet Identity",
    formula: "Assets = Liabilities + Stockholders' Equity",
    chapter: 2,
    category: "Balance Sheet",
  },
  {
    name: "Net Working Capital",
    formula: "NWC = Current Assets − Current Liabilities",
    chapter: 2,
    category: "Balance Sheet",
  },
  {
    name: "Stockholders' Equity",
    formula: "Equity = Assets − Liabilities",
    chapter: 2,
    category: "Balance Sheet",
  },
  {
    name: "Net Income",
    formula: "Net Income = Revenue − Expenses",
    chapter: 2,
    category: "Income Statement",
  },
  {
    name: "Average Tax Rate",
    formula: "Average Tax Rate = Total Taxes ÷ Taxable Income",
    chapter: 2,
    category: "Taxes",
  },
  {
    name: "Cash Flow from Assets",
    formula: "CFFA = OCF − NCS − ΔNWC",
    chapter: 2,
    category: "Cash Flow",
  },
  {
    name: "Operating Cash Flow",
    formula: "OCF = EBIT + Depreciation − Taxes",
    chapter: 2,
    category: "Cash Flow",
  },
  {
    name: "Net Capital Spending",
    formula:
      "NCS = Ending Net Fixed Assets − Beginning Net Fixed Assets + Depreciation",
    chapter: 2,
    category: "Cash Flow",
  },
  {
    name: "Change in NWC",
    formula: "ΔNWC = Ending NWC − Beginning NWC",
    chapter: 2,
    category: "Cash Flow",
  },
  {
    name: "Cash Flow to Creditors",
    formula: "CF/CR = Interest Paid − Net New Borrowing",
    chapter: 2,
    category: "Cash Flow",
  },
  {
    name: "Cash Flow to Stockholders",
    formula: "CF/SH = Dividends Paid − Net New Equity Raised",
    chapter: 2,
    category: "Cash Flow",
  },
  {
    name: "Cash Flow Identity",
    formula: "CFFA = CF/CR + CF/SH",
    chapter: 2,
    category: "Cash Flow",
  },

  {
    name: "Common-Size Balance Sheet",
    formula: "Account ÷ Total Assets × 100",
    chapter: 3,
    category: "Standardized Statements",
  },
  {
    name: "Common-Size Income Statement",
    formula: "Line Item ÷ Sales × 100",
    chapter: 3,
    category: "Standardized Statements",
  },
  {
    name: "Current Ratio",
    formula: "Current Ratio = CA ÷ CL",
    chapter: 3,
    category: "Liquidity",
  },
  {
    name: "Quick Ratio",
    formula: "Quick Ratio = (CA − Inventory) ÷ CL",
    chapter: 3,
    category: "Liquidity",
  },
  {
    name: "Cash Ratio",
    formula: "Cash Ratio = Cash ÷ CL",
    chapter: 3,
    category: "Liquidity",
  },
  {
    name: "Total Debt Ratio",
    formula: "Debt Ratio = (TA − TE) ÷ TA",
    chapter: 3,
    category: "Leverage",
  },
  {
    name: "Debt-to-Equity",
    formula: "D/E = Total Debt ÷ Total Equity",
    chapter: 3,
    category: "Leverage",
  },
  {
    name: "Equity Multiplier",
    formula: "EM = Total Assets ÷ Total Equity",
    chapter: 3,
    category: "Leverage",
  },
  {
    name: "Times Interest Earned",
    formula: "TIE = EBIT ÷ Interest",
    chapter: 3,
    category: "Leverage",
  },
  {
    name: "Cash Coverage",
    formula: "Cash Coverage = (EBIT + Depreciation) ÷ Interest",
    chapter: 3,
    category: "Leverage",
  },
  {
    name: "Inventory Turnover",
    formula: "Inventory Turnover = COGS ÷ Inventory",
    chapter: 3,
    category: "Asset Management",
  },
  {
    name: "Days' Sales in Inventory",
    formula: "Days' Sales in Inventory = 365 ÷ Inventory Turnover",
    chapter: 3,
    category: "Asset Management",
  },
  {
    name: "Receivables Turnover",
    formula: "Receivables Turnover = Sales ÷ Accounts Receivable",
    chapter: 3,
    category: "Asset Management",
  },
  {
    name: "Days' Sales in Receivables",
    formula: "Days' Sales in Receivables = 365 ÷ Receivables Turnover",
    chapter: 3,
    category: "Asset Management",
  },
  {
    name: "Total Asset Turnover",
    formula: "TAT = Sales ÷ Total Assets",
    chapter: 3,
    category: "Asset Management",
  },
  {
    name: "Capital Intensity",
    formula: "Capital Intensity Ratio = 1 ÷ Total Asset Turnover",
    chapter: 3,
    category: "Asset Management",
  },
  {
    name: "Profit Margin",
    formula: "Profit Margin = Net Income ÷ Sales",
    chapter: 3,
    category: "Profitability",
  },
  {
    name: "ROA",
    formula: "ROA = Net Income ÷ Total Assets",
    chapter: 3,
    category: "Profitability",
  },
  {
    name: "ROE",
    formula: "ROE = Net Income ÷ Total Equity",
    chapter: 3,
    category: "Profitability",
  },
  {
    name: "EPS",
    formula: "EPS = Net Income ÷ Shares Outstanding",
    chapter: 3,
    category: "Market Value",
  },
  {
    name: "P/E Ratio",
    formula: "P/E = Price Per Share ÷ EPS",
    chapter: 3,
    category: "Market Value",
  },
  {
    name: "Price/Sales",
    formula: "Price/Sales = Price Per Share ÷ Sales Per Share",
    chapter: 3,
    category: "Market Value",
  },
  {
    name: "Book Value Per Share",
    formula: "BVPS = Total Equity ÷ Shares Outstanding",
    chapter: 3,
    category: "Market Value",
  },
  {
    name: "Market-to-Book",
    formula: "Market-to-Book = Price Per Share ÷ Book Value Per Share",
    chapter: 3,
    category: "Market Value",
  },
  {
    name: "DuPont Identity",
    formula: "ROE = Profit Margin × Total Asset Turnover × Equity Multiplier",
    chapter: 3,
    category: "DuPont",
  },
];

const QUESTIONS: Question[] = [
  // ---------------- CHAPTER 1 ----------------

  {
    id: "c1-q1",
    chapter: 1,
    section: "Finance: A Quick Look",
    skill: "finance-areas",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which area of finance focuses on financial assets such as stocks and bonds, including valuation and risk versus return?",
    options: [
      "Investments",
      "Working capital management",
      "Accounting",
      "Operations management",
    ],
    answer: "Investments",
    explanation:
      "The chapter identifies investments as an area involving financial assets such as stocks and bonds, valuation, risk versus return, and asset allocation.",
  },
  {
    id: "c1-q2",
    chapter: 1,
    section: "Corporate Finance",
    skill: "financial-manager",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which financial manager is generally the top financial manager of a corporation?",
    options: ["Controller", "CFO", "Treasurer", "Auditor"],
    answer: "CFO",
    explanation:
      "The CFO is generally the top financial manager. The Treasurer and Controller oversee different financial responsibilities.",
  },
  {
    id: "c1-q3",
    chapter: 1,
    section: "Corporate Finance",
    skill: "financial-decisions",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which financial management decision asks what long-term investments or projects a business should take on?",
    options: [
      "Capital budgeting",
      "Capital structure",
      "Working capital management",
      "Dividend accounting",
    ],
    answer: "Capital budgeting",
    explanation:
      "Capital budgeting concerns long-term investment and project decisions.",
  },
  {
    id: "c1-q4",
    chapter: 1,
    section: "Corporate Finance",
    skill: "financial-decisions",
    type: "multiple",
    difficulty: "easy",
    question:
      "Capital structure primarily concerns which question?",
    options: [
      "How should assets be paid for?",
      "How fast should inventory sell?",
      "How much tax should employees pay?",
      "How should sales be recorded?",
    ],
    answer: "How should assets be paid for?",
    explanation:
      "Capital structure concerns the financing of assets, particularly debt versus equity.",
  },
  {
    id: "c1-q5",
    chapter: 1,
    section: "Forms of Business Organization",
    skill: "business-organizations",
    type: "multiple",
    difficulty: "medium",
    question:
      "An owner operates a business personally and is personally liable for all of the business's debts. Which form of organization is described?",
    options: [
      "Corporation",
      "Sole proprietorship",
      "Limited partnership",
      "S corporation",
    ],
    answer: "Sole proprietorship",
    explanation:
      "The chapter's sample question uses personal liability for all store debts to identify a sole proprietorship.",
  },
  {
    id: "c1-q6",
    chapter: 1,
    section: "Goal of Financial Management",
    skill: "financial-goal",
    type: "multiple",
    difficulty: "medium",
    question:
      "According to the chapter, the goal of financial management is to:",
    options: [
      "Maximize the number of employees",
      "Maximize current value per share of existing stock",
      "Minimize all business expenses",
      "Maximize accounting income regardless of value",
    ],
    answer: "Maximize current value per share of existing stock",
    explanation:
      "The stated goal is to maximize the current value per share of existing stock, or the market value of existing owners' equity.",
  },
  {
    id: "c1-q7",
    chapter: 1,
    section: "Agency Problem and Control",
    skill: "agency-problem",
    type: "multiple",
    difficulty: "easy",
    question:
      "A conflict of interest between owners and managers is known as the:",
    options: [
      "Liquidity problem",
      "Agency problem",
      "Capital budgeting problem",
      "Market problem",
    ],
    answer: "Agency problem",
    explanation:
      "Stockholders are principals and managers are agents. A conflict between their interests creates an agency problem.",
  },
  {
    id: "c1-q8",
    chapter: 1,
    section: "Financial Markets and Corporation",
    skill: "financial-markets",
    type: "multiple",
    difficulty: "medium",
    question:
      "A market in which securities are sold to investors for the first time is a:",
    options: [
      "Primary market",
      "Secondary market",
      "Dealer market",
      "OTC resale market",
    ],
    answer: "Primary market",
    explanation:
      "Primary markets involve securities being sold to investors for the first time.",
  },

  // ---------------- CHAPTER 2 ----------------

  {
    id: "c2-q1",
    chapter: 2,
    section: "The Balance Sheet",
    skill: "balance-sheet",
    type: "formula",
    difficulty: "easy",
    question: "Which equation is the Balance Sheet Identity?",
    options: [
      "Assets = Liabilities + Stockholders' Equity",
      "Assets = Revenue − Expenses",
      "Assets = Equity − Liabilities",
      "Assets = Cash + Revenue",
    ],
    answer: "Assets = Liabilities + Stockholders' Equity",
    explanation:
      "The chapter defines the balance sheet identity as Assets = Liabilities + Stockholders' Equity.",
  },
  {
    id: "c2-q2",
    chapter: 2,
    section: "The Balance Sheet",
    skill: "balance-sheet",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has current assets of $80,000 and current liabilities of $50,000. What is its net working capital?",
    answer: "$30,000",
    explanation:
      "NWC = Current Assets − Current Liabilities = $80,000 − $50,000 = $30,000.",
  },
  {
    id: "c2-q3",
    chapter: 2,
    section: "The Balance Sheet",
    skill: "book-market",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which value represents the price at which an asset, liability, or equity can actually be bought or sold?",
    options: [
      "Book value",
      "Market value",
      "Historical value",
      "Depreciated value",
    ],
    answer: "Market value",
    explanation:
      "Market value is the true value or price at which something can actually be bought or sold.",
  },
  {
    id: "c2-q4",
    chapter: 2,
    section: "The Income Statement",
    skill: "income-statement",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which financial statement measures revenues, expenses, and net income over a specified period?",
    options: [
      "Balance sheet",
      "Income statement",
      "Statement of stockholders' equity",
      "Market statement",
    ],
    answer: "Income statement",
    explanation:
      "The income statement measures performance over a specified period such as a quarter or year.",
  },
  {
    id: "c2-q5",
    chapter: 2,
    section: "Taxes",
    skill: "taxes",
    type: "multiple",
    difficulty: "easy",
    question:
      "The marginal tax rate is the percentage of tax paid on:",
    options: [
      "All income earned",
      "The next dollar earned",
      "Only investment income",
      "Total assets",
    ],
    answer: "The next dollar earned",
    explanation:
      "The chapter defines the marginal tax rate as the percentage of tax paid on the next dollar earned.",
  },
  {
    id: "c2-q6",
    chapter: 2,
    section: "Taxes",
    skill: "taxes",
    type: "calculation",
    difficulty: "medium",
    question:
      "A person pays $12,000 in taxes on $80,000 of taxable income. What is the average tax rate?",
    answer: "15%",
    explanation:
      "Average tax rate = Total Taxes ÷ Taxable Income = $12,000 ÷ $80,000 = 0.15 = 15%.",
  },
  {
    id: "c2-q7",
    chapter: 2,
    section: "Cash Flow",
    skill: "cash-flow-assets",
    type: "formula",
    difficulty: "easy",
    question: "Which formula calculates Cash Flow from Assets?",
    options: [
      "CFFA = OCF − NCS − ΔNWC",
      "CFFA = OCF + NCS + ΔNWC",
      "CFFA = EBIT − Taxes",
      "CFFA = Dividends − Equity",
    ],
    answer: "CFFA = OCF − NCS − ΔNWC",
    explanation:
      "The chapter defines Cash Flow from Assets as Operating Cash Flow minus Net Capital Spending minus Change in NWC.",
  },
  {
    id: "c2-q8",
    chapter: 2,
    section: "Cash Flow",
    skill: "cash-flow-assets",
    type: "calculation",
    difficulty: "hard",
    question:
      "A firm has EBIT of $500, depreciation of $80, taxes of $100, net capital spending of $150, and an increase in NWC of $60. What is Cash Flow from Assets?",
    answer: "$270",
    explanation:
      "OCF = 500 + 80 − 100 = $480. CFFA = 480 − 150 − 60 = $270.",
  },
  {
    id: "c2-q9",
    chapter: 2,
    section: "Cash Flow",
    skill: "cash-flow-creditors",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm pays $70 of interest and has $46 of net new borrowing. What is cash flow to creditors?",
    answer: "$24",
    explanation:
      "CF/CR = Interest Paid − Net New Borrowing = $70 − $46 = $24.",
  },
  {
    id: "c2-q10",
    chapter: 2,
    section: "Cash Flow",
    skill: "cash-flow-stockholders",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm pays $165 in dividends and raises $40 in net new equity. What is cash flow to stockholders?",
    answer: "$125",
    explanation:
      "CF/SH = Dividends Paid − Net New Equity Raised = $165 − $40 = $125.",
  },

  // ---------------- CHAPTER 3 ----------------

  {
    id: "c3-q1",
    chapter: 3,
    section: "Standardized Financial Statements",
    skill: "common-size",
    type: "multiple",
    difficulty: "easy",
    question:
      "On a common-size balance sheet, all accounts are expressed as a percentage of:",
    options: [
      "Sales",
      "Net income",
      "Total assets",
      "Total equity",
    ],
    answer: "Total assets",
    explanation:
      "The chapter states that common-size balance sheets express all accounts as a percentage of total assets.",
  },
  {
    id: "c3-q2",
    chapter: 3,
    section: "Standardized Financial Statements",
    skill: "common-size",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has inventory of $20,000 and total assets of $100,000. What is inventory's common-size percentage?",
    answer: "20%",
    explanation:
      "Common-size percentage = $20,000 ÷ $100,000 × 100 = 20%.",
  },
  {
    id: "c3-q3",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "liquidity-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has current assets of $700 and current liabilities of $500. What is the current ratio?",
    answer: "1.40 times",
    explanation:
      "Current Ratio = CA ÷ CL = 700 ÷ 500 = 1.40 times.",
  },
  {
    id: "c3-q4",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "liquidity-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has current assets of $708, inventory of $422, and current liabilities of $548. What is the quick ratio?",
    answer: "0.52 times",
    explanation:
      "Quick Ratio = (CA − Inventory) ÷ CL = (708 − 422) ÷ 548 = 0.52 times.",
  },
  {
    id: "c3-q5",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "leverage-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has total assets of $3,630 and total equity of $2,625. What is the total debt ratio?",
    answer: "0.28",
    explanation:
      "Debt Ratio = (TA − TE) ÷ TA = (3,630 − 2,625) ÷ 3,630 ≈ 0.28.",
  },
  {
    id: "c3-q6",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "leverage-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has EBIT of $741 and interest expense of $141. What is Times Interest Earned?",
    answer: "5.26 times",
    explanation:
      "TIE = EBIT ÷ Interest = 741 ÷ 141 = 5.26 times.",
  },
  {
    id: "c3-q7",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "leverage-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has EBIT of $741, depreciation of $276, and interest of $141. What is cash coverage?",
    answer: "7.21 times",
    explanation:
      "Cash Coverage = (EBIT + Depreciation) ÷ Interest = (741 + 276) ÷ 141 = 7.21 times.",
  },
  {
    id: "c3-q8",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "inventory-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has COGS of $1,344 and inventory of $422. What is inventory turnover?",
    answer: "3.18 times",
    explanation:
      "Inventory Turnover = COGS ÷ Inventory = 1,344 ÷ 422 = 3.18 times.",
  },
  {
    id: "c3-q9",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "inventory-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "If inventory turnover is 3.18 times, approximately how many days' sales are in inventory?",
    answer: "114.61 days",
    explanation:
      "Days' Sales in Inventory = 365 ÷ Inventory Turnover = 365 ÷ 3.18 ≈ 114.61 days.",
  },
  {
    id: "c3-q10",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "receivables-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has sales of $2,361 and accounts receivable of $188. What is receivables turnover?",
    answer: "12.56 times",
    explanation:
      "Receivables Turnover = Sales ÷ AR = 2,361 ÷ 188 = 12.56 times.",
  },
  {
    id: "c3-q11",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "receivables-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "If receivables turnover is 12.56 times, approximately how many days' sales are in receivables?",
    answer: "29.06 days",
    explanation:
      "Days' Sales in Receivables = 365 ÷ 12.56 = 29.06 days.",
  },
  {
    id: "c3-q12",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "profitability-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has net income of $474 and sales of $2,361. What is its profit margin?",
    answer: "20.08%",
    explanation:
      "Profit Margin = NI ÷ Sales = 474 ÷ 2,361 = 20.08%.",
  },
  {
    id: "c3-q13",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "profitability-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has net income of $474 and total assets of $3,630. What is ROA?",
    answer: "13.06%",
    explanation:
      "ROA = NI ÷ TA = 474 ÷ 3,630 = 13.06%.",
  },
  {
    id: "c3-q14",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "profitability-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A firm has net income of $474 and total equity of $2,625. What is ROE?",
    answer: "18.06%",
    explanation:
      "ROE = NI ÷ TE = 474 ÷ 2,625 = 18.06%.",
  },
  {
    id: "c3-q15",
    chapter: 3,
    section: "The DuPont Identity",
    skill: "dupont",
    type: "formula",
    difficulty: "easy",
    question: "Which expression represents the DuPont Identity?",
    options: [
      "ROE = PM × TAT × EM",
      "ROE = PM + TAT + EM",
      "ROE = PM ÷ TAT × EM",
      "ROE = NI − TA − TE",
    ],
    answer: "ROE = PM × TAT × EM",
    explanation:
      "The chapter defines the DuPont Identity as ROE = Profit Margin × Total Asset Turnover × Equity Multiplier.",
  },
  {
    id: "c3-q16",
    chapter: 3,
    section: "The DuPont Identity",
    skill: "dupont",
    type: "calculation",
    difficulty: "hard",
    question:
      "A firm has a profit margin of 20.08%, total asset turnover of 0.65, and equity multiplier of 1.38. What is ROE?",
    answer: "18.06%",
    explanation:
      "ROE = PM × TAT × EM = 0.2008 × 0.65 × 1.38 ≈ 18.06%.",
  },
  {
    id: "c3-q17",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "market-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A company has net income of $474 million and 33 million shares outstanding. What is EPS?",
    answer: "$14.36",
    explanation:
      "EPS = Net Income ÷ Shares Outstanding = 474 ÷ 33 = $14.36.",
  },
  {
    id: "c3-q18",
    chapter: 3,
    section: "Ratio Analysis",
    skill: "market-ratios",
    type: "calculation",
    difficulty: "medium",
    question:
      "A stock sells for $115 per share and has EPS of $14.36. What is its P/E ratio?",
    answer: "8.01 times",
    explanation:
      "P/E = Price Per Share ÷ EPS = 115 ÷ 14.36 = 8.01 times.",
  },
  {
    id: "c3-q19",
    chapter: 3,
    section: "Using Financial Statement Information",
    skill: "financial-analysis",
    type: "multiple",
    difficulty: "medium",
    question:
      "Comparing a firm's ratios with similar companies in the same industry is called:",
    options: [
      "Time-trend analysis",
      "Peer group analysis",
      "Capital budgeting",
      "Liquidity analysis",
    ],
    answer: "Peer group analysis",
    explanation:
      "The chapter describes peer group analysis as comparing a company with similar companies or companies within an industry.",
  },
];

const CHAPTERS = [
  {
    id: 1,
    name: "Foundations",
    subtitle: "Financial Management",
    icon: "🏦",
  },
  {
    id: 2,
    name: "Cash Kingdom",
    subtitle: "Statements, Taxes & Cash Flow",
    icon: "💵",
  },
  {
    id: 3,
    name: "Ratio Realm",
    subtitle: "Financial Statement Analysis",
    icon: "📊",
  },
];

const STORAGE_KEY = "finance-world-progress-v1";

type Progress = {
  mastery: Record<string, number>;
  xp: number;
  coins: number;
  completedQuestions: string[];
};

const defaultProgress: Progress = {
  mastery: {},
  xp: 0,
  coins: 0,
  completedQuestions: [],
};

function App() {
  const [progress, setProgress] = useState<Progress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  const [screen, setScreen] = useState<
    "map" | "practice" | "skills" | "formulas" | "exam"
  >("map");

  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
    null
  );
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [questionQueue, setQuestionQueue] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [examScore, setExamScore] = useState(0);
  const [examTotal, setExamTotal] = useState(0);
  const [examFinished, setExamFinished] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const getMastery = (skillId: string) => progress.mastery[skillId] ?? 0;

  const masteryName = (level: number) => {
    const names = [
      "Not Learned",
      "Familiar",
      "Developing",
      "Proficient",
      "Mastered",
    ];

    return names[Math.min(level, 4)];
  };

  const levelUp = (skillId: string, correct: boolean) => {
    setProgress((prev) => {
      const current = prev.mastery[skillId] ?? 0;

      let next = current;

      if (correct) {
        next = Math.min(4, current + 1);
      } else {
        next = Math.max(0, current - 0.25);
      }

      return {
        ...prev,
        mastery: {
          ...prev.mastery,
          [skillId]: Number(next.toFixed(2)),
        },
        xp: prev.xp + (correct ? 25 : 5),
        coins: prev.coins + (correct ? 10 : 2),
      };
    });
  };

  const startPractice = (
    chapter: number,
    skill?: string,
    count = 10
  ) => {
    let pool = QUESTIONS.filter((q) => q.chapter === chapter);

    if (skill) {
      pool = pool.filter((q) => q.skill === skill);
    }

    const shuffled = [...pool].sort(() => Math.random() - 0.5);

    setQuestionQueue(shuffled.slice(0, count));
    setQuestionIndex(0);
    setCurrentQuestion(shuffled[0] ?? null);
    setSelectedAnswer("");
    setAnswered(false);
    setSelectedChapter(chapter);
    setSelectedSkill(skill ?? null);
    setScreen("practice");
  };

  const startExam = () => {
    const pool = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 20);

    setQuestionQueue(pool);
    setQuestionIndex(0);
    setCurrentQuestion(pool[0] ?? null);
    setSelectedAnswer("");
    setAnswered(false);
    setExamScore(0);
    setExamTotal(pool.length);
    setExamFinished(false);
    setScreen("exam");
  };

  const submitAnswer = () => {
    if (!currentQuestion || answered) return;

    const correct =
      selectedAnswer.trim().toLowerCase() ===
      currentQuestion.answer.trim().toLowerCase();

    setAnswered(true);

    if (screen === "exam") {
      if (correct) {
        setExamScore((score) => score + 1);
      }
    } else {
      levelUp(currentQuestion.skill, correct);

      setProgress((prev) => ({
        ...prev,
        completedQuestions: prev.completedQuestions.includes(
          currentQuestion.id
        )
          ? prev.completedQuestions
          : [...prev.completedQuestions, currentQuestion.id],
      }));
    }
  };

  const nextQuestion = () => {
    const nextIndex = questionIndex + 1;

    if (nextIndex >= questionQueue.length) {
      if (screen === "exam") {
        setExamFinished(true);
      } else {
        setScreen("map");
      }

      return;
    }

    const next = questionQueue[nextIndex];

    setQuestionIndex(nextIndex);
    setCurrentQuestion(next);
    setSelectedAnswer("");
    setAnswered(false);
  };

  const overallMastery = useMemo(() => {
    if (!SKILLS.length) return 0;

    const total = SKILLS.reduce(
      (sum, skill) => sum + getMastery(skill.id),
      0
    );

    return Math.round((total / (SKILLS.length * 4)) * 100);
  }, [progress]);

  const chapterMastery = (chapter: number) => {
    const skills = SKILLS.filter((s) => s.chapter === chapter);

    if (!skills.length) return 0;

    const total = skills.reduce(
      (sum, skill) => sum + getMastery(skill.id),
      0
    );

    return Math.round((total / (skills.length * 4)) * 100);
  };

  const chapterUnlocked = (chapter: number) => {
    if (chapter === 1) return true;

    return chapterMastery(chapter - 1) >= 50;
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">₣</div>
          <div>
            <h1>FINANCE WORLD</h1>
            <span>Corporate Finance Adventure</span>
          </div>
        </div>

        <div className="player-stats">
          <div className="stat">
            <span>⭐</span>
            <strong>{progress.xp}</strong>
            <small>XP</small>
          </div>

          <div className="stat">
            <span>🪙</span>
            <strong>{progress.coins}</strong>
            <small>COINS</small>
          </div>

          <div className="stat">
            <span>🧠</span>
            <strong>{overallMastery}%</strong>
            <small>MASTERY</small>
          </div>
        </div>
      </header>

      <nav className="nav">
        <button
          className={screen === "map" ? "active" : ""}
          onClick={() => setScreen("map")}
        >
          🗺️ Map
        </button>

        <button
          className={screen === "skills" ? "active" : ""}
          onClick={() => setScreen("skills")}
        >
          🧠 My Skills
        </button>

        <button
          className={screen === "formulas" ? "active" : ""}
          onClick={() => setScreen("formulas")}
        >
          📖 Formula Book
        </button>

        <button onClick={startExam}>👑 Exam Mode</button>
      </nav>

      <main>
        {screen === "map" && (
          <MapScreen
            selectedChapter={selectedChapter}
            setSelectedChapter={setSelectedChapter}
            chapterMastery={chapterMastery}
            chapterUnlocked={chapterUnlocked}
            startPractice={startPractice}
            startExam={startExam}
            skills={SKILLS}
            getMastery={getMastery}
          />
        )}

        {screen === "skills" && (
          <SkillsScreen
            skills={SKILLS}
            getMastery={getMastery}
            masteryName={masteryName}
            startPractice={startPractice}
          />
        )}

        {screen === "formulas" && <FormulaBook />}

        {(screen === "practice" || screen === "exam") && (
          <QuestionScreen
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            answered={answered}
            submitAnswer={submitAnswer}
            nextQuestion={nextQuestion}
            questionNumber={questionIndex + 1}
            totalQuestions={questionQueue.length}
            exam={screen === "exam"}
            examFinished={examFinished}
            examScore={examScore}
            examTotal={examTotal}
            returnToMap={() => setScreen("map")}
          />
        )}
      </main>
    </div>
  );
}

function MapScreen({
  selectedChapter,
  setSelectedChapter,
  chapterMastery,
  chapterUnlocked,
  startPractice,
  startExam,
  skills,
  getMastery,
}: {
  selectedChapter: number;
  setSelectedChapter: (x: number) => void;
  chapterMastery: (x: number) => number;
  chapterUnlocked: (x: number) => boolean;
  startPractice: (chapter: number, skill?: string, count?: number) => void;
  startExam: () => void;
  skills: Skill[];
  getMastery: (id: string) => number;
}) {
  const chapter = CHAPTERS.find((c) => c.id === selectedChapter)!;

  const chapterSkills = skills.filter((s) => s.chapter === selectedChapter);

  return (
    <section className="map-screen">
      <div className="hero">
        <div>
          <div className="eyebrow">WELCOME TO</div>
          <h2>FINANCE WORLD</h2>
          <p>
            Learn financial concepts, master formulas, and defeat chapter
            bosses.
          </p>
        </div>

        <button className="gold-button" onClick={startExam}>
          START EXAM MODE
        </button>
      </div>

      <div className="world-selector">
        {CHAPTERS.map((c) => {
          const unlocked = chapterUnlocked(c.id);

          return (
            <button
              key={c.id}
              disabled={!unlocked}
              className={`world-tab ${
                selectedChapter === c.id ? "selected" : ""
              } ${!unlocked ? "locked" : ""}`}
              onClick={() => setSelectedChapter(c.id)}
            >
              <span className="world-icon">{unlocked ? c.icon : "🔒"}</span>
              <strong>WORLD {c.id}</strong>
              <small>{c.name}</small>
            </button>
          );
        })}
      </div>

      <div className="world-header">
        <div>
          <span>WORLD {chapter.id}</span>
          <h3>{chapter.name}</h3>
          <p>{chapter.subtitle}</p>
        </div>

        <div className="world-progress">
          <strong>{chapterMastery(chapter.id)}%</strong>
          <span>WORLD MASTERY</span>
        </div>
      </div>

      <div className="map-path">
        {chapterSkills.map((skill, index) => {
          const mastery = getMastery(skill.id);

          return (
            <div className="map-node-wrapper" key={skill.id}>
              <button
                className={`map-node ${
                  mastery >= 4 ? "mastered" : mastery > 0 ? "started" : ""
                }`}
                onClick={() => startPractice(chapter.id, skill.id, 5)}
              >
                <span className="node-number">{index + 1}</span>

                <div className="node-icon">
                  {mastery >= 4
                    ? "✓"
                    : chapter.id === 1
                    ? "🏦"
                    : chapter.id === 2
                    ? "💵"
                    : "📊"}
                </div>

                <strong>{skill.name}</strong>

                <div className="node-level">
                  {mastery >= 4
                    ? "MASTERED"
                    : `LEVEL ${Math.floor(mastery)}`}
                </div>
              </button>

              {index < chapterSkills.length - 1 && (
                <div className="path-line" />
              )}
            </div>
          );
        })}

        <div className="boss-wrapper">
          <button
            className="boss-node"
            onClick={() => {
              if (chapter.id === 1) {
                startPractice(1, undefined, 12);
              } else if (chapter.id === 2) {
                startPractice(2, undefined, 15);
              } else {
                startPractice(3, undefined, 20);
              }
            }}
          >
            <span>👑</span>
            <strong>CHAPTER BOSS</strong>
            <small>Mixed Challenge</small>
          </button>
        </div>
      </div>

      <div className="training-panel">
        <div>
          <span className="eyebrow">NEED PRACTICE?</span>
          <h3>Train Your Weakest Skills</h3>
          <p>
            Practice the concepts where your understanding level is lowest.
          </p>
        </div>

        <button
          className="dark-button"
          onClick={() => {
            const weakest = [...chapterSkills].sort(
              (a, b) => getMastery(a.id) - getMastery(b.id)
            )[0];

            if (weakest) {
              startPractice(chapter.id, weakest.id, 10);
            }
          }}
        >
          🎯 TRAIN WEAKEST SKILL
        </button>
      </div>
    </section>
  );
}

function SkillsScreen({
  skills,
  getMastery,
  masteryName,
  startPractice,
}: {
  skills: Skill[];
  getMastery: (id: string) => number;
  masteryName: (x: number) => string;
  startPractice: (chapter: number, skill?: string, count?: number) => void;
}) {
  return (
    <section className="content-screen">
      <div className="page-heading">
        <span className="eyebrow">PLAYER PROFILE</span>
        <h2>MY SKILLS</h2>
        <p>
          Every concept has its own understanding level. Keep training until
          you reach Mastered.
        </p>
      </div>

      {[1, 2, 3].map((chapter) => {
        const chapterSkills = skills.filter((s) => s.chapter === chapter);

        return (
          <div className="skill-section" key={chapter}>
            <h3>WORLD {chapter}</h3>

            <div className="skill-grid">
              {chapterSkills.map((skill) => {
                const level = getMastery(skill.id);

                return (
                  <div className="skill-card" key={skill.id}>
                    <div className="skill-card-top">
                      <div>
                        <small>{skill.section}</small>
                        <h4>{skill.name}</h4>
                      </div>

                      <span className="skill-level">
                        {Math.floor(level)}
                      </span>
                    </div>

                    <p>{skill.description}</p>

                    <div className="mastery-bar">
                      <div
                        style={{
                          width: `${(level / 4) * 100}%`,
                        }}
                      />
                    </div>

                    <div className="skill-footer">
                      <span>{masteryName(level)}</span>

                      <button
                        onClick={() =>
                          startPractice(skill.chapter, skill.id, 10)
                        }
                      >
                        TRAIN
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}

function FormulaBook() {
  const [chapter, setChapter] = useState(0);
  const [search, setSearch] = useState("");

  const formulas = FORMULAS.filter((formula) => {
    const chapterMatch = chapter === 0 || formula.chapter === chapter;

    const searchMatch =
      formula.name.toLowerCase().includes(search.toLowerCase()) ||
      formula.formula.toLowerCase().includes(search.toLowerCase()) ||
      formula.category.toLowerCase().includes(search.toLowerCase());

    return chapterMatch && searchMatch;
  });

  return (
    <section className="content-screen">
      <div className="page-heading">
        <span className="eyebrow">REFERENCE</span>
        <h2>FORMULA BOOK</h2>
        <p>
          Your formulas stay available while practicing. In Exam Mode, they
          are not shown.
        </p>
      </div>

      <div className="formula-controls">
        <input
          placeholder="Search formulas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {[0, 2, 3].map((c) => (
          <button
            key={c}
            className={chapter === c ? "active-filter" : ""}
            onClick={() => setChapter(c)}
          >
            {c === 0 ? "All" : `Chapter ${c}`}
          </button>
        ))}
      </div>

      <div className="formula-grid">
        {formulas.map((formula) => (
          <div className="formula-card" key={formula.name}>
            <div className="formula-category">
              CHAPTER {formula.chapter} · {formula.category}
            </div>

            <h3>{formula.name}</h3>

            <div className="formula">
              {formula.formula}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuestionScreen({
  question,
  selectedAnswer,
  setSelectedAnswer,
  answered,
  submitAnswer,
  nextQuestion,
  questionNumber,
  totalQuestions,
  exam,
  examFinished,
  examScore,
  examTotal,
  returnToMap,
}: {
  question: Question | null;
  selectedAnswer: string;
  setSelectedAnswer: (x: string) => void;
  answered: boolean;
  submitAnswer: () => void;
  nextQuestion: () => void;
  questionNumber: number;
  totalQuestions: number;
  exam: boolean;
  examFinished: boolean;
  examScore: number;
  examTotal: number;
  returnToMap: () => void;
}) {
  if (exam && examFinished) {
    const percentage =
      examTotal === 0 ? 0 : Math.round((examScore / examTotal) * 100);

    return (
      <section className="question-screen">
        <div className="exam-result">
          <div className="trophy">🏆</div>

          <span className="eyebrow">EXAM COMPLETE</span>

          <h2>{percentage}%</h2>

          <p>
            You answered <strong>{examScore}</strong> of{" "}
            <strong>{examTotal}</strong> questions correctly.
          </p>

          <div className="result-buttons">
            <button className="gold-button" onClick={returnToMap}>
              RETURN TO MAP
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!question) {
    return (
      <section className="question-screen">
        <div className="empty-state">
          <h2>No questions available</h2>
          <button onClick={returnToMap}>Return to Map</button>
        </div>
      </section>
    );
  }

  const correct =
    selectedAnswer.trim().toLowerCase() ===
    question.answer.trim().toLowerCase();

  return (
    <section className="question-screen">
      <div className="question-top">
        <button className="back-button" onClick={returnToMap}>
          ← EXIT
        </button>

        <div className="question-progress">
          QUESTION {questionNumber} / {totalQuestions}
        </div>

        <div className="question-type">
          {exam ? "EXAM MODE" : question.difficulty.toUpperCase()}
        </div>
      </div>

      <div className="question-card">
        <div className="question-meta">
          <span>WORLD {question.chapter}</span>
          <span>{question.section}</span>
          {!exam && <span>{question.skill}</span>}
        </div>

        <h2>{question.question}</h2>

        {question.options ? (
          <div className="answer-options">
            {question.options.map((option) => (
              <button
                key={option}
                disabled={answered}
                className={`answer-option ${
                  selectedAnswer === option ? "selected" : ""
                } ${
                  answered && option === question.answer ? "correct" : ""
                } ${
                  answered &&
                  selectedAnswer === option &&
                  option !== question.answer
                    ? "incorrect"
                    : ""
                }`}
                onClick={() => setSelectedAnswer(option)}
              >
                <span>{String.fromCharCode(65 + question.options!.indexOf(option))}</span>
                {option}
              </button>
            ))}
          </div>
        ) : (
          <input
            className="calculation-input"
            placeholder="Enter your answer..."
            value={selectedAnswer}
            disabled={answered}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitAnswer();
            }}
          />
        )}

        {!answered ? (
          <button
            className="submit-button"
            disabled={!selectedAnswer}
            onClick={submitAnswer}
          >
            LOCK IN ANSWER
          </button>
        ) : (
          <div className={`feedback ${correct ? "correct-box" : "wrong-box"}`}>
            <div className="feedback-title">
              {correct ? "✓ CORRECT!" : "✕ NOT QUITE"}
            </div>

            <p>{question.explanation}</p>

            {!correct && (
              <div className="answer-reveal">
                Correct answer: <strong>{question.answer}</strong>
              </div>
            )}

            <button className="next-button" onClick={nextQuestion}>
              {questionNumber === totalQuestions
                ? exam
                  ? "FINISH EXAM"
                  : "RETURN TO MAP"
                : "NEXT QUESTION →"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
