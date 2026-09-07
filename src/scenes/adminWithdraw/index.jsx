import React, { useState } from 'react';
import {
  Box, Typography, useTheme, CircularProgress, Button,
  TextField, Select, MenuItem, FormControl, InputLabel,
  Paper, Divider, Alert, Chip,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  useGetWalletTransactionsQuery,
  useInitiateAdminWithdrawalMutation,
  useGetRevenueStatsQuery,
} from 'state/api';
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import StatBox from 'components/StatBox';

const AdminWithdraw = () => {
  const theme = useTheme();

  const { data: statsData, isLoading: statsLoading } = useGetRevenueStatsQuery();
  const { data: txData, isLoading: txLoading, refetch } = useGetWalletTransactionsQuery();
  const [initiateWithdrawal, { isLoading: withdrawing }] = useInitiateAdminWithdrawalMutation();

  const [form, setForm] = useState({ amount: '', phone_number: '', provider: 'MTN' });
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', message }

  const wallet = statsData?.wallet || {};
  const formatUGX = (val) =>
    val !== undefined && val !== null ? `UGX ${Number(val).toLocaleString()}` : '—';

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setFeedback(null);
    if (!form.amount || !form.phone_number) {
      setFeedback({ type: 'error', message: 'Please fill in amount and phone number.' });
      return;
    }
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) {
      setFeedback({ type: 'error', message: 'Enter a valid amount.' });
      return;
    }
    if (amount > (wallet.available_balance || 0)) {
      setFeedback({ type: 'error', message: 'Amount exceeds available balance.' });
      return;
    }

    try {
      const result = await initiateWithdrawal(form).unwrap();
      setFeedback({
        type: 'success',
        message: `Withdrawal of ${formatUGX(result.amount)} initiated successfully! Ref: ${result.reference}`,
      });
      setForm({ amount: '', phone_number: '', provider: 'MTN' });
      refetch();
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err?.data?.message || 'Withdrawal failed. Please try again.',
      });
    }
  };

  const txColumns = [
    {
      field: 'type',
      headerName: 'Type',
      flex: 0.6,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'credit' ? 'success' : 'warning'}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.8,
      renderCell: (params) => (
        <Typography
          fontWeight="bold"
          sx={{
            color: params.row.type === 'credit'
              ? theme.palette.success.main
              : theme.palette.warning.main,
            alignSelf: 'center',
          }}
        >
          {params.row.type === 'credit' ? '+' : '-'} {formatUGX(params.value)}
        </Typography>
      ),
    },
    { field: 'description', headerName: 'Description', flex: 1.5 },
    {
      field: 'phone_number',
      headerName: 'Phone',
      flex: 0.8,
      valueFormatter: (params) => params.value || '—',
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.7,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'completed' ? 'success' : params.value === 'pending' ? 'warning' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      flex: 0.9,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleString() : '—',
    },
  ];

  const gridSx = {
    '& .MuiDataGrid-root': { border: 'none' },
    '& .MuiDataGrid-cell': { borderBottom: 'none' },
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: theme.palette.background.alt,
      color: theme.palette.secondary[100],
      borderBottom: 'none',
      fontWeight: 'bold',
    },
    '& .MuiDataGrid-virtualScroller': { backgroundColor: theme.palette.primary.light },
    '& .MuiDataGrid-footerContainer': {
      backgroundColor: theme.palette.background.alt,
      color: theme.palette.secondary[100],
      borderTop: 'none',
    },
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMIN WITHDRAW" subtitle="Withdraw your platform profit to mobile money" />

      {/* ── Wallet Summary ── */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="130px"
        gap="20px"
        sx={{ '& > div': { gridColumn: 'span 4' } }}
      >
        <StatBox
          title="Available Balance"
          value={statsLoading ? '...' : formatUGX(wallet.available_balance)}
          icon={
            <AccountBalanceWalletOutlinedIcon
              sx={{ color: theme.palette.primary.main, fontSize: '26px' }}
            />
          }
          description="Ready to withdraw now"
        />
        <StatBox
          title="Total Fees Earned"
          value={statsLoading ? '...' : formatUGX(wallet.total_fees_earned)}
          icon={
            <MonetizationOnOutlinedIcon
              sx={{ color: theme.palette.primary.main, fontSize: '26px' }}
            />
          }
          description="All-time platform revenue"
        />
        <StatBox
          title="Total Withdrawn"
          value={statsLoading ? '...' : formatUGX(wallet.total_withdrawn)}
          icon={
            <PaymentsOutlinedIcon
              sx={{ color: theme.palette.primary.main, fontSize: '26px' }}
            />
          }
          description="Total payouts so far"
        />
      </Box>

      {/* ── Withdrawal Form ── */}
      <Paper
        elevation={0}
        sx={{
          mt: '30px',
          p: '2rem',
          backgroundColor: theme.palette.background.alt,
          borderRadius: '0.75rem',
          maxWidth: 520,
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb="1.5rem" color={theme.palette.secondary[100]}>
          Withdraw Profit
        </Typography>

        {feedback && (
          <Alert severity={feedback.type} sx={{ mb: 2 }} onClose={() => setFeedback(null)}>
            {feedback.message}
          </Alert>
        )}

        <Box display="flex" flexDirection="column" gap="1rem">
          <TextField
            label="Amount (UGX)"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: 1 }}
            helperText={`Available: ${formatUGX(wallet.available_balance)}`}
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            fullWidth
            placeholder="e.g. 0771234567"
          />
          <FormControl fullWidth>
            <InputLabel>Mobile Money Provider</InputLabel>
            <Select
              name="provider"
              value={form.provider}
              onChange={handleChange}
              label="Mobile Money Provider"
            >
              <MenuItem value="MTN_UGANDA">MTN Mobile Money</MenuItem>
              <MenuItem value="AIRTEL_UGANDA">Airtel Money</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSubmit}
            disabled={withdrawing}
            sx={{ mt: '0.5rem', fontWeight: 'bold', py: 1.5 }}
          >
            {withdrawing ? <CircularProgress size={22} color="inherit" /> : 'Withdraw Now'}
          </Button>
        </Box>
      </Paper>

      {/* ── Transaction History ── */}
      <Box mt="40px">
        <FlexBetween mb="1rem">
          <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary[100]}>
            Transaction History
          </Typography>
        </FlexBetween>
        <Divider sx={{ mb: 2 }} />
        <Box height="50vh" sx={gridSx}>
          {txLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              getRowId={(row) => row._id}
              rows={txData?.transactions || []}
              columns={txColumns}
              initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
              pageSizeOptions={[10, 20, 50]}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminWithdraw;
