import type { Question } from "./data";

/*
  Dynamic question generators for calculation/formula questions.
  Each generator produces a Question with fresh random numbers,
  a correctly computed answer, plausible distractors, and a
  step-by-step explanation.
*/

type Generator = () => Omit<Question, "id">;

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function round(value: number, decimals = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

function formatMoney(value: number): string {
  return "$" + value.toLocaleString("en-US");
}

function formatPercent(value: number): string {
  return round(value, 2) + "%";
}

function formatNumber(value: number, decimals = 2): string {
  return round(value, decimals).toFixed(decimals);
}

function formatDays(value: number): string {
  return round(value, 2) + " days";
}

function shuffleOptions(
  correct: string,
  distractors: string[]
): { options: string[]; answer: number } {
  const all = [correct, ...distractors];
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }
  return { options: all, answer: all.indexOf(correct) };
}

function moneyDistractors(correct: number, spread: number): string[] {
  const d1 = correct + spread;
  const d2 = correct - spread;
  const d3 = correct + spread * 2;
  return [formatMoney(d1), formatMoney(d2), formatMoney(d3)];
}

function numberDistractors(
  correct: number,
  variants: number[],
  formatter: (v: number) => string
): string[] {
  const unique = Array.from(new Set(variants)).slice(0, 3);
  return unique.map((v) => formatter(v));
}

const generators: Record<string, Generator> = {
  // ===== CHAPTER 2 =====

  // c2-001: Balance Sheet Identity — find equity
  "c2-001": () => {
    const assets = randInt(300, 900) * 1000;
    const liabilities = randInt(100, assets - 50000) * 1000;
    const equity = assets - liabilities;
    const { options, answer } = shuffleOptions(formatMoney(equity), [
      formatMoney(equity + randInt(30000, 80000)),
      formatMoney(equity - randInt(30000, 80000)),
      formatMoney(liabilities),
    ]);
    return {
      chapter: 2,
      section: "The Balance Sheet",
      skill: "Balance Sheet Identity",
      type: "formula",
      question: `A firm has total assets of ${formatMoney(assets)} and total liabilities of ${formatMoney(liabilities)}. What is total stockholders' equity?`,
      options,
      answer,
      explanation: `Assets = Liabilities + Equity. Therefore, Equity = ${formatMoney(assets)} − ${formatMoney(liabilities)} = ${formatMoney(equity)}.`,
      formula: "Assets = Liabilities + Stockholders' Equity",
    };
  },

  // c2-002: NWC = CA - CL
  "c2-002": () => {
    const ca = randInt(80, 300) * 1000;
    const cl = randInt(40, ca - 20000) * 1000;
    const nwc = ca - cl;
    const { options, answer } = shuffleOptions(formatMoney(nwc), [
      formatMoney(ca + cl),
      formatMoney(cl),
      formatMoney(ca),
    ]);
    return {
      chapter: 2,
      section: "The Balance Sheet",
      skill: "Net Working Capital",
      type: "calculation",
      question: `A firm has current assets of ${formatMoney(ca)} and current liabilities of ${formatMoney(cl)}. What is net working capital?`,
      options,
      answer,
      explanation: `NWC = Current Assets − Current Liabilities = ${formatMoney(ca)} − ${formatMoney(cl)} = ${formatMoney(nwc)}.`,
      formula: "NWC = CA − CL",
    };
  },

  // c2-003: CA = NWC + CL
  "c2-003": () => {
    const nwc = randInt(8, 25) * 1000;
    const cl = randInt(12, 30) * 1000;
    const ca = nwc + cl;
    const { options, answer } = shuffleOptions(formatMoney(ca), [
      formatMoney(cl - nwc),
      formatMoney(nwc),
      formatMoney(cl),
    ]);
    return {
      chapter: 2,
      section: "The Balance Sheet",
      skill: "Net Working Capital",
      type: "calculation",
      question: `A firm has net working capital of ${formatMoney(nwc)} and current liabilities of ${formatMoney(cl)}. What are current assets?`,
      options,
      answer,
      explanation: `NWC = CA − CL. Rearranging gives CA = NWC + CL = ${formatMoney(nwc)} + ${formatMoney(cl)} = ${formatMoney(ca)}.`,
      formula: "CA = NWC + CL",
    };
  },

  // c2-007: Net Income = Revenue - Expenses
  "c2-007": () => {
    const revenue = randInt(500, 1200) * 1000;
    const expenses = randInt(300, revenue - 50000) * 1000;
    const ni = revenue - expenses;
    const { options, answer } = shuffleOptions(formatMoney(ni), [
      formatMoney(revenue + expenses),
      formatMoney(expenses),
      formatMoney(revenue),
    ]);
    return {
      chapter: 2,
      section: "The Income Statement",
      skill: "Net Income",
      type: "calculation",
      question: `If a firm has revenue of ${formatMoney(revenue)} and total expenses of ${formatMoney(expenses)}, what is net income?`,
      options,
      answer,
      explanation: `Net Income = Revenue − Expenses = ${formatMoney(revenue)} − ${formatMoney(expenses)} = ${formatMoney(ni)}.`,
      formula: "Net Income = Revenue − Expenses",
    };
  },

  // c2-009: Average Tax Rate
  "c2-009": () => {
    const income = randInt(50, 200) * 1000;
    const taxRate = randInt(12, 26);
    const taxes = round((income * taxRate) / 100, 0);
    const atr = round((taxes / income) * 100, 2);
    const { options, answer } = shuffleOptions(formatPercent(atr), [
      formatPercent(atr + randInt(5, 10)),
      formatPercent(atr - randInt(3, 8)),
      formatPercent(taxRate),
    ]);
    return {
      chapter: 2,
      section: "Taxes",
      skill: "Marginal vs Average Tax Rate",
      type: "calculation",
      question: `A taxpayer owes ${formatMoney(taxes)} in taxes on taxable income of ${formatMoney(income)}. What is the average tax rate?`,
      options,
      answer,
      explanation: `Average tax rate = Total taxes / Taxable income = ${formatMoney(taxes)} / ${formatMoney(income)} = ${formatPercent(atr)}.`,
      formula: "Average Tax Rate = Total Taxes / Taxable Income",
    };
  },

  // c2-011: OCF = EBIT + Dep - Taxes
  "c2-011": () => {
    const ebit = randInt(300, 700) * 1000;
    const dep = randInt(30, 120) * 1000;
    const taxes = randInt(50, ebit - 50000) * 1000;
    const ocf = ebit + dep - taxes;
    const { options, answer } = shuffleOptions(formatMoney(ocf), moneyDistractors(ocf, randInt(40000, 120000)));
    return {
      chapter: 2,
      section: "Cash Flow",
      skill: "Operating Cash Flow",
      type: "calculation",
      question: `A firm has EBIT of ${formatMoney(ebit)}, depreciation of ${formatMoney(dep)}, and taxes of ${formatMoney(taxes)}. What is operating cash flow?`,
      options,
      answer,
      explanation: `OCF = EBIT + Depreciation − Taxes = ${formatMoney(ebit)} + ${formatMoney(dep)} − ${formatMoney(taxes)} = ${formatMoney(ocf)}.`,
      formula: "OCF = EBIT + Depreciation − Taxes",
    };
  },

  // c2-012: NCS = EndNFA - BegNFA + Dep
  "c2-012": () => {
    const beg = randInt(500, 900) * 1000;
    const end = beg + randInt(20, 200) * 1000;
    const dep = randInt(30, 120) * 1000;
    const ncs = end - beg + dep;
    const { options, answer } = shuffleOptions(formatMoney(ncs), [
      formatMoney(end - beg - dep),
      formatMoney(end - beg),
      formatMoney(end + dep),
    ]);
    return {
      chapter: 2,
      section: "Cash Flow",
      skill: "Net Capital Spending",
      type: "calculation",
      question: `Beginning net fixed assets are ${formatMoney(beg)}, ending net fixed assets are ${formatMoney(end)}, and depreciation is ${formatMoney(dep)}. What is net capital spending?`,
      options,
      answer,
      explanation: `NCS = Ending NFA − Beginning NFA + Depreciation = ${formatMoney(end)} − ${formatMoney(beg)} + ${formatMoney(dep)} = ${formatMoney(ncs)}.`,
      formula: "NCS = Ending NFA − Beginning NFA + Depreciation",
    };
  },

  // c2-013: Change in NWC
  "c2-013": () => {
    const beg = randInt(100, 250) * 1000;
    const end = beg + randInt(20, 150) * 1000;
    const change = end - beg;
    const { options, answer } = shuffleOptions(formatMoney(change), [
      formatMoney(end + beg),
      formatMoney(beg),
      formatMoney(end),
    ]);
    return {
      chapter: 2,
      section: "Cash Flow",
      skill: "Change in NWC",
      type: "calculation",
      question: `Beginning NWC is ${formatMoney(beg)} and ending NWC is ${formatMoney(end)}. What is the change in NWC?`,
      options,
      answer,
      explanation: `ΔNWC = Ending NWC − Beginning NWC = ${formatMoney(end)} − ${formatMoney(beg)} = ${formatMoney(change)}.`,
      formula: "ΔNWC = Ending NWC − Beginning NWC",
    };
  },

  // c2-014: CFFA = OCF - NCS - ΔNWC
  "c2-014": () => {
    const ocf = randInt(300, 600) * 1000;
    const ncs = randInt(80, 250) * 1000;
    const dnwc = randInt(20, 100) * 1000;
    const cffa = ocf - ncs - dnwc;
    const { options, answer } = shuffleOptions(formatMoney(cffa), [
      formatMoney(ocf + ncs + dnwc),
      formatMoney(ocf - ncs + dnwc),
      formatMoney(ocf + ncs - dnwc),
    ]);
    return {
      chapter: 2,
      section: "Cash Flow",
      skill: "Cash Flow from Assets",
      type: "calculation",
      question: `If OCF is ${formatMoney(ocf)}, NCS is ${formatMoney(ncs)}, and ΔNWC is ${formatMoney(dnwc)}, what is cash flow from assets?`,
      options,
      answer,
      explanation: `CFFA = OCF − NCS − ΔNWC = ${formatMoney(ocf)} − ${formatMoney(ncs)} − ${formatMoney(dnwc)} = ${formatMoney(cffa)}.`,
      formula: "CFFA = OCF − NCS − ΔNWC",
    };
  },

  // c2-015: CF/CR = Interest - Net New Borrowing
  "c2-015": () => {
    const interest = randInt(30, 120) * 1000;
    const borrowing = randInt(5, interest - 5000) * 1000;
    const cfcr = interest - borrowing;
    const { options, answer } = shuffleOptions(formatMoney(cfcr), [
      formatMoney(interest + borrowing),
      formatMoney(borrowing),
      formatMoney(interest),
    ]);
    return {
      chapter: 2,
      section: "Cash Flow",
      skill: "Cash Flow to Creditors",
      type: "calculation",
      question: `A firm paid ${formatMoney(interest)} in interest and borrowed a net ${formatMoney(borrowing)}. What is cash flow to creditors?`,
      options,
      answer,
      explanation: `CF/CR = Interest Paid − Net New Borrowing = ${formatMoney(interest)} − ${formatMoney(borrowing)} = ${formatMoney(cfcr)}.`,
      formula: "CF/CR = Interest Paid − Net New Borrowing",
    };
  },

  // c2-016: CF/SH = Dividends - Net New Equity
  "c2-016": () => {
    const div = randInt(30, 100) * 1000;
    const equity = randInt(5, div - 5000) * 1000;
    const cfsh = div - equity;
    const { options, answer } = shuffleOptions(formatMoney(cfsh), [
      formatMoney(div + equity),
      formatMoney(equity),
      formatMoney(div),
    ]);
    return {
      chapter: 2,
      section: "Cash Flow",
      skill: "Cash Flow to Stockholders",
      type: "calculation",
      question: `A firm paid ${formatMoney(div)} in dividends and raised ${formatMoney(equity)} in net new equity. What is cash flow to stockholders?`,
      options,
      answer,
      explanation: `CF/SH = Dividends Paid − Net New Equity Raised = ${formatMoney(div)} − ${formatMoney(equity)} = ${formatMoney(cfsh)}.`,
      formula: "CF/SH = Dividends Paid − Net New Equity Raised",
    };
  },

  // c2-017: CFFA = CF/CR + CF/SH
  "c2-017": () => {
    const cfcr = randInt(20, 80) * 1000;
    const cfsh = randInt(20, 80) * 1000;
    const cffa = cfcr + cfsh;
    const { options, answer } = shuffleOptions(formatMoney(cffa), [
      formatMoney(Math.abs(cfcr - cfsh)),
      formatMoney(cfcr),
      formatMoney(cfsh),
    ]);
    return {
      chapter: 2,
      section: "Cash Flow",
      skill: "Cash Flow Identity",
      type: "calculation",
      question: `If cash flow to creditors is ${formatMoney(cfcr)} and cash flow to stockholders is ${formatMoney(cfsh)}, what is cash flow from assets?`,
      options,
      answer,
      explanation: `CFFA = CF/CR + CF/SH = ${formatMoney(cfcr)} + ${formatMoney(cfsh)} = ${formatMoney(cffa)}.`,
      formula: "CFFA = CF/CR + CF/SH",
    };
  },

  // ===== CHAPTER 3 =====

  // c3-003: Common-Size Percentage
  "c3-003": () => {
    const equity = randInt(100, 300) * 1000;
    const assets = randInt(equity + 50000, equity + 200000);
    const pct = round((equity / assets) * 100, 2);
    const { options, answer } = shuffleOptions(formatPercent(pct), [
      formatPercent(round((assets / equity) * 100, 2)),
      formatPercent(round(100 - pct, 2)),
      formatPercent(round(pct / 2, 2)),
    ]);
    return {
      chapter: 3,
      section: "Standardized Financial Statements",
      skill: "Common-Size Statements",
      type: "calculation",
      question: `If total equity is ${formatMoney(equity)} and total assets are ${formatMoney(assets)}, what is equity as a percentage of total assets?`,
      options,
      answer,
      explanation: `Common-size equity = Equity / Total Assets = ${formatMoney(equity)} / ${formatMoney(assets)} ≈ ${formatPercent(pct)}.`,
      formula: "Common-Size Percentage = Account / Total Assets",
    };
  },

  // c3-005: Current Ratio = CA / CL
  "c3-005": () => {
    const cl = randInt(60, 200) * 1000;
    const ratio = randInt(15, 40) / 10;
    const ca = round(cl * ratio, 0);
    const cr = round(ca / cl, 2);
    const { options, answer } = shuffleOptions(formatNumber(cr), [
      formatNumber(round(cl / ca, 2)),
      formatNumber(round(cr * 0.5, 2)),
      formatNumber(round(cr * 1.5, 2)),
    ]);
    return {
      chapter: 3,
      section: "Liquidity Ratios",
      skill: "Current Ratio",
      type: "calculation",
      question: `A company has current assets of ${formatMoney(ca)} and current liabilities of ${formatMoney(cl)}. What is its current ratio?`,
      options,
      answer,
      explanation: `Current Ratio = CA / CL = ${formatMoney(ca)} / ${formatMoney(cl)} = ${formatNumber(cr)}.`,
      formula: "Current Ratio = CA / CL",
    };
  },

  // c3-006: Quick Ratio = (CA - Inv) / CL
  "c3-006": () => {
    const cl = randInt(60, 200) * 1000;
    const inv = randInt(20, 80) * 1000;
    const ca = cl + randInt(60, 200) * 1000 + inv;
    const qr = round((ca - inv) / cl, 2);
    const { options, answer } = shuffleOptions(formatNumber(qr), [
      formatNumber(round(ca / cl, 2)),
      formatNumber(round(cl / (ca - inv), 2)),
      formatNumber(round(qr * 0.5, 2)),
    ]);
    return {
      chapter: 3,
      section: "Liquidity Ratios",
      skill: "Quick Ratio",
      type: "calculation",
      question: `A company has current assets of ${formatMoney(ca)}, inventory of ${formatMoney(inv)}, and current liabilities of ${formatMoney(cl)}. What is the quick ratio?`,
      options,
      answer,
      explanation: `Quick Ratio = (CA − Inventory) / CL = (${formatMoney(ca)} − ${formatMoney(inv)}) / ${formatMoney(cl)} = ${formatNumber(qr)}.`,
      formula: "Quick Ratio = (CA − Inventory) / CL",
    };
  },

  // c3-007: Cash Ratio = Cash / CL
  "c3-007": () => {
    const cl = randInt(60, 200) * 1000;
    const cash = randInt(10, 60) * 1000;
    const cr = round(cash / cl, 2);
    const { options, answer } = shuffleOptions(formatNumber(cr), [
      formatNumber(round(cl / cash, 2)),
      formatNumber(round(cr * 2, 2)),
      formatNumber(round(cr + 0.5, 2)),
    ]);
    return {
      chapter: 3,
      section: "Liquidity Ratios",
      skill: "Cash Ratio",
      type: "calculation",
      question: `A company has cash of ${formatMoney(cash)} and current liabilities of ${formatMoney(cl)}. What is the cash ratio?`,
      options,
      answer,
      explanation: `Cash Ratio = Cash / CL = ${formatMoney(cash)} / ${formatMoney(cl)} = ${formatNumber(cr)}.`,
      formula: "Cash Ratio = Cash / CL",
    };
  },

  // c3-008: Total Debt Ratio = (TA - TE) / TA
  "c3-008": () => {
    const ta = randInt(300, 800) * 1000;
    const te = randInt(150, ta - 50000) * 1000;
    const dr = round((ta - te) / ta, 2);
    const { options, answer } = shuffleOptions(formatPercent(round(dr * 100, 2)), [
      formatPercent(round((1 - dr) * 100, 2)),
      formatPercent(round(dr * 50, 2)),
      formatPercent(round(dr * 150, 2)),
    ]);
    return {
      chapter: 3,
      section: "Financial Leverage Ratios",
      skill: "Total Debt Ratio",
      type: "calculation",
      question: `A firm has total assets of ${formatMoney(ta)} and total equity of ${formatMoney(te)}. What is its total debt ratio?`,
      options,
      answer,
      explanation: `Debt = Assets − Equity = ${formatMoney(ta)} − ${formatMoney(te)} = ${formatMoney(ta - te)}. Debt ratio = ${formatMoney(ta - te)} / ${formatMoney(ta)} = ${formatPercent(round(dr * 100, 2))}.`,
      formula: "Total Debt Ratio = (TA − TE) / TA",
    };
  },

  // c3-009: D/E = TD / TE
  "c3-009": () => {
    const td = randInt(100, 400) * 1000;
    const te = randInt(150, 500) * 1000;
    const de = round(td / te, 2);
    const { options, answer } = shuffleOptions(formatNumber(de), [
      formatNumber(round(te / td, 2)),
      formatNumber(round(de * 2, 2)),
      formatNumber(round(de / 2, 2)),
    ]);
    return {
      chapter: 3,
      section: "Financial Leverage Ratios",
      skill: "Debt-to-Equity Ratio",
      type: "calculation",
      question: `A firm has total debt of ${formatMoney(td)} and total equity of ${formatMoney(te)}. What is the debt-to-equity ratio?`,
      options,
      answer,
      explanation: `D/E = Total Debt / Total Equity = ${formatMoney(td)} / ${formatMoney(te)} ≈ ${formatNumber(de)}.`,
      formula: "D/E = TD / TE",
    };
  },

  // c3-010: EM = TA / TE
  "c3-010": () => {
    const ta = randInt(300, 800) * 1000;
    const te = randInt(150, ta - 50000) * 1000;
    const em = round(ta / te, 2);
    const { options, answer } = shuffleOptions(formatNumber(em), [
      formatNumber(round(te / ta, 2)),
      formatNumber(round(em * 2, 2)),
      formatNumber(round(em + 1, 2)),
    ]);
    return {
      chapter: 3,
      section: "Financial Leverage Ratios",
      skill: "Equity Multiplier",
      type: "calculation",
      question: `A firm has total assets of ${formatMoney(ta)} and total equity of ${formatMoney(te)}. What is the equity multiplier?`,
      options,
      answer,
      explanation: `EM = TA / TE = ${formatMoney(ta)} / ${formatMoney(te)} ≈ ${formatNumber(em)}.`,
      formula: "EM = TA / TE",
    };
  },

  // c3-011: TIE = EBIT / Interest
  "c3-011": () => {
    const interest = randInt(20, 80) * 1000;
    const ebit = interest * randInt(3, 12);
    const tie = round(ebit / interest, 2);
    const { options, answer } = shuffleOptions(formatNumber(tie), [
      formatNumber(round(interest / ebit, 3)),
      formatNumber(round(tie * 0.5, 2)),
      formatNumber(round(tie + 2, 2)),
    ]);
    return {
      chapter: 3,
      section: "Financial Leverage Ratios",
      skill: "Times Interest Earned",
      type: "calculation",
      question: `A firm has EBIT of ${formatMoney(ebit)} and interest expense of ${formatMoney(interest)}. What is times interest earned?`,
      options,
      answer,
      explanation: `TIE = EBIT / Interest = ${formatMoney(ebit)} / ${formatMoney(interest)} = ${formatNumber(tie)}.`,
      formula: "TIE = EBIT / Interest",
    };
  },

  // c3-012: Cash Coverage = (EBIT + Dep) / Interest
  "c3-012": () => {
    const interest = randInt(20, 80) * 1000;
    const ebit = interest * randInt(3, 10);
    const dep = randInt(20, 100) * 1000;
    const cc = round((ebit + dep) / interest, 2);
    const { options, answer } = shuffleOptions(formatNumber(cc), [
      formatNumber(round(ebit / interest, 2)),
      formatNumber(round((ebit - dep) / interest, 2)),
      formatNumber(round(cc + 2, 2)),
    ]);
    return {
      chapter: 3,
      section: "Financial Leverage Ratios",
      skill: "Cash Coverage",
      type: "calculation",
      question: `A firm has EBIT of ${formatMoney(ebit)}, depreciation of ${formatMoney(dep)}, and interest of ${formatMoney(interest)}. What is cash coverage?`,
      options,
      answer,
      explanation: `Cash Coverage = (EBIT + Depreciation) / Interest = (${formatMoney(ebit)} + ${formatMoney(dep)}) / ${formatMoney(interest)} = ${formatNumber(cc)}.`,
      formula: "Cash Coverage = (EBIT + Depreciation) / Interest",
    };
  },

  // c3-013: Inventory Turnover = COGS / Inventory
  "c3-013": () => {
    const inv = randInt(50, 200) * 1000;
    const turnover = randInt(3, 12);
    const cogs = inv * turnover;
    const it = round(cogs / inv, 2);
    const { options, answer } = shuffleOptions(formatNumber(it), [
      formatNumber(round(inv / cogs, 3)),
      formatNumber(round(it + 2, 2)),
      formatNumber(round(it - 1, 2)),
    ]);
    return {
      chapter: 3,
      section: "Asset Management Ratios",
      skill: "Inventory Turnover",
      type: "calculation",
      question: `A firm has COGS of ${formatMoney(cogs)} and inventory of ${formatMoney(inv)}. What is inventory turnover?`,
      options,
      answer,
      explanation: `Inventory Turnover = COGS / Inventory = ${formatMoney(cogs)} / ${formatMoney(inv)} = ${formatNumber(it)} times.`,
      formula: "Inventory Turnover = COGS / Inventory",
    };
  },

  // c3-014: Days Sales in Inventory = 365 / Inv Turnover
  "c3-014": () => {
    const turnover = randInt(3, 12);
    const dsi = round(365 / turnover, 2);
    const { options, answer } = shuffleOptions(formatDays(dsi), [
      formatDays(round(dsi / 2, 2)),
      formatDays(round(dsi + 30, 2)),
      formatDays(round(365 * turnover, 2)),
    ]);
    return {
      chapter: 3,
      section: "Asset Management Ratios",
      skill: "Days Sales in Inventory",
      type: "calculation",
      question: `If inventory turnover is ${formatNumber(turnover)}, approximately how many days of inventory are held?`,
      options,
      answer,
      explanation: `Days' Sales in Inventory = 365 / ${turnover} = approximately ${formatDays(dsi)}.`,
      formula: "Days' Sales in Inventory = 365 / Inventory Turnover",
    };
  },

  // c3-015: Receivables Turnover = Sales / AR
  "c3-015": () => {
    const ar = randInt(50, 200) * 1000;
    const turnover = randInt(3, 12);
    const sales = ar * turnover;
    const rt = round(sales / ar, 2);
    const { options, answer } = shuffleOptions(formatNumber(rt), [
      formatNumber(round(ar / sales, 3)),
      formatNumber(round(rt + 2, 2)),
      formatNumber(round(rt - 1, 2)),
    ]);
    return {
      chapter: 3,
      section: "Asset Management Ratios",
      skill: "Receivables Turnover",
      type: "calculation",
      question: `A firm has sales of ${formatMoney(sales)} and accounts receivable of ${formatMoney(ar)}. What is receivables turnover?`,
      options,
      answer,
      explanation: `Receivables Turnover = Sales / Accounts Receivable = ${formatMoney(sales)} / ${formatMoney(ar)} = ${formatNumber(rt)}.`,
      formula: "Receivables Turnover = Sales / AR",
    };
  },

  // c3-016: Days Sales in Receivables = 365 / Rec Turnover
  "c3-016": () => {
    const turnover = randInt(3, 12);
    const dsr = round(365 / turnover, 2);
    const { options, answer } = shuffleOptions(formatDays(dsr), [
      formatDays(round(dsr / 2, 2)),
      formatDays(round(dsr + 20, 2)),
      formatDays(round(365 * turnover, 2)),
    ]);
    return {
      chapter: 3,
      section: "Asset Management Ratios",
      skill: "Days Sales in Receivables",
      type: "calculation",
      question: `If receivables turnover is ${formatNumber(turnover)}, approximately how many days of sales are represented by receivables?`,
      options,
      answer,
      explanation: `Days' Sales in Receivables = 365 / ${turnover} = approximately ${formatDays(dsr)}.`,
      formula: "Days' Sales in Receivables = 365 / Receivables Turnover",
    };
  },

  // c3-017: Payables Turnover = COGS / AP
  "c3-017": () => {
    const ap = randInt(50, 200) * 1000;
    const turnover = randInt(3, 12);
    const cogs = ap * turnover;
    const pt = round(cogs / ap, 2);
    const { options, answer } = shuffleOptions(formatNumber(pt), [
      formatNumber(round(ap / cogs, 3)),
      formatNumber(round(pt + 2, 2)),
      formatNumber(round(pt - 1, 2)),
    ]);
    return {
      chapter: 3,
      section: "Asset Management Ratios",
      skill: "Payables Turnover",
      type: "calculation",
      question: `A firm has COGS of ${formatMoney(cogs)} and accounts payable of ${formatMoney(ap)}. What is payables turnover?`,
      options,
      answer,
      explanation: `Payables Turnover = COGS / Accounts Payable = ${formatMoney(cogs)} / ${formatMoney(ap)} = ${formatNumber(pt)}.`,
      formula: "Payables Turnover = COGS / AP",
    };
  },

  // c3-018: Days Costs in Payables = 365 / Payables Turnover
  "c3-018": () => {
    const turnover = randInt(3, 12);
    const dcp = round(365 / turnover, 2);
    const { options, answer } = shuffleOptions(formatDays(dcp), [
      formatDays(round(dcp / 2, 2)),
      formatDays(round(dcp + 15, 2)),
      formatDays(round(365 * turnover, 2)),
    ]);
    return {
      chapter: 3,
      section: "Asset Management Ratios",
      skill: "Days Costs in Payables",
      type: "calculation",
      question: `If payables turnover is ${formatNumber(turnover)}, approximately how many days of costs are represented by payables?`,
      options,
      answer,
      explanation: `Days' Costs in Payables = 365 / ${turnover} = approximately ${formatDays(dcp)}.`,
      formula: "Days' Costs in Payables = 365 / Payables Turnover",
    };
  },

  // c3-019: TAT = Sales / TA
  "c3-019": () => {
    const ta = randInt(200, 800) * 1000;
    const turnover = randInt(12, 35) / 10;
    const sales = round(ta * turnover, 0);
    const tat = round(sales / ta, 2);
    const { options, answer } = shuffleOptions(formatNumber(tat), [
      formatNumber(round(ta / sales, 3)),
      formatNumber(round(tat * 2, 2)),
      formatNumber(round(tat + 1, 2)),
    ]);
    return {
      chapter: 3,
      section: "Asset Management Ratios",
      skill: "Total Asset Turnover",
      type: "calculation",
      question: `A firm has sales of ${formatMoney(sales)} and total assets of ${formatMoney(ta)}. What is total asset turnover?`,
      options,
      answer,
      explanation: `TAT = Sales / Total Assets = ${formatMoney(sales)} / ${formatMoney(ta)} = ${formatNumber(tat)}.`,
      formula: "TAT = Sales / TA",
    };
  },

  // c3-020: Capital Intensity = 1 / TAT
  "c3-020": () => {
    const tat = randInt(12, 35) / 10;
    const ci = round(1 / tat, 2);
    const { options, answer } = shuffleOptions(formatNumber(ci), [
      formatNumber(tat),
      formatNumber(round(ci * 2, 2)),
      formatNumber(round(ci / 2, 2)),
    ]);
    return {
      chapter: 3,
      section: "Asset Management Ratios",
      skill: "Capital Intensity",
      type: "calculation",
      question: `If total asset turnover is ${formatNumber(tat)}, what is the capital intensity ratio?`,
      options,
      answer,
      explanation: `Capital Intensity Ratio = 1 / TAT = 1 / ${formatNumber(tat)} = ${formatNumber(ci)}.`,
      formula: "Capital Intensity Ratio = 1 / TAT",
    };
  },

  // c3-021: PM = NI / Sales
  "c3-021": () => {
    const sales = randInt(500, 2000) * 1000;
    const ni = randInt(20, 150) * 1000;
    const pm = round((ni / sales) * 100, 2);
    const { options, answer } = shuffleOptions(formatPercent(pm), [
      formatPercent(round(pm * 2, 2)),
      formatPercent(round((sales / ni) * 100, 2)),
      formatPercent(round(100 - pm, 2)),
    ]);
    return {
      chapter: 3,
      section: "Profitability Ratios",
      skill: "Profit Margin",
      type: "calculation",
      question: `A firm has net income of ${formatMoney(ni)} and sales of ${formatMoney(sales)}. What is profit margin?`,
      options,
      answer,
      explanation: `PM = Net Income / Sales = ${formatMoney(ni)} / ${formatMoney(sales)} = ${formatPercent(pm)}.`,
      formula: "PM = NI / Sales",
    };
  },

  // c3-022: ROA = NI / TA
  "c3-022": () => {
    const ta = randInt(200, 800) * 1000;
    const ni = randInt(20, 120) * 1000;
    const roa = round((ni / ta) * 100, 2);
    const { options, answer } = shuffleOptions(formatPercent(roa), [
      formatPercent(round(roa * 2, 2)),
      formatPercent(round((ta / ni) * 100, 2)),
      formatPercent(round(100 - roa, 2)),
    ]);
    return {
      chapter: 3,
      section: "Profitability Ratios",
      skill: "Return on Assets",
      type: "calculation",
      question: `A firm has net income of ${formatMoney(ni)} and total assets of ${formatMoney(ta)}. What is ROA?`,
      options,
      answer,
      explanation: `ROA = Net Income / Total Assets = ${formatMoney(ni)} / ${formatMoney(ta)} = ${formatPercent(roa)}.`,
      formula: "ROA = NI / TA",
    };
  },

  // c3-023: ROE = NI / TE
  "c3-023": () => {
    const te = randInt(150, 500) * 1000;
    const ni = randInt(20, 120) * 1000;
    const roe = round((ni / te) * 100, 2);
    const { options, answer } = shuffleOptions(formatPercent(roe), [
      formatPercent(round(roe * 2, 2)),
      formatPercent(round((te / ni) * 100, 2)),
      formatPercent(round(100 - roe, 2)),
    ]);
    return {
      chapter: 3,
      section: "Profitability Ratios",
      skill: "Return on Equity",
      type: "calculation",
      question: `A firm has net income of ${formatMoney(ni)} and total equity of ${formatMoney(te)}. What is ROE?`,
      options,
      answer,
      explanation: `ROE = Net Income / Total Equity = ${formatMoney(ni)} / ${formatMoney(te)} ≈ ${formatPercent(roe)}.`,
      formula: "ROE = NI / TE",
    };
  },

  // c3-024: EPS = NI / Shares
  "c3-024": () => {
    const shares = randInt(10, 80) * 1000;
    const eps = randInt(2, 8);
    const ni = shares * eps;
    const { options, answer } = shuffleOptions(formatMoney(eps), [
      formatMoney(round(ni / (shares * 2), 2)),
      formatMoney(round(shares / ni, 3)),
      formatMoney(round(eps * 3, 2)),
    ]);
    return {
      chapter: 3,
      section: "Market Value Ratios",
      skill: "Earnings Per Share",
      type: "calculation",
      question: `A firm has net income of ${formatMoney(ni)} and ${shares.toLocaleString()} shares outstanding. What is EPS?`,
      options,
      answer,
      explanation: `EPS = NI / Shares Outstanding = ${formatMoney(ni)} / ${shares.toLocaleString()} = ${formatMoney(eps)}.`,
      formula: "EPS = NI / Shares Outstanding",
    };
  },

  // c3-025: P/E = PPS / EPS
  "c3-025": () => {
    const eps = randInt(2, 8);
    const pe = randInt(8, 25);
    const price = eps * pe;
    const { options, answer } = shuffleOptions(formatNumber(pe), [
      formatNumber(round(price + eps, 2)),
      formatNumber(round(eps / price, 3)),
      formatNumber(round(pe * 2, 2)),
    ]);
    return {
      chapter: 3,
      section: "Market Value Ratios",
      skill: "Price-Earnings Ratio",
      type: "calculation",
      question: `If price per share is ${formatMoney(price)} and EPS is ${formatMoney(eps)}, what is the P/E ratio?`,
      options,
      answer,
      explanation: `P/E = Price Per Share / EPS = ${formatMoney(price)} / ${formatMoney(eps)} = ${formatNumber(pe)}.`,
      formula: "P/E = PPS / EPS",
    };
  },

  // c3-026: Price/Sales = PPS / SPS
  "c3-026": () => {
    const sps = randInt(10, 40);
    const ratio = randInt(15, 40) / 10;
    const price = round(sps * ratio, 0);
    const ps = round(price / sps, 2);
    const { options, answer } = shuffleOptions(formatNumber(ps), [
      formatNumber(round(sps / price, 3)),
      formatNumber(round(ps * 2, 2)),
      formatNumber(round(price + sps, 2)),
    ]);
    return {
      chapter: 3,
      section: "Market Value Ratios",
      skill: "Price-to-Sales Ratio",
      type: "calculation",
      question: `A firm's price per share is ${formatMoney(price)} and sales per share are ${formatMoney(sps)}. What is its price-to-sales ratio?`,
      options,
      answer,
      explanation: `Price/Sales = Price Per Share / Sales Per Share = ${formatMoney(price)} / ${formatMoney(sps)} = ${formatNumber(ps)}.`,
      formula: "Price/Sales = PPS / Sales Per Share",
    };
  },

  // c3-027: BVPS = TE / Shares
  "c3-027": () => {
    const shares = randInt(10, 80) * 1000;
    const bvps = randInt(5, 30);
    const te = shares * bvps;
    const { options, answer } = shuffleOptions(formatMoney(bvps), [
      formatMoney(round(te / (shares * 2), 2)),
      formatMoney(round(shares / te * 1000, 2)),
      formatMoney(round(bvps * 3, 2)),
    ]);
    return {
      chapter: 3,
      section: "Market Value Ratios",
      skill: "Book Value Per Share",
      type: "calculation",
      question: `A firm has total equity of ${formatMoney(te)} and ${shares.toLocaleString()} shares outstanding. What is book value per share?`,
      options,
      answer,
      explanation: `Book Value Per Share = Total Equity / Shares Outstanding = ${formatMoney(te)} / ${shares.toLocaleString()} = ${formatMoney(bvps)}.`,
      formula: "BVPS = TE / Shares Outstanding",
    };
  },

  // c3-028: Market-to-Book = PPS / BVPS
  "c3-028": () => {
    const bvps = randInt(5, 25);
    const ratio = randInt(15, 50) / 10;
    const price = round(bvps * ratio, 0);
    const mb = round(price / bvps, 2);
    const { options, answer } = shuffleOptions(formatNumber(mb), [
      formatNumber(round(bvps / price, 3)),
      formatNumber(round(mb * 2, 2)),
      formatNumber(round(price + bvps, 2)),
    ]);
    return {
      chapter: 3,
      section: "Market Value Ratios",
      skill: "Market-to-Book",
      type: "calculation",
      question: `If price per share is ${formatMoney(price)} and book value per share is ${formatMoney(bvps)}, what is market-to-book?`,
      options,
      answer,
      explanation: `Market-to-Book = Price Per Share / Book Value Per Share = ${formatMoney(price)} / ${formatMoney(bvps)} = ${formatNumber(mb)}.`,
      formula: "Market-to-Book = PPS / BVPS",
    };
  },

  // c3-029: EV = MVS + Liab - Cash
  "c3-029": () => {
    const mvs = randInt(500, 1500) * 1000;
    const liab = randInt(100, 500) * 1000;
    const cash = randInt(20, 150) * 1000;
    const ev = mvs + liab - cash;
    const { options, answer } = shuffleOptions(formatMoney(ev), [
      formatMoney(mvs + liab + cash),
      formatMoney(mvs - liab - cash),
      formatMoney(mvs),
    ]);
    return {
      chapter: 3,
      section: "Market Value Ratios",
      skill: "Enterprise Value",
      type: "calculation",
      question: `A firm has total market value of stock of ${formatMoney(mvs)}, liabilities of ${formatMoney(liab)}, and cash of ${formatMoney(cash)}. What is enterprise value?`,
      options,
      answer,
      explanation: `Enterprise Value = Market Value of Stock + Liabilities − Cash = ${formatMoney(mvs)} + ${formatMoney(liab)} − ${formatMoney(cash)} = ${formatMoney(ev)}.`,
      formula: "EV = Market Value of Stock + Liabilities − Cash",
    };
  },

  // c3-030: EBITDA = EBIT + D&A
  "c3-030": () => {
    const ebit = randInt(200, 600) * 1000;
    const da = randInt(40, 150) * 1000;
    const ebitda = ebit + da;
    const { options, answer } = shuffleOptions(formatMoney(ebitda), [
      formatMoney(ebit - da),
      formatMoney(ebit),
      formatMoney(da),
    ]);
    return {
      chapter: 3,
      section: "Market Value Ratios",
      skill: "EBITDA",
      type: "calculation",
      question: `A firm has EBIT of ${formatMoney(ebit)} and depreciation and amortization of ${formatMoney(da)}. What is EBITDA?`,
      options,
      answer,
      explanation: `EBITDA = EBIT + Depreciation & Amortization = ${formatMoney(ebit)} + ${formatMoney(da)} = ${formatMoney(ebitda)}.`,
      formula: "EBITDA = EBIT + Depreciation & Amortization",
    };
  },

  // c3-031: EV/EBITDA
  "c3-031": () => {
    const ebitda = randInt(200, 600) * 1000;
    const ratio = randInt(15, 40) / 10;
    const ev = round(ebitda * ratio, 0);
    const er = round(ev / ebitda, 2);
    const { options, answer } = shuffleOptions(formatNumber(er), [
      formatNumber(round(ebitda / ev, 3)),
      formatNumber(round(er * 2, 2)),
      formatNumber(round(er + 1, 2)),
    ]);
    return {
      chapter: 3,
      section: "Market Value Ratios",
      skill: "EBITDA Ratio",
      type: "calculation",
      question: `If enterprise value is ${formatMoney(ev)} and EBITDA is ${formatMoney(ebitda)}, what is the EBITDA ratio?`,
      options,
      answer,
      explanation: `EV/EBITDA = ${formatMoney(ev)} / ${formatMoney(ebitda)} = ${formatNumber(er)}.`,
      formula: "EBITDA Ratio = Enterprise Value / EBITDA",
    };
  },

  // c3-033: DuPont ROE = PM × TAT × EM
  "c3-033": () => {
    const pm = randInt(5, 15);
    const tat = randInt(12, 35) / 10;
    const em = randInt(12, 25) / 10;
    const roe = round(pm / 100 * tat * em * 100, 2);
    const { options, answer } = shuffleOptions(formatPercent(roe), [
      formatPercent(round(roe / 2, 2)),
      formatPercent(round(pm * tat * 100, 2)),
      formatPercent(round(pm + tat * 10 + em * 10, 2)),
    ]);
    return {
      chapter: 3,
      section: "The DuPont Identity",
      skill: "DuPont Identity",
      type: "calculation",
      question: `If profit margin is ${pm}%, total asset turnover is ${formatNumber(tat)}, and equity multiplier is ${formatNumber(em)}, approximately what is ROE?`,
      options,
      answer,
      explanation: `ROE ≈ ${(pm / 100).toFixed(2)} × ${formatNumber(tat)} × ${formatNumber(em)} = ${formatPercent(roe)}.`,
      formula: "ROE = PM × TAT × EM",
    };
  },
};

export function canGenerate(id: string): boolean {
  return id in generators;
}

export function generateQuestion(id: string): Omit<Question, "id"> | null {
  const gen = generators[id];
  if (!gen) return null;
  return gen();
}
