import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { globalIgnores } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ignoredFolders = globalIgnores([
  "./node_modules/*",
  "./src/generated/*",
]);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["src/**/*.{js,ts,jsx,tsx}", "lib/**/*.{js,ts,jsx,tsx}"],
  },
  ignoredFolders,
];

export default eslintConfig;
