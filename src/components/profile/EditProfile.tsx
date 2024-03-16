import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { componentStyle } from "../common/modal/style";
import InputField from "../common/inputField/InputField";
import { IUser } from "../../interface/interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchEditUser } from "../../store/authSlice";

const { boxGlobal, boxStyles } = componentStyle;

export default function EditProfile({ profile, open, setOpen }: any) {
  const dispatch: AppDispatch = useDispatch();
  const [editData, setEditData] = React.useState<IUser>({
    email: profile.email,
    firstName: profile.firstName,
    lastName: profile.lastName,
    imageUrl: profile.imageUrl,
    password: profile.password,
    phone: profile.phone,
  });

  const handleChange = (value: string, name: string) => {
    setEditData((prevSignup) => ({
      ...prevSignup,
      [name]: value,
    }));
  };
  const handleClose = () => setOpen(false);

  const SIGNUP_FIELDS = [
    {
      label: "Enter email",
      value: editData.email,
      type: "email",
      name: "email",
    },
    {
      label: "Enter first name",
      value: editData.firstName,
      type: "text",
      name: "firstName",
    },
    {
      label: "Enter last name",
      value: editData.lastName,
      type: "text",
      name: "lastName",
    },
    {
      label: "Enter phone",
      value: editData.phone,
      type: "text",
      name: "phone",
    },
    {
      label: "Enter imageUrl",
      value: editData.imageUrl,
      type: "text",
      name: "imageUrl",
    },
    {
      label: "Enter password",
      value: editData.password,
      type: "password",
      name: "password",
    },
  ];

  const handleSave = () => {
    dispatch(fetchEditUser({ userId: profile.id, userData: editData }));
    handleClose();
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box {...boxGlobal}>
          {SIGNUP_FIELDS.map((field) => (
            <InputField
              value={field.value}
              handleChange={handleChange}
              type={field.type}
              name={field.name}
              label={field.label}
            />
          ))}
          <Box {...boxStyles}>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
