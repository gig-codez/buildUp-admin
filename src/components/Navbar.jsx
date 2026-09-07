import React, { useState } from 'react'
import {
    LightModeOutlined, Menu as MenuIcon, DarkModeOutlined, Search,
    SettingsOutlined, ArrowDropDownOutlined,
} from '@mui/icons-material'
import { alpha, useTheme } from '@mui/material/styles'
import FlexBetween from './FlexBetween'
import ProfileBlock from './ProfileBlock'
import { useDispatch } from 'react-redux'
import { logout, setMode } from 'state'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuItem, AppBar, Box, Button, Divider, IconButton, InputBase, Toolbar } from '@mui/material'

const Navbar = ({ isSidebarOpen, setSidebarOpen, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <AppBar sx={{ position: "static", background: "transparent", boxShadow: "none" }}>
            <Toolbar sx={{ justifyContent: "space-between", px: { xs: "1rem", md: "2.5rem" }, minHeight: "72px" }}>
                {/* left */}
                <FlexBetween gap="0.75rem">
                    <IconButton aria-label="Toggle sidebar" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <Box
                        display="flex"
                        alignItems="center"
                        borderRadius="10px"
                        bgcolor={alpha(theme.palette.text.primary, 0.05)}
                        border={`1px solid ${alpha(theme.palette.text.primary, 0.06)}`}
                        pl="0.75rem"
                        sx={{ transition: "border-color 150ms ease", "&:focus-within": { borderColor: theme.palette.primary.main } }}
                        width={{ xs: "6rem", sm: "15rem", md: "20rem" }}
                    >
                        <Search sx={{ color: theme.palette.text.disabled, fontSize: 20 }} />
                        <InputBase
                            placeholder="Search..."
                            aria-label="Search"
                            sx={{ ml: 1, flex: 1, fontSize: "0.875rem", "& input": { py: 1 } }}
                        />
                    </Box>
                </FlexBetween>

                {/* right */}
                <FlexBetween gap={{ xs: "0.25rem", sm: "0.5rem", md: "1.25rem" }}>
                    <IconButton onClick={() => dispatch(setMode())} aria-label="Toggle color mode">
                        {theme.palette.mode === "dark" ? <DarkModeOutlined sx={{ fontSize: 22 }} /> : <LightModeOutlined sx={{ fontSize: 22 }} />}
                    </IconButton>
                    <IconButton aria-label="Settings">
                        <SettingsOutlined sx={{ fontSize: 22 }} />
                    </IconButton>

                    <Button
                        onClick={handleClick}
                        sx={{ display: "flex", alignItems: "center", textTransform: "none", gap: "0.75rem", borderRadius: "10px", p: "6px 10px" }}
                    >
                        <ProfileBlock user={user} size={36} />
                        <ArrowDropDownOutlined sx={{ color: theme.palette.text.disabled, fontSize: 24 }} />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={isOpen}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                        <Box px="1rem" py="0.5rem">
                            <ProfileBlock user={user} size={38} />
                        </Box>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                        <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>Logout</MenuItem>
                    </Menu>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar