# FinacPlus-QA-Assignment

Playwright + JavaScript automation solution for the FinacPlus QA Automation Intern assignment.

## Tech Stack

- **Framework:** Playwright (JavaScript)
- **Browser:** Chromium
- **Report:** Playwright HTML Report

## Project Structure

finacplus-qa-assignment/
├── tests/
│ ├── ui/bookstore.spec.js
│ └── api/reqres.spec.js
├── pages/
│ ├── LoginPage.js
│ ├── BookStorePage.js
│ └── BookDetailPage.js
├── utils/
│ └── fileHelper.js
├── output/
│ └── book-details.txt
├── .env.example
├── playwright.config.js
└── README.md

## Test Coverage

### UI Tests — DemoQA Book Store

| Step         | Validation                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| Login        | Username label and Logout button visible after login                        |
| Book Search  | "Learning JavaScript Design Patterns" appears in results                    |
| Book Details | Title, Author, Publisher extracted and written to `output/book-details.txt` |
| Logout       | Redirected to login page after logout                                       |

### API Tests — Reqres.in

| Method | Endpoint                     | Validation                                      |
| ------ | ---------------------------- | ----------------------------------------------- |
| POST   | `/api/users`                 | Status 201, name/job in response, userId stored |
| GET    | Validated from POST response | User details match what was sent                |
| PUT    | `/api/users/:id`             | Status 200, updated name reflected in response  |

> **Note:** reqres.in is a mock API that does not persist POST data. GET validation is performed against the stored POST response body. See `tests/api/reqres.spec.js` for full explanation.

## Setup

### Prerequisites

- Node.js v20+
- Git

### Installation

```bash
git clone https://github.com/PavankumarB7/FinacPlus-QA-Assignment.git
cd FinacPlus-QA-Assignment
npm install
npx playwright install chromium
```

### Configure credentials

Copy `.env.example` to `.env` and fill in your values:
UI_BASE_URL=https://demoqa.com
API_BASE_URL=https://reqres.in/api
DEMOQA_USERNAME=your_demoqa_username
DEMOQA_PASSWORD=your_demoqa_password
REQRES_API_KEY=your_reqres_api_key

> Register manually at https://demoqa.com/register before running UI tests.
> Get your free API key at https://reqres.in/signup

### Run tests

```bash
npx playwright test
```

### View HTML report

```bash
npx playwright show-report
```
