"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TableRow, TableCell } from "../ui/table";
import { toast } from "sonner";
import useDashboardUpdateBaganPertandingan from "@/features/Dashboard/UpdateBaganPertandingan/hook/usePatchBaganPeserta";

const winMethods = ["POINTS", "KO", "WO", "DRAW"];

const MatchRow = ({ match, onSuccess }) => {
  const [score1, setScore1] = useState(match.score1 ?? 0);
  const [score2, setScore2] = useState(match.score2 ?? 0);
  const [winner, setWinner] = useState(match.winner ?? "");
  const [winMethod, setWinMethod] = useState(match.win_method ?? "POINTS");

  const updateMutation = useDashboardUpdateBaganPertandingan();

  const handleUpdate = () => {
    if (!winner) {
      toast.error("Pilih pemenang terlebih dahulu");
      return;
    }

    if (winMethod === "POINTS" && score1 === 0 && score2 === 0) {
      toast.error("Skor tidak boleh 0 - 0 jika metode menang adalah POINTS");
      return;
    }

    updateMutation.mutate(
      {
        id: match.id,
        payload: {
          score1,
          score2,
          winner,
          win_method: winMethod,
          status: "COMPLETED",
        },
      },
      {
        onSuccess: () => {
          onSuccess?.();
        },
      }
    );
  };

  const autoSetWinner = (newScore1, newScore2) => {
    if (winMethod !== "POINTS") return;

    if (newScore1 > newScore2) {
      setWinner(match.participant1 ?? "");
    } else if (newScore2 > newScore1) {
      setWinner(match.participant2 ?? "");
    } else {
      setWinner("");
    }
  };

  const handleScore1 = (value) => {
    setScore1(value);
    autoSetWinner(value, score2);
  };

  const handleScore2 = (value) => {
    setScore2(value);
    autoSetWinner(score1, value);
  };

  const loading = updateMutation.isPending;

  return (
    <TableRow>
      <TableCell className="font-medium">{match.round}</TableCell>
      <TableCell>{match.participant1 || "-"}</TableCell>
      <TableCell>
        <Input
          type="number"
          value={score1}
          onChange={(e) => handleScore1(+e.target.value)}
          className="w-20"
        />
      </TableCell>
      <TableCell className="text-center">vs</TableCell>
      <TableCell>
        <Input
          type="number"
          value={score2}
          onChange={(e) => handleScore2(+e.target.value)}
          className="w-20"
        />
      </TableCell>
      <TableCell>{match.participant2 || "-"}</TableCell>
      <TableCell>
        <Select value={winMethod} onValueChange={setWinMethod}>
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {winMethods.map((method) => (
              <SelectItem key={method} value={method}>
                {method}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <RadioGroup
          value={winner}
          onValueChange={setWinner}
          className="flex gap-2 items-center"
        >
          {match.participant1 && (
            <div className="flex items-center space-x-1">
              <RadioGroupItem value={match.participant1} id={`${match.id}-1`} />
              <label htmlFor={`${match.id}-1`}>1</label>
            </div>
          )}
          {match.participant2 && (
            <div className="flex items-center space-x-1">
              <RadioGroupItem value={match.participant2} id={`${match.id}-2`} />
              <label htmlFor={`${match.id}-2`}>2</label>
            </div>
          )}
        </RadioGroup>
      </TableCell>
      <TableCell>
        <Button
          className="cursor-pointer"
          variant="update"
          size="sm"
          onClick={handleUpdate}
          disabled={loading || match.status === "COMPLETED"}
        >
          {loading ? "Menyimpan..." : "Update"}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default MatchRow;
