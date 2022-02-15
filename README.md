# Next.js + ESlint(airbnb) + Prettier + SCSS Startpack

ESlint, Prettier 확장 플러그인 사용(vscode)

- airbnb 규칙적용 -> 그대로 사용
- next 규칙적용 -> extends의 airbnb 삭제하고 주석된 next, next/core-web-vitals 활성화

.eslint.json

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    // "next",
    // "next/core-web-vitals",
    "airbnb",
    "plugin:prettier/recommended"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["react", "react-hooks", "prettier"],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/react-in-jsx-scope": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-one-expression-per-line": 0,
    "no-nested-ternary": 0
  },
  "globals": {
    "React": "writable"
  }
}
```

.prettierrc.js

```js
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: true,
  arrowParens: 'avoid',
  proseWrap: 'never',
  endOfLine: 'auto',
};
```

vscode settings.json

```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "workbench.settings.useSplitJSON": true,
```
