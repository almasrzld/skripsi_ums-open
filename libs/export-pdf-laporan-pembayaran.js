import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportAllPembayaran = async (participants) => {
  if (!participants || participants.length === 0) return;

  const doc = new jsPDF("l", "pt", "a4");

  doc.setFontSize(18);
  doc.text("Laporan Pembayaran", 40, 40);

  const head = [["No", "Kode", "Nama", "Email", "No HP", "No Order", "Status"]];

  const body = participants.map((item, index) => [
    index + 1,
    item.user_kode,
    item.user_name,
    item.user_email,
    item.user_phone,
    item.orderId,
    item.status,
  ]);

  autoTable(doc, {
    startY: 60,
    head,
    body,
    styles: { fontSize: 8, cellPadding: 4 },
    headStyles: { fillColor: [62, 193, 211] },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 80 },
      2: { cellWidth: 100 },
      3: { cellWidth: 120 },
      4: { cellWidth: 80 },
      5: { cellWidth: 100 },
      6: { cellWidth: 60 },
    },
  });

  doc.save("laporan-pembayaran.pdf");
};
