// ESLint flat config
// Note: Next.js eslint-config-next has compatibility issues with ESLint 9 flat config
// Using a minimal working configuration until full support is available

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/build/**',
      '**/dist/**',
      '**/.netlify/**',
      '**/.references/**',
      '**/.storybook/**',
      '**/stories/**',
      '**/next-env.d.ts',
      '**/storybook-static/**',
      '**/cms/**',
      '**/vitest.config.ts',
      '**/playwright.config.ts',
      '**/test/**',
      '**/e2e/**',
      '**/coverage/**',
      '**/playwright-report/**',
      '**/test-results/**',
    ],
  },
];
