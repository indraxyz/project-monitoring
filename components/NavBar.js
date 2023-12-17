import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";

const ActiveLink = ({ children, href }) => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={router.asPath === href ? "font-bold" : ""}
    >
      {children}
    </a>
  );
};

const Navbar = () => {
  const [openLogout, setOpenLogout] = useState(false);
  const router = useRouter();

  return (
    <div className="p-4 ">
      <ActiveLink href={"/dashboard"}>Dashboard</ActiveLink>

      {/* Projects */}
      <div>
        <span className="mr-4">
          <ActiveLink href={"/projects"}>Registers</ActiveLink>
        </span>
        <span className="mr-4">
          <ActiveLink href={"/projects/approvals"}>Approvals</ActiveLink>
        </span>
        <span className="mr-4">
          <ActiveLink href={"/projects/schedules"}>Schedules</ActiveLink>
        </span>
        <span className="mr-4">
          <ActiveLink href={"/projects/timesheets"}>Timesheets</ActiveLink>
        </span>
      </div>

      {/* Progress */}
      <div>
        <span className="mr-4">
          <ActiveLink href={"/progress"}>Progress</ActiveLink>
        </span>
      </div>

      {/*references */}
      <div>
        <span className="mr-4">
          <ActiveLink href={"/references/personnels"}>Personnels</ActiveLink>
        </span>
        <span className="mr-4">
          <ActiveLink href={"/references/clients"}>Clients</ActiveLink>
        </span>
        <span className="mr-4">
          <ActiveLink href={"/references/users"}>Users</ActiveLink>
        </span>
      </div>

      {/* profile */}
      <div>
        <ActiveLink href={"/profile"}>Profile</ActiveLink>
      </div>

      {/* Logout */}
      <a href="#" onClick={() => setOpenLogout(true)}>
        Logout
      </a>

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
    </div>
  );
};
export default Navbar;
