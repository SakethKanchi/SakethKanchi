// ESLint flat config — Next.js core-web-vitals + @typescript-eslint.
// eslint-config-next ships a flat-config-ready array; we spread it and add ignores.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const portfolioConfig = [
  ...nextCoreWebVitals,
  {
    name: "portfolio/ignores",
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "public/**",
      "node_modules/**",
      " next-env.d.ts",
    ],
  },
  {
    name: "portfolio/typescript-strict",
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
    },
  },
];

export default portfolioConfig;