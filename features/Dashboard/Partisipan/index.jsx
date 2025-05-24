"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useDashboardPartisipanFeature from "./hook";
import useGetPartisipanDetails from "../PartisipanDetails/hook/useGetPartisipanDetails";
import { ArrowLeft, ArrowRight } from "lucide-react";
import DashboardPartisipanDetailsFeature from "@/features/Dashboard/PartisipanDetails";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import useParticipantLabels from "../PartisipanDetails/hook";

const DashboardPartisipanFeature = () => {
  const { page, setPage, limit, search, setSearch, value, status, setStatus } =
    useDashboardPartisipanFeature();
  const { getCategoryLabel } = useParticipantLabels();

  const { data, isLoading } = useGetPartisipanDetails(
    page,
    limit,
    value,
    status
  );

  const participants = data?.data || [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const currentPage = data?.pagination?.page ?? 1;

  return (
    <main className="p-5">
      <Card>
        <CardContent className="p-4 h-[74vh]">
          <h2 className="text-xl font-semibold mb-5">Daftar Partisipan</h2>
          <div className="flex justify-between items-center mb-5">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama partisipan"
              className="w-[300px]"
            />
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Status Bayar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Semua</SelectItem>
                <SelectItem value="PAID">Lunas</SelectItem>
                <SelectItem value="PENDING_PAYMENT">Pending</SelectItem>
                <SelectItem value="CANCELED">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className="w-full h-[calc(100%-150px)] rounded-md border p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Institusi</TableHead>
                  <TableHead>No HP</TableHead>
                  <TableHead>Status Bayar</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow key="loading">
                    <TableCell colSpan={6} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : participants.length === 0 ? (
                  <TableRow key="no-data">
                    <TableCell colSpan={6} className="text-center">
                      Tidak ada data ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  participants.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.user_name}</TableCell>
                      <TableCell>{getCategoryLabel(p.user_category)}</TableCell>
                      <TableCell>{p.user_institution}</TableCell>
                      <TableCell>{p.user_phone}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            p.status === "PAID"
                              ? "default"
                              : p.status === "PENDING_PAYMENT"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {p.status === "PAID"
                            ? "Lunas"
                            : p.status === "PENDING_PAYMENT"
                            ? "Pending"
                            : "Dibatalkan"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Lihat
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogTitle>Detail Partisipan</DialogTitle>
                            <DashboardPartisipanDetailsFeature id={p.id} />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                disabled={currentPage === 1 || isLoading}
                onClick={() => setPage(page - 1)}
                variant="secondary"
                className="cursor-pointer"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <p>Previous Page</p>
              </Button>
              <Button
                disabled={totalPages === page || isLoading}
                onClick={() => setPage((prev) => prev + 1)}
                variant="secondary"
                className="cursor-pointer"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                <p>Next Page</p>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default DashboardPartisipanFeature;
