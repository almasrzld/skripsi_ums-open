"use client";

import { Crown } from "lucide-react";

const { Seed, SeedItem, SeedTeam } = require("@pawix/react-brackets");

const CustomSeed = ({ seed, breakpoint, roundIndex, seedIndex }) => {
  // breakpoint passed to Bracket component
  // to check if mobile view is triggered or not

  // mobileBreakpoint is required to be passed down to a seed
  return (
    <Seed
      mobileBreakpoint={breakpoint}
      style={{
        fontSize: 12,
      }}
    >
      <SeedItem
        style={{
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="text-xs bg-slate-800 py-2 rounded-t text-white mb-1">
          {seed.date
            ? new Date(seed.date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "No Date"}
        </div>

        <div className="p-2 flex flex-col gap-2">
          <SeedTeam
            style={{
              fontSize: 12,
              padding: "0.5rem",
              borderRadius: "0.375rem",
              borderLeft: `4px solid ${
                seed.teams[0].id === seed.winner
                  ? "oklch(62.7% 0.194 149.214)"
                  : "#cad5e2"
              }`,
              backgroundColor:
                seed.teams[0].id === seed.winner ? "#f0fdf4" : "#f8fafc",
              color: seed.teams[0].id === seed.winner ? "#065f46" : "#334155",
            }}
          >
            <span>
              {seed.teams[0]?.name || "NO TEAM "}{" "}
              <span className="text-[10px] text-slate-500">
                ({seed.teams[0].id})
              </span>
            </span>

            {seed.teams[0].id === seed.winner && (
              <Crown className="size-4 text-yellow-400" />
            )}
          </SeedTeam>
          <p className="text-slate-500 text-xs text-[10px]">VS</p>
          <SeedTeam
            style={{
              fontSize: 12,
              padding: "0.5rem",
              borderRadius: "0.375rem",
              borderLeft: `4px solid ${
                seed.teams[1].id === seed.winner
                  ? "oklch(62.7% 0.194 149.214)"
                  : "#cad5e2"
              }`,
              backgroundColor:
                seed.teams[1].id === seed.winner ? "#f0fdf4" : "#f8fafc",
              color: seed.teams[1].id === seed.winner ? "#065f46" : "#334155",
            }}
          >
            <span>
              {seed.teams[1]?.name || "NO TEAM "}{" "}
              <span className="text-[10px] text-slate-500">
                ({seed.teams[1].id})
              </span>
            </span>
            {seed.teams[1].id === seed.winner && (
              <Crown className="size-4 text-yellow-400" />
            )}
          </SeedTeam>
        </div>
        <div className="py-2 text-xs border-t mx-4 border-slate-200 text-slate-500 text-center pt-1">
          Win by: {seed.winMethod}
        </div>
      </SeedItem>
    </Seed>
  );
};

export default CustomSeed;
