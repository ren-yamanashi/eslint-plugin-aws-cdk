export default {
  disableEmoji: false,
  format: "{type}{scope}: {emoji}{subject}",
  list: [
    "feat",
    "fix",
    "test",
    "refactor",
    "chore",
    "docs",
    "style",
    "ci",
    "perf",
  ],
  maxMessageLength: 64,
  minMessageLength: 3,
  questions: ["type", "subject"],
  scopes: [],
  types: {
    chore: {
      description: "Other changes",
      emoji: "🤖",
      value: "chore",
    },
    ci: {
      description: "CI related changes",
      emoji: "🎡",
      value: "ci",
    },
    docs: {
      description: "Documentation changes",
      emoji: "📝",
      value: "docs",
    },
    feat: {
      description: "New features",
      emoji: "🎸",
      value: "feat",
    },
    fix: {
      description: "Bug fixes",
      emoji: "🐛",
      value: "fix",
    },
    perf: {
      description: "Performance improvements",
      emoji: "⚡️",
      value: "perf",
    },
    refactor: {
      description: "Code refactoring",
      emoji: "💡",
      value: "refactor",
    },
    style: {
      description: "Code formatting changes",
      emoji: "💄",
      value: "style",
    },
    test: {
      description: "Add or fix tests",
      emoji: "💍",
      value: "test",
    },
  },
};
