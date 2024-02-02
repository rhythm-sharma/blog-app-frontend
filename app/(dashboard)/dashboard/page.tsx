import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { BlogCreateButton } from "@/components/blog-create-button";
import { BlogItem } from "@/components/blog-item";
import { DashboardShell } from "@/components/shell";

const blogs = [
  {
    _id: "1",
    image:
      "https://images.unsplash.com/photo-1682685797366-715d29e33f9d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "1",
    description: "1",
    date: "April 9, 2023",
    slug: "",
    published: "1",
  },
  {
    _id: "2",
    image:
      "https://images.unsplash.com/photo-1682685797366-715d29e33f9d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "2",
    description: "2",
    date: "April 9, 2023",
    slug: "",
    published: "1",
  },
];

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Blogs" text="Create and manage blogs.">
        <BlogCreateButton />
      </DashboardHeader>
      <div>
        {blogs?.length ? (
          <div className="grid gap-10 sm:grid-cols-3">
            {blogs.map((blog) => (
              <BlogItem key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No blog created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any blogs yet. Start creating content.
            </EmptyPlaceholder.Description>
            <BlogCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
