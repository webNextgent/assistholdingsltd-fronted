import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // ⛔️ Disable next/image enforcement
      "@next/next/no-img-element": "off",

      // ⛔️ Allow normal quotes like 'It's'
      "react/no-unescaped-entities": "off",

      // ⛔️ Ignore unused vars warning
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
