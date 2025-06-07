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
import { exportAllPembayaran } from "@/libs/export-excel-laporan-pembayaran";

const DashboardLaporanPembayaranFeature = () => {
  const { data, isLoading } = useGetAllPartisipan();

  return (
    <main>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Laporan Pembayaran</h2>
            <Button
              onClick={() => exportAllPembayaran(data?.data)}
              variant="outline"
              className="cursor-pointer"
            >
              Cetak
            </Button>
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
