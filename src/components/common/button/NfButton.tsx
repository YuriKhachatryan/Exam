import React from "react";
import { Button } from "@mui/material";
import { INfButton } from "../../../interface/interface";

const NfButton = ({ onClick, title, variant, fullWidth }: INfButton) => {
  return (
    <Button variant={variant} fullWidth={fullWidth} onClick={onClick}>
      {title}
    </Button>
  );
};

export default NfButton;
