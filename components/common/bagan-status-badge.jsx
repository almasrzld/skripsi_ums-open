"use client";

import { Badge } from "../ui/badge";

const getKategoriStatus = (matches = []) => {
  if (matches.length === 0) return "SCHEDULED";

  const allScheduled = matches.every((m) => m.status === "SCHEDULED");
  const allCompleted = matches.every((m) => m.status === "COMPLETED");
  const hasOngoing = matches.some((m) => m.status === "ONGOING");

  if (allScheduled) return "SCHEDULED";
  if (allCompleted) return "COMPLETED";
  if (hasOngoing || matches.some((m) => m.status === "SCHEDULED"))
    return "ONGOING";

  return "UNKNOWN";
};

const getBadgeVariant = (status) => {
  switch (status) {
    case "SCHEDULED":
      return "secondary";
    case "ONGOING":
      return "destructive";
    case "COMPLETED":
      return "default";
    default:
      return "outline";
  }
};

const formatStatusLabel = (status) => {
  switch (status) {
    case "SCHEDULED":
      return "Belum Mulai";
    case "ONGOING":
      return "Sedang Berlangsung";
    case "COMPLETED":
      return "Selesai";
    default:
      return "Status Tidak Diketahui";
  }
};

const BaganStatusBadge = ({ kategori, matches }) => {
  const kategoriMatches = matches.filter((m) => m.categoryId === kategori);
  const status = getKategoriStatus(kategoriMatches);

  return (
    <Badge variant={getBadgeVariant(status)}>{formatStatusLabel(status)}</Badge>
  );
};

export default BaganStatusBadge;
