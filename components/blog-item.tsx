import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogOperations } from "@/components/blog-operations";
import { cookies } from "next/headers";

interface BlogItemProps {
  blog: any;
}

function getToken() {
  const cookieStore = cookies();
  return cookieStore?.get("next-auth.session-token")?.value || "";
}

export function BlogItem({ blog }: BlogItemProps) {
  return (
    <article className="group relative flex flex-col space-y-2">
      <div>
        <div className="absolute top-2 right-2">
          <BlogOperations token={getToken()} blog={blog} />
        </div>
        {blog?.background && (
          <Image
            src={blog?.background}
            alt={blog.title}
            width={804}
            height={452}
            className="min-h-[452px] max-h-[452px] rounded-md border bg-muted transition-colors"
          />
        )}
      </div>
      <h2 className="text-2xl font-extrabold">{blog.title}</h2>
      {blog.updatedAt && (
        <p className="text-sm text-muted-foreground">
          {formatDate(blog.updatedAt)}
        </p>
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
