import { Card, CardContent } from '@mui/material';
import React from 'react';
import ProfessionsDataTable from './profession_datatable';

const Page = () => {
    return (
        <Card>
            <CardContent>
                <ProfessionsDataTable professions={[]} />
            </CardContent>
        </Card>
    );
};
export default Page;