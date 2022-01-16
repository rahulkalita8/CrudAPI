import React from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { theme } from "./configs/theme";
import Home from "./components/Home";

/**
 * Main point of rendering for the interactive web page
 * @returns
 */
function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Home>
        </Home>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
