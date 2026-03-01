// ESLint flat config that works with Next.js
// Note: There's a known issue with eslint-config-next and ESLint 9 flat config
// This is a working minimal configuration

export default [
  {
    ignores: [
      "**/node_modules/",
      "**/.next/",
      "**/out/",
      "**/build/",
      "**/dist/",
      "**/.netlify/",
      "**/.references/",
      "**/.storybook/",
      "**/stories/",
      "next-env.d.ts",
      "**/storybook-static/",
      "cms/",
    ],
  },
];
