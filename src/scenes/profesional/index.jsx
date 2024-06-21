import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetProfessionQuery, useCreateProfessionMutation, useDeleteProfessionMutation } from 'state/api';
import Header from 'components/Header';

const Professional = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetProfessionQuery();
  const [createProfession] = useCreateProfessionMutation();
  const [deleteProfession] = useDeleteProfessionMutation();

  const [open, setOpen] = useState(false);
  const [newProfession, setNewProfession] = useState({ name: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProfession({ name: '' }); // Reset the newProfession state when the modal is closed
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfession((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await createProfession(newProfession);
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteProfession(id);
  };

  const columns = [
    { field: 'name', headerName: 'Profession', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const professionData = data || [];

  return (
    <Box m="1.5rem 2.5rem">
        <Box  display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Professional" subtitle="List of Professional" />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Profession
      </Button>
    </Box>
      
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" component="h2">
            Add New Profession
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Profession Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={newProfession.name}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Box>
      </Modal>
      <Box
        mt="20px"
        height="200vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          columns={columns}
          rows={professionData}
        />
      </Box>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Professional;
