import React, { useState } from 'react';
import { Box, Switch } from '@mui/material';
import { useGetConsultantsQuery, useActivateUserMutation, useDeactivateUserMutation } from 'state/api'; // Ensure you have these hooks set up correctly
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';

const Consultants = () => {
  const { data, isLoading } = useGetConsultantsQuery();
  const [activateUser] = useActivateUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();
  const consultantData = data?.data|| [];

  const [localSwitchState, setLocalSwitchState] = useState({});

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
      valueGetter: (params) => params.row.profession.name,
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
            onChange={() => handleToggle(params.row._id, !isActive)}
          />
        );
      },
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CONSULTANTS" subtitle="List of consultants " />
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
          rows={consultantData}
        />
      </Box>
    </Box>
  );
}

export default Consultants;
