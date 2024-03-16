import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT, SIGNIN } from "../../constants";
import { IUser } from "../../interface/interface";

const useSignUp = () => {
  const [signup, setSignup] = useState<IUser>({
    email: "",
    firstName: "",
    lastName: "",
    imageUrl: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (value: string, name: string) => {
    setSignup((prevSignup) => ({
      ...prevSignup,
      [name]: value,
    }));
  };

  const onSignup = async () => {
    try {
      await axios.post(`${API_ENDPOINT}/users`, { ...signup, role: "user" });
      navigate(SIGNIN);
    } catch (error) {
      console.error("Error signing up user:", error);
    }
  };

  const SIGNUP_FIELDS = [
    { label: "Enter email", value: signup.email, type: "email", name: "email" },
    {
      label: "Enter first name",
      value: signup.firstName,
      type: "text",
      name: "firstName",
    },
    {
      label: "Enter last name",
      value: signup.lastName,
      type: "text",
      name: "lastName",
    },
    { label: "Enter phone", value: signup.phone, type: "text", name: "phone" },
    {
      label: "Enter imageUrl",
      value: signup.imageUrl,
      type: "text",
      name: "imageUrl",
    },
    {
      label: "Enter password",
      value: signup.password,
      type: "password",
      name: "password",
    },
  ];

  return { handleChange, onSignup, SIGNUP_FIELDS };
};

export default useSignUp;
