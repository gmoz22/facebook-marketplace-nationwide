import { fileURLToPath } from "node:url"
import nextVitals from "eslint-config-next/core-web-vitals"
import prettier from "eslint-config-prettier/flat"
import tailwindcss from "eslint-plugin-tailwindcss"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  ...nextVitals,
  ...tailwindcss.configs["flat/recommended"],
  prettier,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-key": "off",
      "tailwindcss/no-custom-classname": "off",
    },
    settings: {
      tailwindcss: {
        callees: ["cn"],
        config: fileURLToPath(new URL("./tailwind.config.js", import.meta.url)),
      },
      next: {
        rootDir: ["./"],
      },
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    ".cache/**",
    "public/**",
    "*.esm.js",
    "next-env.d.ts",
  ]),
])
