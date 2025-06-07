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
import useGetAllPartisipan from "./hook/useGetAllPartisipan";
import { exportAllParticipants } from "@/libs/export-excel-laporan-pendaftaran";

const DashboardLaporanPendaftaranFeature = () => {
  const { data, isLoading } = useGetAllPartisipan();

  return (
    <main>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Laporan Pendaftaran</h2>
            <Button
              onClick={() => exportAllParticipants(data?.data)}
              variant="outline"
              className="cursor-pointer"
            >
              Cetak
            </Button>
          </div>

          <ScrollArea className="rounded border h-[68vh] pr-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>No HP</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Foto</TableHead>
                  <TableHead>Institusi</TableHead>
                  <TableHead>Tanggal Daftar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center">
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
                      <TableCell>{item.user_category}</TableCell>
                      <TableCell className="max-w-[100px] truncate">
                        <a
                          href={item.photo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                          title={item.photo}
                        >
                          {item.photo.slice(0, 10)}...
                        </a>
                      </TableCell>
                      <TableCell>{item.user_institution}</TableCell>
                      <TableCell>
                        {new Date(item.createdAt).toLocaleDateString("id-ID")}
                      </TableCell>
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

export default DashboardLaporanPendaftaranFeature;
