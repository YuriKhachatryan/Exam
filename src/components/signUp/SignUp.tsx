import React, { FC } from "react";
import { Box, Link, Typography } from "@mui/material";
import NfButton from "../common/button/NfButton";
import { componentStyle } from "./style";
import InputField from "../common/inputField/InputField";
import { SIGNIN } from "../../constants";
import useSignUp from "./useSignUp";

const { boxStyles, boxGlobal } = componentStyle;

const SignUp: FC = () => {
  const { handleChange, onSignup, SIGNUP_FIELDS } = useSignUp();

  return (
    <Box {...boxGlobal}>
      <Box {...boxStyles}>
        <Typography variant="h3">SIGNUP</Typography>
        {SIGNUP_FIELDS.map((field) => (
          <InputField
            value={field.value}
            handleChange={handleChange}
            type={field.type}
            name={field.name}
            label={field.label}
          />
        ))}
        <Link href={SIGNIN}>If you have account.</Link>
        <NfButton
          onClick={onSignup}
          title="Signup"
          variant="contained"
          fullWidth={true}
        />
      </Box>
    </Box>
  );
};

export default SignUp;
