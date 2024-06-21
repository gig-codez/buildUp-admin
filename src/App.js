import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import "react-toastify/dist/ReactToastify.css";

///components
import Clients from "scenes/clients";
import Consultants from "scenes/consultants";
import Contractors from "scenes/contractors";
import Roles from "scenes/roles";
import Suppliers from "scenes/suppliers";
import Business from "scenes/business";
import CategoryTypes from "scenes/categoriestype";
import Login from "scenes/login";
import PrivateRoute from "components/PrivateRoute";
import Professional from "scenes/profesional";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute element={<Dashboard />} />}
              />
              {/* protected routes */}
              <Route
                path="/clients"
                element={<PrivateRoute element={<Clients />} />}
              />
              <Route
                path="/consultants"
                element={<PrivateRoute element={<Consultants />} />}
              />
              <Route
                path="/contractors"
                element={<PrivateRoute element={<Contractors />} />}
              />
              <Route
                path="/suppliers"
                element={<PrivateRoute element={<Suppliers />} />}
              />
              <Route
                path="/roles"
                element={<PrivateRoute element={<Roles />} />}
              />
              <Route
                path="/categoryTypes"
                element={<PrivateRoute element={<CategoryTypes />} />}
              />
              <Route
                path="/business"
                element={<PrivateRoute element={<Business />} />}
              />
              <Route
                path="/professional"
                element={<PrivateRoute element={<Professional />} />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
