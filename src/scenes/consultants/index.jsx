import React, { useState } from 'react';
import { Box, Switch } from '@mui/material';
import { useGetConsultantsQuery, useActivateUserMutation, useDeactivateUserMutation } from 'state/api'; // Ensure you have these hooks set up correctly
import Header from 'components/Header';
import RecordDetailDialog from 'components/RecordDetailDialog';
import { DataGrid } from '@mui/x-data-grid';

const DETAIL_FIELDS = [
  { key: 'first_name' },
  { key: 'last_name' },
  { key: 'email', label: 'Email Address' },
  { key: 'tel_num', label: 'Telephone Number' },
  { key: 'profession', format: (v) => v?.name || 'N/A' },
  { key: 'address' },
  { key: 'active', format: (v) => (v ? 'Active' : 'Inactive') },
];

const Consultants = () => {
  const { data, isLoading } = useGetConsultantsQuery();
  const [activateUser] = useActivateUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();
  const consultantData = data?.data|| [];

  const [localSwitchState, setLocalSwitchState] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);

  const handleToggle = async (id, newState) => {
    setLocalSwitchState(prevState => ({ ...prevState, [id]: newState }));

    try {
      if (newState) {
        await activateUser(id).unwrap();
      } else {
        await deactivateUser(id).unwrap();
      }
    } catch (error) {
      // Revert state if the mutation fails
      setLocalSwitchState(prevState => ({ ...prevState, [id]: !newState }));
    }
  };

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
      field: 'email',
      headerName: 'Email Address',
      flex: 0.5,
    },
    {
      field: 'tel_num',
      headerName: 'Telephone Number',
      flex: 0.5,
    },
    {
      field: 'profession',
      headerName: 'Profession',
      flex: 0.5,
      valueGetter: (params) => params.row.profession?.name || 'N/A',
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 0.5,
    },
    {
      field: 'active',
      headerName: 'Status',
      flex: 0.5,
      renderCell: (params) => {
        const isActive = localSwitchState[params.row._id] ?? params.row.active;
        return (
          <Switch
            checked={isActive}
            onClick={(e) => e.stopPropagation()}
            onChange={() => handleToggle(params.row._id, !isActive)}
          />
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CONSULTANTS" subtitle="List of consultants " />
      <Box mt="40px" height="100vh">
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          columns={columns}
          rows={consultantData}
          onRowClick={(params) => setSelectedRow(params.row)}
          sx={{ "& .MuiDataGrid-row": { cursor: "pointer" } }}
        />
      </Box>
      <RecordDetailDialog
        open={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        title={selectedRow ? `${selectedRow.first_name || ''} ${selectedRow.last_name || ''}`.trim() : ''}
        subtitle="Consultant details"
        row={selectedRow}
        fields={DETAIL_FIELDS}
      />
    </Box>
  );
}

export default Consultants;
