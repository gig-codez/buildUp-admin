import React, { useState } from "react";
import {
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import {
  useGetContactRequestsQuery,
  useUpdateContactRequestStatusMutation,
} from "state/api";

const statusColor = (status) => {
  switch (status) {
    case "pending":   return "warning";
    case "connected": return "success";
    case "rejected":  return "error";
    default:          return "default";
  }
};

const ContactRequests = () => {
  const theme = useTheme();
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [adminNote, setAdminNote] = useState("");
  const [dialogAction, setDialogAction] = useState(null); // "connected" | "rejected"

  const { data, isLoading, refetch } = useGetContactRequestsQuery(statusFilter);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateContactRequestStatusMutation();

  const rows = data?.data || [];

  const handleAction = (row, action) => {
    setSelected(row);
    setAdminNote("");
    setDialogAction(action);
  };

  const handleConfirm = async () => {
    if (!selected) return;
    await updateStatus({
      id: selected._id,
      status: dialogAction,
      adminNote,
    });
    setSelected(null);
    setDialogAction(null);
    refetch();
  };

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      flex: 0.7,
      renderCell: (p) => new Date(p.value).toLocaleDateString(),
    },
    { field: "senderName", headerName: "From (Client)", flex: 1 },
    { field: "recipientName", headerName: "To (Contractor/Consultant)", flex: 1 },
    { field: "recipientRole", headerName: "Role", flex: 0.6 },
    { field: "subject", headerName: "Subject", flex: 0.8 },
    {
      field: "message",
      headerName: "Message",
      flex: 1.5,
      renderCell: (p) => (
        <Typography variant="body2" noWrap title={p.value}>
          {p.value}
        </Typography>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      renderCell: (p) => (
        <Chip label={p.value} color={statusColor(p.value)} size="small" />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.2,
      sortable: false,
      renderCell: (p) =>
        p.row.status === "pending" ? (
          <Box display="flex" gap="0.5rem">
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={() => handleAction(p.row, "connected")}
            >
              Connect
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={() => handleAction(p.row, "rejected")}
            >
              Reject
            </Button>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {p.row.adminNote || "—"}
          </Typography>
        ),
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

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="CONTACT REQUESTS"
        subtitle="Client requests to connect with contractors / consultants"
      />

      {/* Filter chips */}
      <Box display="flex" gap="0.75rem" mt="1rem" mb="1rem" flexWrap="wrap">
        {["", "pending", "connected", "rejected"].map((s) => (
          <Chip
            key={s || "all"}
            label={s ? s.charAt(0).toUpperCase() + s.slice(1) : "All"}
            color={statusFilter === s ? "primary" : "default"}
            onClick={() => setStatusFilter(s)}
            clickable
          />
        ))}
      </Box>

      <Box height="75vh" sx={gridSx}>
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          rowHeight={52}
        />
      </Box>

      {/* Action dialog */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogAction === "connected" ? "Connect Parties" : "Reject Request"}
        </DialogTitle>
        <DialogContent>
          {selected && (
            <Box mb="1rem">
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>From:</strong> {selected.senderName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>To:</strong> {selected.recipientName} ({selected.recipientRole})
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Message:</strong> {selected.message}
              </Typography>
            </Box>
          )}
          <TextField
            label={
              dialogAction === "connected"
                ? "Note to both parties (optional)"
                : "Reason for rejection (optional)"
            }
            multiline
            rows={3}
            fullWidth
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
          />
          {dialogAction === "connected" && (
            <Typography variant="caption" color="text.secondary" mt="0.5rem" display="block">
              Both the client and {selected?.recipientRole} will be notified and
              connected via the platform's messaging system.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelected(null)}>Cancel</Button>
          <Button
            variant="contained"
            color={dialogAction === "connected" ? "success" : "error"}
            onClick={handleConfirm}
            disabled={isUpdating}
          >
            {dialogAction === "connected" ? "Confirm & Connect" : "Reject"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactRequests;
