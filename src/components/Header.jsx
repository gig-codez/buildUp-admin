import { Box, Typography } from '@mui/material';
import React from 'react';

const Header = ({ title, subtitle }) => {
  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        color="text.primary"
        sx={{ letterSpacing: "-0.01em" }}
      >
        {title}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mt: "4px" }}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;