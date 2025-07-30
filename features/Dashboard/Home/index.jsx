"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGetStatistik from "@/hook/useGetStatistik";
import useGetBagan from "@/hook/useGetBagan";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useGetInstitutionStatistik from "./hook/useGetInstitution";

const DashboardHomeFeature = () => {
  const { data: statistik, isLoading: loadingStatistik } = useGetStatistik();
  const { data: baganData, isLoading: loadingBagan } = useGetBagan();
  const { data: institutionStat, isLoading: loadingInstitutionStat } =
    useGetInstitutionStatistik();

  const formattedDate = format(new Date(), "dd • MMMM • yyyy", { locale: id });

  const allMatches =
    baganData?.data?.flatMap((category) => category.matches) || [];

  const totalMatch = allMatches.length;
  const completedMatch = allMatches.filter(
    (m) => m.status === "COMPLETED"
  ).length;
  const pendingMatch = totalMatch - completedMatch;

  const chartData = [
    { name: "Selesai", value: completedMatch },
    { name: "Belum", value: pendingMatch },
  ];

  const COLORS = ["#16a34a", "#f59e0b"];

  return (
    <main>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">Dashboard Admin</h1>
        <p className="text-muted-foreground text-sm">{formattedDate}</p>
      </div>

      <Separator className="my-4" />
      <ScrollArea className="h-[75vh] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Peserta</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {loadingStatistik ? "..." : statistik?.participants}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kategori</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">
                {loadingStatistik ? "..." : statistik?.categories}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pertandingan</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Total:{" "}
                <span className="font-bold">
                  {loadingBagan ? "..." : totalMatch}
                </span>
              </p>
              <p className="text-muted-foreground text-sm">
                Selesai: {loadingBagan ? "..." : completedMatch}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Institusi dengan Peserta Terbanyak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                {!loadingInstitutionStat && institutionStat?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={institutionStat}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10 }}
                        interval={0}
                        angle={-25}
                        textAnchor="end"
                      />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3EC1D3" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-muted-foreground mt-12">
                    {loadingInstitutionStat
                      ? "Memuat grafik institusi..."
                      : "Tidak ada data institusi"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Visualisasi Pertandingan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {!loadingBagan && totalMatch > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground text-center mt-12">
                    {!loadingBagan
                      ? "Belum ada data pertandingan."
                      : "Memuat grafik..."}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </main>
  );
};

export default DashboardHomeFeature;
