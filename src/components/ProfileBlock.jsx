import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

const getInitials = (name) =>
  (name || 'A')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');

// Shared profile-avatar + name/occupation block used by both the Navbar
// and the SideBar footer.
const ProfileBlock = ({ user, size = 36, showOccupation = true }) => {
  const name = user?.name || 'Admin';

  return (
    <>
      <Avatar alt={name} sx={{ width: size, height: size, fontSize: size * 0.42, fontWeight: 600 }}>
        {getInitials(name)}
      </Avatar>
      <Box textAlign="left" minWidth={0}>
        <Typography
          fontWeight={600}
          fontSize="0.8125rem"
          color="text.primary"
          noWrap
        >
          {name}
        </Typography>
        {showOccupation && (
          <Typography fontSize="0.6875rem" color="text.disabled" noWrap>
            {user?.occupation || 'Administrator'}
          </Typography>
        )}
      </Box>
    </>
  );
};

export default ProfileBlock;