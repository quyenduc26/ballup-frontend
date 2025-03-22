"use client";

import { useState, useEffect } from "react";

import SearchBar from "@/components/search/searchPage";
import HeroSection from "@/components/Banner";
import ListTeamCard from "@/components/team/teamCard/ListTeamCard";
import CreateTeam from "@/components/team/FormCreateTeam";
import TeamIntro from "@/components/team/inforTeam/detailTeam";
import TeamApi from "@/service/teamCardApi";
import { DetailTeam } from "@/types";
import { set } from "date-fns";
import ListMyTeam from "@/components/team/ListMyTeam";

const Team = () => {
  const [showExplore, setShowExplore] = useState(true);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [myTeams, setMyTeams] = useState<DetailTeam[] | null>(null);
  const [myTeamIndex, setMyTeamIndex] = useState<number | null>(null);

  const handleSetMyTeamIndex = (index: number) => {
    setMyTeamIndex(index);
  };

  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const userId = parseInt(parsedData.id);


  useEffect(() => {
    const getMyTeams = async (userId: number) => {
      const myTeams = await TeamApi.getMyTeams(userId);
      setMyTeams(myTeams.data);
    }

    getMyTeams(userId);
  }, [showExplore]);

  const onTeamJoined = (teamId: number) => {
    console.log("ListTeamCard onTeamJoined triggered with teamId:", teamId);
    setShowExplore(false);
  }

  return (
    <div className="container mx-auto max-w-[1500px] p-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-black md:py-6 text-center md:text-left ml-4 mt-20">
        TEAM
      </h1>
      <HeroSection />

      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 p-5 ml-2">
        <button
          className={`text-lg md:text-2xl font-semibold transition-all hover:underline ${showExplore ? "text-blue-500" : "text-black hover:text-blue-500"
            }`}
          onClick={() => {
            setShowExplore(true);
            console.log("Switching to EXPLORE");
          }}
        >
          EXPLORE
        </button>
        <button
          className={`text-lg md:text-2xl font-semibold transition-all hover:underline ${!showExplore ? "text-blue-500" : "text-black hover:text-blue-500"
            }`}
          onClick={() => {
            const teamIdFromStorage = localStorage.getItem("joinedTeamId");
            setShowExplore(false);
            console.log("Switching to MY TEAM with teamId from storage:", teamIdFromStorage);
          }}
        >
          MY TEAM
        </button>
        <button
          className="flex justify-start items-start text-lg md:text-lg border border-gray-500 bg-black px-4 md:px-6 py-2 font-medium transition-all text-white"
          onClick={() => setShowCreateTeam(!showCreateTeam)}
        >
          {showCreateTeam ? "×" : "+"}
        </button>
      </div>

      <div className="flex justify-center">
        <SearchBar />
      </div>

      {showCreateTeam ? (
        <CreateTeam setIsOpen={() => setShowCreateTeam(false)} />
      ) : showExplore ? (
        <ListTeamCard onTeamJoined={onTeamJoined} />
      ) : myTeams?.length && myTeams.length > 0 && myTeams.length < 2 ? (
        <TeamIntro teamDetail={myTeams[0]} />
      ) : myTeams && myTeamIndex === null ? (
        <ListMyTeam listMyTeam={myTeams} setMyTeamIndex={handleSetMyTeamIndex} />
      ) : myTeams && myTeamIndex !== null && myTeamIndex < myTeams.length ? (
        <TeamIntro teamDetail={myTeams[myTeamIndex]} />
      ) : (
        <p>Danh sách đội trống hoặc chưa tải xong!</p>
      )}



    </div>
  );
};

export default Team;