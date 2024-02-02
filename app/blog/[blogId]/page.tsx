"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import EditorJS from "@editorjs/editorjs";
import "../../../styles/editor.css";

const Blog = () => {
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Table = (await import("@editorjs/table")).default;
    const List = (await import("@editorjs/list")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const SimpleImage = (await import("@editorjs/simple-image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        readOnly: true,
        onReady() {
          ref.current = editor;
        },
        data: {
          time: 1706809985961,
          blocks: [
            {
              id: "uvv14Hw47S",
              type: "image",
              data: {
                url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
                caption: "asdsad",
                withBorder: false,
                withBackground: false,
                stretched: false,
              },
            },
            {
              id: "5nIGQFfPoq",
              type: "list",
              data: {
                style: "unordered",
                items: ["asd", "Asd", "asd"],
              },
            },
            {
              id: "RhMqRTNOZg",
              type: "paragraph",
              data: {
                text: "<i><b>sad</b></i>",
              },
            },
            {
              id: "tkecoCxSfx",
              type: "table",
              data: {
                withHeadings: false,
                content: [["asd", "asd", "asd", "asd"]],
              },
            },
          ],
          version: "2.29.0",
        },
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
  }, []);

  useEffect(() => {
    if (isMounted) {
      initializeEditor();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  return (
    <div className="container">
      <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
        <TextareaAutosize
          autoFocus
          id="title"
          defaultValue={"post.title"}
          placeholder="Post title"
          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
        />
        <div id="editor" className="min-h-[500px]" />
      </div>
    </div>
  );
};

export default Blog;
