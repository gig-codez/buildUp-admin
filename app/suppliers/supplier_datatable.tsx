"use client"
import CustomTextField from "@/components/textfield/custom_textfield";
import {getSuppliers, editSupplier, deleteSupplier} from "@/routes/api.routes";
import {DataTableLayout, EditNodeFunction} from "@/components/Datatable/datatable_layout";

const SupplierDataTable = () => {
    const columns = [
        { field: '_id', headerName: 'Business ID', width: 250 },
        { field: 'business_name', headerName: 'Name', width: 100 },
        { field: 'business_tel', headerName: 'Tel', width: 100},
        { field: 'business_email_address', headerName: 'Email', width: 100},
        { field: 'balance', headerName: 'Balance', width: 100},
        { field: 'supplier_type.name', headerName: 'Supplier Type', width: 100},
        { field: 'createdAt', headerName: 'Date Created', width: 300 },
        { field: 'updatedAt', headerName: 'Date Updated', width: 300 }
    ];

    const editNode: EditNodeFunction = ({setEditedData, editedData, selectedData}) => {
        return <CustomTextField label={"Name : "+selectedData["business_name" as keyof typeof selectedData]} defaultValue={selectedData["business_name" as keyof typeof selectedData]} placeHolder={'Enter name....'} errorText={''} onEdit={(x: string) => setEditedData(x.length>0?x===selectedData["business_name" as keyof typeof selectedData]?{}:{...(editedData.hasOwnProperty("id")?editedData:selectedData), "business_name":x}:{})} />
    }

    return <DataTableLayout columns={columns} getUrl={getSuppliers} editUrl={editSupplier} deleteUrl={deleteSupplier} modelName="Supplier" dataName="business_name" editNode={editNode}/>
}

export default SupplierDataTable;
