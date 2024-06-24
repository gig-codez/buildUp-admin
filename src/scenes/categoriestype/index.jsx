import React from 'react';
import { Box, useTheme } from '@mui/material';
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
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Category Type" subtitle="List of category types" />
      <Box mt="40px" height="200vh"
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
          rows={data || []}
        />
      </Box>
    </Box>
  );
}

export default CategoryTypes;
