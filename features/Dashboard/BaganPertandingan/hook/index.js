"use client";

import { useState } from "react";

const useDashboardBaganPertandinganFeature = () => {
  const [kategori, setKategori] = useState("");

  const categoryLabel = {
    UNDER_55KG_PUTRA: "Under 55kg Putra",
    UNDER_55KG_PUTRI: "Under 55kg Putri",
    POOMSAE_JUNIOR: "Poomsae Junior",
    KYORUGI_SENIOR: "Kyorugi Senior",
  };

  return {
    kategori,
    setKategori,
    categoryLabel,
  };
};

export default useDashboardBaganPertandinganFeature;
