import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";

export function requireRole(role: string) {
  return async function () {
    const user = await getCurrentUser();

    if (!user) {
      redirect("/login");
    }

    if (user.role !== role) {
      redirect("/login?error=forbidden");
    }

    return user;
  };
}
