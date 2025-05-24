const categoryMap = {
  UNDER_55KG_PUTRA: "Under 55kg Putra",
  UNDER_55KG_PUTRI: "Under 55kg Putri",
  POOMSAE_JUNIOR: "Poomsae Junior",
  KYORUGI_SENIOR: "Kyorugi Senior",
};

const statusMap = {
  PAID: { text: "Lunas", variant: "default" },
  PENDING_PAYMENT: { text: "Pending", variant: "destructive" },
  CANCELED: { text: "Dibatalkan", variant: "secondary" },
};

export default function useParticipantLabels() {
  const getCategoryLabel = (value) => categoryMap[value] || value;

  const getStatusLabel = (value) =>
    statusMap[value] || { text: value, variant: "secondary" };

  return {
    getCategoryLabel,
    getStatusLabel,
  };
}
