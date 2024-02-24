import { Box, Container, List } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../Api/api";
import ContactItem from "../ContactItem";

function ContactList() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api.get("contato").then((response) => setContacts(response.data));
  }, []);

  return (
    <Box>
      <List>
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <h3>Lista de Contatos</h3>
        </Container>
        <Container>
          {contacts.map((c, i) => (
            <div key={i}>
              <ContactItem name={c.nome} phones={c.telefone} />
            </div>
          ))}
        </Container>
      </List>
    </Box>
  );
}

export default ContactList;
