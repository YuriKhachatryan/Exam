import { useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store/productSlice";
import { IProduct } from "../../interface/interface";

const useProduct = () => {
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageUrl: "",
    count: 0,
    price: 0,
  });
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (value: string, name: string) => {
    setProduct((prevSignup: IProduct) => ({
      ...prevSignup,
      [name]: value,
    }));
  };

  const onCreate = async () => {
    try {
      await dispatch(createProduct(product));
      setProduct({
        title: "",
        description: "",
        imageUrl: "",
        count: 0,
        price: 0,
      });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const PRODUCT_FIELDS = [
    { label: "Enter title", value: product.title, type: "text", name: "title" },
    {
      label: "Enter description",
      value: product.description,
      type: "text",
      name: "description",
    },
    {
      label: "Enter imageUrl",
      value: product.imageUrl,
      type: "text",
      name: "imageUrl",
    },
    {
      label: "Enter product count",
      value: product.count,
      type: "number",
      name: "count",
    },
    {
      label: "Enter product price",
      value: product.price,
      type: "number",
      name: "price",
    },
  ];

  return { handleChange, onCreate, PRODUCT_FIELDS };
};

export default useProduct;
