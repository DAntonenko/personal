import { requireAdmin } from "../../shared/auth/requireAdmin"; // why not "@/shared/auth/getCurrentUser"?

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return <>{children}</>;
}
