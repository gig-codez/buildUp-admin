import React from 'react';
import { Box } from '@mui/material';
import { useGetRoleQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';

const columns = [

  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
  },
 
];

const Roles = () => {
  const { data, isLoading } = useGetRoleQuery();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ROLES" subtitle="List of roles" />
      <Box mt="40px" height="100vh"
        sx={{
          "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
            borderRight: "1px solid rgba(224, 224, 224, 1) !important", // Add right border to header and cells
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
          rows={data || []}
        />
      </Box>
    </Box>
  );
}

export default Roles;
