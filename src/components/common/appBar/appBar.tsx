import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsAuthenticated,
  selectUserData,
  setAuthenticated,
} from "../../../store/authSlice";
import {
  APPBAR_PAGES_ADMIN,
  APPBAR_PAGES_USER,
  SETTINGS_PAGES,
  SIGNIN,
} from "../../../constants";
import { useNavigate } from "react-router-dom";
import { componentStyle } from "./styles";

const { typographyStyles } = componentStyle;

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleNavigate = (navigatePage: string) => {
    navigatePage === SIGNIN && dispatch(setAuthenticated(false));
    setAnchorElUser(null);
    navigate(navigatePage);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUserData);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography {...typographyStyles}>LOGO</Typography>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          {isAuthenticated && user?.role === "admin" ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", gap: "6px" },
              }}
            >
              {APPBAR_PAGES_ADMIN.map((page) => (
                <Button
                  variant="text"
                  key={page.label}
                  onClick={() => handleNavigate(page.navigatePage)}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          ) : null}
          {isAuthenticated && user?.role === "user" ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", gap: "6px" },
              }}
            >
              {APPBAR_PAGES_USER.map((page) => (
                <Button
                  variant="text"
                  key={page.label}
                  onClick={() => handleNavigate(page.navigatePage)}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          ) : null}

          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={user?.imageUrl} />
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
                {SETTINGS_PAGES.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={() => handleNavigate(setting.navigatePage)}
                  >
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
