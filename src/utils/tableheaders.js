export const Businesscolumns = [
    {
      field: "business_name",
      headerName: "Business Name",
      flex: 0.5,
    },
    {
      field: "business_email",
      headerName: "Business Email",
      flex: 0.5,
    },
    {
      field: "tin_number",
      headerName: "TIN Number",
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.5,
    },
    
    {
      field: "employer",
      headerName: "Employer",
      flex: 0.5,
      renderCell: (params) => {
        return params.value ? params.value.first_name : "N/A";
      }
    },
    {
      field: "business_tel",
      headerName: "Business Tel",
      flex: 0.5,
      
    }
  ];
  export const suppliercolumns = [
 
    {
      field: "business_name",
      headerName: "Business Name",
      flex: 0.5,
    },
    {
      field: "business_email_address",
      headerName: "Email",
      flex: 0.5,
    },
    {
      field: "TIN",
      headerName: "TIN",
      flex: 0.5,
    },
    {
      field: "balance",
      headerName: "balance",
      flex: 0.5,
    },
    {
      field: "business_tel",
      headerName: "Phone Number",
      flex: 0.5,
     
    },
    {
      field: "supplier_type",
      headerName: "Supplier Type",
      flex: 1,
      valueGetter: (params) => params.row.supplier_type.name,
    }
  ];
  export const Categorycolumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    
  ];