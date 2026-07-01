import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useGetBusinessQuery } from 'state/api';
import Header from 'components/Header';
import RecordDetailDialog from 'components/RecordDetailDialog';
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

const DETAIL_FIELDS = [
  { key: 'business_name' },
  { key: 'business_email' },
  { key: 'tin_number', label: 'TIN Number' },
  { key: 'business_tel', label: 'Business Tel' },
  { key: 'address' },
  { key: 'employer', format: (v) => (v ? `${v.first_name || ''} ${v.last_name || ''}`.trim() : 'N/A') },
  { key: 'about_business', label: 'About Business', fullWidth: true },
];

const Business = () => {
  const { data, isLoading } = useGetBusinessQuery();
  const businessArray = data?.data;
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Business" subtitle="List of Businesses" />
      <Box mt="40px" height="100vh">
        <DataGrid loading={isLoading || !data}
          getRowId={(row) => row._id}
          columns={columns}
          rows={businessArray || []}
          onRowClick={(params) => setSelectedRow(params.row)}
          sx={{ "& .MuiDataGrid-row": { cursor: "pointer" } }}
        />
      </Box>
      <RecordDetailDialog
        open={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        title={selectedRow?.business_name}
        subtitle="Business details"
        row={selectedRow}
        fields={DETAIL_FIELDS}
      />
    </Box>
  );
};

export default Business;
