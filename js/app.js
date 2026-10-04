// ============================================================
// LTS EXPENSE TRACKER - app.js
// Plain Vanilla JavaScript — no frameworks, no libraries
// Data stored in browser LocalStorage
// ============================================================

// --- STORAGE KEY ---
const STORAGE_KEY = 'expenseTrackerTransactions';

// --- CATEGORY LISTS ---
const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Business', 'Investment', 'Gift', 'Other'];
const EXPENSE_CATEGORIES = ['Food', 'Shopping', 'Transport', 'Bills', 'Entertainment', 'Health', 'Education', 'Travel', 'Rent', 'Subscription', 'Other'];

// --- COLORS FOR CHART ---
const CATEGORY_COLORS = {
  Food: '#FF6B6B', Shopping: '#845EC2', Transport: '#4D8076',
  Bills: '#FF9671', Entertainment: '#FFC75F', Health: '#00C9A7',
  Education: '#0089BA', Travel: '#2C73D2', Rent: '#D65DB1',
  Subscription: '#6366F1', Salary: '#10B981', Freelance: '#3B82F6',
  Business: '#6366F1', Investment: '#8B5CF6', Gift: '#EC4899', Other: '#64748B'
};

// --- CATEGORY ICONS (SVG strings) ---
const CATEGORY_ICONS = {
  Food: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  Shopping: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  Transport: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.9 2 11.2 2 11.5V16c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
  Bills: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  Entertainment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/></svg>`,
  Health: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  Education: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
  Travel: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,
  Rent: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  Subscription: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  Salary: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="7" rx="2"/><line x1="16" y1="21" x2="16" y2="7"/><line x1="8" y1="21" x2="8" y2="7"/><line x1="12" y1="21" x2="12" y2="7"/></svg>`,
  Freelance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  Business: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="9" y1="18" x2="15" y2="18"/></svg>`,
  Investment: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  Gift: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`,
  Other: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
};

// --- DEMO DATA (loaded on first visit) ---
const DEMO_TRANSACTIONS = [
  { id: 'seed1', type: 'income',  amount: 30000, category: 'Salary',    date: '2026-10-01', description: 'Monthly Software Engineering Salary', createdAt: 1727769600000 },
  { id: 'seed2', type: 'expense', amount: 1450,  category: 'Food',      date: '2026-10-02', description: 'Supermarket Groceries', createdAt: 1727856000000 },
  { id: 'seed3', type: 'expense', amount: 2500,  category: 'Shopping',  date: '2026-10-03', description: 'Noise Cancelling Headphones', createdAt: 1727942400000 },
  { id: 'seed4', type: 'expense', amount: 450,   category: 'Transport', date: '2026-10-03', description: 'Cab fare to tech conference', createdAt: 1727946000000 },
  { id: 'seed5', type: 'expense', amount: 1800,  category: 'Bills',     date: '2026-10-04', description: 'Internet & Electricity Bill', createdAt: 1728032400000 },
  { id: 'seed6', type: 'income',  amount: 8500,  category: 'Freelance', date: '2026-10-04', description: 'Landing Page UI Design Contract', createdAt: 1728036000000 }
];

// ============================================================
// APP STATE — single source of truth
// ============================================================
let transactions  = [];       // all transaction records
let filterType    = 'all';    // 'all' | 'income' | 'expense'
let filterCategory = 'all';   // category name or 'all'
let searchQuery   = '';       // text search string
let sortOrder     = 'date-desc';
let pendingDeleteId = null;   // id of transaction waiting to be deleted

// month navigator — default to current month
let viewMonth = new Date('2026-10-04T12:00:00');

// Indian Rupee formatter
const inrFmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2 });
const inrShort = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

// ============================================================
// LOCAL STORAGE — save & load
// ============================================================
function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        transactions = parsed;
        return;
      }
    }
  } catch (e) {
    console.warn('Could not read saved data. Loading demo data instead.');
  }
  // First visit — load demo data
  transactions = JSON.parse(JSON.stringify(DEMO_TRANSACTIONS));
  saveTransactions();
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// ============================================================
// ADD / EDIT / DELETE
// ============================================================
function addTransaction(data) {
  const newTx = {
    id: 'tx_' + Date.now(),   // unique id using timestamp
    type: data.type,
    amount: parseFloat(data.amount),
    category: data.category,
    date: data.date,
    description: data.description.trim(),
    createdAt: Date.now()
  };
  transactions.unshift(newTx); // add to the top of the list
  saveTransactions();
  refreshAll();
  showToast('Transaction added successfully', 'success');
}

function editTransaction(id, data) {
  const index = transactions.findIndex(t => t.id === id);
  if (index === -1) return;

  // Update only the editable fields, keep id & createdAt unchanged
  transactions[index].type        = data.type;
  transactions[index].amount      = parseFloat(data.amount);
  transactions[index].category    = data.category;
  transactions[index].date        = data.date;
  transactions[index].description = data.description.trim();

  saveTransactions();
  refreshAll();
  showToast('Transaction updated successfully', 'success');
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
  refreshAll();
  showToast('Transaction deleted successfully', 'success');
}

// ============================================================
// REFRESH — called after every change
// ============================================================
function refreshAll() {
  updateSummaryCards();
  renderTransactions();
  renderMonthlySummary();
  renderDonutChart();
  renderAnalytics();
}

// ============================================================
// SUMMARY CARDS (Total Balance, Income, Expenses)
// ============================================================
function updateSummaryCards() {
  let totalIncome  = 0;
  let totalExpense = 0;
  let incomeCount  = 0;
  let expenseCount = 0;

  transactions.forEach(t => {
    if (t.type === 'income') {
      totalIncome += t.amount;
      incomeCount++;
    } else {
      totalExpense += t.amount;
      expenseCount++;
    }
  });

  const balance = totalIncome - totalExpense;

  // Update the DOM
  document.getElementById('totalBalance').textContent = inrFmt.format(balance);
  document.getElementById('totalIncome').textContent  = inrFmt.format(totalIncome);
  document.getElementById('totalExpense').textContent = inrFmt.format(totalExpense);
  document.getElementById('incomeCountPill').textContent  = incomeCount + ' entries';
  document.getElementById('expenseCountPill').textContent = expenseCount + ' entries';

  // Savings ratio badge
  const ratioEl = document.getElementById('balanceRatioText');
  if (totalIncome > 0) {
    const pct = Math.max(0, Math.round(((totalIncome - totalExpense) / totalIncome) * 100));
    ratioEl.textContent = pct + '% saved';
  } else {
    ratioEl.textContent = totalExpense > 0 ? 'Deficit' : 'Balanced';
  }
}

// ============================================================
// FILTER & SEARCH — returns the filtered list without modifying the original
// ============================================================
function getFilteredList() {
  let list = transactions.filter(tx => {
    // Filter by type
    if (filterType !== 'all' && tx.type !== filterType) return false;
    // Filter by category
    if (filterCategory !== 'all' && tx.category !== filterCategory) return false;
    // Search in description & category
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const inDesc = tx.description.toLowerCase().includes(q);
      const inCat  = tx.category.toLowerCase().includes(q);
      if (!inDesc && !inCat) return false;
    }
    return true;
  });

  // Sort the filtered list
  list.sort((a, b) => {
    if (sortOrder === 'date-asc')    return new Date(a.date) - new Date(b.date);
    if (sortOrder === 'amount-desc') return b.amount - a.amount;
    if (sortOrder === 'amount-asc')  return a.amount - b.amount;
    return new Date(b.date) - new Date(a.date); // default: newest first
  });

  return list;
}

// ============================================================
// RENDER TRANSACTIONS (Desktop table + Mobile cards)
// ============================================================
function renderTransactions() {
  const list = getFilteredList();

  // Update counter badge
  document.getElementById('transactionsCountBadge').textContent = list.length + ' Total';

  // --- Empty state ---
  const emptyEl = document.getElementById('emptyStateView');
  if (list.length === 0) {
    emptyEl.style.display = 'flex';
    document.getElementById('emptyStateTitle').textContent =
      transactions.length === 0 ? 'No transactions yet' : 'No transactions found';
    document.getElementById('emptyStateDesc').textContent =
      transactions.length === 0
        ? 'Start tracking your money by adding your first transaction.'
        : 'Try adjusting your filters or search keywords.';
    document.getElementById('transactionsTableBody').innerHTML = '';
    document.getElementById('mobileTransactionsList').innerHTML = '';
    if (document.getElementById('allTransactionsTableBody'))
      document.getElementById('allTransactionsTableBody').innerHTML = '';
    if (document.getElementById('allMobileTransactionsList'))
      document.getElementById('allMobileTransactionsList').innerHTML = '';
    return;
  }
  emptyEl.style.display = 'none';

  // --- Build table rows ---
  let tableHtml = '';
  list.forEach(tx => {
    const isIncome    = tx.type === 'income';
    const amountStr   = (isIncome ? '+ ' : '- ') + inrFmt.format(tx.amount);
    const amountClass = isIncome ? 'amount-income' : 'amount-expense';
    const typeClass   = isIncome ? 'tag-income' : 'tag-expense';
    const icon        = CATEGORY_ICONS[tx.category] || CATEGORY_ICONS['Other'];
    const color       = CATEGORY_COLORS[tx.category] || '#64748B';
    const dateStr     = formatDate(tx.date);

    tableHtml += `
      <tr data-id="${tx.id}">
        <td>
          <div class="category-cell-wrap">
            <div class="cat-icon-chip" style="color:${color}">${icon}</div>
            <span class="cat-title">${esc(tx.category)}</span>
          </div>
        </td>
        <td><span class="desc-text" title="${esc(tx.description)}">${esc(tx.description)}</span></td>
        <td><span class="date-text">${dateStr}</span></td>
        <td><span class="type-tag ${typeClass}">${tx.type}</span></td>
        <td class="text-right"><span class="amount-display ${amountClass}">${amountStr}</span></td>
        <td class="text-center">
          <div class="table-actions-group">
            <button class="btn-action-icon action-edit"   data-action="edit"   data-id="${tx.id}" title="Edit">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
            <button class="btn-action-icon action-delete" data-action="delete" data-id="${tx.id}" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      </tr>`;
  });

  document.getElementById('transactionsTableBody').innerHTML = tableHtml;
  if (document.getElementById('allTransactionsTableBody'))
    document.getElementById('allTransactionsTableBody').innerHTML = tableHtml;

  // --- Build mobile cards ---
  let mobileHtml = '';
  list.forEach(tx => {
    const isIncome    = tx.type === 'income';
    const amountStr   = (isIncome ? '+ ' : '- ') + inrFmt.format(tx.amount);
    const amountClass = isIncome ? 'amount-income' : 'amount-expense';
    const icon        = CATEGORY_ICONS[tx.category] || CATEGORY_ICONS['Other'];
    const color       = CATEGORY_COLORS[tx.category] || '#64748B';

    mobileHtml += `
      <div class="mobile-trans-card" data-id="${tx.id}">
        <div class="mobile-trans-left">
          <div class="cat-icon-chip" style="color:${color}">${icon}</div>
          <div class="mobile-trans-details">
            <span class="mobile-trans-title">${esc(tx.category)}</span>
            <span class="mobile-trans-desc">${esc(tx.description)}</span>
            <span class="mobile-trans-date">${formatDate(tx.date)}</span>
          </div>
        </div>
        <div class="mobile-trans-right">
          <span class="mobile-trans-amount ${amountClass}">${amountStr}</span>
          <div class="mobile-action-buttons">
            <button class="btn-action-icon action-edit"   data-action="edit"   data-id="${tx.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
            </button>
            <button class="btn-action-icon action-delete" data-action="delete" data-id="${tx.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      </div>`;
  });

  document.getElementById('mobileTransactionsList').innerHTML = mobileHtml;
  if (document.getElementById('allMobileTransactionsList'))
    document.getElementById('allMobileTransactionsList').innerHTML = mobileHtml;
}

// ============================================================
// MONTHLY SUMMARY
// ============================================================
function renderMonthlySummary() {
  const year  = viewMonth.getFullYear();
  const month = viewMonth.getMonth(); // 0-indexed

  const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('currentMonthDisplay').textContent = MONTH_NAMES[month] + ' ' + year;

  let mIncome  = 0;
  let mExpense = 0;

  transactions.forEach(tx => {
    const [y, m] = tx.date.split('-').map(Number);
    if (y === year && m - 1 === month) {
      if (tx.type === 'income')  mIncome  += tx.amount;
      if (tx.type === 'expense') mExpense += tx.amount;
    }
  });

  const mNet = mIncome - mExpense;

  document.getElementById('monthIncomeVal').textContent  = inrFmt.format(mIncome);
  document.getElementById('monthExpenseVal').textContent = inrFmt.format(mExpense);
  document.getElementById('monthNetVal').textContent     = inrFmt.format(mNet);

  // Ratio bar widths
  const total = mIncome + mExpense;
  if (total > 0) {
    const incPct = Math.round((mIncome / total) * 100);
    document.getElementById('monthlyIncomeBar').style.width  = incPct + '%';
    document.getElementById('monthlyExpenseBar').style.width = (100 - incPct) + '%';
    const savePct = mIncome > 0 ? Math.max(0, Math.round((mNet / mIncome) * 100)) : 0;
    document.getElementById('monthlySavingsRate').textContent = savePct + '% saved';
  } else {
    document.getElementById('monthlyIncomeBar').style.width  = '50%';
    document.getElementById('monthlyExpenseBar').style.width = '50%';
    document.getElementById('monthlySavingsRate').textContent = 'No activity';
  }
}

// ============================================================
// DONUT CHART — pure SVG, no library
// ============================================================
function renderDonutChart() {
  // Step 1: Total up expense per category
  const totals = {};
  let grandTotal = 0;

  transactions.forEach(tx => {
    if (tx.type === 'expense') {
      totals[tx.category] = (totals[tx.category] || 0) + tx.amount;
      grandTotal += tx.amount;
    }
  });

  document.getElementById('donutCenterTotal').textContent = inrShort.format(grandTotal);
  document.getElementById('chartTotalBadge').textContent  = inrShort.format(grandTotal) + ' Spent';

  // Step 2: No expenses → show empty ring
  if (grandTotal === 0) {
    document.getElementById('donutSvg').innerHTML =
      '<circle cx="100" cy="100" r="70" fill="none" stroke="#E2E8F0" stroke-width="24"/>';
    document.getElementById('chartLegendList').innerHTML =
      '<div style="color:var(--text-muted);font-size:0.85rem;padding:20px 0;text-align:center">No expense records yet.</div>';
    return;
  }

  // Step 3: Sort categories largest first
  const categories = Object.entries(totals)
    .map(([cat, amt]) => ({ cat, amt, pct: (amt / grandTotal) * 100 }))
    .sort((a, b) => b.amt - a.amt);

  // Step 4: Draw SVG circles using stroke-dasharray trick
  // A full circle with r=70 has circumference = 2 * π * 70 ≈ 439.82
  const CIRCUMFERENCE = 2 * Math.PI * 70;
  let offset = 0;
  let svgHtml = '';
  let legendHtml = '';

  categories.forEach(item => {
    const strokeLen = (item.pct / 100) * CIRCUMFERENCE;
    const color = CATEGORY_COLORS[item.cat] || '#64748B';

    svgHtml += `
      <circle cx="100" cy="100" r="70" fill="none"
        stroke="${color}" stroke-width="24"
        stroke-dasharray="${strokeLen} ${CIRCUMFERENCE}"
        stroke-dashoffset="${-offset}">
        <title>${item.cat}: ${inrFmt.format(item.amt)}</title>
      </circle>`;

    offset += strokeLen;

    legendHtml += `
      <div class="legend-item">
        <div class="legend-info">
          <span class="legend-color-dot" style="background:${color}"></span>
          <span class="legend-name">${esc(item.cat)}</span>
        </div>
        <div class="legend-stats">
          <span class="legend-pct">${item.pct.toFixed(1)}%</span>
          <span class="legend-amount">${inrShort.format(item.amt)}</span>
        </div>
      </div>`;
  });

  document.getElementById('donutSvg').innerHTML = svgHtml;
  document.getElementById('chartLegendList').innerHTML = legendHtml;
}

// ============================================================
// ANALYTICS TAB
// ============================================================
function renderAnalytics() {
  const el = document.getElementById('categoryRankingList');
  if (!el) return;

  const totals = {};
  let grandTotal = 0;
  let totalIncome = 0;

  transactions.forEach(tx => {
    if (tx.type === 'expense') {
      totals[tx.category] = (totals[tx.category] || 0) + tx.amount;
      grandTotal += tx.amount;
    } else {
      totalIncome += tx.amount;
    }
  });

  // Category ranking bars
  const ranked = Object.entries(totals)
    .map(([cat, amt]) => ({ cat, amt, pct: grandTotal > 0 ? (amt / grandTotal) * 100 : 0 }))
    .sort((a, b) => b.amt - a.amt);

  if (ranked.length === 0) {
    el.innerHTML = '<p style="color:var(--text-muted);font-size:0.85rem">No expense data yet.</p>';
    document.getElementById('topExpenseDriver').textContent = 'None';
  } else {
    el.innerHTML = ranked.map(item => {
      const color = CATEGORY_COLORS[item.cat] || '#64748B';
      return `
        <div class="cat-bar-item">
          <div class="cat-bar-info">
            <span>${esc(item.cat)}</span>
            <span>${inrFmt.format(item.amt)} (${item.pct.toFixed(1)}%)</span>
          </div>
          <div class="cat-bar-track">
            <div class="cat-bar-fill" style="width:${item.pct}%;background:${color}"></div>
          </div>
        </div>`;
    }).join('');
    document.getElementById('topExpenseDriver').textContent =
      ranked[0].cat + ' (' + inrFmt.format(ranked[0].amt) + ')';
  }

  // Savings rate
  const savingsEl = document.getElementById('savingsRateInsight');
  if (totalIncome > 0) {
    const rate = Math.max(0, Math.round(((totalIncome - grandTotal) / totalIncome) * 100));
    savingsEl.textContent = rate + '% of total income retained as savings';
  } else {
    savingsEl.textContent = 'Add income records to see your savings rate';
  }

  // Daily average expense (rough estimate over 30 days)
  document.getElementById('dailyAverageExpense').textContent =
    inrFmt.format(grandTotal / 30) + ' / day estimate';
}

// ============================================================
// MODAL — Add / Edit Transaction
// ============================================================
function openModal(editId) {
  clearErrors();

  if (editId) {
    // Edit mode — find the transaction and pre-fill the form
    const tx = transactions.find(t => t.id === editId);
    if (!tx) return;

    document.getElementById('modalTitle').textContent    = 'Edit Transaction';
    document.getElementById('modalSubtitle').textContent = 'Modify your transaction details';
    document.getElementById('saveTransactionBtn').textContent = 'Update Transaction';
    document.getElementById('editTransactionId').value   = tx.id;

    setType(tx.type);
    document.getElementById('transactionAmount').value   = tx.amount;
    document.getElementById('transactionCategory').value = tx.category;
    document.getElementById('transactionDate').value     = tx.date;
    document.getElementById('transactionDesc').value     = tx.description;
  } else {
    // Add mode — clear the form
    document.getElementById('modalTitle').textContent    = 'Add Transaction';
    document.getElementById('modalSubtitle').textContent = 'Track your financial inflow or outflow';
    document.getElementById('saveTransactionBtn').textContent = 'Save Transaction';
    document.getElementById('editTransactionId').value   = '';
    document.getElementById('transactionForm').reset();
    setType('expense');
    setTodayDate();
  }

  document.getElementById('transactionModal').classList.add('active');
  document.getElementById('transactionModal').setAttribute('aria-hidden', 'false');
  document.getElementById('transactionAmount').focus();
}

function closeModal() {
  document.getElementById('transactionModal').classList.remove('active');
  document.getElementById('transactionModal').setAttribute('aria-hidden', 'true');
  document.getElementById('transactionForm').reset();
  clearErrors();
}

// Set type toggle (income / expense) and refresh category dropdown
function setType(type) {
  document.getElementById('transactionType').value = type;

  document.getElementById('typeBtnIncome').classList.toggle('active',  type === 'income');
  document.getElementById('typeBtnExpense').classList.toggle('active', type === 'expense');

  // Refresh category options based on type
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const select = document.getElementById('transactionCategory');
  select.innerHTML = '<option value="">Select Category</option>' +
    categories.map(cat => `<option value="${cat}">${cat}</option>`).join('');
}

function setTodayDate() {
  const d = new Date();
  document.getElementById('transactionDate').value =
    d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

// ============================================================
// FORM VALIDATION
// ============================================================
function validateForm() {
  clearErrors();
  let valid = true;

  const amount = parseFloat(document.getElementById('transactionAmount').value);
  if (!amount || amount <= 0) {
    showError('transactionAmount', 'amountError',
      isNaN(amount) ? 'Please enter an amount.' : 'Amount must be greater than ₹0.');
    valid = false;
  }

  if (!document.getElementById('transactionCategory').value) {
    showError('transactionCategory', 'categoryError', 'Please select a category.');
    valid = false;
  }

  if (!document.getElementById('transactionDate').value) {
    showError('transactionDate', 'dateError', 'Please select a date.');
    valid = false;
  }

  const desc = document.getElementById('transactionDesc').value.trim();
  if (!desc || desc.length < 2) {
    showError('transactionDesc', 'descError', 'Please enter a description (at least 2 characters).');
    valid = false;
  }

  return valid;
}

function showError(inputId, errorId, message) {
  document.getElementById(inputId).classList.add('input-error');
  const errEl = document.getElementById(errorId);
  errEl.textContent = message;
  errEl.classList.add('visible');
}

function clearErrors() {
  ['transactionAmount', 'transactionCategory', 'transactionDate', 'transactionDesc'].forEach(id => {
    document.getElementById(id).classList.remove('input-error');
  });
  ['amountError', 'categoryError', 'dateError', 'descError'].forEach(id => {
    document.getElementById(id).classList.remove('visible');
  });
}

// ============================================================
// DELETE CONFIRMATION MODAL
// ============================================================
function openDeleteModal(id) {
  const tx = transactions.find(t => t.id === id);
  if (!tx) return;

  pendingDeleteId = id;

  const isIncome  = tx.type === 'income';
  const amountStr = (isIncome ? '+ ' : '- ') + inrFmt.format(tx.amount);
  const color     = isIncome ? 'var(--color-income-dark)' : 'var(--color-expense-dark)';

  document.getElementById('deletePreviewBox').innerHTML = `
    <div style="font-weight:700;color:var(--text-primary);margin-bottom:4px">${esc(tx.description)}</div>
    <div style="color:var(--text-secondary);font-size:0.82rem">
      Category: <strong>${esc(tx.category)}</strong> &bull; Date: <strong>${formatDate(tx.date)}</strong>
    </div>
    <div style="font-weight:800;font-size:1.1rem;margin-top:8px;color:${color}">${amountStr}</div>`;

  document.getElementById('deleteModal').classList.add('active');
  document.getElementById('deleteModal').setAttribute('aria-hidden', 'false');
}

function closeDeleteModal() {
  document.getElementById('deleteModal').classList.remove('active');
  document.getElementById('deleteModal').setAttribute('aria-hidden', 'true');
  pendingDeleteId = null;
}

// ============================================================
// TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type) {
  const container = document.getElementById('toastContainer');

  // Pick icon color based on type
  const iconColor = type === 'success' ? '#CCFF00' : type === 'error' ? '#F43F5E' : '#3B82F6';
  const iconPath  = type === 'success'
    ? '<polyline points="20 6 9 17 4 12"/>'
    : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>';

  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML = `
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2.5">${iconPath}</svg>
    <div class="toast-content"><span class="toast-message">${esc(message)}</span></div>
    <div class="toast-progress"></div>`;

  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => toast.classList.add('show'));

  // Remove after 3.2 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// ============================================================
// TAB NAVIGATION
// ============================================================
function switchTab(tabId) {
  // Update sidebar buttons
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  // Update mobile nav buttons
  document.querySelectorAll('.mobile-bottom-nav .mobile-nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  // Show/hide tab panes
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === 'pane-' + tabId);
  });
  // Re-render analytics if that tab is opened
  if (tabId === 'analytics') renderAnalytics();
}

// ============================================================
// EXPORT / IMPORT / CLEAR DATA
// ============================================================
function exportCSV() {
  if (transactions.length === 0) { showToast('No transactions to export', 'error'); return; }

  const header = 'Type,Category,Date,Description,Amount';
  const rows = transactions.map(tx =>
    `"${tx.type}","${tx.category}","${tx.date}","${tx.description.replace(/"/g,'""')}",${tx.amount}`
  );
  downloadFile('expense_tracker.csv', 'text/csv', header + '\n' + rows.join('\n'));
  showToast('Exported to CSV', 'success');
}

function exportJSON() {
  downloadFile('expense_tracker_backup.json', 'text/json', JSON.stringify(transactions, null, 2));
  showToast('JSON backup downloaded', 'success');
}

function importJSON(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      if (Array.isArray(data)) {
        transactions = data;
        saveTransactions();
        refreshAll();
        showToast('Data imported successfully', 'success');
      } else {
        showToast('Invalid file format', 'error');
      }
    } catch { showToast('Could not read file', 'error'); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

function downloadFile(filename, type, content) {
  const a = document.createElement('a');
  a.href = 'data:' + type + ';charset=utf-8,' + encodeURIComponent(content);
  a.download = filename;
  a.click();
}

// ============================================================
// HELPERS
// ============================================================
function formatDate(str) {
  if (!str) return '';
  const [y, m, d] = str.split('-');
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
}

// Sanitize text before inserting into HTML (prevent XSS)
function esc(str) {
  return String(str)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Populate the category filter dropdown (union of all categories)
function populateCategoryFilter() {
  const all = [...new Set([...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES])];
  const select = document.getElementById('categoryFilter');
  select.innerHTML = '<option value="all">All Categories</option>' +
    all.map(c => `<option value="${c}">${c}</option>`).join('');
}

// ============================================================
// EVENT LISTENERS — wired up once on page load
// ============================================================
function setupEvents() {

  // --- Navigation ---
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // --- Open add modal ---
  document.querySelectorAll('.add-trans-trigger').forEach(btn => {
    btn.addEventListener('click', () => openModal(null));
  });
  document.getElementById('sidebarAddBtn').addEventListener('click', () => openModal(null));
  document.getElementById('mobileAddFab').addEventListener('click',  () => openModal(null));
  document.getElementById('emptyAddBtn').addEventListener('click',   () => openModal(null));

  // --- Close modal ---
  document.getElementById('closeModalBtn').addEventListener('click',  closeModal);
  document.getElementById('cancelModalBtn').addEventListener('click', closeModal);
  document.getElementById('transactionModal').addEventListener('click', e => {
    if (e.target === document.getElementById('transactionModal')) closeModal();
  });

  // --- Type toggle buttons ---
  document.getElementById('typeBtnIncome').addEventListener('click',  () => setType('income'));
  document.getElementById('typeBtnExpense').addEventListener('click', () => setType('expense'));

  // --- "Set Today" link inside modal ---
  document.getElementById('setTodayBtn').addEventListener('click', setTodayDate);

  // --- Form submit ---
  document.getElementById('transactionForm').addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = {
      type:        document.getElementById('transactionType').value,
      amount:      document.getElementById('transactionAmount').value,
      category:    document.getElementById('transactionCategory').value,
      date:        document.getElementById('transactionDate').value,
      description: document.getElementById('transactionDesc').value
    };

    const editId = document.getElementById('editTransactionId').value;
    if (editId) {
      editTransaction(editId, data);
    } else {
      addTransaction(data);
    }
    closeModal();
  });

  // --- Delete modal ---
  document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);
  document.getElementById('deleteModal').addEventListener('click', e => {
    if (e.target === document.getElementById('deleteModal')) closeDeleteModal();
  });
  document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
    if (pendingDeleteId) { deleteTransaction(pendingDeleteId); closeDeleteModal(); }
  });

  // --- Edit / Delete via event delegation (table rows & mobile cards) ---
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    if (btn.dataset.action === 'edit')   openModal(btn.dataset.id);
    if (btn.dataset.action === 'delete') openDeleteModal(btn.dataset.id);
  });

  // --- Filters ---
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterType = pill.dataset.type;
      renderTransactions();
    });
  });

  document.getElementById('categoryFilter').addEventListener('change', e => {
    filterCategory = e.target.value;
    renderTransactions();
  });

  // --- Live search ---
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    document.getElementById('searchClearBtn').style.display = searchQuery ? 'block' : 'none';
    renderTransactions();
  });

  document.getElementById('searchClearBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    searchQuery = '';
    document.getElementById('searchClearBtn').style.display = 'none';
    renderTransactions();
    document.getElementById('searchInput').focus();
  });

  // --- Sort order (Transactions tab) ---
  document.getElementById('sortOrderSelect').addEventListener('change', e => {
    sortOrder = e.target.value;
    renderTransactions();
  });

  // --- Month navigator ---
  document.getElementById('prevMonthBtn').addEventListener('click', () => {
    viewMonth.setMonth(viewMonth.getMonth() - 1);
    renderMonthlySummary();
  });
  document.getElementById('nextMonthBtn').addEventListener('click', () => {
    viewMonth.setMonth(viewMonth.getMonth() + 1);
    renderMonthlySummary();
  });

  // --- Settings tab actions ---
  document.getElementById('exportCsvBtn').addEventListener('click', exportCSV);
  document.getElementById('exportJsonBtn').addEventListener('click', exportJSON);
  document.getElementById('importJsonInput').addEventListener('change', importJSON);

  document.getElementById('loadDemoDataBtn').addEventListener('click', () => {
    transactions = JSON.parse(JSON.stringify(DEMO_TRANSACTIONS));
    saveTransactions();
    refreshAll();
    showToast('Demo data loaded', 'info');
  });

  document.getElementById('clearAllDataBtn').addEventListener('click', () => {
    if (confirm('Delete ALL transactions permanently?')) {
      transactions = [];
      saveTransactions();
      refreshAll();
      showToast('All data cleared', 'error');
    }
  });

  // --- Notification bell ---
  document.getElementById('notificationBtn').addEventListener('click', () => {
    showToast(transactions.length + ' transactions saved in LocalStorage', 'info');
  });

  // --- Esc key closes any open modal ---
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('transactionModal').classList.contains('active')) closeModal();
    if (document.getElementById('deleteModal').classList.contains('active')) closeDeleteModal();
  });
}

// ============================================================
// START — runs when the page is ready
// ============================================================
function init() {
  loadTransactions();      // read from LocalStorage (or load demo data)
  populateCategoryFilter();
  setType('expense');      // default form type
  setTodayDate();          // default date in form
  setupEvents();           // attach all event listeners
  refreshAll();            // render everything
  showToast('Welcome to LTS Expense Tracker', 'info');
}

// Run init once the HTML is fully loaded
document.addEventListener('DOMContentLoaded', init);
