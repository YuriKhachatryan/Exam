import React from "react";
import { TextField } from "@mui/material";
import { IInputField } from "../../../interface/interface";

const InputField = ({
  value,
  handleChange,
  type,
  name,
  label,
}: IInputField) => {
  return (
    <TextField
      value={value}
      type={type}
      onChange={(e) => {
        handleChange(e.target.value, name);
      }}
      label={label}
      variant="outlined"
    />
  );
};

export default InputField;
