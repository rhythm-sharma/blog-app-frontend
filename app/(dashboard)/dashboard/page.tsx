import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { BlogCreateButton } from "@/components/blog-create-button";
import { BlogItem } from "@/components/blog-item";
import { DashboardShell } from "@/components/shell";
import { PROD_URL } from "@/lib/api";
import { cookies } from "next/headers";

function getToken() {
  const cookieStore = cookies();
  return cookieStore?.get("next-auth.session-token")?.value || "";
}

async function getBlogs() {
  const token = getToken();

  const res: any = await fetch(`${PROD_URL}blog`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    // Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const blogs = await getBlogs();
  const token: string = getToken();

  return (
    <DashboardShell>
      <DashboardHeader heading="Blogs" text="Create and manage blogs.">
        <BlogCreateButton token={token} />
      </DashboardHeader>
      <div>
        {blogs?.length ? (
          <div className="grid gap-10 sm:grid-cols-3">
            {blogs.map((blog: any) => (
              <BlogItem key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No blog created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any blogs yet. Start creating content.
            </EmptyPlaceholder.Description>
            <BlogCreateButton token={token} variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
