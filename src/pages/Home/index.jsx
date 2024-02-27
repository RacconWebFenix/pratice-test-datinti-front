import { Box } from "@mui/material";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
      flexGrow={1}
      height="90vh"
    >
      <Box>
        <h1>Teste para Seleção – Desenvolvimento</h1>
        <h1>Empresa: Davinti</h1>
      </Box>
      <Box>
        <ContactPhoneIcon
          sx={{
            bgcolor: "background.paper",
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            width: "15rem",
            height: "15rem",
          }}
        />
      </Box>
    </Box>
  );
}
