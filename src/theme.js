import { alpha } from "@mui/material/styles";

// ─────────────────────────────────────────────────────────────────────────────
// BuildUp brand tokens — indigo (#4f46e5) + slate neutrals + Inter.
// Mirrors the design language of buildup-web (globals.css) and the Flutter app.
// ─────────────────────────────────────────────────────────────────────────────

// Neutral "grey" scale (slate-based). Exposed via palette.grey and backgrounds.
export const tokensDark = {
  grey: {
    0: "#0b1120",
    10: "#0f172a",
    50: "#1e293b",
    100: "#334155",
    200: "#3f506e",
    300: "#475569",
    400: "#64748b",
    500: "#94a3b8",
    600: "#cbd5e1",
    700: "#e2e8f0",
    800: "#f1f5f9",
    900: "#f8fafc",
    1000: "#ffffff",
  },
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  secondary: {
    // Numeric slots double as the *text* ramp in dark mode.
    100: "#f1f5f9",
    200: "#cbd5e1",
    300: "#64748b",
    400: "#475569",
    500: "#334155",
  },
  success: { main: "#34d399", light: "#052e16", dark: "#10b981" },
  warning: { main: "#fbbf24", light: "#431407", dark: "#f59e0b" },
  info: { main: "#60a5fa", light: "#082f49", dark: "#3b82f6" },
  error: { main: "#f87171", light: "#450a0a", dark: "#ef4444" },
  text: { primary: "#f1f5f9", secondary: "#94a3b8", disabled: "#64748b" },
  background: { default: "#0f172a", alt: "#1e293b", paper: "#111827" },
};

export const tokensLight = {
  grey: {
    0: "#ffffff",
    10: "#f7f8fc",
    50: "#f1f5f9",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    1000: "#0b0f1a",
  },
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  secondary: {
    // Numeric slots double as the *text* ramp in light mode.
    100: "#0f172a",
    200: "#475569",
    300: "#94a3b8",
    400: "#cbd5e1",
    500: "#e2e8f0",
  },
  success: { main: "#059669", light: "#d1fae5", dark: "#047857" },
  warning: { main: "#d97706", light: "#fef3c7", dark: "#b45309" },
  info: { main: "#2563eb", light: "#dbeafe", dark: "#1d4ed8" },
  error: { main: "#dc2626", light: "#fee2e2", dark: "#b91c1c" },
  text: { primary: "#0f172a", secondary: "#475569", disabled: "#94a3b8" },
  background: { default: "#f7f8fc", alt: "#ffffff", paper: "#ffffff" },
};

export const themeSettings = (mode) => {
  const dark = mode === "dark";
  const tokens = dark ? tokensDark : tokensLight;

  const primaryMain = dark ? tokens.primary[500] : tokens.primary[600];
  const primaryHover = dark ? tokens.primary[400] : tokens.primary[700];
  // Violet accent used for `secondary`-colored MUI semantics (badges, chips…).
  const secondaryMain = dark ? "#a855f7" : "#9333ea";

  const fontFamily = '"Inter", "Segoe UI", system-ui, -apple-system, sans-serif';

  return {
    palette: {
      mode,
      primary: {
        ...tokens.primary,
        main: primaryMain,
        light: dark ? tokens.primary[300] : tokens.primary[50],
        dark: primaryHover,
        contrastText: "#ffffff",
      },
      secondary: {
        ...tokens.secondary,
        main: secondaryMain,
        light: dark ? "#d8b4fe" : "#e9d5ff",
        dark: dark ? "#7e22ce" : "#7e22ce",
        contrastText: "#ffffff",
      },
      neutral: {
        ...tokens.grey,
        main: tokens.grey[500],
      },
      grey: tokens.grey,
      divider: tokens.grey[200],
      text: tokens.text,
      background: tokens.background,
      action: {
        hover: alpha(dark ? "#ffffff" : "#0f172a", 0.05),
        selected: alpha(primaryMain, 0.12),
        focus: alpha(primaryMain, 0.18),
        disabledBackground: tokens.grey[100],
      },
      success: tokens.success,
      warning: tokens.warning,
      info: tokens.info,
      error: tokens.error,
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily,
      fontSize: 14,
      fontWeightLight: 400,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      h1: { fontFamily, fontWeight: 600, fontSize: "1.875rem", lineHeight: 1.25, letterSpacing: "-0.025em" },
      h2: { fontFamily, fontWeight: 600, fontSize: "1.625rem", lineHeight: 1.25, letterSpacing: "-0.02em" },
      h3: { fontFamily, fontWeight: 600, fontSize: "1.375rem", lineHeight: 1.3, letterSpacing: "-0.015em" },
      h4: { fontFamily, fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.35, letterSpacing: "-0.01em" },
      h5: { fontFamily, fontWeight: 600, fontSize: "1.0625rem", lineHeight: 1.4 },
      h6: { fontFamily, fontWeight: 600, fontSize: "0.9375rem", lineHeight: 1.45 },
      subtitle1: { fontFamily, fontWeight: 500, fontSize: "0.9375rem", lineHeight: 1.5 },
      subtitle2: { fontFamily, fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.5 },
      body1: { fontFamily, fontWeight: 400, fontSize: "0.875rem", lineHeight: 1.5 },
      body2: { fontFamily, fontWeight: 400, fontSize: "0.8125rem", lineHeight: 1.55 },
      button: { fontFamily, fontWeight: 600, fontSize: "0.875rem", lineHeight: 1.45 },
      caption: { fontFamily, fontWeight: 500, fontSize: "0.75rem", lineHeight: 1.4 },
      overline: { fontFamily, fontWeight: 600, fontSize: "0.6875rem", lineHeight: 1.35, letterSpacing: "0.12em", textTransform: "uppercase" },
    },
    components: {
      // Global baseline — background, text, scrollbars, selection, reduced motion.
      MuiCssBaseline: {
        styleOverrides: {
          "*": { boxSizing: "border-box" },
          html: { WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" },
          body: {
            backgroundColor: tokens.background.default,
            color: tokens.text.primary,
            fontFamily,
            backgroundImage: `radial-gradient(1200px 500px at 100% 0%, ${alpha(primaryMain, dark ? 0.08 : 0.05)}, transparent 60%)`,
            backgroundAttachment: "fixed",
          },
          "::selection": { backgroundColor: alpha(primaryMain, 0.22), color: tokens.text.primary },
          "::-webkit-scrollbar": { width: 8, height: 8 },
          "::-webkit-scrollbar-track": { backgroundColor: "transparent" },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: alpha(tokens.grey[400], 0.4),
            borderRadius: 9999,
            "&:hover": { backgroundColor: alpha(tokens.grey[400], 0.65) },
          },
          "@media (prefers-reduced-motion: reduce)": {
            "*": {
              animationDuration: "0.01ms !important",
              animationIterationCount: "1 !important",
              transitionDuration: "0.01ms !important",
            },
          },
        },
      },

      // ─── Buttons ────────────────────────────────────────────────────────────
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: ({ theme }) => ({
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
            whiteSpace: "nowrap",
            "&.Mui-disabled": { opacity: 0.55 },
          }),
          sizeSmall: { fontSize: "0.75rem", padding: "5px 12px" },
          sizeMedium: { fontSize: "0.8125rem", padding: "8px 16px", minHeight: 38 },
          sizeLarge: { fontSize: "0.875rem", padding: "10px 22px", minHeight: 44 },
          contained: ({ theme }) => ({
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.text.primary,
            "&:hover": { backgroundColor: theme.palette.grey[200] },
          }),
          containedPrimary: ({ theme }) => ({
            backgroundColor: primaryMain,
            color: "#ffffff",
            boxShadow: `0 10px 22px -8px ${alpha(primaryMain, 0.6)}`,
            "&:hover": {
              backgroundColor: primaryHover,
              boxShadow: `0 12px 26px -8px ${alpha(primaryMain, 0.7)}`,
            },
          }),
          outlined: ({ theme }) => ({
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
            "&:hover": { backgroundColor: alpha(theme.palette.text.primary, 0.04), borderColor: theme.palette.grey[300] },
          }),
          outlinedPrimary: ({ theme }) => ({
            borderColor: alpha(primaryMain, 0.5),
            "&:hover": { borderColor: primaryMain, backgroundColor: alpha(primaryMain, 0.06) },
          }),
          text: ({ theme }) => ({
            color: theme.palette.text.secondary,
            "&:hover": { backgroundColor: alpha(theme.palette.text.primary, 0.04) },
          }),
          textPrimary: ({ theme }) => ({
            color: primaryMain,
            "&:hover": { backgroundColor: alpha(primaryMain, 0.08) },
          }),
        },
      },

      // ─── Chip (soft status chips) ─────────────────────────────────────────
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            const isDefault = ownerState.color === "default";
            const filled = ownerState.variant === "filled";
            if (filled && !isDefault) {
              const c = theme.palette[ownerState.color].main;
              return {
                fontWeight: 600,
                fontSize: "0.75rem",
                height: 26,
                borderRadius: "6px",
                backgroundColor: alpha(c, 0.12),
                color: c,
                "& .MuiChip-deleteIcon": { color: alpha(c, 0.7) },
              };
            }
            if (filled && isDefault) {
              return {
                fontWeight: 600,
                fontSize: "0.75rem",
                height: 26,
                borderRadius: "6px",
                backgroundColor: theme.palette.grey[100],
                color: theme.palette.text.secondary,
              };
            }
            return {
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 26,
              borderRadius: "6px",
            };
          },
        },
      },

      // ─── DataGrid (tables) ─────────────────────────────────────────────────
      MuiDataGrid: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 12,
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.text.primary,
            fontSize: "0.8125rem",
            "& .MuiDataGrid-main": { borderRadius: 12 },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: dark ? theme.palette.grey[50] : theme.palette.grey[50],
              color: theme.palette.text.secondary,
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderBottom: `1px solid ${theme.palette.divider}`,
            },
            "& .MuiDataGrid-columnHeader": { padding: "0 14px" },
            "& .MuiDataGrid-columnHeaderTitle": { fontWeight: 600 },
            "& .MuiDataGrid-columnSeparator": { display: "none" },
            "& .MuiDataGrid-cell": {
              padding: "0 14px",
              borderBottom: `1px solid ${dark ? alpha(theme.palette.divider, 0.55) : alpha(theme.palette.divider, 0.8)}`,
              color: theme.palette.text.primary,
              whiteSpace: "nowrap",
            },
            "& .MuiDataGrid-cell--textLeft": { fontWeight: 400 },
            "& .MuiDataGrid-row": {
              transition: "background-color 120ms ease",
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, dark ? 0.12 : 0.06),
              },
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: `1px solid ${theme.palette.divider}`,
              backgroundColor: "transparent",
              color: theme.palette.text.secondary,
              minHeight: 54,
            },
            "& .MuiTablePagination-root": { color: theme.palette.text.secondary },
            "& .MuiDataGrid-overlay": { backgroundColor: alpha(theme.palette.background.alt, 0.9) },
            "& .MuiDataGrid-toolbarContainer": {
              padding: "10px 12px",
              borderBottom: `1px solid ${theme.palette.divider}`,
              "& > .MuiButton-text": { color: primaryMain },
            },
          }),
        },
      },

      // ─── Surfaces ──────────────────────────────────────────────────────────
      MuiPaper: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundImage: "none",
            backgroundColor: theme.palette.background.paper,
          }),
          rounded: ({ theme }) => ({ borderRadius: 12 }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 12,
            boxShadow: `0 6px 20px -6px ${alpha(dark ? "#000000" : "#0f172a", 0.12)}`,
          }),
        },
      },

      // ─── Form controls ─────────────────────────────────────────────────────
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: "10px",
            backgroundColor: theme.palette.background.paper,
            fontSize: "0.875rem",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.grey[300],
              transition: "border-color 150ms ease, box-shadow 150ms ease",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.grey[400],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: primaryMain,
              borderWidth: 1,
              boxShadow: `0 0 0 3px ${alpha(primaryMain, 0.15)}`,
            },
            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.error.main,
            },
          }),
          input: ({ theme }) => ({ color: theme.palette.text.primary, "&::placeholder": { color: theme.palette.text.disabled } }),
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({ color: theme.palette.text.secondary, "&.Mui-focused": { color: primaryMain } }),
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontSize: "0.875rem",
            borderRadius: "8px",
            margin: "0 6px",
            padding: "8px 12px",
            "&.Mui-selected": {
              backgroundColor: alpha(primaryMain, 0.12),
              color: primaryMain,
              "&:hover": { backgroundColor: alpha(primaryMain, 0.16) },
            },
          }),
        },
      },
      MuiSelect: {
        styleOverrides: { select: ({ theme }) => ({ color: theme.palette.text.primary }) },
      },
      MuiCheckbox: {
        styleOverrides: { root: ({ theme }) => ({ color: theme.palette.text.secondary, "&.Mui-checked": { color: primaryMain } }) },
      },

      // ─── Switch ────────────────────────────────────────────────────────────
      MuiSwitch: {
        styleOverrides: {
          root: { width: 46, height: 26 },
          thumb: { width: 18, height: 18, boxShadow: "none" },
          switchBase: {
            padding: 4,
            "&.Mui-checked": {
              transform: "translateX(20px)",
              "& + .MuiSwitch-track": { opacity: 1, backgroundColor: primaryMain },
            },
          },
          track: ({ theme }) => ({ borderRadius: 999, opacity: 1, backgroundColor: theme.palette.grey[300] }),
        },
      },

      // ─── Menu / Dialog ─────────────────────────────────────────────────────
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: "12px",
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: `0 18px 44px -12px ${alpha(dark ? "#000000" : "#0f172a", 0.3)}`,
            padding: "6px",
          }),
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: ({ theme }) => ({
            borderRadius: "16px",
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: `0 24px 60px -16px ${alpha(dark ? "#000000" : "#0f172a", 0.4)}`,
          }),
        },
      },
      MuiDialogTitle: { styleOverrides: { root: { fontWeight: 600, fontSize: "1.0625rem" } } },
      MuiDialogContent: { styleOverrides: { root: { "& .MuiDialogContentText-root": { color: "inherit" } } } },
      MuiDialogActions: {
        styleOverrides: { root: { padding: "12px 24px 20px" } },
      },

      // ─── Tooltip ───────────────────────────────────────────────────────────
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: dark ? tokens.grey[100] : "#1e293b",
            color: dark ? "#0f172a" : "#ffffff",
            fontSize: "0.75rem",
            borderRadius: "6px",
            padding: "6px 10px",
          },
          arrow: { color: dark ? tokens.grey[100] : "#1e293b" },
        },
      },

      // ─── App bar / Drawer ──────────────────────────────────────────────────
      MuiAppBar: { styleOverrides: { root: { background: "transparent", boxShadow: "none" } } },
      MuiDrawer: {
        styleOverrides: { paper: ({ theme }) => ({ borderRight: `1px solid ${theme.palette.divider}` }) },
      },

      // ─── Table (html tables) ───────────────────────────────────────────────
      MuiTable: { styleOverrides: { root: { borderCollapse: "separate", borderSpacing: 0 } } },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `1px solid ${dark ? alpha(theme.palette.divider, 0.55) : theme.palette.divider}`,
            color: theme.palette.text.primary,
            fontSize: "0.8125rem",
          }),
          head: ({ theme }) => ({
            backgroundColor: theme.palette.grey[50],
            color: theme.palette.text.secondary,
            fontWeight: 600,
            fontSize: "0.7rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }),
        },
      },
      MuiTableRow: {
        styleOverrides: { root: ({ theme }) => ({ "&:hover": { backgroundColor: alpha(theme.palette.primary.main, dark ? 0.12 : 0.06) } }) },
      },

      // ─── Tabs ──────────────────────────────────────────────────────────────
      MuiTab: {
        styleOverrides: {
          root: ({ theme }) => ({
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.8125rem",
            color: theme.palette.text.secondary,
            "&.Mui-selected": { color: primaryMain },
          }),
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: { backgroundColor: primaryMain, height: 3, borderRadius: "3px 3px 0 0" },
        },
      },

      // ─── Misc ──────────────────────────────────────────────────────────────
      MuiDivider: { styleOverrides: { root: ({ theme }) => ({ borderColor: theme.palette.divider }) } },
      MuiAvatar: {
        styleOverrides: {
          root: { backgroundColor: primaryMain, color: "#ffffff", fontWeight: 600 },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.text.secondary,
            "&:hover": { backgroundColor: alpha(theme.palette.text.primary, 0.06) },
          }),
        },
      },
      MuiBadge: { styleOverrides: { badge: { fontWeight: 700 } } },
      MuiAlert: {
        styleOverrides: {
          root: ({ theme }) => ({ borderRadius: "10px", fontSize: "0.8125rem" }),
          standardSuccess: ({ theme }) => ({ backgroundColor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.dark === theme.palette.success.main ? theme.palette.success.main : theme.palette.success.dark || theme.palette.success.main }),
          standardInfo: ({ theme }) => ({ backgroundColor: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.main }),
          standardWarning: ({ theme }) => ({ backgroundColor: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.main }),
          standardError: ({ theme }) => ({ backgroundColor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main }),
        },
      },
      MuiSkeleton: {
        styleOverrides: {
          root: ({ theme }) => ({ backgroundColor: alpha(theme.palette.text.primary, 0.08) }),
        },
      },
    },
  };
};