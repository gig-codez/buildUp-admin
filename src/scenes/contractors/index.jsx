import React, { useState } from 'react';
import { Box, Avatar } from '@mui/material';
import {useGetContractorsQuery } from 'state/api';
import Header from 'components/Header';
import RecordDetailDialog from 'components/RecordDetailDialog';
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

const DETAIL_FIELDS = [
  { key: 'first_name' },
  { key: 'last_name' },
  { key: 'email' },
  { key: 'tel_num', label: 'Phone Number' },
  { key: 'gender' },
  { key: 'address' },
  { key: 'profession', format: (v) => v?.name || 'N/A' },
];

const Contractors = () => {
  const { data, isLoading } =useGetContractorsQuery();
  const contractor_data=data?.data
  const [selectedRow, setSelectedRow] = useState(null);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CONTRACTORS" subtitle="List of contractors" />
      <Box mt="1.5rem" height="70vh">
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          columns={columns}
          rows={contractor_data || []}
          onRowClick={(params) => setSelectedRow(params.row)}
          sx={{ "& .MuiDataGrid-row": { cursor: "pointer" } }}
        />
      </Box>
      <RecordDetailDialog
        open={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        title={selectedRow ? `${selectedRow.first_name || ''} ${selectedRow.last_name || ''}`.trim() : ''}
        subtitle="Contractor details"
        row={selectedRow}
        fields={DETAIL_FIELDS}
        imageField="profile_pic"
      />
    </Box>
  );
}

export default Contractors;
