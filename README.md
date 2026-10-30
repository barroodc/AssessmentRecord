# AssessmentRecord

**A privacy auditing system for reviewing technical evidence, evaluating privacy controls, and managing assessment workflows.**

**Status:** Level 1 Frontend MVP | Actively in Development

## Overview

AssessmentRecord is a privacy auditing system I'm developing to help evaluate whether projects are meeting established privacy expectations and controls.

The core component of the application is the **Assessment Record**. This is a dedicated workspace that acts as a central hub for auditors to evaluate privacy claims by examining supporting evidence, documenting findings and potential privacy gaps, and determining whether the available evidence supports the claims being made about a project.

An assessment dashboard will also be included in the system, allowing auditors to locate, filter, and access the assessments assigned to them.

The idea for this project came from my experience working in technical privacy auditing. As a former Technical Auditor, I wanted to apply what I've learned about assessment workflows to building an entirely new system from the ground up.

My goal is to create a system that's easier for auditors to use while helping teams identify, document, and manage privacy risks across projects preparing for production.

## Core Components

### 1. Assessment Record

The Assessment Record is the primary feature of the application.

Each record provides a centralized workspace for conducting an individual privacy assessment.

**Assessment Overview**

- View assessment information, ownership, and review status.
- Monitor review progress.
- Identify missing platform coverage and outstanding issues.

**Evidence Review**

- Browse supporting technical and behavioral evidence.
- Filter evidence by type.
- Navigate between individual evidence items.
- Assign evidence review statuses.
- Track which evidence items have been reviewed.

**Review Criteria**

- Evaluate individual privacy review questions.
- Record review answers and supporting notes.
- Flag findings that require additional documentation.
- Monitor assessment completion progress.

**Gaps and Action Items**

- Document outstanding issues discovered during a review.
- Track identified gaps and action items.
- Monitor unresolved issues.

**Reviewer Notes and Decisions**

- Record overall assessment observations.
- Select a review decision.
- Document the reasoning behind the decision.
- Track completion criteria through a dynamic checklist.
- Identify conditions preventing review completion.

Final review completion validation and submission behavior are currently in development.

### 2. Assessment Dashboard

The dashboard functions as the system's assignment board.

Its purpose is to provide visibility into assessment records and help reviewers navigate their assigned work.

The existing vanilla JavaScript implementation includes:

- A table of assessment records.
- Search functionality.
- Filtering by project, risk, and auditor status.
- Assessment information and assignment details.
- Summary metrics for active records and review activity.

The dashboard is being rewritten in React and integrated with the Assessment Record workspace as part of the Level 1 release.

## Technology Stack

- **JavaScript (ES6+)** for application logic
- **React** for component-based architecture and state management
- **HTML5** for application structure
- **CSS3** for layout and interface styling
- **Vite** for React development tooling
- **Git & GitHub** for version control

The Level 1 application currently uses simulated assessment data to support frontend development and testing without requiring a backend.

## Development History

AssessmentRecord has evolved through several stages as I've continued developing my JavaScript and frontend engineering skills.

**Stage 1: Initial Audit Tracker**

The project began as a basic audit-tracking application built with vanilla JavaScript and HTML.

This early version focused on manipulating audit data, managing auditors, and implementing fundamental application logic.

The original implementation is preserved in `archive/dom-practice-v1/`.

**Stage 2: Assessment Dashboard**

I expanded the project into a more structured assessment dashboard using vanilla JavaScript.

This introduced a more complete interface for navigating assessment records, filtering assignments, and displaying assessment information.

The earlier dashboard implementation remains in the repository as part of the project's development history.

**Stage 3: React Application (Current)**

I'm rebuilding the application using React to create a more maintainable, component-based system.

This phase focuses on developing the individual Assessment Record workspace and integrating the dashboard into a unified privacy auditing application.

All application code is being written by me as part of my software engineering development.

## Repository Structure

```text
archive/dom-practice-v1/   Original audit tracker prototype
assets/                   Project assets
data/                     Earlier dashboard data
models/                   Earlier dashboard logic and models
react/                    Current React application
  public/                 Public assets
  src/
    assets/               React application assets
    components/           React UI components
    App.jsx               Main application component
    data.json             Simulated assessment data
    main.jsx              Application entry point
  package.json            Dependencies and scripts
ui/                       Earlier UI implementation
README.md                  Project documentation
```

## Getting Started

To run the current React application locally:

**1. Clone the repository**

```bash
git clone https://github.com/barroodc/AssessmentRecord.git
```

**2. Navigate to the React application**

```bash
cd AssessmentRecord/react
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Roadmap

### Level 1: Frontend Application

- [x] Assessment Record workspace and navigation
- [x] Evidence browsing and review statuses
- [x] Review questions, notes, and findings
- [x] Gap and action-item management interface
- [x] Dynamic review completion checklist
- [x] Review decision selection and rationale
- [ ] Complete review validation and submission behavior
- [ ] Rebuild and integrate the dashboard in React
- [ ] Finalize application styling and responsive layouts
- [ ] Complete integration testing
- [ ] Deploy the frontend application

### Level 2: Backend Development

Planned improvements include:

- Backend API development
- Database integration
- Persistent assessment and review data
- User authentication
- Assessment assignment management
- Persistent activity and review history
