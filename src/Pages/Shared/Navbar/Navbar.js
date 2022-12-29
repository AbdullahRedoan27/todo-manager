import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonOffIcon from '@mui/icons-material/PersonOff';

const settings = (
  <ul>
    <li>
      <Link to="/login">Log In</Link>
    </li>
    <li>
      <Link to="/register">Register</Link>
    </li>
  </ul>
);

const Navbar = () => {
  const { logOut } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  console.log(user);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLogOut = () => {
    logOut()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.log(e));
  };

  const loggedInSettings = (
    <ul>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link onClick={handleLogOut} to="">
          Log Out
        </Link>
      </li>
    </ul>
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = (
    <ul className="lg:flex lg:gap-3 text-sm">
      <li className="mb-2 lg:mb-0">
        <Link
          to="/addtask"
          sx={{ my: 2, color: "white", display: "block" }}
          className="mr-5 btn btn-ghost"
        >
          ADD TASK
        </Link>
      </li>
      <li className="mb-2">
        <Link
          to="/mytasks"
          sx={{ my: 2, color: "white", display: "block" }}
          className="mr-5 btn btn-ghost"
        >
          MY TASKS
        </Link>
      </li>
      <li>
        <Link
          to="/completed"
          sx={{ my: 5, color: "white", display: "block" }}
          className="mr-5 btn btn-ghost"
        >
          COMPLETED TASKS
        </Link>
      </li>
    </ul>
  );

  return (
    <AppBar position="static">
      <Container className="w-1/12" maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ToDo
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link className="btn btn-ghost" textAlign="center">
                  {pages}
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ToDo
          </Typography>
          <Box
            className="justify-center"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {pages}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user?.photoURL ? (
                  <Tooltip title={user?.displayName} placement="left">
                    {user?.photoURL !== null ? (
                      <img
                        className="w-10 rounded-full p-1"
                        src={user?.photoURL}
                        alt=""
                      ></img>
                    ) : (
                      <PersonOffIcon className="text-white"></PersonOffIcon>
                    )}
                  </Tooltip>
                ) : (
                  <AccountCircleIcon className="text-white"></AccountCircleIcon>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <div className="flex flex-col gap-1 px-3">
                  {loggedInSettings}
                </div>
              ) : (
                <div className="flex flex-col gap-1 px-3">{settings}</div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
