import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportAllParticipants = async (participants) => {
  if (!participants || participants.length === 0) return;

  const doc = new jsPDF("l", "pt", "a4");

  const grouped = participants.reduce((acc, item) => {
    const category = item.user_category || "Tanpa Kategori";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  let firstPage = true;

  for (const [category, items] of Object.entries(grouped)) {
    if (!firstPage) doc.addPage();
    firstPage = false;

    doc.setFontSize(18);
    doc.text(`Laporan Pendaftaran - ${category}`, 40, 40);

    const tableData = items.map((item, index) => [
      index + 1,
      item.user_kode,
      item.user_name,
      item.user_email,
      item.user_phone,
      item.user_category,
      item.photo,
      item.user_institution,
      new Date(item.createdAt).toLocaleDateString("id-ID"),
    ]);

    autoTable(doc, {
      startY: 60,
      head: [
        [
          "No",
          "Kode",
          "Nama",
          "Email",
          "No HP",
          "Kategori",
          "Foto",
          "Institusi",
          "Tanggal Daftar",
        ],
      ],
      body: tableData,
      styles: { fontSize: 7 },
      headStyles: { fillColor: [62, 193, 211] },
      columnStyles: {
        6: { cellWidth: 100 },
      },
    });
  }

  doc.save("laporan-pendaftaran-by-kategori.pdf");
};
