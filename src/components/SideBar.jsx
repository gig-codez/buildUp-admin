import React from 'react';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SettingsOutlined, ChevronLeft, HomeOutlined, ShoppingCartOutlined, Groups2Outlined, ReceiptLongOutlined, WorkOutline, BuildOutlined } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import ProfileBlock from './ProfileBlock';
import BrandMark from './BrandMark';
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
    { text: "Consultants", icon: <LocalOfferIcon />, to: "/consultants" },
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

    const activeBg = isDarkMode
        ? alpha(theme.palette.primary.main, 0.16)
        : theme.palette.primary[50];
    const activeColor = theme.palette.primary.main;

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
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.text.primary,
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                            overflow: "auto",
                            "&::-webkit-scrollbar": { width: 0, display: "none" },
                            scrollbarWidth: "none",
                        }
                    }}
                >
                    <Box width="100%" display="flex" flexDirection="column" minHeight="100%">
                        {/* Brand */}
                        <Box m="1.4rem 1.5rem 1.25rem 1.5rem">
                            <FlexBetween>
                                <FlexBetween gap="0.75rem">
                                    <BrandMark size={40} />
                                    <Box>
                                        <Typography variant="h6" fontWeight={700} color="text.primary" lineHeight={1.1}>
                                            BuildUp
                                        </Typography>
                                        <Typography variant="caption" color="text.disabled">
                                            Admin Panel
                                        </Typography>
                                    </Box>
                                </FlexBetween>
                                <IconButton onClick={() => setSidebarOpen(!isSidebarOpen)} size="small">
                                    <ChevronLeft />
                                </IconButton>
                            </FlexBetween>
                        </Box>

                        {/* Nav items */}
                        <List sx={{ px: "0.75rem", flexGrow: 1 }}>
                            {navItems.map(({ text, icon, to }) => {
                                if (!icon) {
                                    return (
                                        <Typography
                                            key={text}
                                            variant="overline"
                                            sx={{
                                                m: "1.5rem 0 0.5rem 0.75rem",
                                                color: theme.palette.text.disabled,
                                                lineHeight: 1.5,
                                            }}
                                        >
                                            {text}
                                        </Typography>
                                    );
                                }
                                const isActive = pathname === to || pathname.startsWith(`${to}/`);
                                return (
                                    <ListItem key={text} disablePadding sx={{ mb: "0.15rem", position: "relative" }}>
                                        {isActive && (
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    left: 0,
                                                    top: "24%",
                                                    height: "52%",
                                                    width: 3,
                                                    borderRadius: "0 4px 4px 0",
                                                    backgroundColor: activeColor,
                                                    boxShadow: `0 0 10px ${alpha(activeColor, 0.5)}`,
                                                }}
                                            />
                                        )}
                                        <ListItemButton
                                            onClick={() => navigate(to)}
                                            sx={{
                                                borderRadius: "10px",
                                                py: "0.55rem",
                                                backgroundColor: isActive ? activeBg : "transparent",
                                                color: isActive ? activeColor : theme.palette.text.secondary,
                                                transition: "background-color 150ms ease, color 150ms ease",
                                                "&:hover": {
                                                    backgroundColor: isActive
                                                        ? activeBg
                                                        : alpha(theme.palette.text.primary, 0.05),
                                                },
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                minWidth: "38px",
                                                color: "inherit",
                                                "& svg": { fontSize: "1.25rem" },
                                            }}>
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={text}
                                                primaryTypographyProps={{
                                                    fontSize: "0.8125rem",
                                                    fontWeight: isActive ? 600 : 500,
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>

                        {/* Profile footer */}
                        <Box mt="1rem">
                            <Divider />
                            <Box p="1.25rem 1.5rem">
                                <FlexBetween textTransform="none" gap="0.75rem">
                                    <ProfileBlock user={user} size={38} />
                                    <SettingsOutlined sx={{ color: theme.palette.text.disabled, fontSize: "22px" }} />
                                </FlexBetween>
                            </Box>
                        </Box>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
};

export default SideBar;