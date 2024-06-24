import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetSuppliersQuery } from 'state/api'; // Ensure you have this hook set up correctly
import Header from 'components/Header'; // Ensure this path is correct
import { DataGrid } from '@mui/x-data-grid';

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
    headerName: "balance",
    flex: 1,
  },
  {
    field: "business_tel",
    headerName: "Phone Number",
    flex: 1,
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    },
  },
  {
    field: "supplier_type",
    headerName: "Supplier Type",
    flex: 1,
    valueGetter: (params) => params.row.supplier_type.name,
  }
];

const Suppliers = () => {
  const { data, isLoading } = useGetSuppliersQuery();
  const theme = useTheme();
  const supplier_data = data?.data;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SUPPLIERS" subtitle="List of suppliers" />
      <Box
        mt="40px"
        height="200vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          columns={columns}
          rows={supplier_data || []}
        />
      </Box>
    </Box>
  );
};

export default Suppliers;
