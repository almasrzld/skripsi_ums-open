"use client";

import { useDebounce } from "use-debounce";
import { useState } from "react";

const useDashboardPartisipanFeature = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 500);
  const [status, setStatus] = useState("ALL");

  return {
    page,
    setPage,
    limit,
    search,
    setSearch,
    value,
    status,
    setStatus,
  };
};

export default useDashboardPartisipanFeature;
