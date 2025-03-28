"use client";
import React, { useState } from "react";

import TeamDetail from "@/components/team/DetailTeam/detail";
import UpdateTeamDetail from "@/components/team/inforTeam/UpdateTeamDetail";

export default function Page() {
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  return <div>{isUpdate ? <UpdateTeamDetail /> : <TeamDetail />}</div>;
}
