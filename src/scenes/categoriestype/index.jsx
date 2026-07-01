import React from 'react';
import { Box } from '@mui/material';
import { useGetCategoryQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    renderCell: (params) => {
      return new Date(params.value).toLocaleString();
    }
  },
  
];

const CategoryTypes = () => {
  const { data, isLoading } = useGetCategoryQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Category Type" subtitle="List of category types" />
      <Box mt="40px" height="100vh">
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

export default CategoryTypes;
