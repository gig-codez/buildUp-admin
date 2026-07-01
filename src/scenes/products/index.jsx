import React, { useState } from "react";
import {
  Box,
  Chip,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Header from "components/Header";
import { useGetAllProductsQuery } from "state/api";

const PRODUCT_CATEGORIES = [
  "All",
  "Building Materials",
  "Cement & Concrete",
  "Steel & Metals",
  "Timber & Wood",
  "Paint & Finishes",
  "Electrical & Lighting",
  "Plumbing & Sanitary",
  "Tools & Equipment",
  "Safety Equipment",
  "Tiles & Flooring",
  "Roofing",
  "Glass & Windows",
  "Adhesives & Sealants",
  "Landscaping",
  "Other",
];

const Products = () => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetAllProductsQuery({ category });

  const rows = (data?.data || []).filter((r) =>
    search
      ? (r.product_name || "").toLowerCase().includes(search.toLowerCase())
      : true
  );

  const columns = [
    {
      field: "product_image",
      headerName: "",
      width: 60,
      sortable: false,
      renderCell: (p) => (
        <Avatar
          src={p.value}
          variant="rounded"
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    { field: "product_name", headerName: "Product", flex: 1.2 },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (p) => (
        <Chip label={p.value || "Other"} size="small" variant="outlined" />
      ),
    },
    {
      field: "product_price",
      headerName: "Price (UGX)",
      flex: 0.8,
      renderCell: (p) => Number(p.value).toLocaleString(),
    },
    {
      field: "product_quantity",
      headerName: "Qty",
      flex: 0.5,
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 0.5,
      renderCell: (p) => p.value || "piece",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      renderCell: (p) => (
        <Chip
          label={p.value || "In stock"}
          color={p.value === "Out of stock" ? "error" : "success"}
          size="small"
        />
      ),
    },
    {
      field: "variants",
      headerName: "Variants",
      flex: 1,
      sortable: false,
      renderCell: (p) => {
        const v = p.value || [];
        if (!v.length) return <Typography variant="body2" color="text.secondary">—</Typography>;
        return (
          <Box display="flex" gap="0.25rem" flexWrap="wrap">
            {v.slice(0, 3).map((vr, i) => (
              <Chip key={i} label={`${vr.name}: ${vr.value}`} size="small" sx={{ fontSize: "0.65rem" }} />
            ))}
            {v.length > 3 && <Chip label={`+${v.length - 3}`} size="small" sx={{ fontSize: "0.65rem" }} />}
          </Box>
        );
      },
    },
  ];

  // Category stats
  const statsByCategory = PRODUCT_CATEGORIES.slice(1).reduce((acc, cat) => {
    acc[cat] = (data?.data || []).filter((p) => (p.category || "Other") === cat).length;
    return acc;
  }, {});

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="All supplier products with categories and variants" />

      {/* Category filter */}
      <Box display="flex" gap="0.5rem" mt="1rem" mb="0.75rem" flexWrap="wrap">
        {PRODUCT_CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            label={cat === "All" ? `All (${data?.totalDocuments || 0})` : `${cat} (${statsByCategory[cat] || 0})`}
            color={category === cat ? "primary" : "default"}
            onClick={() => setCategory(cat)}
            clickable
            size="small"
          />
        ))}
      </Box>

      {/* Search */}
      <TextField
        size="small"
        placeholder="Search products…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: "1rem", width: 280 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <Box height="65vh">
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          rowHeight={56}
        />
      </Box>
    </Box>
  );
};

export default Products;
