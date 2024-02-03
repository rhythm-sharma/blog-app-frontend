import { Editor } from "@/components/editor";
import { cookies } from "next/headers";

interface EditorPageProps {
  params: { postId: string };
}

function getToken() {
  const cookieStore = cookies();
  return cookieStore?.get("next-auth.session-token")?.value || "";
}

export const metadata = {
  title: "Edit",
};

export default async function EditorPage({ params }: EditorPageProps) {
  const token = getToken();

  return <Editor token={token} blogId={params.postId} />;
}
