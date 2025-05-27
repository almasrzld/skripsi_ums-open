"use client";

import { Crown } from "lucide-react";

const { Seed, SeedItem, SeedTeam } = require("@pawix/react-brackets");

const CustomSeed = ({ seed, breakpoint }) => {
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
      </SeedItem>
    </Seed>
  );
};

export default CustomSeed;
