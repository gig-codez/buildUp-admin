"use client"
import {ReactNode, useEffect, useState} from "react";

import {Button, Snackbar, IconButton, LinearProgress} from "@mui/material";
import DataTable from "@/components/Datatable/datatable";
import CustomDialog from "@/components/custom_dialog/custom_dialog";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios, { AxiosResponse } from "axios";
import Box from "@mui/material/Box";
import RequestButton from "@/components/buttons/requestButton";
import $ from "jquery";

interface EditNodeParams{
    setEditedData: Function,
    editedData: object,
    selectedData: object
}

interface AddNodeParams{
    setNewData: Function,
    newData: object
}

type EditNodeFunction = (a:EditNodeParams) => ReactNode;

type AddNodeFunction = ({setNewData, newData}:AddNodeParams) => ReactNode;
const DataTableLayout = ({modelName, dataName, columns, getUrl, addUrl, editUrl, deleteUrl, editNode, addNode}:{columns: {}[], getUrl: string, addUrl?: string, editUrl: string, deleteUrl: string, modelName: string, dataName: string, editNode: EditNodeFunction, addNode?: AddNodeFunction}) => {

    // useful hooks
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState({} as object);
    const [editedData, setEditedData] = useState({});
    const [newData, setNewData] = useState({})
    const [data, setData] = useState([]);
    const [openSnack, setOpenSnack] = useState(false);
    const [snackMsg, setSnackMsg] = useState("");
    const [isFetched, setIsFetched] = useState(false)

    // helper functions
    function handleEdit(row: object) {
        setOpenEdit(true);
        setSelectedData(row);
        setEditedData({});
    }

    function displayMsg(msg: string){
        setSnackMsg(msg);
        setOpenSnack(true);
    }

    function handleDelete(row: object) {
        setOpenDelete(true);
        setSelectedData(row);
    }

    const handleClickOpen = () => {
        setNewData({})
        setOpenAdd(true);
    };

    useEffect(() => {
        if (isFetched) return
        axios.get(getUrl).then((response)=>{
            setData(response.data.data);
            setIsFetched(true);
        }).catch((error)=>{
            console.log(error)
        })
    }, [isFetched]);

    const saveNewData = async () => {
        // handle adding data
        setLoading(true)
        let response: AxiosResponse<any, any>;
        axios.post(addUrl!, newData).then((res)=>{
            response = res;
        }).catch((error)=>{
            response = error.response;
        }).finally(()=>{
            displayMsg(response.data.message);
            setLoading(false);
            if (response.status == 200) {
                setOpenAdd(false)
                setIsFetched(false)
            }
        })
    };

    const editData = async () => {
        // handle editing data
        setLoading(true)
        let response: AxiosResponse<any, any>;
        axios.post(editUrl!, editedData).then((res)=>{
            response = res;
        }).catch((error)=>{
            response = error.response;
        }).finally(()=>{
            displayMsg(response.data.message);
            setLoading(false);
            if (response.status == 200) {
                setOpenEdit(false)
                setIsFetched(false)
            }
        })
    };

    const deleteData = async () =>{
        setLoading(true)
        let response: AxiosResponse<any, any>;
        axios.delete(deleteUrl+selectedData["_id" as keyof typeof selectedData]).then((res)=>{
            response = res;
        }).catch((error)=>{
            console.log(error)
            response = error.response;
        }).finally(()=>{
            displayMsg(response.data.message);
            setLoading(false);
            if (response.status == 200) {
                setOpenDelete(false)
                setIsFetched(false)
            }
        })
    }

    // end of helper functions
    const actions = {
        field: 'actions',
        headerName: 'Actions',
        renderCell: (params: any) => {
            // Define your action buttons or menu
            return (
                <div>
                    <IconButton onClick={() => handleEdit(params.row)}>
                        <ModeEditIcon color="success" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(params.row)}>
                        <DeleteOutlineIcon color="error" />
                    </IconButton>
                </div>
            );
        },
    };

    return (
        <div style={{ width: '100%' }}>
            {isFetched ? <DataTable rows={data} title={modelName+"s"} columns={[...columns, actions]} actionComponent={
                (addUrl!==undefined&&addNode!==undefined)?<Button
                    style={{
                        backgroundColor: "primary",
                        color: "white",
                        borderRadius: "5px",
                        margin: "15px",
                    }}
                    variant="contained" onClick={handleClickOpen} size="small">Add New {modelName}</Button>: <></>} /> :
                <p>Loading {modelName+"s"}....</p>
            }

            {/*dialog for editing */}
            {openEdit && <CustomDialog open={true} title={`Edit ${modelName}: ${selectedData[dataName as keyof typeof selectedData]}`} closeDialog={() => {if(!loading) setOpenEdit(false)}}>
                {editNode({setEditedData, editedData, selectedData})}
                {!$.isEmptyObject(editedData)&&<RequestButton onClick={editData} loading={loading}>SAVE</RequestButton>}
            </CustomDialog>}


            {/*dialog for adding new data */}
            {openAdd&&<CustomDialog open={true} closeDialog={()=>{if(!loading) setOpenAdd(false)}} title={`New ${modelName}`}>
                {addNode!({setNewData, newData})}
                {!$.isEmptyObject(newData)&&<RequestButton onClick={saveNewData} loading={loading}>SAVE</RequestButton>}
            </CustomDialog>}


            {/* dialog for deleting an infection */}
            {openDelete&&(!loading)&&<CustomDialog
                open={true}
                closeDialog={()=>{ if(!loading) setOpenDelete(false)}}
                title={`Delete ${modelName}`}
                actions={[
                    {
                        label: 'Cancel',
                        color: 'primary',
                        onClick: async () => {
                            displayMsg("Operation Canceled!");
                            setOpenDelete(false)
                        },
                    }, {
                        label: 'Delete',
                        color: 'error',
                        onClick: deleteData,
                    }
                ]}
            >
              <center>{`Are you sure you want to delete ${selectedData[dataName as keyof typeof selectedData]}?`}</center>
            </CustomDialog>}

            {/*if deleting in action*/}
            {openDelete&&(loading)&&<CustomDialog
                open={true}
                closeDialog={()=>{ if(!loading) setOpenDelete(false)}}
                title={"Deleting "+selectedData[dataName as keyof typeof selectedData]}
            >
              <center><Box style={{width: "100%"}} >
                <LinearProgress color="error"/>
              </Box></center>
            </CustomDialog>}

            {/*snackbar for short messages */}

            <Snackbar
                open={openSnack}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                autoHideDuration={2000}
                onClose={()=>setOpenSnack(false)}
                message={snackMsg}
            />
        </div>
    );
};

export {DataTableLayout};
export type { EditNodeFunction, AddNodeFunction};

