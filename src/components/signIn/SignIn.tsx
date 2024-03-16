import React, { FC } from "react";
import { Box, Link, Typography } from "@mui/material";
import NfButton from "../common/button/NfButton";
import InputField from "../common/inputField/InputField";
import useSignIn from "./useSignIn";
import { SIGNUP } from "../../constants";
import { componentStyle } from "../signUp/style";

const { boxStyles, boxGlobal } = componentStyle;

const SignIn: FC = () => {
  const { SIGNIN_FIELDS, handleChange, onSignin } = useSignIn();

  return (
    <Box {...boxGlobal}>
      <Box {...boxStyles}>
        <Typography variant="h3">SIGNIN</Typography>
        {SIGNIN_FIELDS.map((field) => (
          <InputField
            key={field.name}
            value={field.value}
            handleChange={handleChange}
            type={field.type}
            name={field.name}
            label={field.label}
          />
        ))}

        <Link href={SIGNUP}>Don't have an account?</Link>
        <NfButton
          onClick={onSignin}
          title="SignIn"
          variant="contained"
          fullWidth={true}
        />
      </Box>
    </Box>
  );
};

export default SignIn;
