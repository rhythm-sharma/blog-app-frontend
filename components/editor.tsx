"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import * as z from "zod";

import "../styles/editor.css";
import { cn } from "@/lib/utils";
import { postPatchSchema } from "@/lib/validations/post";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { PROD_URL } from "@/lib/api";

interface EditorProps {
  token: string;
  blogId: any;
}

type FormData = z.infer<typeof postPatchSchema>;

export function Editor({ token, blogId }: EditorProps) {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
  });
  const ref = React.useRef<EditorJS>();
  const router = useRouter();
  const [post, setPost] = React.useState<any>({});
  const [isSaving, setIsSaving] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const SimpleImage = (await import("@editorjs/simple-image")).default;

    const body = postPatchSchema.parse(post);

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: body.content,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
          image: SimpleImage,
        },
      });
    }
  }, [post]);

  const getPostForUser = React.useCallback(async (postId: string) => {
    fetch(`${PROD_URL}blog/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setPost(res);
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    getPostForUser(blogId);
  }, []);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    setIsSaving(true);

    const blocks = await ref.current?.save();

    fetch(`${PROD_URL}blog`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: post.id,
        title: data.title,
        content: blocks,
      }),
    })
      .then((response) => response.json())
      .then((updatedPost) => {
        setPost(updatedPost);
        setIsSaving(false);
        router.refresh();
        return toast({
          description: "Your post has been saved.",
        });
      })
      .catch(() => {
        return toast({
          title: "Something went wrong.",
          description: "Your post was not saved. Please try again.",
          variant: "destructive",
        });
      });
  }

  if (!isMounted) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            {/* <p className="text-sm text-muted-foreground">
              {post.published ? "Published" : "Draft"}
            </p> */}
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post?.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <div id="editor" className="min-h-[500px]" />
        </div>
      </div>
    </form>
  );
}
