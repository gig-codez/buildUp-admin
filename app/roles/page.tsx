import { RoleTypes } from '@/types/roleTypes';
import axios from 'axios';
import React from 'react';
import RolesDataTable from './roles_datatable';
import { getRoles } from '@/routes/api.routes';
import { Card, CardContent } from '@mui/material';

const Page = async () => {
    let d = await axios.get(getRoles);
    let roles: RoleTypes[] = await d.data as RoleTypes[];
    return (
        <Card>
            <CardContent>
                <RolesDataTable roles={roles} />
            </CardContent>
        </Card>
    );
};
export default Page;