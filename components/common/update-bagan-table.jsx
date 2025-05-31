import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MatchRow from "./update-bagan-row";

const MatchTable = ({ matches, onSuccess }) => {
  return (
    <div className="overflow-x-auto border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Round</TableHead>
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
    </div>
  );
};

export default MatchTable;
