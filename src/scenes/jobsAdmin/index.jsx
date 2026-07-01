import React, { useState } from "react";
import {
  Box,
  Chip,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import Header from "components/Header";
import { useGetAllAdminJobsQuery } from "state/api";

const JOB_CATEGORIES = [
  "All",
  "General Construction",
  "Masonry & Bricklaying",
  "Electrical",
  "Plumbing",
  "Carpentry & Joinery",
  "Painting & Decorating",
  "Roofing",
  "Tiling & Flooring",
  "Landscaping & Gardening",
  "Interior Design & Fit-out",
  "Civil & Structural Engineering",
  "Project Management",
  "Consulting",
  "Renovation & Remodelling",
  "Other",
];

const CONTRACT_STATUSES = ["All", "open", "in_progress", "completed", "cancelled"];

const statusColor = (s) => {
  switch (s) {
    case "open": return "success";
    case "in_progress": return "info";
    case "completed": return "default";
    case "cancelled": return "error";
    default: return "default";
  }
};

const JobsAdmin = () => {
  const theme = useTheme();
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetAllAdminJobsQuery({ category, status });

  const rows = (data?.jobs || []).filter((r) =>
    search
      ? (r.job_title || "").toLowerCase().includes(search.toLowerCase())
      : true
  );

  const columns = [
    { field: "job_title", headerName: "Job Title", flex: 1.4 },
    {
      field: "job_category",
      headerName: "Category",
      flex: 1,
      renderCell: (p) => (
        <Chip label={p.value || "General Construction"} size="small" variant="outlined" />
      ),
    },
    {
      field: "profession",
      headerName: "Profession",
      flex: 0.9,
      renderCell: (p) => (
        <Typography variant="body2">{p.value?.name || "—"}</Typography>
      ),
    },
    {
      field: "project_fees",
      headerName: "Budget (UGX)",
      flex: 0.8,
      renderCell: (p) => Number(p.value || 0).toLocaleString(),
    },
    {
      field: "contract_status",
      headerName: "Status",
      flex: 0.7,
      renderCell: (p) => (
        <Chip label={p.value} color={statusColor(p.value)} size="small" />
      ),
    },
    {
      field: "escrow_enabled",
      headerName: "Escrow",
      flex: 0.5,
      renderCell: (p) => (
        <Chip
          label={p.value ? "Yes" : "No"}
          color={p.value ? "primary" : "default"}
          size="small"
        />
      ),
    },
    {
      field: "skills_required",
      headerName: "Skills",
      flex: 1,
      sortable: false,
      renderCell: (p) => {
        const skills = p.value || [];
        if (!skills.length) return <Typography variant="body2" color="text.secondary">—</Typography>;
        return (
          <Box display="flex" gap="0.25rem" flexWrap="wrap">
            {skills.slice(0, 3).map((s, i) => (
              <Chip key={i} label={s} size="small" sx={{ fontSize: "0.65rem" }} />
            ))}
            {skills.length > 3 && <Chip label={`+${skills.length - 3}`} size="small" sx={{ fontSize: "0.65rem" }} />}
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Posted",
      flex: 0.7,
      renderCell: (p) => new Date(p.value).toLocaleDateString(),
    },
  ];

  const gridSx = {
    "& .MuiDataGrid-root": { border: "none" },
    "& .MuiDataGrid-cell": { borderBottom: "none" },
    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: theme.palette.background.alt,
      color: theme.palette.secondary[100],
      borderBottom: "none",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: theme.palette.primary.light,
    },
    "& .MuiDataGrid-footerContainer": {
      backgroundColor: theme.palette.background.alt,
      color: theme.palette.secondary[100],
      borderTop: "none",
    },
  };

  // Category breakdown counts
  const catCounts = JOB_CATEGORIES.slice(1).reduce((acc, cat) => {
    acc[cat] = (data?.jobs || []).filter((j) => (j.job_category || "General Construction") === cat).length;
    return acc;
  }, {});

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="JOB OPPORTUNITIES" subtitle="All job posts with categories and skills" />

      {/* Status filter */}
      <Box display="flex" gap="0.5rem" mt="1rem" mb="0.5rem" flexWrap="wrap">
        {CONTRACT_STATUSES.map((s) => (
          <Chip
            key={s}
            label={s === "All" ? "All Statuses" : s.replace("_", " ")}
            color={status === s ? "secondary" : "default"}
            onClick={() => setStatus(s)}
            clickable
            size="small"
          />
        ))}
      </Box>

      {/* Category filter */}
      <Box display="flex" gap="0.5rem" mb="0.75rem" flexWrap="wrap">
        {JOB_CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            label={cat === "All" ? `All (${data?.pagination?.total || 0})` : `${cat} (${catCounts[cat] || 0})`}
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
        placeholder="Search jobs…"
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

      <Box height="60vh" sx={gridSx}>
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

export default JobsAdmin;
