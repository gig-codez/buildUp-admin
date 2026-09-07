import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";

const StatBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Box
      component="article"
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1.25rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      border={`1px solid ${theme.palette.divider}`}
      borderRadius="14px"
      boxShadow={
        isDark
          ? "0 10px 30px -12px rgba(0,0,0,0.5)"
          : "0 10px 30px -14px rgba(15,23,42,0.16)"
      }
      sx={{
        transition: "transform 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: isDark
            ? "0 16px 38px -12px rgba(0,0,0,0.55)"
            : "0 16px 38px -14px rgba(79,70,229,0.28)",
        },
      }}
    >
      <FlexBetween>
        <Typography
          variant="overline"
          sx={{ color: theme.palette.text.disabled, letterSpacing: "0.09em" }}
        >
          {title}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 40,
            height: 40,
            borderRadius: "12px",
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight={700}
        sx={{ color: "text.primary", fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </Typography>

      <FlexBetween gap="0.75rem" minHeight="20px">
        {increase && (
          <Typography
            variant="caption"
            fontWeight={600}
            sx={{ color: theme.palette.success.main }}
          >
            {increase}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" noWrap>
          {description}
        </Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;