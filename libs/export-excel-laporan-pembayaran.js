import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportAllPembayaran = async (participants) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Laporan Pendaftaran");

  worksheet.columns = [
    { header: "No", key: "no", width: 5 },
    { header: "Kode", key: "user_kode", width: 15 },
    { header: "Nama", key: "user_name", width: 25 },
    { header: "Email", key: "user_email", width: 25 },
    { header: "No HP", key: "user_phone", width: 15 },
    { header: "No Order", key: "orderId", width: 25 },
    { header: "Status", key: "status", width: 18 },
  ];

  participants.forEach((item, index) => {
    worksheet.addRow({
      no: index + 1,
      ...item,
    });
  });

  worksheet.getRow(1).font = { bold: true };
  worksheet.columns.forEach((column) => {
    column.alignment = { vertical: "middle", horizontal: "left" };
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "laporan-pembayaran.xlsx");
};
