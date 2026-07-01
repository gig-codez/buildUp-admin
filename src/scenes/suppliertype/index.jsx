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
          rows={data || []}
        />
      </Box>
    </Box>
  );
}

export default CategoryTypes;
