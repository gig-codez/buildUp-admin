import React from 'react'

import {useGetBusinessQuery, useGetSuppliersQuery, useGetClientsQuery, useGetContractorsQuery,useGetCategoryQuery,useGetConsutantsQuery,useGetSuppliertypesQuery,useGetDealsQuery } from 'state/api'
import Header from 'components/Header'
import FlexBetween from 'components/FlexBetween'
import { AttachMoneyOutlined,PointOfSaleOutlined,Groups2Outlined, BuildOutlined,ReceiptLongOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import StatBox from 'components/StatBox'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HandshakeIcon from '@mui/icons-material/Handshake';
///tableheaders
import { Businesscolumns, suppliercolumns, Categorycolumns } from 'utils/tableheaders'

const Dashboard = () => {
  const { data: suplierdata, isLoading: isLoadingSupplierdata } = useGetSuppliersQuery();
  const { data: businessdata, isLoading: isLoadingBusinessdata } = useGetBusinessQuery();
  const { data: clientsdata } = useGetClientsQuery();
  const { data: contractorsdata } = useGetContractorsQuery();
  const { data: categorydata, isLoading: categoryLoadingData } = useGetCategoryQuery();
  const { data: dealsData, isLoading: isLoadingDeals } = useGetDealsQuery();

  //length
  const supplierlength = suplierdata?.data?.length
  const businesslength = businessdata?.data?.length
  const clientslength = clientsdata?.employers?.length
  const contractorslength = contractorsdata?.data?.length
  const categorydatalength=categorydata?.length
   const deallength = dealsData?.deals?.length

  const isNonMediumScreens = useMediaQuery("(min-width:1200px)");
  const theme = useTheme();


  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          {/* <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadDoneOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button> */}
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <StatBox
          title="Total Businesses"
          value={businesslength}
          icon={
            <ShoppingCartOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Suppliers"
          value={supplierlength}
          icon={
            <Groups2Outlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        
        <StatBox
          title="Total  Clients"
          value={clientslength}
          icon={
            <ReceiptLongOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Contractors"
          value={contractorslength}
          icon={
            <BuildOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Supplier Deals"
          value={deallength}
          icon={
            <HandshakeIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        /><StatBox
        title="Supplier Types "
        value={categorydatalength}
        icon={
          <PointOfSaleOutlined 
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
          />
        }
      />
        

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >

          <DataGrid
            loading={isLoadingBusinessdata || !businessdata}
            getRowId={(row) => row._id}
            rows={businessdata?.data || []}
            columns={Businesscolumns}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                borderRadius: "5rem",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",

                },
                padding: "10px 0",
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.background.alt,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <DataGrid
            loading={categoryLoadingData || !categorydata}
            getRowId={(row) => row._id}
            columns={Categorycolumns}
            rows={categorydata || []}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                borderRadius: "5rem",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                borderBottom: `1px solid ${theme.palette.divider}`,
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",

                },
                padding: "10px 0",
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.background.alt,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard