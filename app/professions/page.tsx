import { Card, CardContent } from '@mui/material';
import { Metadata } from 'next';
import React from 'react';
import ProfessionsDataTable from './profession_datatable';
export const metadata: Metadata = {
    title: 'Professions',
    description: 'Professions Page',
}
const Page = () => {
    return (
     <ProfessionsDataTable />
    );
};
export default Page;