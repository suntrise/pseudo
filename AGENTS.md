# AGENTS.md - Agent Coding Guidelines

## Project Overview

This is a pseudo-localization web application (a demo for testing internationalization). It runs entirely in the browser with vanilla JavaScript, HTML, and CSS. No build system or package manager is required.

## Development Commands

### Running the Application Locally

```bash
# Start a local HTTP server (Python 3)
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

### Code Quality Checks

All checks run via Python scripts in the `tests/` directory:

```bash
# i18n translation quality check
python3 tests/check_i18n.py

# JSON syntax and duplicate key validation
python3 tests/check_json.py

# Check files end with newline
python3 tests/check_trailing_newline.py

# JavaScript linting via Biome (auto-downloads on first run)
python3 tests/check_biome.py

# Run all checks
python3 tests/check_i18n.py && python3 tests/check_json.py && python3 tests/check_trailing_newline.py && python3 tests/check_biome.py
```

### Biome Linting (Direct)

```bash
# Install biome first, then run:
biome lint src/
```

Note: There is no test runner for unit tests. The "tests" directory contains validation/check scripts only.

## Code Style Guidelines

### General Principles

- This is a vanilla JavaScript project (no frameworks, no build step)
- Use ES modules (`import`/`export` syntax)
- Keep code simple and readable

### File Organization

- Source files go in `src/` directory
- Entry point is `index.html`
- Data files (i18n, character mappings) in `data/`
- Check scripts in `tests/`

### Imports

```javascript
// Use relative imports with .js extension
import { state, loadHistory } from "./state.js";
import { $ } from "./dom.js";

// Group imports logically, one per line
import { loadI18n, applyLanguage } from "./i18n.js";
```

### Naming Conventions

- **Variables/functions**: camelCase (e.g., `loadI18n`, `charLib`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `LANGUAGE_NAMES_FALLBACK`)
- **DOM elements**: Use descriptive names, avoid single letters
- **File names**: kebab-case (e.g., `check_i18n.py`, `app.js`)

### Functions

- Use async/await for asynchronous operations
- Keep functions focused and small
- Use meaningful parameter names
- Add no comments unless explaining complex logic

```javascript
// Good: async function with descriptive name
export async function loadI18n() {
  const basePath = window.BASE_PATH || './';
  const response = await fetch(`${basePath}data/i18n.json`);
  state.i18nData = await response.json();
}

// Good: early returns for clarity
function getLangFallback(langCode) {
  if (state.i18nData[langCode]) {
    return langCode;
  }
  // ... more logic
}
```

### Error Handling

- Use try/catch for potentially failing operations
- Provide fallback values when appropriate
- Log errors appropriately (console.warn/error)

```javascript
try {
  const data = await fetch(url).then(r => r.json());
} catch (_e) {
  return defaultValue; // Use _e convention for unused catch variables
}
```

### State Management

- Use a centralized state object (see `src/state.js`)
- Keep state mutations predictable
- Use `getState()` for safe state access when needed

### DOM Manipulation

- Use the `$()` helper from `src/dom.js` for element selection
- Prefer `textContent` over `innerHTML` for text updates
- Use `innerHTML` only when inserting dynamic HTML strings

### UI Components (MWC - Material Web Components)

- **Prefer MWC components**: The project loads `@material/web`, so prefer MWC components over custom HTML elements
- Available components include:
  - `md-text-button` - Text button
  - `md-filled-button` - Filled button
  - `md-outlined-button` - Outlined button
  - `md-filled-text-field` - Text field input
  - `md-radio` - Radio button
  - `md-checkbox` - Checkbox
  - `md-switch` - Switch
  - `md-slider` - Slider
  - `material-icons` - Icon font
- Only consider custom implementation when MWC components cannot meet the requirements

### Data Handling

- JSON files in `data/` must be valid JSON
- i18n keys must be consistent across all language files
- Check translations with `tests/check_i18n.py` before committing

### String Handling

- Use template literals for string concatenation
- Prefer string interpolation over concatenation

### Linting Rules (Biome)

The project uses Biome with these enabled rules:
- `recommended`: true
- `style/useTemplate`: warn (prefer template literals)
- `style/useConst`: warn (prefer const)
- `complexity/useLiteralKeys`: warn
- `correctness/noUnusedImports`: warn
- `correctness/noUnusedVariables`: warn
- `correctness/useParseIntRadix`: warn
- `suspicious/useIterableCallbackReturn`: warn

### Git Workflow

- All checks in `.github/workflows/check-code.yml` must pass before PR merge
- Checks run automatically on pull requests
- Use descriptive commit messages

### Adding New Features

1. Update `data/i18n.json` with new translation keys if needed
2. Add new JavaScript logic in appropriate `src/` module
3. Run all check scripts before committing
4. Ensure no regressions in existing functionality

### Common Patterns

```javascript
// Module pattern - export functions at end or inline
export function myFunction() { }

// State access pattern
import { state, getState } from "./state.js";

// DOM query pattern
import { $ } from "./dom.js";
const element = $("my-element-id");
```

### File Extensions

- JavaScript: `.js`
- HTML: `.html`
- CSS: `.css`
- JSON: `.json`
- Python check scripts: `.py`

### HTTP Server Requirements

The app uses `window.BASE_PATH` for path configuration. When serving locally:
```javascript
// In browser console or HTML before loading scripts:
window.BASE_PATH = './';
```

---

For questions, refer to README.md or examine existing source files in `src/`.
