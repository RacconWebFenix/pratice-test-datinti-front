import { Box, TextField } from "@mui/material";

import { AccountCircle, Phone } from "@mui/icons-material";
import ContactList from "../../components/ContactList";

function Contatos() {
  return (
    <Box display="grid" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="row" sx={{ padding: "0.5rem" }}>
        <Box sx={{ display: "flex", alignItems: "flex-end", padding: "1rem" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Pesquisa por Nome"
            variant="standard"
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", padding: "1rem" }}>
          <Phone sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Pesquisa por Telefone"
            variant="standard"
          />
        </Box>

      </Box>
        <ContactList />
    </Box>
  );
}

export default Contatos;
