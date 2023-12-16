import { useState } from "react";
import {
  Button,
  TextField,
  Snackbar,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Link,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import Router from "next/router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Footer from "../components/Footer";
import Image from "next/image";
import LogoPt from "../public/logo-pt.png";

const Welcome = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [dialogForgot, setDialogForgot] = useState(false);
  const [forgotAccount, setForgotAccount] = useState("");
  const [dialogSignup, setDialogSignup] = useState(false);
  const [signup, setSignup] = useState({
    fullname: "",
    nik: "",
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const _showPassword = () => {
    setShowPassword(!showPassword);
  };
  const _loginFormChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const _login = () => {
    console.log(login);

    setSnackbar({ open: true, message: "Login Success" });
    setTimeout(() => {
      Router.push("dashboard");
    }, 1500);
  };
  const _snackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const _signup = () => {};

  const _forgotAccount = () => {};

  const _closeDialog = (key) => {
    switch (key) {
      case "forgot":
        setDialogForgot(false);
        break;

      default:
        setDialogSignup(false);
        break;
    }
  };
  const _openDialog = (key) => {
    switch (key) {
      case "forgot":
        setDialogForgot(true);
        break;
      default:
        setDialogSignup(true);
        break;
    }
  };

  return (
    <div>
      <div className="min-h-[1000px]">
        <div className="max-w-5xl mx-auto my-4 md:shadow-lg md:my-6 ">
          <Image
            className="h-18 m-4 md:h-20 "
            src={LogoPt}
            alt="avatar"
            priority
            style={{ width: "auto", height: "auto" }}
          ></Image>
          <div className="w-full flex flex-col md:flex-row md:space-x-1 ">
            <div className="h-96 md:w-2/3 bg-gray-100">
              {/* image slider */}
              <Swiper
                // spaceBetween={50}
                // slidesPerView={3}
                pagination={{ dynamicBullets: true }}
                modules={[Pagination]}
                // onSlideChange={(e) => console.log(e)}
                loop={true}
                // onSwiper={(swiper) => console.log("swiper instance")}
              >
                <SwiperSlide>picture1 </SwiperSlide>
                <SwiperSlide>picture2</SwiperSlide>
                <SwiperSlide>picture3</SwiperSlide>
              </Swiper>
            </div>

            <div className="md:w-1/3 p-8 md:p-4">
              <span className="text-4xl font-bold my-2 block">Spektra</span>
              <span>Project Management System</span>
              {/* login form */}
              <div>
                <TextField
                  name="username"
                  value={login.username}
                  onChange={_loginFormChange}
                  margin="dense"
                  label="Username"
                  variant="standard"
                  fullWidth
                  autoComplete="on"
                />
                <FormControl variant="standard" margin="dense" fullWidth>
                  <InputLabel htmlFor="login-password">Password</InputLabel>
                  <Input
                    id="login-password"
                    name="password"
                    value={login.password}
                    onChange={_loginFormChange}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton disableRipple onClick={_showPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button
                  href="#"
                  variant="contained"
                  className=" mt-6 w-full sm:w-1/2 md:w-full"
                  onClick={_login}
                >
                  Login
                </Button>
              </div>

              {/* actions */}
              <div className="mt-6">
                <Link
                  component="button"
                  underline="hover"
                  className="text-base font-medium leading-relaxed"
                  onClick={() => {
                    _openDialog("signup");
                  }}
                >
                  Signup
                </Link>
                <span className="mx-2">|</span>
                <Link
                  component="button"
                  underline="hover"
                  className="text-base font-medium leading-relaxed"
                  onClick={() => {
                    _openDialog("forgot");
                  }}
                >
                  Forgot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* dialog signup */}
      <Dialog
        open={dialogSignup}
        onClose={() => _closeDialog("signup")}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Signup Account</DialogTitle>
        <DialogContent>
          <span>Please complete form below to have login account</span>
          <TextField
            name="fullname"
            value={signup.fullname}
            onChange={() => {}}
            margin="dense"
            label="Fullname"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            name="nik"
            value={signup.nik}
            onChange={() => {}}
            margin="dense"
            label="NIK"
            type="number"
            fullWidth
            variant="standard"
          />
          <TextField
            name="email"
            value={signup.email}
            onChange={() => {}}
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            autoComplete="on"
          />
          <TextField
            name="username"
            value={signup.username}
            onChange={() => {}}
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            variant="standard"
            autoComplete="on"
          />
          <TextField
            name="password"
            value={signup.password}
            onChange={() => {}}
            margin="dense"
            label="Password"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            name="passwordConfirm"
            value={signup.passwordConfirm}
            onChange={() => {}}
            margin="dense"
            label="Password Confirmation"
            type="text"
            fullWidth
            variant="standard"
            helperText="retype your password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("signup")}>Cancel</Button>
          <Button onClick={_signup}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* dialog forgot password */}
      <Dialog
        open={dialogForgot}
        onClose={() => _closeDialog("forgot")}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Forgot Account</DialogTitle>
        <DialogContent>
          <span>
            Please type your email below, you will get steps to get back on your
            account
          </span>
          <TextField
            name="forgotAccount"
            value={forgotAccount}
            onChange={() => {}}
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            autoComplete="on"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => _closeDialog("forgot")}>Cancel</Button>
          <Button onClick={_forgotAccount}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* notif */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={_snackbarClose}
        message={snackbar.message}
        // action={action}
      />

      {/* footer */}
      <Footer />
    </div>
  );
};
export default Welcome;

// logo spektra
// img slider
// logic
// backend
// validasi form login REACT HOOK FORM + yup
