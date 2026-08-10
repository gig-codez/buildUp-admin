import React from 'react';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SettingsOutlined, ChevronLeft, HomeOutlined, ShoppingCartOutlined, Groups2Outlined, ReceiptLongOutlined, WorkOutline, BuildOutlined, SpaceDashboardRounded } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import ProfileBlock from './ProfileBlock';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';


// `to` mirrors the actual route paths declared in src/App.js so active-state
// detection can compare directly against pathname instead of re-deriving it.
const navItems = [
    { text: "Dashboard", icon: <HomeOutlined />, to: "/dashboard" },
    { text: "PARTICIPANTS", icon: null },
    { text: "Business", icon: <ShoppingCartOutlined />, to: "/business" },
    { text: "Suppliers", icon: <Groups2Outlined />, to: "/suppliers" },
    { text: "Clients", icon: <ReceiptLongOutlined />, to: "/clients" },
    { text: "Contractors", icon: <BuildOutlined />, to: "/contractors" },
    { text: "Consultants", icon: <LocalOfferIcon/>, to: "/consultants" },
    { text: "Professional", icon: <WorkOutline />, to: "/professional" },
    { text: "COMMUNICATION", icon: null },
    { text: "Messages", icon: <ForumOutlinedIcon />, to: "/messages" },
    { text: "Contact Requests", icon: <ConnectWithoutContactIcon />, to: "/contactrequests" },
    { text: "MARKETPLACE", icon: null },
    { text: "Products", icon: <StorefrontOutlinedIcon />, to: "/products" },
    { text: "Jobs", icon: <WorkOutlineIcon />, to: "/jobs" },
    { text: "Orders", icon: <Inventory2OutlinedIcon />, to: "/orders" },
    { text: "REVENUE", icon: null },
    { text: "Escrow Fees", icon: <MonetizationOnOutlinedIcon />, to: "/escrowfees" },
    { text: "Admin Withdraw", icon: <SavingsOutlinedIcon />, to: "/adminwithdraw" },


];

const SideBar = ({ user, isNonMobile, isSidebarOpen, setSidebarOpen, drawerWidth }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';
    // `primary[600]`/`secondary[300]` resolve inconsistently between light/dark
    // mode (theme.js reverses the token scale per-mode), which produced
    // ~1.8:1 and ~3.6:1 contrast for the active nav item. `.main`/`.light` are
    // calibrated per-mode and verified to clear 4.5:1+ in both themes.
    const activeBg = isDarkMode
        ? alpha(theme.palette.primary.main, 0.16)
        : theme.palette.primary.light;
    const activeColor = isDarkMode
        ? theme.palette.primary.light
        : theme.palette.primary.main;

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    variant='persistent'
                    anchor='left'
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                            overflow: "auto",
                            "&::-webkit-scrollbar": {
                                width: 0,
                                display: "none",
                            },
                            scrollbarWidth: "none",
                        }
                    }}
                >
                    <Box width="100%">
                        <Box m="1.5rem 1.5rem 1.5rem 1.5rem">
                            <FlexBetween>
                                <Box display="flex" alignItems="center" gap="0.75rem">
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: "10px",
                                            backgroundColor: theme.palette.primary.main,
                                            color: "#fff",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <SpaceDashboardRounded sx={{ fontSize: 20 }} />
                                    </Box>
                                    <Typography variant="h5" fontWeight="bold" color={theme.palette.secondary.main}>
                                        BuildUp
                                    </Typography>
                                </Box>
                                <IconButton
                                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                                    aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
                                    size="small"
                                >
                                    <ChevronLeft />
                                </IconButton>
                            </FlexBetween>
                        </Box>
                        {/* List of Items */}
                        <List sx={{ px: "0.75rem" }}>
                            {navItems.map(({ text, icon, to }) => {
                                if (!icon) {
                                    return (
                                        <Typography
                                            key={text}
                                            sx={{
                                                m: "1.75rem 0 0.5rem 0.75rem",
                                                fontSize: "0.7rem",
                                                fontWeight: 700,
                                                letterSpacing: "0.08em",
                                                color: theme.palette.secondary[300],
                                            }}
                                        >
                                            {text}
                                        </Typography>
                                    );
                                }
                                const isActive = pathname === to || pathname.startsWith(`${to}/`);
                                return (
                                    <ListItem key={text} disablePadding sx={{ mb: "0.2rem", position: "relative" }}>
                                        {isActive && (
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    left: 0,
                                                    top: "20%",
                                                    height: "60%",
                                                    width: 3,
                                                    borderRadius: "0 4px 4px 0",
                                                    backgroundColor: activeColor,
                                                }}
                                            />
                                        )}
                                        <ListItemButton
                                            onClick={() => navigate(to)}
                                            sx={{
                                                borderRadius: "10px",
                                                py: "0.55rem",
                                                backgroundColor: isActive ? activeBg : "transparent",
                                                color: isActive ? activeColor : theme.palette.secondary[200],
                                                transition: "background-color 150ms ease, color 150ms ease",
                                                "&:hover": {
                                                    backgroundColor: isActive
                                                        ? activeBg
                                                        : theme.palette.action.hover,
                                                },
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                minWidth: "40px",
                                                color: isActive ? activeColor : theme.palette.secondary[200],
                                                "& svg": { fontSize: "1.3rem" },
                                            }}>
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={text}
                                                primaryTypographyProps={{
                                                    fontSize: "0.875rem",
                                                    fontWeight: isActive ? 600 : 500,
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Box bottom="1rem">
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                            <ProfileBlock user={user} />
                            <SettingsOutlined sx={{
                                color: theme.palette.secondary[300],
                                fontSize: "25px"
                            }} />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default SideBar;
