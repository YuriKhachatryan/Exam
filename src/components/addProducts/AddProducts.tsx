import React, { FC } from "react";
import { Box, Link, Typography } from "@mui/material";
import NfButton from "../common/button/NfButton";
import InputField from "../common/inputField/InputField";
import { componentStyle } from "../signUp/style";
import useProduct from "./useProduct";

const { boxStyles, boxGlobal } = componentStyle;

const SignIn: FC = () => {
  const { handleChange, onCreate, PRODUCT_FIELDS } = useProduct();

  return (
    <Box {...boxGlobal}>
      <Box {...boxStyles}>
        <Typography variant="h3">Add product</Typography>
        {PRODUCT_FIELDS.map((field) => (
          <InputField
            key={field.name}
            value={field.value}
            handleChange={handleChange}
            type={field.type}
            name={field.name}
            label={field.label}
          />
        ))}

        <NfButton
          onClick={onCreate}
          title="Add product"
          variant="contained"
          fullWidth={true}
        />
      </Box>
    </Box>
  );
};

export default SignIn;
