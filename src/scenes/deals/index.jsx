import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, useTheme, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetDealsQuery, useGetCategoryQuery, useAddDealsMutation, useDeleteDealsMutation } from 'state/api';
import Header from 'components/Header';

const Deals = () => {
  const theme = useTheme();
  const { data: dealsData, isLoading: isLoadingDeals } = useGetDealsQuery();
  const { data: supplierTypesData } = useGetCategoryQuery();
  // Ensure this logs the expected data
  const [addDeals] = useAddDealsMutation();
  const [deleteDeals] = useDeleteDealsMutation();

  const [open, setOpen] = useState(false);
  const [newDeal, setNewDeal] = useState({ name: '', supplier_type: '' });
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewDeal({ name: '', supplier_type: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDeal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await addDeals(newDeal);
    handleClose();
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteDeals(deleteId);
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleDeleteCancel = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const columns = [
    { field: 'name', headerName: 'Deal', flex: 0.5 },
    { field: 'supplier_type', headerName: 'Supplier Type', flex: 0.5, valueGetter: (params) => params.row.supplier_type.name },
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

  const dealData = dealsData ? dealsData.deals : [];
  const supplierTypes = supplierTypesData ? supplierTypesData : [];

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Deals" subtitle="List of Deals" />
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Deal
        </Button>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" component="h2">
            Add New Deal
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Deal Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={newDeal.name}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="supplier-type-label">Supplier Type</InputLabel>
            <Select
              labelId="supplier-type-label"
              id="supplier_type"
              name="supplier_type"
              value={newDeal.supplier_type}
              onChange={handleChange}
              label="Supplier Type"
            >
              {supplierTypes?.map((type) => (
                <MenuItem key={type._id} value={type._id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
            Are you sure you want to delete this deal?
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
        height="100vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            fontWeight: 'bold',
          },
          "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
            borderRight: "1px solid rgba(224, 224, 224, 1) !important",
            borderLeft: "1px solid rgba(224, 224, 224, 1) !important",
          },
          "& .MuiDataGrid-columnHeader:first-of-type, .MuiDataGrid-cell:first-of-type": {
            borderLeft: "none !important"
          },
          "& .MuiDataGrid-columnHeader:last-of-type, .MuiDataGrid-cell:last-of-type": {
            borderRight: "none !important"
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
        {isLoadingDeals ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            loading={isLoadingDeals}
            getRowId={(row) => row._id}
            columns={columns}
            rows={dealData}
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

export default Deals;
