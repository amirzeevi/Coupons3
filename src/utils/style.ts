import { createTheme } from "@mui/material";

export const loginNav = {
  color: "white",
  textTransform: 'none',
  textDecoration: "none",
  display: 'inline',
  cursor: "pointer"
}

export const navStyle = {
  textDecoration: "none",
  color: "grey",
  fontSize: 16
}

export const theme = createTheme({
  typography: {
    fontFamily: [
      'IBM Plex Serif',
    ].join(','),
  },
});

export const title = createTheme({
  typography: {
    fontFamily: [
      'Dosis',
      'Abril Fatface',
      'IBM Plex Serif',
    ].join(','),
  },
});