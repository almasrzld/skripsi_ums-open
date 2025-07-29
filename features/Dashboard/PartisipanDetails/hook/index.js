const statusMap = {
  PAID: { text: "Lunas", variant: "default" },
  PENDING_PAYMENT: { text: "Pending", variant: "destructive" },
  CANCELED: { text: "Dibatalkan", variant: "secondary" },
};

export default function useParticipantLabels() {
  const getStatusLabel = (value) =>
    statusMap[value] || { text: value, variant: "secondary" };

  return {
    getStatusLabel,
  };
}
