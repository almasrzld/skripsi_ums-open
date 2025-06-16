import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export const exportMatchReportByCategory = async (categoryName, roundData) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(`Pertandingan - ${categoryName}`);

  worksheet.columns = [
    { header: "Tanggal", key: "date", width: 15 },
    { header: "Peserta 1", key: "peserta1", width: 25 },
    { header: "Skor", key: "skor", width: 10 },
    { header: "Peserta 2", key: "peserta2", width: 25 },
    { header: "Pemenang", key: "pemenang", width: 25 },
    { header: "Metode Menang", key: "metode", width: 20 },
    { header: "Status", key: "status", width: 15 },
  ];

  roundData.forEach((round) => {
    worksheet.addRow({});
    worksheet.addRow({ peserta1: `Babak: ${round.title}` }).font = {
      bold: true,
    };

    round.seeds.forEach((match) => {
      const skor1 = match.teams[0].score === "-" ? 0 : match.teams[0].score;
      const skor2 = match.teams[1].score === "-" ? 0 : match.teams[1].score;

      worksheet.addRow({
        date: match.date
          ? format(new Date(match.date), "dd MMM yyyy", { locale: id })
          : "Belum Ditentukan",
        peserta1: match.teams[0].name,
        skor: `${skor1} - ${skor2}`,
        peserta2: match.teams[1].name,
        pemenang: match.winner,
        metode: match.winMethod,
        status: match.status,
      });
    });
  });

  worksheet.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `laporan-hasil-pertandingan-${categoryName}.xlsx`);
};
