import React from 'react';
import { Box, useTheme } from '@mui/material';
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

  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CLIENTS" subtitle="List of clients " />
      <Box mt="40px" height="100vh"
         sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            // Add bottom border
            fontWeight: 'bold', // Make header text bold
          },
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
          rows={data || []}
        />
      </Box>
    </Box>
  );
}

export default Clients;
