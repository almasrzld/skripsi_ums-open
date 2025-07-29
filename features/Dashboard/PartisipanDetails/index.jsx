"use client";

import useGetPartisipanDetailsById from "./hook/useGetPartisipanDetailsById";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Building2, User, LayoutList, IdCard } from "lucide-react";
import useParticipantLabels from "./hook";

const DashboardPartisipanDetailsFeature = ({ id }) => {
  const { data, isLoading } = useGetPartisipanDetailsById(id);
  const { getStatusLabel } = useParticipantLabels();

  if (isLoading) return <div className="text-center py-6">Loading...</div>;
  if (!data || !data.data)
    return (
      <div className="text-center py-6 text-muted-foreground">
        Data tidak ditemukan.
      </div>
    );

  const partisipan = data.data;
  const status = getStatusLabel(partisipan.status);

  return (
    <div className="rounded-xl border p-6 bg-white shadow-lg">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {partisipan.photo && (
          <div className="shrink-0">
            <img
              src={partisipan.photo}
              alt="Foto Partisipan"
              className="w-32 h-32 object-cover rounded-xl border shadow-sm"
            />
          </div>
        )}

        <div className="flex-1 grid gap-3 text-sm">
          <InfoRow
            icon={<IdCard className="w-4 h-4" />}
            label="Kode Peserta"
            value={partisipan.user_kode}
          />
          <InfoRow
            icon={<User className="w-4 h-4" />}
            label="Nama"
            value={partisipan.user_name}
          />
          <InfoRow
            icon={<Building2 className="w-4 h-4" />}
            label="Institusi"
            value={partisipan.user_institution}
          />
          <InfoRow
            icon={<LayoutList className="w-4 h-4" />}
            label="Kategori"
            value={partisipan.category.label}
          />
          <InfoRow
            icon={<Phone className="w-4 h-4" />}
            label="No HP"
            value={partisipan.user_phone}
          />
          <InfoRow
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            value={partisipan.user_email}
          />
          <div className="mt-3">
            <strong className="text-sm">Status Pembayaran:</strong>
            <div className="mt-1">
              <Badge variant={status.variant}>{status.text}</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center gap-2 text-muted-foreground">
    {icon}
    <span>
      <strong className="text-foreground">{label}:</strong> {value}
    </span>
  </div>
);

export default DashboardPartisipanDetailsFeature;
