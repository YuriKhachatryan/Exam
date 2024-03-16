const PRODUCTS = "/products";
const ADD_PRODUCTS = "/add-products";
const SIGNUP = "/signup";
const SIGNIN = "/signin";
const ORDERS = "/orders";
const PROFILE = "/profile";
const CART = "/cart";
const PRODUCT_LIST = "/product-list";

const API_ENDPOINT = "http://localhost:3001";

const LOCALSTORAGE = { IS_AUTH: "isAuthenticated", USER_INFO: "userInfo" };

const APPBAR_PAGES_USER = [{ label: "Products", navigatePage: PRODUCTS }];
const APPBAR_PAGES_ADMIN = [
  { label: "Products", navigatePage: PRODUCTS },
  { label: "Add Product", navigatePage: ADD_PRODUCTS },
  { label: "Product List", navigatePage: PRODUCT_LIST },
];
const SETTINGS_PAGES = [
  { label: "Profile", navigatePage: PROFILE },
  { label: "Cart", navigatePage: CART },
  { label: "Orders", navigatePage: ORDERS },
  { label: "Logout", navigatePage: SIGNIN },
];

export {
  PRODUCTS,
  ADD_PRODUCTS,
  SIGNUP,
  API_ENDPOINT,
  SIGNIN,
  LOCALSTORAGE,
  ORDERS,
  PROFILE,
  CART,
  APPBAR_PAGES_ADMIN,
  SETTINGS_PAGES,
  PRODUCT_LIST,
  APPBAR_PAGES_USER,
};
