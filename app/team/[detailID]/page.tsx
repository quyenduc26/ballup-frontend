"use client";
import React, { useState } from "react";

import Detail from "@/components/team/DetailTeam/detail";
import UpdateTeamDetail from "@/components/team/inforTeam/UpdateTeamDetail";

export default function Page() {
  const [isUpdate, setIsUpdate] = useState(false);
  const handleUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  return <div>{isUpdate ? <UpdateTeamDetail /> : <Detail />}</div>;
}
