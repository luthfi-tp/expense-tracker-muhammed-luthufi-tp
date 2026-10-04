# LTS Expense Tracker — Modern Fintech Web Application

> Built for the **Software Developer Intern recruitment assignment**. A modern, production-grade personal finance dashboard engineered strictly with pure web standards: **HTML5, CSS3, Vanilla JavaScript, and Browser LocalStorage**.

![Dashboard Preview Screenshot](assets/icons/logo.svg)

---

## 📌 Overview

**LTS Expense Tracker** is a client-side personal finance web application that allows users to record income and expenses, organize transactions by category, analyze monthly financial trends, and inspect category-wise expense distributions via an interactive SVG donut chart.

The application draws visual inspiration from cutting-edge fintech dashboards (featuring dark charcoal cards, high-contrast neon-lime accents, clean Inter typography, and glassmorphic dialogs) while remaining 100% dependency-free and lightning fast.

---

## ✨ Features

### 1. Core Financial Tracking
- **Add Income & Expense Transactions**: Seamlessly log earnings and expenditures with custom categorization.
- **Dynamic Calculation**: Instant real-time calculation of **Total Balance**, **Total Income**, and **Total Expenses** formatted in Indian Rupee (`₹` INR) via `Intl.NumberFormat`.
- **Edit Transactions**: Pre-fills existing transaction parameters in a clean modal with instant state recalculation.
- **Delete with Confirmation Modal**: Safeguards user data by displaying a preview confirmation modal before removing any transaction.
- **Live Search & Dynamic Filtering**: Instant search across transaction descriptions and categories, accompanied by segmented filters (`All`, `Income`, `Expense`) and category dropdowns without page reloads.

### 2. Bonus & Advanced Features
- **Monthly Overview & Month Navigator**: Filter and compare month-by-month inflow, outflow, and net savings with interactive `‹` and `›` month controls and visual ratio bars.
- **Category-wise Expense Chart**: A custom, lightweight native **SVG Donut Chart** displaying proportional spending per category with real-time percentage legends and hover tooltips.
- **Strong Inline Validation**: Clear inline error messages directly under fields (Amount > ₹0, required category, valid date, and description length) without relying solely on default browser alerts.
- **Toast Notification Engine**: Non-blocking toast notifications for creation, updates, deletions, and data persistence events.
- **Data Export & Backup**:
  - Export ledger to **CSV** spreadsheet.
  - Backup entire database to **JSON** format.
  - Restore / Import from existing JSON backups.
  - Instant **Demo Data Reset** to explore pre-populated fintech data.
- **Polished Empty States**: Context-aware empty states for both zero records and unmatched filter queries.

---

## 🎨 Design System & Aesthetics

Inspired by modern fintech dashboards:
- **Sidebar**: Ultra-clean fixed vertical navigation with brand glyph and active lime indicator.
- **Hero Balance Card**: Signature matte charcoal card (`#121417`) with glowing lime icon and large typography.
- **Light Auxiliary Cards**: High-contrast white cards with subtle borders and shadows for income and expenses.
- **Responsive Navigation**: Transitions into a fixed bottom navigation bar on mobile screens with touch-friendly floating action buttons.

---

## 📱 Responsive Breakpoints

The application has been engineered and tested across all standard viewport sizes:
- **Large Desktop (>= 1440px)**: Wide multi-column layout with fixed sidebar and extended ledger.
- **Laptop (1024px – 1439px)**: Balanced 3-column summary cards and dual-panel analytics.
- **Tablet (768px – 1023px)**: Adaptive grid layout with streamlined sidebar.
- **Mobile (<= 767px)**: Deliberate mobile-first experience featuring full-width hero balance card, side-by-side inflow/outflow metrics, bottom-sheet transaction form, and fixed bottom navigation.
- **Small Mobile (360px – 480px)**: Strict zero horizontal overflow layout tested at 360px, 375px, and 390px widths.

---

## 🛠️ Technology Stack

Strict adherence to assignment requirements:
- **Markup**: Semantic HTML5 (`<header>`, `<nav>`, `<aside>`, `<main>`, `<section>`, `<form>`, `<dialog>`)
- **Styles**: Pure Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid, media queries, keyframe animations)
- **Logic**: Vanilla JavaScript (ES6+ modular closures, strict mode, zero frameworks)
- **Persistence**: Browser `localStorage` (Key: `expenseTrackerTransactions`)
- **No external frameworks or libraries**: No React, Vue, Angular, Flutter, Node.js, Express, Firebase, or external chart libraries.

---

## 🚀 How to Run the Application

The application runs directly in any modern browser without any build process, dependencies, or server setup.

### Option 1: Direct File Opening
1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/expense-tracker-intern.git
   cd expense-tracker-intern
   ```
2. Double-click `index.html` or open it with your favorite browser:
   ```bash
   open index.html # macOS
   # OR
   xdg-open index.html # Linux
   # OR
   start index.html # Windows
   ```

### Option 2: Live Server (VS Code / Python / Node)
- **VS Code**: Right-click `index.html` and choose **"Open with Live Server"**.
- **Python**: Run `python3 -m http.server 3000` and visit `http://localhost:3000`.
- **Node `npx`**: Run `npx -y serve .` and visit `http://localhost:3000`.

---

## 💾 Local Storage Architecture

Transactions are stored in `window.localStorage` under the key:
```javascript
const STORAGE_KEY = 'expenseTrackerTransactions';
```

### Data Schema
Each transaction record strictly implements the following structure:
```json
{
  "id": "tx_1728032400000_a8f93b2",
  "type": "expense",
  "amount": 1800,
  "category": "Bills",
  "date": "2026-10-04",
  "description": "High-speed Fiber Internet & Electricity",
  "createdAt": 1728032400000
}
```

- Data is automatically synchronized upon any **Add**, **Edit**, or **Delete** operation.
- Reloading or closing the browser preserves the exact state.
- Corrupted or invalid JSON data is caught gracefully with automatic fallback.

---

## 📂 Project Directory Structure

```text
Expense Tracker App/
│
├── index.html          # Semantic HTML5 single-page application structure
│
├── css/
│   └── style.css       # Complete modern CSS3 design system & responsive styling
│
├── js/
│   └── app.js          # Pure Vanilla JS application state, calculations & rendering
│
├── assets/
│   └── icons/          # Vector SVG icon system
│       ├── logo.svg
│       ├── wallet.svg
│       ├── dashboard.svg
│       ├── transactions.svg
│       ├── analytics.svg
│       ├── settings.svg
│       ├── plus.svg
│       ├── bell.svg
│       ├── edit.svg
│       ├── trash.svg
│       ├── search.svg
│       ├── arrow-up-right.svg
│       └── arrow-down-left.svg
│
├── .gitignore          # Clean gitignore excluding system & temporary files
└── README.md           # Professional project documentation
```

---

## 👨‍💻 Recruitment Submission Checklist

- [x] Add income transaction
- [x] Add expense transaction
- [x] Amount, Category, Date, and Description fields
- [x] Edit transaction with prefilled fields
- [x] Delete transaction with confirmation dialog
- [x] Dynamically calculated Total Income, Total Expenses, and Current Balance
- [x] Income / Expense / Category filtering
- [x] Live search against description and category
- [x] Browser LocalStorage persistence
- [x] Monthly expense overview with month switcher
- [x] Category-wise expense chart (Native SVG Donut)
- [x] Custom inline validation and error messages
- [x] Toast notifications for actions
- [x] Empty states for zero records and no search results
- [x] Desktop, Laptop, Tablet, and Mobile responsive design (tested down to 360px)
- [x] Zero external frameworks or heavy libraries
- [x] Clean, maintainable code architecture
