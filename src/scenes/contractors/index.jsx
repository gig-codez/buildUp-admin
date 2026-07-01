import React from 'react';
import { Box, Avatar } from '@mui/material';
import {useGetContractorsQuery } from 'state/api';
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
  { field: "address", headerName: "Address", flex: 0.5 },
  { 
    field: "tel_num", 
    headerName: "Phone Number", 
    flex: 1,
   
  },
  { field: "profession", headerName: "Profession", flex: 1,
    renderCell:(params)=>{
      return params.value?params.value.name:"N/A";
    }
   },
];

const Contractors = () => {
  const { data, isLoading } =useGetContractorsQuery();
  const contractor_data=data?.data
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CONTRACTORS" subtitle="List of contractors" />
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
          rows={contractor_data || []}
        />
      </Box>
    </Box>
  );
}

export default Contractors;
