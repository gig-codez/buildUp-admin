import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { useGetProfessionQuery, useCreateProfessionMutation, useDeleteProfessionMutation } from 'state/api';
import Header from 'components/Header';

const Professional = () => {
  const { data, isLoading } = useGetProfessionQuery();
  const [createProfession, { isLoading: isCreating }] = useCreateProfessionMutation();
  const [deleteProfession, { isLoading: isDeleting }] = useDeleteProfessionMutation();

  const [open, setOpen] = useState(false);
  const [newProfession, setNewProfession] = useState({ name: '' });
  const [nameError, setNameError] = useState('');
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProfession({ name: '' });
    setNameError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfession((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === 'name' && value.trim()) {
      setNameError('');
    }
  };

  const handleSubmit = async () => {
    if (!newProfession.name.trim()) {
      setNameError('Profession name is required.');
      return;
    }

    try {
      await createProfession(newProfession).unwrap();
      toast.success('Profession added successfully.');
      handleClose();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add profession.');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProfession(deleteId).unwrap();
      toast.success('Profession deleted successfully.');
      setConfirmOpen(false);
      setDeleteId(null);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete profession.');
    }
  };

  const handleDeleteCancel = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const columns = [
    { field: 'name', headerName: 'Profession', flex: 0.5 },
    { field: 'createdAt', headerName: 'Created At', flex: 0.5 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.5,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDeleteClick(params.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const professionData = data || [];

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
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
            error={!!nameError}
            helperText={nameError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            disabled={isCreating}
          >
            {isCreating ? <CircularProgress size={20} color="inherit" /> : 'Add'}
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={confirmOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this profession?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary" disabled={isDeleting}>
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={20} color="inherit" /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        mt="20px"
        height="100vh" // Adjusted height
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
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            loading={isLoading}
            getRowId={(row) => row._id}
            columns={columns}
            rows={professionData}
          />
        )}
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
  border: (theme) => `1px solid ${theme.palette.divider}`,
  boxShadow: 24,
  p: 4,
};

export default Professional;
