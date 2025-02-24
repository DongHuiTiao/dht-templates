module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json', // 指向你的 tsconfig
    },
    plugins: ['@typescript-eslint'],
    rules: {
        // 自定义格式化规则（示例）
        '@typescript-eslint/indent': ['error', 2], // 2空格缩进
        '@typescript-eslint/quotes': ['error', 'single'], // 单引号
        '@typescript-eslint/semi': ['error', 'always'], // 强制分号
        '@typeslint/no-unused-vars': 'warn', // 未使用变量警告
        'comma-dangle': ['error', 'always-multiline'], // 尾随逗号
    },
    ignorePatterns: ['dist/**', 'node_modules/**'],
};