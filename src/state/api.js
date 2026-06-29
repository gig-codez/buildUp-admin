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
    "Profession",
    "Suppliertypes",
    "Deals",
    "ContactRequests",
    "Messages",
    "Orders",
    "Role",
    "account",
    "newSupplierTypes",
    "Revenue",
    "EscrowFees",
    "WalletTransactions",
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
    getCategory: build.query({
      query: () => `get/admin/supplier-type`,
      providesTags: ["Profession"],
    }),
    getRole: build.query({
      query: () => `get/roles`,
      providesTags: ["Role"],
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: "admin/admin/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // supplier types
    getSuppliertypes: build.query({
      query: () => `get/admin/supplier-type`,
      providesTags: ["Suppliertypes"],
    }),
    createSuppliertypes: build.mutation({
      query: (newSupplierTypes) => ({
        url: `admin/supplier-type`,
        method: "POST",
        body: newSupplierTypes,
      }),
      invalidatesTags: ["newSupplierTypes"],
    }),
    // supplier deals
    getDeals: build.query({
      query: () => `get/deals`,
      providesTags: ["Deals"],
    }),
    addDeals: build.mutation({
      query: (newDeal) => ({
        url: `post/deals/add`,
        method: "POST",
        body: newDeal,
      }),
      invalidatesTags: ["Deals"],
    }),
    deleteDeals: build.mutation({
      query: (id) => ({
        url: `delete/deals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Deals"],
    }),
    // professional
    getProfession: build.query({
      query: () => `get/admin/profession`,
      providesTags: ["Profession"],
    }),
    createProfession: build.mutation({
      query: (newProfession) => ({
        url: `admin/profession`,
        method: "POST",
        body: newProfession,
      }),
      invalidatesTags: ["Profession"],
    }),
    deleteProfession: build.mutation({
      query: (id) => ({
        url: `delete/admin/profession/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profession"],
    }),

    //activate
    activateUser: build.mutation({
      query: (id) => ({
        url: `admin/reactivate/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["account"],
    }),
    deactivateUser: build.mutation({
      query: (id) => ({
        url: `admin/deactivate/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["account"],
    }),
    ///consultants
    getConsultants: build.query({
      query: () => `get/consultants`,
      providesTags: ["Consultants"],
    }),
  
  // ── Admin Revenue ────────────────────────────────────────────────────────
 
    // Summary stats: wallet balances + escrow overview
    getRevenueStats: build.query({
      query: () => `admin-revenue/stats`,
      providesTags: ["Revenue"],
    }),
 
    // Paginated list of all escrows with fee info
    getEscrowFees: build.query({
      query: (status = "") =>
        status ? `admin-revenue/escrow-fees?status=${status}` : `admin-revenue/escrow-fees`,
      providesTags: ["EscrowFees"],
    }),
 
    // Admin wallet transaction history
    getWalletTransactions: build.query({
      query: () => `admin-revenue/transactions`,
      providesTags: ["WalletTransactions"],
    }),
 
    // Admin initiates a withdrawal to mobile money
    initiateAdminWithdrawal: build.mutation({
      query: (body) => ({
        url: `admin-revenue/withdraw`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Revenue", "WalletTransactions"],
    }),

    // ── Contact Requests (client → admin → contractor routing) ────────────
    getContactRequests: build.query({
      query: (status = "") =>
        status ? `admin/contact-requests?status=${status}` : `admin/contact-requests`,
      providesTags: ["ContactRequests"],
    }),
    updateContactRequestStatus: build.mutation({
      query: ({ id, status, adminNote }) => ({
        url: `admin/contact-requests/${id}/status`,
        method: "PATCH",
        body: { status, adminNote },
      }),
      invalidatesTags: ["ContactRequests"],
    }),

    // ── Message Inbox (all comms route through admin) ─────────────────────
    getAdminMessages: build.query({
      query: ({ status = "", page = 1, limit = 50 } = {}) => {
        const params = new URLSearchParams({ page, limit });
        if (status) params.set("status", status);
        return `admin/messages?${params}`;
      },
      providesTags: ["Messages"],
    }),
    forwardMessage: build.mutation({
      query: ({ id, admin_note = "" }) => ({
        url: `admin/messages/${id}/forward`,
        method: "PATCH",
        body: { admin_note },
      }),
      invalidatesTags: ["Messages"],
    }),
    rejectMessage: build.mutation({
      query: ({ id, admin_note = "" }) => ({
        url: `admin/messages/${id}/reject`,
        method: "PATCH",
        body: { admin_note },
      }),
      invalidatesTags: ["Messages"],
    }),

    // ── Orders (all platform orders) ──────────────────────────────────────
    getAllOrders: build.query({
      query: (status = "") =>
        status ? `orders/all?status=${status}` : `orders/all`,
      providesTags: ["Orders"],
    }),
    updateOrderStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `orders/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetBusinessQuery,
  useGetCategoryQuery,
  useGetProfessionQuery,
  useGetSuppliersQuery,
  useGetRoleQuery,
  useGetClientsQuery,
  useGetContractorsQuery,
  useLoginMutation,
  useCreateProfessionMutation,
  useDeleteProfessionMutation,
  useCreateSuppliertypesMutation,
  useGetSuppliertypesQuery,
  useAddDealsMutation,
  useDeleteDealsMutation,
  useGetDealsQuery,
  useActivateUserMutation,
  useDeactivateUserMutation,
  useGetConsultantsQuery,
    // Revenue hooks
  useGetRevenueStatsQuery,
  useGetEscrowFeesQuery,
  useGetWalletTransactionsQuery,
  useInitiateAdminWithdrawalMutation,
  useGetContactRequestsQuery,
  useUpdateContactRequestStatusMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetAdminMessagesQuery,
  useForwardMessageMutation,
  useRejectMessageMutation,
} = api;
