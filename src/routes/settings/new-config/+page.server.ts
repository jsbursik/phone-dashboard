import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

interface ConfigData {
  [key: `input-${number}`]: string;
  [key: `code-${number}`]: string;
}

interface ConfigEntry {
  filename: string;
  content: string;
}

type FormErrors = {
  field: `input-${number}`;
  message: string;
};

export const actions = {
  default: async ({ request }) => {
    const raw = Object.fromEntries(await request.formData());
    const errors = validateData(raw as ConfigData);

    if (errors.length > 0) {
      return fail(406, { errors, values: raw });
    }

    const config: ConfigEntry[] = parseConfigData(raw as Record<string, string>);
    console.log(config);

    return { success: true };
  },
} satisfies Actions;

function validateData(data: ConfigData): FormErrors[] {
  const valid = /.+\..+/;
  const errors: FormErrors[] = [];

  for (const [key, value] of Object.entries(data)) {
    const field = key as `input-${number}`;
    if (key.startsWith("input-")) {
      if (!valid.test(value)) {
        errors.push({ field, message: "Use filename syntax!" });
      }
    }
  }
  return errors;
}

function parseConfigData(raw: Record<string, string>): ConfigEntry[] {
  const entries: ConfigEntry[] = [];
  const inputKeys = Object.keys(raw).filter((key) => key.startsWith("input-"));

  for (const inputKey of inputKeys) {
    const index = inputKey.split("-")[1];
    const codeKey = `code-${index}`;

    entries.push({
      filename: raw[inputKey],
      content: raw[codeKey],
    });
  }
  return entries;
}
