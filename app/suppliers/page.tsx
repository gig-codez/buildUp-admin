import React from 'react';
import { Metadata } from "next";
import SupplierDataTable from "@/app/suppliers/supplier_datatable";
export const metadata: Metadata = {
    title: 'Suppliers',
    description: 'Suppliers Page',
};
export default function Page() {
    return (
        <SupplierDataTable />
    );
};