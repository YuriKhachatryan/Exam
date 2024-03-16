import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          minWidth: "120px",
          fontSize: "16px",
          "&:hover": { backgroundColor: "#000" },
          backgroundColor: "#c15927",
          color: "#fff",
        },
        outlined: {
          minWidth: "120px",
          fontSize: "14px",
          padding: "8px",
          fontFamily: "Inter",
          lineHeight: "20px",
          letterSpacing: "0.1px",
          borderRadius: "5px",
          border: "1px solid #79747E",
          color: "#000",
          "&:hover": {
            backgroundColor: "#000",
            color: "#fff",
          },
        },
        text: {
          color: "#fff",
          textTransform: "none",
          textDecoration: "none",
          "&:hover": {
            backgroundColor: "#000",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          },
          borderRadius: 0,
          padding: 0,
          minHeight: 0,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& input": {
              color: "#000",
            },

            "&:focus-within": {
              "& input": {
                color: "#c15927",
              },
            },
            "&.Mui-focused fieldset": {
              borderColor: "#c15927",
            },
          },
          "& .MuiInputLabel-root": {
            "&.Mui-focused": {
              color: "#c15927",
            },
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: { fontWeight: 700, fontSize: "56px", lineHeight: "67px" },
        h2: { fontWeight: 700, fontSize: "48px", lineHeight: "58px" },
        h3: { fontWeight: 700, fontSize: "40px", lineHeight: "48px" },
        h4: { fontWeight: 600, fontSize: "24px", lineHeight: "24px" },
        h5: { fontWeight: 400, fontSize: "18px", lineHeight: "24px" },
        h6: { fontWeight: 400, fontSize: "16px", lineHeight: "21px" },
        body2: {
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "21px",
          color: "#707070",
        },
        root: { fontFamily: "Mardoto" },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#000",
          fontSize: "16px",
        },
      },
    },
  },
});
