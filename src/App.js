import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";

///components
import Clients from "scenes/clients";
import Consultants from "scenes/consultants";
import Contractors from "scenes/contractors";
import Roles from "scenes/roles";
import Suppliers from "scenes/suppliers";
import Business from "scenes/business";
import CategoryTypes from "scenes/categoriestype";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* routes */}
              <Route path="/clients" element={<Clients />} />
              <Route path="/consultants" element={<Consultants />} />
              <Route path="/contractors" element={<Contractors />} />
              <Route path="/suppliers" element={<Suppliers />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/categoryTypes" element={<CategoryTypes />} />
              <Route path="/business" element={<Business />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
