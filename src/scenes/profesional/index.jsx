import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, useTheme, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProfession({ name: '' });
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

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteProfession(deleteId);
    setConfirmOpen(false);
    setDeleteId(null);
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
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        mt="20px"
        height="100vh" // Adjusted height
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            
            fontWeight: 'bold', // Make header text bold
          },
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
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default Professional;
