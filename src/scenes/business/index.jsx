import React from 'react';
import { Box } from '@mui/material';
import { useGetBusinessQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: "business_name",
    headerName: "Business Name",
    flex: 1,
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
  const businessArray = data?.data;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Business" subtitle="List of Businesses" />
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
