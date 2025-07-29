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
import { RefreshCcw } from "lucide-react";
import useResetMatch from "@/hook/useResetMatch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const winMethods = ["POINTS", "KO", "WO", "DRAW"];

const MatchRow = ({ match, onSuccess }) => {
  const [score1, setScore1] = useState(match.score1 ?? 0);
  const [score2, setScore2] = useState(match.score2 ?? 0);
  const [winner, setWinner] = useState(match.winner ?? "");
  const [winMethod, setWinMethod] = useState(match.win_method ?? "POINTS");
  const [isUpdated, setIsUpdated] = useState(false);

  const updateMutation = useDashboardUpdateBaganPertandingan();
  const { mutate, isPending } = useResetMatch();

  const handleUpdate = () => {
    if (winMethod !== "DRAW" && !winner) {
      toast.error("Pilih pemenang terlebih dahulu");
      return;
    }

    if (winMethod === "POINTS" && score1 === 0 && score2 === 0) {
      toast.error("Skor tidak boleh 0 - 0 jika metode menang adalah POINTS");
      return;
    }

    const status = winMethod === "DRAW" ? "ONGOING" : "COMPLETED";

    updateMutation.mutate(
      {
        id: match.id,
        payload: {
          score1,
          score2,
          winner: winMethod === "DRAW" ? null : winner,
          win_method: winMethod,
          status,
        },
      },
      {
        onSuccess: () => {
          onSuccess?.();
          if (!isDraw) setIsUpdated(true);
        },
      }
    );
  };

  const autoSetWinner = (newScore1, newScore2) => {
    if (newScore1 === newScore2) {
      setWinMethod("DRAW");
      setWinner("");
    } else {
      setWinMethod("POINTS");
      if (newScore1 > newScore2) {
        setWinner(match.participant1 ?? "");
      } else {
        setWinner(match.participant2 ?? "");
      }
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
  const isDraw = score1 === score2 && winMethod === "DRAW";
  const isCompleted = match.status === "COMPLETED";

  return (
    <TableRow>
      <TableCell className="font-medium">
        {match.isThirdPlace ? "Third Place" : match.round}
      </TableCell>
      <TableCell>{match.participant1 || "-"}</TableCell>
      <TableCell>
        <Input
          type="number"
          value={score1}
          onChange={(e) => handleScore1(+e.target.value)}
          className="w-20"
        />
      </TableCell>
      <TableCell>vs</TableCell>
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
          disabled={winMethod === "DRAW"}
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
      <TableCell className="w-28">
        <div className="flex items-center gap-2">
          <Button
            className="cursor-pointer"
            variant="update"
            size="sm"
            onClick={handleUpdate}
            disabled={!isDraw && (loading || isUpdated || isCompleted)}
          >
            {loading ? "Menyimpan..." : "Update"}
          </Button>
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  className="cursor-pointer"
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    mutate(match.id, {
                      onSuccess: () => {
                        setScore1(0);
                        setScore2(0);
                        setWinner("");
                        setWinMethod("POINTS");

                        onSuccess?.();
                      },
                    });
                  }}
                  disabled={isPending}
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Reset Pertandingan</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default MatchRow;
