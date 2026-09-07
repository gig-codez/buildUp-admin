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
      <Box mt="1.5rem" height="70vh">
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
