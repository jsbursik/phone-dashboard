import type { Actions } from "@sveltejs/kit";

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    console.log(formData);
  },
} satisfies Actions;
