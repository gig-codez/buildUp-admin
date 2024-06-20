import React from 'react';
import { Box, Avatar, useTheme } from '@mui/material';
import { useGetUserQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  {
    field: "profile_pic",
    headerName: "Profile Picture",
    flex: 1,
    renderCell: (params) => (
      <Avatar src={params.value} alt="Profile Picture" />
    ),
  },
  { field: "first_name", headerName: "First Name", flex: 0.5 },
  { field: "last_name", headerName: "Last Name", flex: 0.5 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "gender", headerName: "Gender", flex: 0.5 },
  { field: "address", headerName: "Address", flex: 1 },
  { 
    field: "tel_num", 
    headerName: "Phone Number", 
    flex: 0.5,
    renderCell: (params) => {
      return params.value.toString().replace(/^(\d{3})(\d{3})(\d{3})$/, "($1) $2-$3");
    }
  },
  { field: "profession.name", headerName: "Profession", flex: 1 },
  { field: "role", headerName: "Role ID", flex: 1 },
  { field: "createdAt", headerName: "Created At", flex: 1 },
  { field: "updatedAt", headerName: "Updated At", flex: 1 },
];

const Contractors = () => {
  const { data, isLoading } =useGetUserQuery;
  console.log(data,"hsdfh")
  const theme = useTheme();

  console.log(data);

  const contractor_data=data?.data
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CONTRACTORS" subtitle="List of contractors" />
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
          rows={contractor_data || []}
        />
      </Box>
    </Box>
  );
}

export default Contractors;
