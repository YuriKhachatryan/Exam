import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { componentStyle } from "../common/modal/style";
import InputField from "../common/inputField/InputField";
import { IProduct } from "../../interface/interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { fetchEditProduct } from "../../store/productSlice";

const { boxGlobal, boxStyles } = componentStyle;

export default function EditProduct({ product, open, setOpen }: any) {
  const dispatch: AppDispatch = useDispatch();
  const [editData, setEditData] = React.useState<IProduct>({
    count: product.count,
    description: product.description,
    imageUrl: product.imageUrl,
    price: product.price,
    title: product.title,
  });

  const PRODUCT_FIELDS = [
    {
      label: "Enter title",
      value: editData.title,
      type: "text",
      name: "title",
    },
    {
      label: "Enter description",
      value: editData.description,
      type: "text",
      name: "description",
    },
    {
      label: "Enter imageUrl",
      value: editData.imageUrl,
      type: "text",
      name: "imageUrl",
    },
    {
      label: "Enter product count",
      value: editData.count,
      type: "number",
      name: "count",
    },
    {
      label: "Enter product price",
      value: editData.price,
      type: "number",
      name: "price",
    },
  ];

  const handleChange = (value: string, name: string) => {
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    dispatch(
      fetchEditProduct({ productId: product.id, productData: editData })
    );
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
          {PRODUCT_FIELDS.map((field, index) => (
            <InputField
              key={index}
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
