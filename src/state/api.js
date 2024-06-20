import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

console.log("REACT_APP_BASE_URL:", process.env.REACT_APP_BASE_URL);

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL || "" }),
  reducerPath: "adminApi",
  tagTypes: [
    "Business",
    "Supplier",
    "Clients",
    "Professional",
    "Consultants",
    "Contractors",
    "User",
    "Geography",
    "Sales",
    "Admin",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getBusiness: build.query({
      query: () => `get/business`,
      providesTags: ["Business"],
    }),

    getSuppliers: build.query({
      query: () => `get/suppliers`,
      providesTags: ["Supplier"],
    }),
    getClients: build.query({
      query: () => `get/employers`,
      providesTags: ["Clients"],
    }),
    getContractors: build.query({
      query: () => `get/contractors`,
      providesTags: ["Contractors"],
    }),
    getProfession: build.query({
      query: () => `get/admin/profession`,
      providesTags: ["Profession"],
    }),
    getCategory: build.query({
      query: () => `get/admin/supplier-type`,
      providesTags: ["Profession"],
    }),
    getRole: build.query({
      query: () => `get/roles`,
      providesTags: ["Role"],
    }),
    getProducts: build.query({
      query: () => `client/product`,
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => `client/customer`,
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transaction",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => `client/geography`,
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => `sales/sales`,
      providesTags: ["Sales"],
    }),
    getUser: build.query({
      query: () => `management/admin`,
      providesTags: ["Admin"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/affiliates/${id}`,
      providesTags: ["Performance"],
    }),
    getGeneralDashboard: build.query({
      query: () => `general/dashboard`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetGeneralDashboardQuery,
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminUsersQuery,
  useGetUserPerformanceQuery,

  //nequeries
  useGetBusinessQuery,
  useGetCategoryQuery,
  useGetProfessionQuery,
  useGetSuppliersQuery,
  useGetRoleQuery,
  useGetClientsQuery,
  useGetContractorsQuery
} = api;
