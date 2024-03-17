"use client"
import CustomTextField from "@/components/textfield/custom_textfield";
import { RoleTypes } from "@/types/roleTypes";
import {addRole, getRoles, editRole, deleteRole} from "@/routes/api.routes";
import {AddNodeFunction, DataTableLayout, EditNodeFunction} from "@/components/Datatable/datatable_layout";

const RolesDataTable = () => {
    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'createdAt', headerName: 'Date Created', width: 300 },
        { field: 'updatedAt', headerName: 'Date Updated', width: 300 }
    ];

    const editNode: EditNodeFunction = ({setEditedData, editedData, selectedData}) => {
        return <CustomTextField label={"Name : "+selectedData["name" as keyof typeof selectedData]} defaultValue={selectedData["name" as keyof typeof selectedData]} placeHolder={'Enter name....'} errorText={''} onEdit={(x: string) => setEditedData(x.length>0?x===selectedData["name" as keyof typeof selectedData]?{}:{...(editedData.hasOwnProperty("id")?editedData:selectedData), "name":x}:{} as RoleTypes)} />
    }
    const addNode: AddNodeFunction = ({setNewData}) => <CustomTextField label={'Role Name'} error={false} placeHolder={'Enter role name....'} errorText={''} onEdit={(x: string) => setNewData(x.trim().length>0?{name: x}:{})} />

    return <DataTableLayout columns={columns} getUrl={getRoles} addUrl={addRole} editUrl={editRole} deleteUrl={deleteRole} modelName="Role" dataName="name" editNode={editNode} addNode={addNode}/>
}

export default RolesDataTable;
