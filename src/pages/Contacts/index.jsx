import { Box, IconButton, List, ListItem, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { AccountCircle, Phone } from "@mui/icons-material";

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

      <Box>
        <List>
          <ListItem>
            Nome do contato
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ListItem>

          <ListItem>
            Nome do contato
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ListItem>

          <ListItem>
            Nome do contato
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default Contatos;
