import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "../ui/scroll-area";
import MatchRow from "./update-bagan-row";

const MatchTable = ({ matches, onSuccess }) => {
  return (
    <ScrollArea className="h-[66vh] pr-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Babak</TableHead>
            <TableHead>Peserta 1</TableHead>
            <TableHead>Skor 1</TableHead>
            <TableHead></TableHead>
            <TableHead>Skor 2</TableHead>
            <TableHead>Peserta 2</TableHead>
            <TableHead>Metode</TableHead>
            <TableHead>Pemenang</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <MatchRow key={match.id} match={match} onSuccess={onSuccess} />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default MatchTable;
