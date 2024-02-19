import { React, useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Link,
  Toolbar,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import BlindIcon from "@mui/icons-material/Blind";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { API_ROUTE } from "../../utils/RouteApi";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3B3C40",
    },
  },
});

function Navbar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { user, token, isConnected, setIsConnected } =
    useContext(GlobalContext);

  const logout = async () => {
    if (token) {
      try {
        await axios.post(API_ROUTE.LOGOUT, null, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        });
        localStorage.removeItem("access_token");
        setIsConnected(false);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="a"
              noWrap
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
              SartheTourisme
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => {
                  setAnchorElNav(e.currentTarget);
                }}
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
                onClose={() => {
                  setAnchorElNav(null);
                }}
                sx={{
                  display: {
                    xs: "block",
                    md: "none",
                  },
                }}
              >
                {/* Menu moible*/}
                <MenuItem
                  onClick={() => {
                    setAnchorElNav(null);
                  }}
                >
                  <Link component={RouterLink} to="/accueil" />
                  <Typography textAlign="center">accueil</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <BlindIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
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
              SartheTourisme
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
              }}
            >
              {/* Menu */}
              <Button
                onClick={() => {
                  setAnchorElNav(null);
                }}
                component={RouterLink}
                to="/"
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                Accueil
              </Button>
              <Button
                onClick={() => {
                  setAnchorElNav(null);
                }}
                component={RouterLink}
                to="/article"
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                Articles
              </Button>
              <Button
                component={RouterLink}
                to="/lieu"
                sx={{ my: 2, color: "inherit", display: "block" }}
              >
                Lieux
              </Button>
            </Box>
            {user && isConnected === true ? (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton
                  onClick={(e) => {
                    setAnchorElUser(e.currentTarget);
                  }}
                  sx={{ p: 0 }}
                >
                  <Avatar />
                </IconButton>

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
                  onClose={() => {
                    setAnchorElUser(null);
                  }}
                >
                  <MenuItem component={RouterLink} to="/compte">
                    <Typography>Profil</Typography>
                  </MenuItem>

                  {user.role_id === 2 && (
                    <MenuItem component={RouterLink} to="/dashboard">
                      <Typography>Administration</Typography>
                    </MenuItem>
                  )}

                  <MenuItem
                    onClick={() => {
                      logout();
                      setAnchorElUser(null);
                    }}
                  >
                    <Typography textAlign="center" sx={{ color: "inherit" }}>
                      Déconnexion
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <MenuItem>
                  <PersonIcon />
                  <Button
                    component={RouterLink}
                    to="connexion"
                    sx={{ my: 2, color: "inherit", display: "block" }}
                  >
                    Se connecter
                  </Button>
                </MenuItem>
              </Box>
            )}
            {/* End menu connected */}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
