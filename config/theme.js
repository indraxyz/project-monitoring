import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
function container() {
  return document.getElementById("__next");
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    text: {
      main: "#fff",
    },
    dimmed: {
      main: "#002884",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container,
      },
    },
    MuiPopper: {
      defaultProps: {
        container,
      },
    },
    MuiDialog: {
      defaultProps: {
        container,
      },
    },
    MuiModal: {
      defaultProps: {
        container,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;
