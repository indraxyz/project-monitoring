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
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
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
  },
});

export default theme;
