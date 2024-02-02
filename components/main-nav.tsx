"use client";

import * as React from "react";
import Link from "next/link";

import { Icons } from "@/components/icons";

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Icons.crown />
        <span className="hidden font-bold sm:inline-block">
          {"Ziffi Blogs"}
        </span>
      </Link>
    </div>
  );
}
