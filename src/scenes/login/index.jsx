import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'state/api';
import { loginSuccess } from "state"
import {
  TextField, Button, Box, Typography, Avatar, CircularProgress, useTheme,
  useMediaQuery,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { toast } from 'react-toastify';
import BrandMark from 'components/BrandMark';
import { Groups2Outlined, StorefrontOutlined, AccountBalanceWalletOutlined } from '@mui/icons-material';

const highlights = [
  { icon: <Groups2Outlined />, title: "Participants", text: "Clients, contractors, consultants and suppliers" },
  { icon: <StorefrontOutlined />, title: "Marketplace", text: "Jobs, products and orders across the platform" },
  { icon: <AccountBalanceWalletOutlined />, title: "Revenue", text: "Escrow fees, wallets and admin payouts" },
];

const Login = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:900px)');
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      dispatch(loginSuccess(response));
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Box display="flex" minHeight="100vh">
      {/* ── Brand panel (desktop) ── */}
      {isDesktop && (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          flex="1 1 46%"
          p="3.5rem"
          sx={{
            background: "linear-gradient(150deg, #312e81 0%, #4f46e5 45%, #7c3aed 80%, #9333ea 100%)",
            color: "#fff",
          }}
        >
          <Box display="flex" alignItems="center" gap="0.9rem">
            <BrandMark size={46} sx={{ background: "rgba(255,255,255,0.16)", boxShadow: "none", backdropFilter: "blur(4px)" }} />
            <Box>
              <Typography variant="h5" fontWeight={700} lineHeight={1.1}>BuildUp</Typography>
              <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)" }}>Admin Console</Typography>
            </Box>
          </Box>

          <Box maxWidth="440px">
            <Typography variant="h2" fontWeight={600} sx={{ letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Run the entire marketplace from one place.
            </Typography>
            <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,0.8)", fontSize: "0.9375rem", lineHeight: 1.6 }}>
              Moderate communication, track escrow revenue, and manage every participant in the BuildUp ecosystem.
            </Typography>

            <Box mt="2.5rem" display="flex" flexDirection="column" gap="1.25rem">
              {highlights.map(({ icon, title, text }) => (
                <Box key={title} display="flex" gap="0.9rem" alignItems="flex-start">
                  <Avatar sx={{ width: 40, height: 40, bgcolor: "rgba(255,255,255,0.16)", color: "#fff" }}>
                    {icon}
                  </Avatar>
                  <Box>
                    <Typography fontWeight={600} fontSize="0.9375rem">{title}</Typography>
                    <Typography fontSize="0.8125rem" sx={{ color: "rgba(255,255,255,0.7)" }}>{text}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)" }}>
            © {new Date().getFullYear()} BuildUp Uganda — internal tools
          </Typography>
        </Box>
      )}

      {/* ── Form panel ── */}
      <Box
        flex="1 1 54%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={{ xs: "1.5rem", sm: "3rem" }}
      >
        <Box
          maxWidth="440px"
          width="100%"
          p={{ xs: "2rem", sm: "2.75rem" }}
          bgcolor={theme.palette.background.alt}
          border={`1px solid ${theme.palette.divider}`}
          borderRadius="20px"
          boxShadow={theme.palette.mode === 'dark'
            ? "0 24px 60px -16px rgba(0,0,0,0.6)"
            : "0 24px 60px -18px rgba(15,23,42,0.25)"}
        >
          {!isDesktop && (
            <Box display="flex" alignItems="center" gap="0.75rem" mb="2rem">
              <BrandMark size={40} />
              <Box>
                <Typography variant="h6" fontWeight={700} lineHeight={1.15}>BuildUp</Typography>
                <Typography variant="caption" color="text.disabled">Admin Console</Typography>
              </Box>
            </Box>
          )}

          <Typography variant="h4" fontWeight={700} color="text.primary">
            Welcome back
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: "4px", mb: "1.75rem" }}>
            Sign in to your administrator account.
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              autoComplete="email"
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isLoading}
              size="large"
              sx={{ mt: 3, mb: 1, height: 46, fontSize: "0.9375rem" }}
            >
              {isLoading ? <CircularProgress size={22} sx={{ color: alpha("#fff", 0.9) }} /> : 'Sign In'}
            </Button>

            <Typography variant="caption" color="text.disabled" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
              Authorized administrators only. Access is monitored.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;