import { getCurrentUser } from "@/shared/auth/getCurrentUser";
import { createPost } from "./actions";
import { getTranslations } from "next-intl/server";
import { SubmitFormButton } from "@/components/UI/SubmitFormButton/SubmitFormButton";

export default async function AdminPage() {

  const user = await getCurrentUser();

  const t = await getTranslations("CreatePostPage");

  return (
    <main>
      <h1>Admin</h1>

      <p>
        Logged in as: {user?.role}
      </p>

      <form action={createPost}>
        <div>
          <label>
            Title
            <input name="title" />
          </label>
        </div>
        <div>
          <label>
            Content
            <textarea name="content" />
          </label>
        </div>
        <SubmitFormButton
          idleText={t("createText")}
          pendingText={t("createPendingText")}
        />
      </form>
    </main>
  );
}
