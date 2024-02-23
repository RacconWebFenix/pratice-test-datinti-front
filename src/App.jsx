import { useEffect, useRef, useState } from "react";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import Home from "./pages/Home";
import Navigation from "./components/Navigation";
import Contatos from "./pages/Contacts";
import Register from "./pages/Register";

function App() {
  const [value, setValue] = useState(0);

  const ref = useRef(null);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme={true} />

      <Box
        height={"93vh"}
        display="flex"
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        ref={ref}
      >
        {value === 0 && <Home />}

        {value === 1 && <Contatos />}
        {value === 2 && <Register />}

        <Navigation setValue={setValue} value={value} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
