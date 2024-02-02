import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogOperations } from "@/components/blog-operations";

interface BlogItemProps {
  blog: any;
}

export function BlogItem({ blog }: BlogItemProps) {
  return (
    <article className="group relative flex flex-col space-y-2">
      <div>
        <div className="absolute top-2 right-2">
          <BlogOperations blog={blog} />
        </div>
        {blog.image && (
          <Image
            src={blog.image}
            alt={blog.title}
            width={804}
            height={452}
            className="rounded-md border bg-muted transition-colors"
          />
        )}
      </div>
      <h2 className="text-2xl font-extrabold">{blog.title}</h2>
      {blog.description && (
        <p className="text-muted-foreground">{blog.description}</p>
      )}
      {blog.date && (
        <p className="text-sm text-muted-foreground">{formatDate(blog.date)}</p>
      )}
    </article>
  );
}

BlogItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
