import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const exportMatchReportByCategory = async (categoryName, roundData) => {
  if (!roundData || roundData.length === 0) return;

  const doc = new jsPDF("l", "pt", "a4");
  doc.setFontSize(18);
  doc.text(`Laporan Hasil Pertandingan - ${categoryName}`, 40, 40);

  let startY = 70;

  roundData.forEach((round, roundIndex) => {
    doc.setFontSize(14);
    doc.text(`${round.title}`, 40, startY);
    startY += 10;

    const head = [
      [
        "Tanggal",
        "Peserta 1",
        "Skor",
        "Peserta 2",
        "Pemenang",
        "Metode Menang",
        "Status",
      ],
    ];

    const body = round.seeds.map((match) => {
      const skor1 = match.teams[0].score === "-" ? 0 : match.teams[0].score;
      const skor2 = match.teams[1].score === "-" ? 0 : match.teams[1].score;

      return [
        match.date
          ? format(new Date(match.date), "dd MMM yyyy", { locale: id })
          : "Belum Ditentukan",
        match.teams[0].name,
        `${skor1} - ${skor2}`,
        match.teams[1].name,
        match.winner || "-",
        match.winMethod || "-",
        match.status || "-",
      ];
    });

    autoTable(doc, {
      startY: startY + 5,
      head,
      body,
      styles: { fontSize: 8, cellPadding: 4 },
      headStyles: { fillColor: [62, 193, 211] },
      theme: "grid",
      columnStyles: {
        0: { cellWidth: 60 },
        1: { cellWidth: 120 },
        2: { cellWidth: 40 },
        3: { cellWidth: 120 },
        4: { cellWidth: 100 },
        5: { cellWidth: 80 },
        6: { cellWidth: 60 },
      },
    });

    startY = doc.lastAutoTable.finalY + 30;
    if (
      startY > doc.internal.pageSize.height - 80 &&
      roundIndex < roundData.length - 1
    ) {
      doc.addPage();
      startY = 40;
    }
  });

  doc.save(`laporan-hasil-pertandingan-${categoryName}.pdf`);
};
