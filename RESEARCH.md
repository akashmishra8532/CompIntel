# Phase 1 Research: Compensation Intelligence Platforms

## Reverse Engineering Observations

An analysis of top compensation platforms (Levels.fyi, 6figr, AmbitionBox, Glassdoor) revealed key insights into what makes a platform a true "intelligence system" versus a simple "job board."

### What Works: Levels.fyi
* **Strict Level Standardization:** Levels.fyi accurately maps different internal company hierarchies (e.g., Google L4 vs. Microsoft 61) into a comparable standard. This is their core differentiator. "Titles mean nothing, Levels mean everything."
* **Component Breakdown:** They don't just show a single "Total" number. Breaking compensation into Base, Bonus, and Stock (RSUs) is critical for decision-making since stock vesting heavily influences total comp.
* **Verified Data Flow:** Their submission flow strictly enforces structured inputs (Company, Role, Level, Location) before allowing a user to submit, ensuring high data cleanliness.

### Where Traditional Platforms Fail: Glassdoor & AmbitionBox
* **Title Ambiguity:** Glassdoor groups all "Software Engineers" into one bucket. This is fundamentally flawed because a fresh graduate and a 5-year veteran might both hold the title "Software Engineer," completely skewing the median salary.
* **Missing Equity Data:** 6figr and AmbitionBox often struggle to accurately represent stock grants, which form a massive portion of tech compensation (often >40%).
* **Poor Searchability:** Traditional platforms focus heavily on company reviews and generic Q&A, burying the actual compensation data behind unstructured text fields.

### Key Gaps
* **Immediate 1-to-1 Comparison:** Most platforms show aggregated graphs but lack a clean, isolated "Head-to-Head" comparison feature where a user can compare exactly two distinct offers or roles side-by-side.
* **Modern UX/UI:** Many platforms still rely on outdated, dense spreadsheet layouts. The modern user demands a highly responsive, fast, and visually engaging data explorer.

## Feature Mapping Sheet

We mapped out the core features across competitors to decide what specifically to build for **CompIntel**.

| Feature | Levels.fyi | 6figr | AmbitionBox | Glassdoor | Build? |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Standardized Levels** | ✅ | ❌ | ❌ | ❌ | **YES** |
| **Base + Bonus + Stock Split** | ✅ | ✅ | ❌ | ❌ | **YES** |
| **Normalized Company Search** | ✅ | ✅ | ✅ | ✅ | **YES** |
| **1-to-1 Head-to-Head Compare** | ❌ | ❌ | ❌ | ❌ | **YES** |
| **Level Distribution Metrics** | ✅ | ❌ | ❌ | ❌ | **YES** |
| **Interview Reviews** | ❌ | ✅ | ✅ | ✅ | NO |
| **Company Culture Ratings** | ❌ | ❌ | ✅ | ✅ | NO |
| **User Authentication / Login** | Optional | ✅ | ✅ | ✅ | NO |
| **Data Confidence Score** | ✅ | ❌ | ❌ | ❌ | **YES** |

### Building CompIntel
**CompIntel** is an opinionated system. We are completely abandoning company reviews, chat forums, and generic job titles. Our focus is 100% on **Structured → Queryable → Comparable → Decision-ready** data.

To achieve this, we enforce strict data normalization on the backend (lowercasing, trimming) and require specific parameters (Base, Bonus, Stock, Experience Years) for every single entry. If a user fails to provide bonus or stock, we default to 0 to prevent logic errors during aggregation.
