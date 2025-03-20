"use client";

import React from "react";
import dynamic from "next/dynamic";

const SibavSidebar = dynamic(() => import("@/components/owner/sibav"), { ssr: false });

export default function Sidebar() {
  return (
    <div className="">
      <SibavSidebar />
    </div>
  );
}
