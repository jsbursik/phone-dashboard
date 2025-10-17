import { languages } from "prism-code-editor/prism";

languages["phone-config"] = {
  comment: {
    pattern: /#.*/, // Comments
  },
  variable: {
    pattern: /\$\w+/, // Variables
  },
  "attr-name": {
    pattern: /[\.\w]+\s*(?==|:)/,
  },
  "attr-value": {
    pattern: /(?<==|:).+/,
  },
};
