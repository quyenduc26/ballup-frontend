"use client";
import React from "react";
import dynamic from "next/dynamic";

const TeamIntro = dynamic(
  () => import("@/components/team/inforTeam/detailTeam"),
  { ssr: false },
);

export default function page() {
  return <TeamIntro />;
}
