import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import { SettingsOutlined, ChevronLeft, ChevronRightOutlined, HomeOutlined, ShoppingCartOutlined, Groups2Outlined, ReceiptLongOutlined, PointOfSaleOutlined, TodayOutlined, WorkOutline, BuildOutlined } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import me from "assets/me.jpg";
// import Professional from 'scenes/profesional';

const navItems = [
    { text: "Dashboard", icon: <HomeOutlined /> },
    { text: "PARTICIPANTS", icon: null },
    { text: "Business", icon: <ShoppingCartOutlined /> },
    { text: "Suppliers", icon: <Groups2Outlined /> },
    { text: "Clients", icon: <ReceiptLongOutlined /> },
    { text: "Contractors", icon: <BuildOutlined /> },
    { text: "Professional", icon: <WorkOutline /> },
    { text: "CATEGORIES", icon: null },
    { text: "Category Types", icon: <PointOfSaleOutlined /> },
    { text: "Roles", icon: <TodayOutlined /> },
];

const SideBar = ({ user, isNonMobile, isSidebarOpen, setSidebarOpen, drawerWidth }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

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
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant="h4" fontWeight="bold">
                                        BuildUp
                                    </Typography>
                                </Box>
                                {isNonMobile && (
                                    <IconButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        {/* List of Items */}
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (
                                        <Typography key={text} sx={{ m: "2.5rem 0 1rem 3rem" }}>
                                            {text}
                                        </Typography>
                                    );
                                }
                                const textLower = text.toLowerCase().replace(/ /g, "");
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`/${textLower}`);
                                                setActive(textLower);
                                            }}
                                            sx={{
                                                backgroundColor: active === textLower ? theme.palette.secondary[300] : "transparent",
                                                color: active === textLower ? theme.palette.primary[600] : theme.palette.secondary[200],
                                            }}
                                        >
                                            <ListItemIcon sx={{
                                                ml: "2rem",
                                                color: active === textLower ? theme.palette.primary[600] : theme.palette.secondary[200]
                                            }}>
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === textLower && (<ChevronRightOutlined sx={{ ml: "auto" }} />)}
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                    <Box bottom="1rem">
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                            <Box
                                component="img"
                                alt="profile"
                                height="40px"
                                width="40px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}
                                src={me}
                            />
                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }}>
                                    {user?.name}
                                </Typography>
                                <Typography fontSize="0.8rem">
                                    {user?.occupation}
                                </Typography>
                            </Box>
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
