import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import me from "assets/me.jpg";

// Shared profile-avatar + name/occupation block used by both the Navbar
// and the SideBar footer.
const ProfileBlock = ({ user }) => {
    const theme = useTheme();

    return (
        <>
            <Box
                component="img"
                alt="profile"
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
                src={me}
            />
            <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }}>
                    {user?.name}
                </Typography>
                <Typography fontSize="0.8rem">
                    {user?.occupation}
                </Typography>
            </Box>
        </>
    );
};

export default ProfileBlock;
