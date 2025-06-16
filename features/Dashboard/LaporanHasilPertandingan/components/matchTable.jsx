import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/libs/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { exportMatchReportByCategory } from "@/libs/export-excel-laporan-hasil-pertandingan";
import { Button } from "@/components/ui/button";

export function MatchReportTable({ data }) {
  return (
    <div className="space-y-10">
      {data.map((category) => (
        <div key={category.categories} className="border py-3 px-4 rounded-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-4">
              Laporan Hasil Pertandingan - {category.categories}
            </h2>
            <Button
              onClick={() =>
                exportMatchReportByCategory(category.categories, category.data)
              }
              variant="update"
              className="cursor-pointer"
            >
              Cetak
            </Button>
          </div>

          {category.data.map((round) => (
            <div key={round.title} className="mb-8">
              <h3 className="text-lg font-medium mb-2">{round.title}</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-40">Tanggal</TableHead>
                      <TableHead>Peserta 1</TableHead>
                      <TableHead className="text-center">Skor</TableHead>
                      <TableHead>Peserta 2</TableHead>
                      <TableHead>Pemenang</TableHead>
                      <TableHead>Metode Menang</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {round.seeds.map((match, idx) => {
                      const nonValid1 = match.teams[0].score === "-";
                      const nonValid2 = match.teams[1].score === "-";

                      // if nonvalid make "-" into 0
                      if (nonValid1) {
                        match.teams[0].score = 0;
                      }
                      if (nonValid2) {
                        match.teams[1].score = 0;
                      }

                      return (
                        <TableRow key={idx}>
                          <TableCell>
                            {match.date
                              ? format(new Date(match.date), "dd MMM yyyy", {
                                  locale: id,
                                })
                              : "Belum Ditentukan"}
                          </TableCell>
                          <TableCell>{match.teams[0].name}</TableCell>
                          <TableCell className="text-center">
                            <span
                              className={cn(
                                match.teams[0].score > match.teams[1].score
                                  ? "text-green-700"
                                  : "text-red-700",

                                match.teams[0].score === match.teams[1].score
                                  ? "text-yellow-700"
                                  : ""
                              )}
                            >
                              {match.teams[0].score}
                            </span>{" "}
                            -{" "}
                            <span
                              className={cn(
                                match.teams[1].score > match.teams[0].score
                                  ? "text-green-700"
                                  : "text-red-700",

                                match.teams[1].score === match.teams[0].score
                                  ? "text-yellow-700"
                                  : ""
                              )}
                            >
                              {match.teams[1].score}
                            </span>
                          </TableCell>
                          <TableCell>{match.teams[1].name}</TableCell>
                          <TableCell>{match.winner}</TableCell>
                          <TableCell>{match.winMethod}</TableCell>
                          <TableCell>{match.status}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
