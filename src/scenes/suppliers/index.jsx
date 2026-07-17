import React, { useState } from 'react';
import { Box, Switch } from '@mui/material';
import { useGetSuppliersQuery, useActivateUserMutation, useDeactivateUserMutation } from 'state/api'; // Ensure you have these hooks set up correctly
import Header from 'components/Header'; // Ensure this path is correct
import RecordDetailDialog from 'components/RecordDetailDialog';
import { DataGrid } from '@mui/x-data-grid';

const DETAIL_FIELDS = [
  { key: 'business_name' },
  { key: 'business_email_address', label: 'Email' },
  { key: 'TIN' },
  { key: 'balance' },
  { key: 'business_tel', label: 'Phone Number' },
  { key: 'supplier_type', label: 'Supplier Type', format: (v) => v?.name || '—' },
  { key: 'active', format: (v) => (v ? 'Active' : 'Inactive') },
];

const Suppliers = () => {
  const { data, isLoading } = useGetSuppliersQuery();
  const [activateUser] = useActivateUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();
  const supplier_data = data?.data;

  const [localSwitchState, setLocalSwitchState] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  const handleToggle = async (id, newState) => {
    setLocalSwitchState(prevState => ({ ...prevState, [id]: newState }));

    try {
      if (newState) {
        await activateUser(id).unwrap();
      } else {
        await deactivateUser(id).unwrap();
      }
    } catch (error) {
      // Revert state if the mutation fails
      setLocalSwitchState(prevState => ({ ...prevState, [id]: !newState }));
    }
  };

  const columns = [
    {
      field: "business_name",
      headerName: "Business Name",
      flex: 1,
    },
    {
      field: "business_email_address",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "TIN",
      headerName: "TIN",
      flex: 1,
    },
    {
      field: "balance",
      headerName: "Balance",
      flex: 1,
    },
    {
      field: "business_tel",
      headerName: "Phone Number",
      flex: 1,
      renderCell: (params) => {
        return params.value
          ? params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")
          : "—";
      },
    },
    {
      field: "supplier_type",
      headerName: "Supplier Type",
      flex: 1,
      valueGetter: (params) => params.row.supplier_type?.name || "—",
    },
    {
      field: "active",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const isActive = localSwitchState[params.row._id] ?? params.row.active;
        return (
          <Switch
            checked={isActive}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleToggle(params.row._id, !isActive)}
          />
        );
      },
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SUPPLIERS" subtitle="List of suppliers" />
      <Box
        mt="40px"
        height="100vh"
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          columns={columns}
          rows={supplier_data || []}
          onRowClick={(params) => setSelectedRow(params.row)}
          sx={{ "& .MuiDataGrid-row": { cursor: "pointer" } }}
        />
      </Box>
      <RecordDetailDialog
        open={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.business_name}
        subtitle="Supplier details"
        row={selectedRow}
        fields={DETAIL_FIELDS}
      />
    </Box>
  );
};

export default Suppliers;
