import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import { useGetClientsQuery } from 'state/api';

const columns = [
  {
    field: 'first_name',
    headerName: 'First Name',
    flex: 0.5,
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    flex: 0.5,
  },
  {
    field: 'email_address',
    headerName: 'Email Address',
    flex: 0.5,
  },
  {
    field: 'TIN_NIN',
    headerName: 'TIN/NIN',
    flex: 0.5,
  },
  {
    field: 'country',
    headerName: 'Country',
    flex: 0.5,
  },
  {
    field: 'business',
    headerName: 'Business Name',
    flex: 0.5,
    renderCell: (params) => {
      return params.value ? params.value.business_name : "N/A";
    }
  },
];

const Clients = () => {
  const { data, isLoading } = useGetClientsQuery();
  const newdata= data?.employers

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CLIENTS" subtitle="List of clients " />
      <Box mt="40px" height="100vh"
         sx={{
          "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
            borderRight: "1px solid rgba(224, 224, 224, 1) !important", // Add right border to header and cells
            borderLeft: "1px solid rgba(224, 224, 224, 1) !important", // Add left border to header and cells
          },
          "& .MuiDataGrid-columnHeader:first-of-type, .MuiDataGrid-cell:first-of-type": {
            borderLeft: "none !important" // Remove left border for first column
          },
          "& .MuiDataGrid-columnHeader:last-of-type, .MuiDataGrid-cell:last-of-type": {
            borderRight: "none !important" // Remove right border for last column
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          columns={columns}
          rows={newdata || []}
        />
      </Box>
    </Box>
  );
}

export default Clients;
