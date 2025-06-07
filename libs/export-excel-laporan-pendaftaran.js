import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportAllParticipants = async (participants) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Laporan Pendaftaran");

  worksheet.columns = [
    { header: "No", key: "no", width: 5 },
    { header: "Kode", key: "user_kode", width: 15 },
    { header: "Nama", key: "user_name", width: 25 },
    { header: "Email", key: "user_email", width: 35 },
    { header: "No HP", key: "user_phone", width: 15 },
    { header: "Kategori", key: "user_category", width: 20 },
    { header: "Foto", key: "photo", width: 45 },
    { header: "Institusi", key: "user_institution", width: 35 },
    { header: "Tanggal Daftar", key: "createdAt", width: 15 },
  ];

  participants.forEach((item, index) => {
    const row = worksheet.addRow({
      no: index + 1,
      user_kode: item.user_kode,
      user_name: item.user_name,
      user_email: item.user_email,
      user_phone: item.user_phone,
      user_category: item.user_category,
      user_institution: item.user_institution,
      createdAt: new Date(item.createdAt).toLocaleDateString("id-ID"),
    });

    const fotoCell = row.getCell("photo");
    fotoCell.value = {
      text: item.photo,
      hyperlink: item.photo,
    };
    fotoCell.font = { color: { argb: "FF0000FF" }, underline: true };
  });

  worksheet.getRow(1).font = { bold: true };
  worksheet.columns.forEach((column) => {
    column.alignment = { vertical: "middle", horizontal: "left" };
  });

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "laporan-pendaftaran.xlsx");
};
