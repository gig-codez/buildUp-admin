import React from 'react';
import { Box } from '@mui/material';
import { SpaceDashboardRounded } from '@mui/icons-material';

/**
 * BuildUp brand mark — indigo→violet gradient tile with the dashboard glyph.
 * Shared by the SideBar header and the Login page.
 */
const BrandMark = ({ size = 38, sx }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: size,
        height: size,
        borderRadius: "12px",
        flexShrink: 0,
        background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 55%, #9333ea 100%)",
        boxShadow: "0 8px 18px -6px rgba(79, 70, 229, 0.55)",
        color: "#fff",
        ...sx,
      }}
    >
      <SpaceDashboardRounded sx={{ fontSize: size * 0.55 }} />
    </Box>
  );
};

export default BrandMark;