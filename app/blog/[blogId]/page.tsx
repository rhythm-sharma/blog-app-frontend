import BlogPreview from "@/components/blog-preview";
import { PROD_URL } from "@/lib/api";

interface EditorPageProps {
  params: { blogId: string };
}

async function getPostForUser(blogId: string) {
  const res: any = await fetch(`${PROD_URL}blog/${blogId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    // Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function EditorPage({ params }: EditorPageProps) {
  const blog = await getPostForUser(params.blogId);

  return (
    <BlogPreview
      blog={{
        id: blog.id,
        title: blog.title,
        content: blog.content,
        published: blog.published,
      }}
    />
  );
}
