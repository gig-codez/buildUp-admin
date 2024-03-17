// const apiURL = "https://build-up2.vercel.app/";
const apiURL = "http://127.0.0.1:4000/";
// role routes
const getRoles = apiURL + "get/roles";
const addRole = apiURL + "post/add/role";

const editRole = apiURL + "post/edit/role";
const deleteRole = apiURL + "delete/role/";

// professions
const getProfessions = apiURL + "get/admin/profession";
const addProfession = apiURL + "admin/profession";

// contractors
const getContractors = apiURL + "get/contractors";

// suppliers
const getSuppliers = apiURL + "get/suppliers";
const editSupplier = apiURL + "post/edit/suppliers";
const deleteSupplier = apiURL + "delete/suppliers/";


export { getRoles, addRole, getProfessions, addProfession, getSuppliers, editSupplier, deleteSupplier, getContractors, editRole, deleteRole };