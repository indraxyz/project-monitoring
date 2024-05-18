import { useState, forwardRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import {
  LogoutRounded,
  AccountCircleRounded,
  StorageRounded,
  TimelineRounded,
  BusinessCenterRounded,
} from "@mui/icons-material";
import { useRouter } from "next/router";

const ActiveLink = forwardRef((props, ref) => {
  const { children, href } = props;
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      className={router.asPath === href ? "font-bold" : ""}
    >
      {children}
    </a>
  );
});
ActiveLink.displayName = "ActiveLink";

const Navbar = () => {
  const [openLogout, setOpenLogout] = useState(false);
  const router = useRouter();

  const handleNavigationLink = (e, href) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            className="tracking-widest"
          >
            Spektra
          </Typography>

          {/* icon menu */}
          <IconButton
            aria-label="Projects"
            onClick={(e) => handleNavigationLink(e, "/dashboard")}
            className={`text-2xl p-2 sm:text-3xl sm:p-3`}
          >
            <BusinessCenterRounded
              fontSize="inherit"
              color={`${router.asPath === "/dashboard" ? "dimmed" : "text"}`}
            />
          </IconButton>
          <IconButton
            aria-label="Progress"
            className="text-2xl p-2 sm:text-3xl sm:p-3"
          >
            <TimelineRounded fontSize="inherit" color="text" />
          </IconButton>
          <IconButton
            aria-label="References"
            className="text-2xl p-2 sm:text-3xl sm:p-3"
          >
            <StorageRounded fontSize="inherit" color="text" />
          </IconButton>
          <IconButton
            aria-label="Profile"
            onClick={(e) => handleNavigationLink(e, "/profile")}
            className={`text-2xl p-2 sm:text-3xl sm:p-3`}
          >
            <AccountCircleRounded
              fontSize="inherit"
              color={`${router.asPath === "/profile" ? "dimmed" : "text"}`}
            />
          </IconButton>
          <IconButton
            aria-label="Logout"
            className="text-2xl p-2 sm:text-3xl sm:p-3"
            onClick={() => setOpenLogout(true)}
          >
            <LogoutRounded fontSize="inherit" color="text" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* dialog logout */}
      <Dialog
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <span>Are you sure want to logout now ?</span>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogout(false)}>Cancel</Button>
          <Button onClick={() => router.push("/")}>Logout</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Navbar;
