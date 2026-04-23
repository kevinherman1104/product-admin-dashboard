# Product Admin Dashboard

A comprehensive administration tool for managing users and products, built with a modern React stack.

## Features

- **React & Vite**: Modern frontend setup with TypeScript.
- **MUI (Material UI)**: Premium UI components and a responsive layout.
- **Orval & MSW**: Automated API client generation and network mocking.
- **Vitest**: Unit testing setup to ensure component reliability.
- **Playwright + Cucumber (BDD)**: E2E testing for critical user flows written in Gherkin.

## Project Structure

```
src/
├── api/          # Orval-generated API client and models
├── layout/       # Layout component with responsive sidebar
├── mocks/        # MSW worker, handlers, and in-memory mock database
├── pages/        # Core application pages: Login, Dashboard, Users, Products, Settings
└── theme/        # MUI theme configuration

e2e/
├── features/     # Gherkin scenarios (.feature files)
├── pages/        # Page Object Model classes
└── steps/        # Step definitions mapping Gherkin to Playwright actions
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run the development server**:
   ```bash
   npm run dev
   ```
3. **Run unit tests**:
   ```bash
   npm test
   ```
4. **Run E2E tests**:
   ```bash
   npm run test:e2e
   ```

## E2E Testing

Tests are written in Gherkin (BDD) using [playwright-bdd](https://github.com/vitalets/playwright-bdd). Running `npm run test:e2e` first compiles `.feature` files into Playwright specs via `bddgen`, then executes them against a local dev server that starts automatically.

### Architecture

**Page Object Model** — all selectors and assertions live in `e2e/pages/`. Step definitions in `e2e/steps/` are pure orchestration with no direct Playwright API calls. This means selector changes require updates in one place only.

**Selectors** — `getByTestId()` throughout. Test IDs are explicit attributes in the source and only change when deliberately removed, making them more resilient than CSS classes or DOM structure.

### Test Coverage

#### Login (`e2e/features/login.feature`)
| Scenario | What it covers |
|---|---|
| Successful login | Valid credentials redirect to dashboard |
| Invalid credentials | Error message is displayed |

#### Products (`e2e/features/products.feature`)
| Scenario | What it covers |
|---|---|
| Add a new product | Full happy path — name, price with 1.1x multiplier, and category all appear in the grid |
| Incomplete form | Empty description blocks submit via browser constraint validation |
| Empty form | Empty name field blocks submit; dialog stays open |
| Dismiss without saving | Escape key closes dialog; nothing added to grid |

**Validation assertions** use `element.validity.valid` via Playwright's `evaluate` — this confirms the browser enforced the constraint on the specific submit attempt, not just that the `required` attribute is declared.

### Running Tests with Report

```bash
npm run test:e2e
npx playwright show-report
```

The HTML report includes traces on first retry, useful for debugging failures.

## CI Pipeline

The GitHub Actions pipeline runs on every push and pull request to `main`.

### Jobs

| Job | Depends on | Purpose |
|---|---|---|
| `lint` | — | Runs `npm run lint`, fails fast on type or style errors |
| `e2e` | `lint` | Runs the full Playwright/Cucumber suite |
| `ci-gate` | `lint` + `e2e` | Single required status check for branch protection |

### Key behaviours

- **Concurrency control** — pushes cancel in-flight runs for the same branch
- **Two levels of caching** — npm dependencies (`cache: 'npm'` on setup-node) and Playwright browsers (keyed on `package-lock.json`), both invalidate automatically on dependency changes
- **Artifact upload** — HTML report uploaded on every run (pass or fail), retained for 7 days
- **Job timeout** — `timeout-minutes: 15` on the e2e job prevents a hanging dev server from consuming a 6-hour runner slot

### Blocking PRs

The `ci-gate` job acts as a single required status check. To enforce it:

1. Go to **Settings → Branches** in the repository
2. Add a protection rule for `main`
3. Enable **Require status checks to pass before merging**
4. Add **`CI Gate`** as a required check

This prevents merging any PR where lint or E2E tests have not passed.

## Development

### Data-Test Attributes

Core UI components use `data-testid` attributes as stable selectors for E2E tests:

- Login: `login-username`, `login-password`, `login-submit`, `login-error`, `dashboard-title`
- Products: `add-product-button`, `product-name-input`, `product-price-input`, `product-category-input`, `product-description-input`, `save-product-button`

### Adding New Endpoints

1. Update `openapi.yaml`
2. Run `npm run orval` to regenerate the TypeScript client and models
3. Update `src/mocks` if mock responses are needed during development
