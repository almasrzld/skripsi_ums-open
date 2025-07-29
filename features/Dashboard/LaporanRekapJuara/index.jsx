"use client";

import useGetBagan from "@/hook/useGetBagan";
import {
  calculateWinners,
  remapCompetitionDataByCategoryEnhanced,
} from "@/libs/bagan-utils";
import { useEffect, useState } from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Trophy, Medal, Award, Users, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { Download } from "lucide-react";

const DashboardLaporanRekapJuaraFeature = () => {
  const [remappingData, setIsRemappingData] = useState([]);
  const { data, isLoading } = useGetBagan();
  const [winnerData, setWinnerData] = useState([]);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    if (data?.data) {
      const categoriesData = remapCompetitionDataByCategoryEnhanced(data.data);
      setIsRemappingData(categoriesData.data);
      const winner = calculateWinners(categoriesData.data);
      setWinnerData(winner);
    }
  }, [data]);

  useEffect(() => {
    setAnimateCards(true);
  }, []);

  const exportCategoryToPDF = (category) => {
    const doc = new jsPDF("p", "pt", "a4");

    doc.setFontSize(16);
    doc.text(`Rekap Juara - ${category.categories}`, 40, 40);

    const tableData = ["winner1", "winner2", "winner3"].map((key, index) => {
      const juaraKe = index + 1;
      const winner = category.winners?.[key];
      const points = juaraKe === 1 ? 3 : juaraKe === 2 ? 2 : 1;

      return [
        `Juara ${juaraKe} (${points}p)`,
        winner?.name || "-",
        winner?.id || "-",
        winner?.institution || "-",
      ];
    });

    autoTable(doc, {
      startY: 60,
      head: [["Juara", "Nama", "ID", "Institusi"]],
      body: tableData,
      theme: "grid",
      headStyles: { fillColor: [62, 193, 211] },
      styles: { fontSize: 10, cellPadding: 4 },
    });

    doc.save(`Rekap_Juara_${category.categories}.pdf`);
  };

  const exportAllToPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");

    remappingData.forEach((category, idx) => {
      if (idx !== 0) doc.addPage();

      doc.setFontSize(16);
      doc.text(`Rekap Juara - ${category.categories}`, 40, 40);

      const tableData = ["winner1", "winner2", "winner3"].map((key, index) => {
        const juaraKe = index + 1;
        const winner = category.winners?.[key];
        const points = juaraKe === 1 ? 3 : juaraKe === 2 ? 2 : 1;

        return [
          `Juara ${juaraKe} (${points}p)`,
          winner?.name || "-",
          winner?.id || "-",
          winner?.institution || "-",
        ];
      });

      autoTable(doc, {
        startY: 60,
        head: [["Juara", "Nama", "ID", "Institusi"]],
        body: tableData,
        theme: "grid",
        headStyles: { fillColor: [62, 193, 211] },
        styles: { fontSize: 10, cellPadding: 4 },
      });
    });

    doc.save(`Rekap_Juara_Semua_Kategori.pdf`);
  };

  const exportSummaryToPDF = () => {
    const doc = new jsPDF("l", "pt", "a4");

    doc.setFontSize(16);
    doc.text("Rekap Juara - Summary", 40, 40);

    const body = [];
    remappingData.forEach((category) => {
      ["winner1", "winner2", "winner3"].forEach((key, index) => {
        const juaraKe = index + 1;
        const winner = category.winners?.[key];
        const points = juaraKe === 1 ? 3 : juaraKe === 2 ? 2 : 1;

        body.push([
          category.categories,
          `Juara ${juaraKe}`,
          winner?.name || "-",
          winner?.id || "-",
          winner?.institution || "-",
          `${points}p`,
        ]);
      });
    });

    autoTable(doc, {
      startY: 60,
      head: [["Kategori", "Juara", "Nama", "ID", "Institusi", "Poin"]],
      body,
      theme: "grid",
      headStyles: { fillColor: [62, 193, 211] },
      styles: { fontSize: 8, cellPadding: 3 },
    });

    // Tambah halaman untuk ringkasan institusi
    doc.addPage();
    doc.setFontSize(14);
    doc.text("Rekap Pemenang Per Institusi", 40, 40);

    const summaryBody = winnerData.map((item) => [
      item.institution,
      item.points,
      item.details.totalWinners,
      item.details.achievements
        .map((ach) => ach.category.replace("_", " "))
        .join(", "),
      item.details.achievements
        .map((ach) => `${ach.winner} (${ach.position})`)
        .join(", "),
      Math.max(...item.details.achievements.map((ach) => ach.points)),
    ]);

    autoTable(doc, {
      startY: 60,
      head: [
        [
          "Institusi",
          "Poin",
          "Total Pemenang",
          "Kategori",
          "Rincian",
          "Poin Tertinggi",
        ],
      ],
      body: summaryBody,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [62, 193, 211] },
      theme: "grid",
    });

    doc.save(`Rekap_Juara_Summary.pdf`);
  };

  const getMedalIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-500" />;
      case 3:
        return <Award className="w-8 h-8 text-amber-600" />;
      default:
        return <Users className="w-8 h-8 text-blue-500" />;
    }
  };

  const getPositionLabel = (position) => {
    switch (position) {
      case 1:
        return "Juara 1";
      case 2:
        return "Juara 2";
      case 3:
        return "Juara 3";
      default:
        return `Posisi ${position}`;
    }
  };

  if (isLoading && remappingData.length < 1) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin size-8 mx-auto text-slate-800" />
      </div>
    );
  }

  return (
    <main className="space-y-10">
      <div className="min-h-screen ">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Trophy className="w-12 h-12 text-yellow-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Laporan Rekap Juara
              </h1>
            </div>
            <p className="text-gray-600 text-lg">
              Sistem Poin: Juara 1 = 3 poin • Juara 2 = 2 poin • Juara 3 = 1
              poin
            </p>
            <div className="flex justify-center items-center gap-2 mt-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4" />
              <span>Total {winnerData.length} Institusi Berpartisipasi</span>
            </div>
          </div>

          {/* Podium untuk Top 3 */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Podium Juara Umum
            </h2>
            <div className="flex justify-center items-end gap-8 mb-8">
              {/* Juara 2 */}
              {winnerData[1] && (
                <div
                  className={`bg-gradient-to-t from-gray-300 to-gray-100 rounded-t-lg p-6 text-center transform transition-all duration-1000 ${
                    animateCards
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ height: "200px", width: "180px" }}
                >
                  <div className="flex justify-center mb-3">
                    <Medal className="w-12 h-12 text-gray-500" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    Juara 2
                  </h3>
                  <p className="text-sm font-semibold text-gray-700 leading-tight mb-2">
                    {winnerData[1].institution}
                  </p>
                  <div className="bg-white rounded-full px-3 py-1 text-sm font-bold text-gray-600">
                    {winnerData[1].points} poin
                  </div>
                </div>
              )}

              {/* Juara 1 */}
              {winnerData[0] && (
                <div
                  className={`bg-gradient-to-t from-yellow-400 to-yellow-200 rounded-t-lg p-6 text-center transform transition-all duration-1000 delay-300 ${
                    animateCards
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ height: "250px", width: "200px" }}
                >
                  <div className="flex justify-center mb-3">
                    <Trophy className="w-16 h-16 text-yellow-600" />
                  </div>
                  <h3 className="font-bold text-xl text-yellow-800 mb-2">
                    Juara 1
                  </h3>
                  <p className="text-sm font-semibold text-yellow-700 leading-tight mb-3">
                    {winnerData[0].institution}
                  </p>
                  <div className="bg-white rounded-full px-4 py-2 text-lg font-bold text-yellow-600">
                    {winnerData[0].points} poin
                  </div>
                </div>
              )}

              {/* Juara 3 */}
              {winnerData[2] && (
                <div
                  className={`bg-gradient-to-t from-amber-600 to-amber-300 rounded-t-lg p-6 text-center transform transition-all duration-1000 delay-150 ${
                    animateCards
                      ? "translate-y-0 opacity-100"
                      : "translate-y-10 opacity-0"
                  }`}
                  style={{ height: "180px", width: "170px" }}
                >
                  <div className="flex justify-center mb-3">
                    <Award className="w-10 h-10 text-amber-700" />
                  </div>
                  <h3 className="font-bold text-lg text-amber-800 mb-2">
                    Juara 3
                  </h3>
                  <p className="text-sm font-semibold text-amber-700 leading-tight mb-2">
                    {winnerData[2].institution}
                  </p>
                  <div className="bg-white rounded-full px-3 py-1 text-sm font-bold text-amber-600">
                    {winnerData[2].points} poin
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Ranking Lengkap */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Ranking Lengkap
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {winnerData.map((item, index) => {
                const rank = index + 1;
                return (
                  <div
                    key={item.institution}
                    className={`bg-white rounded-xl shadow-lg p-6 border-l-4 transform transition-all duration-300  hover:shadow-xl ${
                      animateCards
                        ? "translate-y-0 opacity-100"
                        : "translate-y-10 opacity-0"
                    }`}
                    style={{
                      borderLeftColor:
                        rank <= 3
                          ? rank === 1
                            ? "#fbbf24"
                            : rank === 2
                            ? "#9ca3af"
                            : "#d97706"
                          : "#3b82f6",
                      transitionDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getMedalIcon(rank)}
                        <span className="text-2xl font-bold text-gray-700">
                          #{rank}
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {item.points} poin
                      </div>
                    </div>

                    <h3 className="font-bold text-lg text-gray-800 mb-4 leading-tight">
                      {item.institution}
                    </h3>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span>Total Pemenang:</span>
                        <span className="font-semibold">
                          {item.details.totalWinners}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {item.details.achievements.map((achievement, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-xs font-medium text-gray-500">
                                {achievement.category
                                  .replace("_", " ")
                                  .toLowerCase()
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full font-medium ${
                                  achievement.position === 1
                                    ? "bg-yellow-100 text-yellow-800"
                                    : achievement.position === 2
                                    ? "bg-gray-100 text-gray-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {getPositionLabel(achievement.position)} (+
                                {achievement.points}p)
                              </span>
                            </div>
                            <p className="text-sm font-medium text-gray-700">
                              {achievement.winner}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Statistik Tournament */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Statistik Tournament
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {winnerData.length}
                </div>
                <div className="text-sm text-gray-600">Total Institusi</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {remappingData.length}
                </div>
                <div className="text-sm text-gray-600">Total Kategori</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {winnerData.reduce(
                    (sum, item) => sum + item.details.totalWinners,
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600">Total Pemenang</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.max(...winnerData.map((item) => item.points))}
                </div>
                <div className="text-sm text-gray-600">Poin Tertinggi</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-xl  mb-2">Data Table</p>
          <div className="flex gap-2">
            <Button
              onClick={exportSummaryToPDF}
              variant="update"
              className="cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Cetak Laporan
            </Button>
            <Button
              onClick={exportAllToPDF}
              variant="secondary"
              className="cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Cetak Semua Kategori
            </Button>
          </div>
        </div>
        {remappingData.map((category) => (
          <Card key={category.categories} className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Rekap Juara - {category.categories}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2 cursor-pointer"
                  onClick={() => exportCategoryToPDF(category)}
                >
                  <FileSpreadsheet className="w-4 h-4 mr-1" />
                  Cetak
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Juara</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Institusi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {["winner1", "winner2", "winner3"].map((key, index) => {
                    const juaraKe = index + 1;
                    const winner = category.winners?.[key];

                    return (
                      <TableRow key={key}>
                        <TableCell>
                          Juara {juaraKe}{" "}
                          <span className="text-xs ">
                            ({juaraKe === 1 ? 3 : juaraKe === 2 ? 2 : 1}p)
                          </span>
                        </TableCell>
                        <TableCell>{winner?.name || "-"}</TableCell>
                        <TableCell>{winner?.id || "-"}</TableCell>
                        <TableCell>{winner?.institution || "-"}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default DashboardLaporanRekapJuaraFeature;
