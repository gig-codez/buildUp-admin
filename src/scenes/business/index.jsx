import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetBusinessQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: "business_name",
    headerName: "Business Name",
    flex: 0.5,
  },
  {
    field: "business_email",
    headerName: "Business Email",
    flex: 0.5,
  },
  {
    field: "tin_number",
    headerName: "TIN Number",
    flex: 0.5,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 0.5,
  },
  {
    field: "about_business",
    headerName: "About Business",
    flex: 1,
  },
  {
    field: "employer",
    headerName: "Employer",
    flex: 0.5,
    renderCell: (params) => {
      return params.value ? params.value.first_name : "N/A";
    }
  },
  {
    field: "business_tel",
    headerName: "Business Tel",
    flex: 0.5,
    
  }
];

const Business = () => {
  const { data, isLoading } = useGetBusinessQuery();
  const theme = useTheme();
  const businessArray = data?.data;

  console.log(businessArray);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Business" subtitle="List of Businesses" />
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
        <DataGrid loading={isLoading || !data}
          getRowId={(row) => row._id}
          columns={columns}
          rows={businessArray || []}
        />
      </Box>
    </Box>
  );
};

export default Business;
