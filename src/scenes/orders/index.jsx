import React, { useState } from "react";
import {
  Box,
  Chip,
  Button,
  Typography,
  Collapse,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { toast } from "react-toastify";
import Header from "components/Header";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "state/api";

const statusColor = (status) => {
  switch (status) {
    case "pending":   return "warning";
    case "approved":  return "info";
    case "delivered": return "success";
    case "cancelled": return "error";
    default:          return "default";
  }
};

const OrderDetailPanel = ({ order }) => {
  return (
    <Box p="1rem 2rem" bgcolor="background.default">
      <Typography variant="subtitle2" gutterBottom>
        Items ({order.items?.length || 0})
      </Typography>
      {(order.items || []).map((item, i) => (
        <Box key={i} display="flex" justifyContent="space-between" mb="0.25rem">
          <Typography variant="body2">
            {item.productName} × {item.quantity}
          </Typography>
          <Typography variant="body2">
            UGX {(item.unitPrice * item.quantity).toLocaleString()}
          </Typography>
        </Box>
      ))}
      <Box mt="0.5rem" borderTop="1px solid" borderColor="divider" pt="0.5rem">
        <Typography variant="body2">
          <strong>Delivery:</strong> {order.deliveryAddress}
        </Typography>
      </Box>
    </Box>
  );
};

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  const { data, isLoading, refetch } = useGetAllOrdersQuery(statusFilter);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();

  const rows = data?.data || [];

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
      toast.success(`Order marked as ${newStatus}.`);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update order status.");
    }
  };

  const columns = [
    {
      field: "expand",
      headerName: "",
      width: 50,
      sortable: false,
      renderCell: (p) => (
        <IconButton
          size="small"
          aria-label="View order details"
          onClick={() =>
            setExpandedRow(expandedRow === p.row._id ? null : p.row._id)
          }
        >
          {expandedRow === p.row._id ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
        </IconButton>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 0.7,
      renderCell: (p) => new Date(p.value).toLocaleDateString(),
    },
    { field: "supplierName", headerName: "Supplier", flex: 1 },
    {
      field: "clientId",
      headerName: "Client ID",
      flex: 0.8,
      renderCell: (p) => (
        <Typography variant="body2" noWrap title={p.value}>
          {p.value}
        </Typography>
      ),
    },
    {
      field: "totalAmount",
      headerName: "Total (UGX)",
      flex: 0.8,
      renderCell: (p) => Number(p.value).toLocaleString(),
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
      flex: 1.4,
      sortable: false,
      renderCell: (p) => {
        const s = p.row.status;
        return (
          <Box display="flex" gap="0.4rem" flexWrap="wrap">
            {s === "pending" && (
              <>
                <Button
                  size="small"
                  variant="contained"
                  color="info"
                  disabled={isUpdating}
                  onClick={() => handleStatusUpdate(p.row._id, "approved")}
                >
                  Approve
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  disabled={isUpdating}
                  onClick={() => handleStatusUpdate(p.row._id, "cancelled")}
                >
                  Cancel
                </Button>
              </>
            )}
            {s === "approved" && (
              <Button
                size="small"
                variant="contained"
                color="success"
                disabled={isUpdating}
                onClick={() => handleStatusUpdate(p.row._id, "delivered")}
              >
                Mark Delivered
              </Button>
            )}
            {(s === "delivered" || s === "cancelled") && (
              <Typography variant="body2" color="text.secondary">
                {s === "delivered" ? "Completed" : "Cancelled"}
              </Typography>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="ORDERS"
        subtitle="All platform orders across all suppliers"
      />

      {/* Filter chips */}
      <Box display="flex" gap="0.75rem" mt="1rem" mb="1rem" flexWrap="wrap">
        {["", "pending", "approved", "delivered", "cancelled"].map((s) => (
          <Chip
            key={s || "all"}
            label={s ? s.charAt(0).toUpperCase() + s.slice(1) : "All"}
            color={statusFilter === s ? "primary" : "default"}
            onClick={() => setStatusFilter(s)}
            clickable
          />
        ))}
      </Box>

      <Box height="75vh">
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          rowHeight={52}
          getDetailPanelContent={({ row }) =>
            expandedRow === row._id ? (
              <Collapse in>
                <OrderDetailPanel order={row} />
              </Collapse>
            ) : null
          }
        />
      </Box>
    </Box>
  );
};

export default Orders;
