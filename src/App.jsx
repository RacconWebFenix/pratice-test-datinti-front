import { useState } from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Contatos from "./pages/Contacts";
import Register from "./pages/Register";

function App() {
  const [value, setValue] = useState(0);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  // useEffect(() => {
  //   ref.current.ownerDocument.body.scrollTop = 0;
  // }, [value]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme={true} />

      <Box display="flex">{value === 0 && <Home />}</Box>

      <Box
        sx={{ overflowX: "clip" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        {value === 1 && <Contatos />}
      </Box>
      <Box sx={{ overflowX: "clip" }}>{value === 2 && <Register />}</Box>

      <Navigation setValue={setValue} value={value} />
    </ThemeProvider>
  );
}

export default App;
