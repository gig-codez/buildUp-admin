const apiURL = "http://165.232.121.139/";
// role routes
const getRoles = apiURL + "get/roles";
const addRole = apiURL + "post/add/role";

// professions
const getProfessions = apiURL + "get/admin/profession";
const addProfession = apiURL + "admin/profession";

// suppliers
const getSuppliers = apiURL + "get/suppliers";

// contractors
const getContractors = apiURL + "get/contractors";

export { getRoles, addRole, getProfessions, addProfession, getSuppliers, getContractors };