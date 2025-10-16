import { languages } from "prism-code-editor/prism";

languages["phone-config"] = {
  comment: {
    pattern: /#.*/, // Comments
  },
  tag: {
    pattern: /\$\w+/, // Variables
  },
  keyword: {
    pattern: /\w+\s*(?==|:)/, // Fields
  },
  function: {
    pattern: /(?<==|:).+/, // Values
  },
};
