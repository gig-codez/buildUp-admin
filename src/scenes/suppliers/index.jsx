import React, { useState } from 'react';
import { Box, useTheme, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGetSuppliersQuery, useActivateUserMutation, useDeactivateUserMutation } from 'state/api'; // Ensure you have these hooks set up correctly
import Header from 'components/Header'; // Ensure this path is correct
import { DataGrid } from '@mui/x-data-grid';

// Custom switch component
const BlackSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#000',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#000',
  },
}));

const Suppliers = () => {
  const { data, isLoading } = useGetSuppliersQuery();
  const [activateUser] = useActivateUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();
  const theme = useTheme();
  const supplier_data = data?.data;

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
      field: "business_name",
      headerName: "Business Name",
      flex: 1,
    },
    {
      field: "business_email_address",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "TIN",
      headerName: "TIN",
      flex: 1,
    },
    {
      field: "balance",
      headerName: "Balance",
      flex: 1,
    },
    {
      field: "business_tel",
      headerName: "Phone Number",
      flex: 1,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      },
    },
    {
      field: "supplier_type",
      headerName: "Supplier Type",
      flex: 1,
      valueGetter: (params) => params.row.supplier_type.name,
    },
    {
      field: "active",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const isActive = localSwitchState[params.row._id] ?? params.row.active;
        return (
          <BlackSwitch
            checked={isActive}
            onChange={() => handleToggle(params.row._id, !isActive)}
          />
        );
      },
    }
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SUPPLIERS" subtitle="List of suppliers" />
      <Box
        mt="40px"
        height="200vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "1px solid rgba(224, 224, 224, 1)", // Add bottom border
            fontWeight: 'bold', // Make header text bold
          },
          "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
            borderRight: "1px solid rgba(224, 224, 224, 1) !important", // Add right border to header and cells
          },
          "& .MuiDataGrid-columnHeader:first-of-type, .MuiDataGrid-cell:first-of-type": {
            borderLeft: "none !important" // Remove left border for first column
          },
          "& .MuiDataGrid-columnHeader:last-of-type, .MuiDataGrid-cell:last-of-type": {
            borderRight: "none !important" // Remove right border for last column
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
          rows={supplier_data || []}
        />
      </Box>
    </Box>
  );
};

export default Suppliers;
