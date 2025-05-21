"use client";

import { useDebounce } from "use-debounce";
import { z } from "zod";
import { useState } from "react";

export const DataPesertaSchema = z.object({
  nama: z.string(),
  slug: z.string(),
});

const useDashboardBaganPertandinganFeature = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const [kategori, setKategori] = useState("");

  return {
    page,
    setPage,
    limit,
    search,
    setSearch,
    value,
    kategori,
    setKategori,
  };
};

export default useDashboardBaganPertandinganFeature;
