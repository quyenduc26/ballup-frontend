"use client";
import React from "react";
import dynamic from "next/dynamic";

const CreateMatch = dynamic(() => import("@/components/match/CreateMatch"), {
  ssr: false,
});

export default function Match() {
  return (
    <div>
      <CreateMatch />
    </div>
  );
}
