import type { Actions } from "./$types";

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    data.entries().forEach(([key, value]) => {
      console.log(`${key}=${value}`);
    });
  },
} satisfies Actions;
