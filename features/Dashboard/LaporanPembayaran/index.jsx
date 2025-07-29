"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetAllPartisipan from "../LaporanPendaftaran/hook/useGetAllPartisipan";
import { exportAllPembayaran } from "@/libs/export-pdf-laporan-pembayaran";
import useDashboardPartisipanFeature from "../Partisipan/hook";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const DashboardLaporanPembayaranFeature = () => {
  const { status, setStatus } = useDashboardPartisipanFeature();
  const { data, isLoading } = useGetAllPartisipan(status);

  return (
    <main>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Laporan Pembayaran</h2>
            <span className="flex items-center gap-4">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Filter Status Bayar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Semua</SelectItem>
                  <SelectItem value="PAID">Lunas</SelectItem>
                  <SelectItem value="PENDING_PAYMENT">Pending</SelectItem>
                  <SelectItem value="CANCELED">Dibatalkan</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={() => exportAllPembayaran(data?.data)}
                variant="outline"
                className="cursor-pointer"
              >
                Cetak
              </Button>
            </span>
          </div>

          <ScrollArea className="rounded border h-[68vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>No HP</TableHead>
                  <TableHead>No Order</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.data?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground"
                    >
                      {data?.message ?? "Data tidak ditemukan."}
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.data?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.user_kode}</TableCell>
                      <TableCell>{item.user_name}</TableCell>
                      <TableCell>{item.user_email}</TableCell>
                      <TableCell>{item.user_phone}</TableCell>
                      <TableCell>{item.orderId}</TableCell>
                      <TableCell>{item.status}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  );
};

export default DashboardLaporanPembayaranFeature;
