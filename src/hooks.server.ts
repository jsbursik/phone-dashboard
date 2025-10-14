import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // Get session
  const sessionData = await auth.api.getSession({ headers: event.request.headers });

  // Make available to all routes
  event.locals.session = sessionData?.session ?? null;
  event.locals.user = sessionData?.user ?? null;

  // Protect routes
  const protectedRoutes = ["/secret"];
  if (protectedRoutes.some((route) => event.url.pathname.startsWith(route))) {
    if (!sessionData?.user) {
      throw redirect(303, "/login");
    }
  }

  return resolve(event);
};
