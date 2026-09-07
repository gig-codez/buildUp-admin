import React, { useState } from 'react';
import {
  Box, Typography, useTheme, CircularProgress,
  Chip, MenuItem, Select, FormControl, InputLabel,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useGetRevenueStatsQuery, useGetEscrowFeesQuery } from 'state/api';
import Header from 'components/Header';
import StatBox from 'components/StatBox';
import FlexBetween from 'components/FlexBetween';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

const statusColors = {
  pending_deposit: 'warning',
  active: 'info',
  completion_requested: 'secondary',
  completed: 'success',
  disputed: 'error',
  cancelled: 'default',
};

const EscrowFees = () => {
  const theme = useTheme();
  const [statusFilter, setStatusFilter] = useState('');

  const { data: statsData, isLoading: statsLoading } = useGetRevenueStatsQuery();
  const { data: escrowData, isLoading: escrowLoading } = useGetEscrowFeesQuery(statusFilter);

  const wallet = statsData?.wallet || {};
  const overview = statsData?.escrow_overview || {};

  const formatUGX = (val) =>
    val !== undefined && val !== null
      ? `UGX ${Number(val).toLocaleString()}`
      : '—';

  const columns = [
    {
      field: 'title',
      headerName: 'Task Title',
      flex: 1.2,
    },
    {
      field: 'employer_id',
      headerName: 'Employer',
      flex: 1,
      valueGetter: (params) => {
        const e = params.row.employer_id;
        return e ? `${e.first_name} ${e.last_name}` : '—';
      },
    },
    {
      field: 'contractor_id',
      headerName: 'Contractor',
      flex: 1,
      valueGetter: (params) => {
        const c = params.row.contractor_id;
        return c ? `${c.first_name} ${c.last_name}` : '—';
      },
    },
    {
      field: 'agreed_amount',
      headerName: 'Agreed Amount',
      flex: 0.9,
      valueFormatter: (params) => formatUGX(params.value),
    },
    {
      field: 'service_fee',
      headerName: 'Platform Fee (10%)',
      flex: 1,
      renderCell: (params) => (
        <Typography
          fontWeight="bold"
          sx={{ color: theme.palette.success.main, alignSelf: 'center' }}
        >
          {formatUGX(params.value)}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 0.9,
      renderCell: (params) => (
        <Chip
          label={params.value?.replace(/_/g, ' ')}
          color={statusColors[params.value] || 'default'}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      flex: 0.9,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : '—',
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ESCROW FEES" subtitle="Platform revenue from escrow service fees" />
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={statusFilter}
            label="Filter by Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="pending_deposit">Pending Deposit</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completion_requested">Completion Requested</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="disputed">Disputed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>

      {/* ── Stat Boxes ── */}
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="130px"
        gap="20px"
        sx={{ '& > div': { gridColumn: 'span 3' } }}
      >
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
          title="Available Balance"
          value={statsLoading ? '...' : formatUGX(wallet.available_balance)}
          icon={
            <AccountBalanceWalletOutlinedIcon
              sx={{ color: theme.palette.primary.main, fontSize: '26px' }}
            />
          }
          description="Ready to withdraw"
        />
        <StatBox
          title="Total Withdrawn"
          value={statsLoading ? '...' : formatUGX(wallet.total_withdrawn)}
          icon={
            <PaymentsOutlinedIcon
              sx={{ color: theme.palette.primary.main, fontSize: '26px' }}
            />
          }
          description="Admin payouts to date"
        />
        <StatBox
          title="Escrow Volume"
          value={statsLoading ? '...' : formatUGX(overview.total_escrow_volume)}
          icon={
            <ReceiptLongOutlinedIcon
              sx={{ color: theme.palette.primary.main, fontSize: '26px' }}
            />
          }
          description={`${overview.funded_escrow_count ?? 0} funded escrows`}
        />
      </Box>

      {/* ── DataGrid ── */}
      <Box mt="30px" height="65vh">
        {escrowLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            getRowId={(row) => row._id}
            rows={escrowData?.escrows || []}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 20 } } }}
            pageSizeOptions={[10, 20, 50]}
          />
        )}
      </Box>
    </Box>
  );
};

export default EscrowFees;