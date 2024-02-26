
import React from 'react';
import RolesDataTable from './roles_datatable';

import { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Roles',
    description: 'Roles Page',
};
export default function Page() {
    return (
        <RolesDataTable />
    );
};