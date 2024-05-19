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
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ExitToAppRounded,
  AccountCircleRounded,
  StorageRounded,
  TimelineRounded,
  BusinessCenterRounded,
  HomeRounded,
} from "@mui/icons-material";
import { useRouter } from "next/router";

// const ActiveLink = forwardRef((props, ref) => {
//   const { children, href } = props;
//   const router = useRouter();

//   const handleClick = (e) => {
//     e.preventDefault();
//     router.push(href);
//   };

//   return (
//     <a
//       ref={ref}
//       href={href}
//       onClick={handleClick}
//       className={router.asPath === href ? "font-bold" : ""}
//     >
//       {children}
//     </a>
//   );
// });
// ActiveLink.displayName = "ActiveLink";

const Navbar = () => {
  const [openLogout, setOpenLogout] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenuProjects, setOpenMenuProjects] = useState(false);
  const [openMenuReferences, setOpenMenuReferences] = useState(false);

  const router = useRouter();
  const handleNavigationLink = (href) => {
    router.push(href);
  };

  // TOP APP BAR > MENU
  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenuProjects(false);
    setOpenMenuReferences(false);
  };
  const handleOpenMenu = (event, menu) => {
    setAnchorEl(event.currentTarget);
    switch (menu) {
      case "projects":
        setOpenMenuProjects(true);
        break;
      default:
        // references
        setOpenMenuReferences(true);
        break;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="secondary">
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
            aria-label="Dashboard"
            onClick={() => handleNavigationLink("/dashboard")}
            className="text-2xl p-1 sm:text-3xl sm:p-2"
            sx={{
              color:
                router.asPath === "/dashboard"
                  ? "primary.contrastText"
                  : "primary.dark",
              "&:hover": {
                color: "primary.contrastText",
              },
            }}
          >
            <HomeRounded fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="Projects"
            className="text-2xl p-1 sm:text-3xl sm:p-2"
            sx={{
              color:
                router.asPath.split("/")[1] === "projects" ||
                openMenuProjects == true
                  ? "primary.contrastText"
                  : "primary.dark",
              "&:hover": {
                color: "primary.contrastText",
              },
            }}
            id="button-menu-projects"
            onClick={(e) => handleOpenMenu(e, "projects")}
          >
            <BusinessCenterRounded fontSize="inherit" />
          </IconButton>
          <Menu
            id="menu-projects"
            anchorEl={anchorEl}
            open={openMenuProjects}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "button-menu-projects",
            }}
          >
            <MenuItem
              onClick={() => handleNavigationLink("/projects/register")}
            >
              Register
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigationLink("/projects/approvals")}
            >
              Approvals
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigationLink("/projects/schedules")}
            >
              Schedules
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigationLink("/projects/timesheets")}
            >
              TimeSheets
            </MenuItem>
          </Menu>

          <IconButton
            aria-label="Progress"
            className="text-2xl p-1 sm:text-3xl sm:p-2"
            onClick={() => handleNavigationLink("/progress")}
            sx={{
              color:
                router.asPath === "/progress"
                  ? "primary.contrastText"
                  : "primary.dark",
              "&:hover": {
                color: "primary.contrastText",
              },
            }}
          >
            <TimelineRounded fontSize="inherit" />
          </IconButton>

          <IconButton
            aria-label="References"
            className="text-2xl p-1 sm:text-3xl sm:p-2"
            sx={{
              color:
                router.asPath.split("/")[1] === "references" ||
                openMenuReferences == true
                  ? "primary.contrastText"
                  : "primary.dark",
              "&:hover": {
                color: "primary.contrastText",
              },
            }}
            onClick={(e) => handleOpenMenu(e, "references")}
          >
            <StorageRounded fontSize="inherit" />
          </IconButton>
          <Menu
            id="menu-references"
            anchorEl={anchorEl}
            open={openMenuReferences}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "button-menu-references",
            }}
          >
            <MenuItem
              onClick={() => handleNavigationLink("/references/clients")}
            >
              Clients
            </MenuItem>
            <MenuItem
              onClick={() => handleNavigationLink("/references/personnels")}
            >
              Personnels
            </MenuItem>
            <MenuItem onClick={() => handleNavigationLink("/references/users")}>
              Users
            </MenuItem>
          </Menu>

          <IconButton
            aria-label="Profile"
            onClick={() => handleNavigationLink("/profile")}
            className="text-2xl p-1 sm:text-3xl sm:p-2"
            sx={{
              color:
                router.asPath === "/profile"
                  ? "primary.contrastText"
                  : "primary.dark",
              "&:hover": {
                color: "primary.contrastText",
              },
            }}
          >
            <AccountCircleRounded fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="Logout"
            className="text-2xl p-1 sm:text-3xl sm:p-2"
            sx={{
              color: "primary.dark",
              "&:hover": {
                color: "primary.contrastText",
              },
            }}
            onClick={() => setOpenLogout(true)}
          >
            <ExitToAppRounded fontSize="inherit" />
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
