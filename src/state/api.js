import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "state";
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL || "",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().global.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }
  return result;
};

export const api = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
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
    login: build.mutation({
      query: (credentials) => ({
        url: "admin/admin/login",
        method: "POST",
        body: credentials,
      }),
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
  useGetBusinessQuery,
  useGetCategoryQuery,
  useGetProfessionQuery,
  useGetSuppliersQuery,
  useGetRoleQuery,
  useGetClientsQuery,
  useGetContractorsQuery,
  useLoginMutation,
} = api;
