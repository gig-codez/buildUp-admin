"use client"
import React from "react";
import { Stack, Button, Snackbar, IconButton } from "@mui/material";
import CustomDialog from "@/components/custom_dialog/custom_dialog";
import CustomTextField from "@/components/textfield/custom_textfield";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { RoleTypes } from "@/types/roleTypes";
import axios from "axios";
import { addProfession, addRole } from "@/routes/api.routes";
import DataTable from "@/components/Datatable/datatable";


const ProfessionsDataTable = () => {

    // useful hooks
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [selectedData, setSelectedData] = React.useState<RoleTypes>({} as RoleTypes);
    const [openSnack, setOpenSnack] = React.useState(false);
    const [snackMsg, setSnackMsg] = React.useState("");
    // helper functions
    function handleEdit(row: RoleTypes) {
        setOpenEdit(true);
        setSelectedData(row);
    }

    function handleDelete(row: RoleTypes) {
        setOpenDelete(true);
        setSelectedData(row);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenEdit(false);
        setOpenDelete(false);
        setOpenSnack(false);
    };

    const handleForm = async () => {
        // handle adding role
        const response = await axios.post(addProfession, { 'name': selectedData, 'role': '' });
        if (response.status == 200) {
            setSnackMsg(response.data.message);
            setOpenSnack(true);
            setLoader(true);
            setOpen(false);
            setLoader(false);
        }

    };
    // end of helper functions
    const columns = [
        { field: '_id', headerName: 'ID', },
        { field: 'name', headerName: 'Profession', },
        { field: 'createdAt', headerName: 'Date Created', },
        { field: 'updatedAt', headerName: 'Date Updated', },
        { field: 'actions', headerName: 'Actions', },
        // {
        //     field: 'actions',
        //     headerName: 'Actions',
        //     renderCell: (params: any) => {
        //         // Define your action buttons or menu
        //         return (
        //             <div>
        //                 <IconButton onClick={() => handleEdit(params.row)}>
        //                     <ModeEditIcon color="success" />
        //                 </IconButton>
        //                 <IconButton onClick={() => handleDelete(params.row)}>
        //                     <DeleteOutlineIcon color="error" />
        //                 </IconButton>
        //             </div>
        //         );
        //     },
        // },
    ];


    return (
        <div style={{ width: '100%' }}>
            <DataTable columns={columns} rows={[]} title={'Professions'} actionComponent={<Button
                style={{
                    backgroundColor: "primary",
                    color: "white",
                    borderRadius: "5px",
                    margin: "15px",
                }}
                variant="contained" onClick={handleClickOpen} size="small">Add New Roles</Button>} />
            {/* dialog for editing */}
            <CustomDialog open={openEdit} title={`Edit Profession: ${selectedData.name}`} closeDialog={() => setOpenEdit(false)}>
                <CustomTextField label={`Profession : ${selectedData.name}`} placeHolder={'Enter profession....'} errorText={''} onEdit={(x: any) => console.log(x)} />
                {/* <LoadingButton loading={loader} variant="contained" style={{ backgroundColor: "primary", color: "white", borderRadius: "5px", margin: "10px" }} onClick={handleForm}>Add Record</LoadingButton> */}
            </CustomDialog>


            {/* dialog for adding new district */}
            <CustomDialog open={open} closeDialog={handleClose} title={'New Profession'}>
                <CustomTextField label={'Profession'} error={false} placeHolder={'Enter profession name....'} errorText={''} onEdit={(x: any) => console.log(x)} />
                {/* <LoadingButton loading={loader} variant="contained" style={{ backgroundColor: "primary", color: "white", borderRadius: "5px", margin: "10px" }} onClick={handleForm}>Add Record</LoadingButton> */}
            </CustomDialog>


            {/* dialog for deleting an infection */}
            <CustomDialog
                open={openDelete}
                closeDialog={handleClose}
                title={'Delete District'}
                actions={[
                    {
                        label: 'Cancel',
                        color: 'primary',
                        onClick: async () => {
                            setSnackMsg("Operation Canceled!");
                            setOpenSnack(true);
                            setOpenDelete(false)
                        },
                    }, {
                        label: 'Delete',
                        color: 'error',
                        onClick: async () => {
                            setSnackMsg(`${selectedData.name} deleted successfully.`);
                            setOpenSnack(true);
                            setOpenDelete(false);
                        },
                    }
                ]}
            >
                <center>{`Are you sure you want to delete ${selectedData.name}?`}</center>
            </CustomDialog>

            {/* snackbar for short messages */}

            <Snackbar
                open={openSnack}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={1000}
                onClose={handleClose}
                message={snackMsg}
            />
        </div>
    );
};

export default ProfessionsDataTable;
