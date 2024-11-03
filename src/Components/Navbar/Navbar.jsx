import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Menu,
    MenuItem,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Box,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";

const Navbar = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [activePage, setActivePage] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Set initial state based on token presence
    const isMenuOpen = Boolean(anchorEl);
    const [role, setRole] = useState(localStorage.getItem("role"));

    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("auth");
        setIsLoggedIn(false);
        navigate("/");
    };
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleLogoClick = () => setActivePage("");

    return (
        <>
            <AppBar position="fixed" sx={{ marginBottom: "15px", backgroundColor: "white", color: "green", boxShadow: 4, top: 0, borderBottom: "2px solid green" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    {isMobile ? (
                        <>
                            <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
                                <MenuIcon />
                            </IconButton>
                            {isLoggedIn ? (
                                <IconButton edge="end" color="inherit" aria-controls="profile-menu" aria-haspopup="true" onClick={handleProfileMenuOpen}>
                                    <AccountCircle />
                                </IconButton>
                            ) : (
                                <Typography variant="h6" sx={{ textDecoration: "none", color: "inherit" }} component={Link} to="/">
                                    Easy Life
                                </Typography>
                            )}
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" component={Link} to="/" onClick={handleLogoClick} sx={{ textDecoration: "none", color: "inherit" }}>
                                Easy Life
                            </Typography>
                            <div>
                                <Button color="inherit" onClick={() => { setActivePage("tasks"); navigate("/tasks"); }}>Tasks</Button>
                                <Button color="inherit" onClick={() => { setActivePage("services"); navigate("/services"); }}>Services</Button>
                                {/* Conditional rendering based on role and authentication */}
                                {isLoggedIn && role === "buyer" && (
                                    <Button color="inherit" onClick={() => { setActivePage("create-task"); navigate("/create-task"); }}>Create Task</Button>
                                )}
                                {isLoggedIn && role === "seller" && (
                                    <Button color="inherit" onClick={() => { setActivePage("create-service"); navigate("/create-service"); }}>Create Service</Button>
                                )}
                                {isLoggedIn && role === "buyer" && <Button color="inherit" component={Link} to="/receive-bids">Receive Bids</Button>}
                                {isLoggedIn && (
                                    <>
                                        <Button color="inherit" component={Link} to="/task-orders">Task Orders</Button>
                                        <Button color="inherit" component={Link} to="/service-orders">Service Orders</Button>
                                    </>
                                )}
                            </div>
                            <div>
                                {isLoggedIn ? (
                                    <IconButton edge="end" color="inherit" aria-controls="profile-menu" aria-haspopup="true" onClick={handleProfileMenuOpen}>
                                        <AccountCircle />
                                    </IconButton>
                                ) : (
                                    <>
                                        <Button color="inherit" component={Link} to="/login">Login</Button>
                                        <Button color="inherit" component={Link} to="/signup">Signup</Button>
                                    </>
                                )}
                            </div>
                        </>
                    )}

                    <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        PaperProps={{ style: { width: "200px" } }}
                    >
                        <MenuItem component={Link} to="/update-profile" onClick={handleMenuClose}>Update Profile</MenuItem>
                        <MenuItem component={Link} to="/delete-account" onClick={handleMenuClose}>Delete Account</MenuItem>
                        {role === "seller" ? (
                            [
                                <MenuItem key="task-reviews" component={Link} to="/task-reviews" onClick={handleMenuClose}>Task Reviews</MenuItem>,
                                <MenuItem key="my-services" component={Link} to="/my-services" onClick={handleMenuClose}>My Services</MenuItem>,
                                <MenuItem key="service-reviews" component={Link} to="/verify-account" onClick={handleMenuClose}>Verify Account</MenuItem>
                            ]
                        ) : (
                            [
                                <MenuItem key="my-tasks" component={Link} to="/my-tasks" onClick={handleMenuClose}>My Tasks</MenuItem>,
                                <MenuItem key="service-reviews" component={Link} to="/verify-account" onClick={handleMenuClose}>Verify Account</MenuItem>
                            ]
                        )}
                        <MenuItem component={Link} to="/complain" onClick={handleMenuClose}>Send Complain</MenuItem>
                        <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>Logout</MenuItem>
                    </Menu>



                    <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
                        <List>
                            <ListItem component={Link} to="/tasks" onClick={() => { handleDrawerToggle(); setActivePage("tasks"); }}>
                                <ListItemText primary="Tasks" />
                            </ListItem>
                            <ListItem component={Link} to="/services" onClick={() => { handleDrawerToggle(); setActivePage("services"); }}>
                                <ListItemText primary="Services" />
                            </ListItem>
                            {/* Conditional rendering for mobile drawer */}
                            {isLoggedIn && role === "buyer" && (
                                <ListItem component={Link} to="/create-task" onClick={() => { handleDrawerToggle(); setActivePage("create-task"); }}>
                                    <ListItemText primary="Create Task" />
                                </ListItem>
                            )}
                            {isLoggedIn && role === "seller" && (
                                <ListItem component={Link} to="/create-service" onClick={() => { handleDrawerToggle(); setActivePage("create-service"); }}>
                                    <ListItemText primary="Create Service" />
                                </ListItem>
                            )}
                            {isLoggedIn && role === "buyer" && (
                                <ListItem component={Link} to="/receive-bids" onClick={handleDrawerToggle}>
                                    <ListItemText primary="Receive Bids" />
                                </ListItem>
                            )}
                            {isLoggedIn && (
                                <>
                                    <ListItem component={Link} to="/task-orders" onClick={handleDrawerToggle}>
                                        <ListItemText primary="Task Orders" />
                                    </ListItem>
                                    <ListItem component={Link} to="/service-orders" onClick={handleDrawerToggle}>
                                        <ListItemText primary="Service Orders" />
                                    </ListItem>
                                    <ListItem component={Link} to="/verify-account" onClick={handleDrawerToggle}>
                                        <ListItemText primary="Verify Account" />
                                    </ListItem>

                                </>
                            )}
                            {!isLoggedIn ? (
                                <>
                                    <ListItem component={Link} to="/login" onClick={handleDrawerToggle}>
                                        <ListItemText primary="Login" />
                                    </ListItem>
                                    <ListItem component={Link} to="/signup" onClick={handleDrawerToggle}>
                                        <ListItemText primary="Signup" />
                                    </ListItem>
                                </>
                            ) : (
                                <ListItem onClick={() => { handleLogout(); handleDrawerToggle(); }}>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            )}
                        </List>
                    </Drawer>
                </Toolbar>
            </AppBar>
            <Box sx={{ mt: "72px" }}>
                {/* Content goes here */}
            </Box>
        </>
    );
};

export default Navbar;
