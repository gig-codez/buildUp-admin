import React, { useState } from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import RecordDetailDialog from 'components/RecordDetailDialog';
import { useGetClientsQuery } from 'state/api';

const columns = [
  {
    field: 'first_name',
    headerName: 'First Name',
    flex: 0.5,
  },
  {
    field: 'last_name',
    headerName: 'Last Name',
    flex: 0.5,
  },
  {
    field: 'email_address',
    headerName: 'Email Address',
    flex: 0.5,
  },
  {
    field: 'TIN_NIN',
    headerName: 'TIN/NIN',
    flex: 0.5,
  },
  {
    field: 'country',
    headerName: 'Country',
    flex: 0.5,
  },
  {
    field: 'business',
    headerName: 'Business Name',
    flex: 0.5,
    renderCell: (params) => {
      return params.value ? params.value.business_name : "N/A";
    }
  },
];

const DETAIL_FIELDS = [
  { key: 'first_name' },
  { key: 'last_name' },
  { key: 'email_address' },
  { key: 'TIN_NIN', label: 'TIN/NIN' },
  { key: 'country' },
  { key: 'business', label: 'Business Name', format: (v) => v?.business_name || 'N/A' },
];

const Clients = () => {
  const { data, isLoading } = useGetClientsQuery();
  const newdata= data?.employers
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CLIENTS" subtitle="List of clients " />
      <Box mt="40px" height="100vh">
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          columns={columns}
          rows={newdata || []}
          onRowClick={(params) => setSelectedRow(params.row)}
          sx={{ "& .MuiDataGrid-row": { cursor: "pointer" } }}
        />
      </Box>
      <RecordDetailDialog
        open={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        title={selectedRow ? `${selectedRow.first_name || ''} ${selectedRow.last_name || ''}`.trim() : ''}
        subtitle="Client details"
        row={selectedRow}
        fields={DETAIL_FIELDS}
      />
    </Box>
  );
}

export default Clients;
