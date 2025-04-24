module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', 'sentence-case'],
    'subject-max-length': [2, 'always', 60],
    'scope-enum': [2, 'always', ['docs', 'core', 'tickets', 'teams']],
  },
};
