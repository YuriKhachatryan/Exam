interface INfButton {
  onClick: (event: React.MouseEvent<Element, MouseEvent>) => void;
  title: string;
  variant: "contained" | "text" | "outlined";
  fullWidth?: boolean;
}

interface IInputField {
  value: string | number;
  handleChange: (value: string, name: string) => void;
  type: string;
  name: string;
  label: string;
}

interface Address {
  x: number;
  y: number;
  numbeOfSteps: number;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  [key: string]: string | undefined;
}

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  user: IUser | null;
}

interface IProduct {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  count: number;
  price: number;
  userId?: string;
}

interface ICart {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  count: number;
  price: number;
  userId: string;
}

interface IOrder {
  id?: string;
  date: Date;
  items: ICart[];
  userid: string;
}

export type {
  INfButton,
  IInputField,
  Address,
  IUser,
  AuthState,
  IProduct,
  ICart,
  IOrder,
};
