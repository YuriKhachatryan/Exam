import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticateUser, setAuthenticated } from "../../store/authSlice";
import { PRODUCTS } from "../../constants";
import { AppDispatch } from "../../store/store";

const useSignIn = () => {
  const [signin, setSignin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const onSignin = async () => {
    await dispatch(
      authenticateUser({ username: signin.email, password: signin.password })
    );
    dispatch(setAuthenticated(true));

    navigate(PRODUCTS);
  };

  const handleChange = (value: string, name: string) => {
    setSignin((prevSignin) => ({ ...prevSignin, [name]: value }));
  };

  const SIGNIN_FIELDS = [
    { label: "Enter email", value: signin.email, type: "email", name: "email" },
    {
      label: "Enter password",
      value: signin.password,
      type: "password",
      name: "password",
    },
  ];

  return { SIGNIN_FIELDS, handleChange, onSignin };
};

export default useSignIn;
