// Indigo brand palette — matches Flutter & Next.js apps
export const tokensDark = {
  grey: {
    0: "#ffffff",
    10: "#f8fafc",
    50: "#f1f5f9",
    100: "#e2e8f0",
    200: "#cbd5e1",
    300: "#94a3b8",
    400: "#64748b",
    500: "#475569",
    600: "#334155",
    700: "#1e293b",
    800: "#0f172a",
    900: "#020617",
    1000: "#000000",
  },
  primary: {
    // Indigo shades
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5", // brand primary
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
  },
  secondary: {
    // Violet accent
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
  },
};

function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[600],
              light: tokensDark.primary[400],
              dark: tokensDark.primary[800],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[400],
              light: tokensDark.secondary[200],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[400],
            },
            background: {
              default: tokensDark.grey[800],
              alt: tokensDark.grey[700],
              paper: tokensDark.grey[700],
            },
          }
        : {
            primary: {
              ...tokensLight.primary,
              main: tokensDark.primary[600],
              light: tokensDark.primary[100],
              dark: tokensDark.primary[700],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[500],
              light: tokensDark.secondary[200],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[400],
            },
            background: {
              default: tokensDark.grey[10],
              alt: tokensDark.grey[0],
              paper: tokensDark.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 40 },
      h2: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 32 },
      h3: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 24 },
      h4: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 20 },
      h5: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 16 },
      h6: { fontFamily: ["Poppins", "sans-serif"].join(","), fontSize: 14 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          containedPrimary: {
            backgroundColor: tokensDark.primary[600],
            "&:hover": { backgroundColor: tokensDark.primary[700] },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: tokensDark.primary[600],
            color: "#fff",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: ({ theme }) => ({
            border: "none",
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }),
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: ({ theme }) => ({
            "&.Mui-checked": {
              color: theme.palette.common.black,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            },
            "&.Mui-checked + .MuiSwitch-track": {
              backgroundColor: theme.palette.common.black,
            },
          }),
        },
      },
    },
  };
};
