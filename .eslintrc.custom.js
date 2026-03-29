module.exports = {
  rules: {
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../../*'],
            message: '请使用 @/ 别名导入模块',
          },
        ],
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.name='fetch']",
        message: '请使用统一的 request 方法，不要直接使用 fetch',
      },
    ],
  },
};
