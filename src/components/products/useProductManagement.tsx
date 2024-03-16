import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IProduct } from "../../interface/interface";
import { fetchProductData } from "../../store/productSlice";
import { AppDispatch } from "../../store/store";

export const useProductData = () => {
  const [data, setData] = useState<IProduct[]>([]);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchProductData());
        const fetchedData = response.payload;
        setData(fetchedData as IProduct[]);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return data;
};

export const useSortingAndFiltering = (initialData: IProduct[]) => {
  const [sortBy, setSortBy] = useState<string>("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filterPrice, setFilterPrice] = useState<number[]>([0, 99999]);
  const [data, setData] = useState<IProduct[]>(initialData);

  useEffect(() => {
    const sortedData = initialData.slice().sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
    setData(sortedData);
  }, [sortBy, sortOrder, initialData]);

  const applyFilters = () => {
    const filteredData = initialData.filter((product) => {
      const withinPrice =
        product.price >= filterPrice[0] && product.price <= filterPrice[1];
      return withinPrice;
    });
    setData(filteredData);
  };

  const resetFilters = () => {
    setFilterPrice([0, 99999]);
    setData(initialData);
  };

  return {
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filterPrice,
    setFilterPrice,
    data,
    applyFilters,
    resetFilters,
  };
};
