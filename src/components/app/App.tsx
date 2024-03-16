import React, { FC } from "react";
import { Box, ThemeProvider } from "@mui/material";

import { theme } from "../../styles/componentsStyles";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../../routes/Routes";
import { Provider } from "react-redux";
import store from "../../store/store";
import NavBar from "../common/appBar/appBar";

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <AppRoutes />
        </Router>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
