import { notFound } from "next/navigation";

import { Editor } from "@/components/editor";

interface EditorPageProps {
  params: { postId: string };
}

export default async function EditorPage({ params }: EditorPageProps) {
  // const post = await getPostForUser(params.postId, user.id)
  const post: any = {};
  if (!post) {
    notFound();
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
      }}
    />
  );
}
