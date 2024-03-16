export const componentStyle = {
  typographyStyles: {
    variant: "h6" as const,
    noWrap: true,
    component: "a" as const,
    sx: {
      mr: 2,
      display: { xs: "none", md: "flex" },
      fontFamily: "monospace",
      fontWeight: 700,
      letterSpacing: ".3rem",
      color: "inherit",
      textDecoration: "none",
    },
  },
  containerStyles: {
    sx: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      flexDirection: "column",
      backgroundColor: "#000",
    },
  },
};
