import { languages } from "prism-code-editor/prism";

languages["phone-config"] = {
  comment: {
    pattern: /#.*/,
  },
  variable: {
    pattern: /\$\w+/,
  },
  "attr-name": {
    pattern: /[\.\w]+\s*(?==|:)/,
  },
  "attr-value": {
    pattern: /(?<==|:).+/,
  },
};
