import { Box, Container, List } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../Api/api";
import ContactItem from "../ContactItem";
import PropTypes from "prop-types";

function ContactList({ filtredData, clearName, clearPhone, setFilter }) {
  const [contacts, setContacts] = useState([]);

  const getData = async () => {
    try {
      await api.get("contato").then((response) => setContacts(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const removeContact = async (id) => {
    try {
      await api.delete(`contato/${id}`);
      // fazer tratativa de sucesso!
      await api.get("contato").then((response) => setContacts(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const apllyFilter = () => {
    filtredData.length === 0 ? getData() : setContacts(filtredData);
  };

  const clearFilters = () => {
    clearName || clearPhone ? getData() : setFilter([]);
  };

  useEffect(() => {
    apllyFilter();
  }, [filtredData]);

  useEffect(() => {
    clearFilters();
  }, [clearName, clearPhone, setFilter]);

  return (
    <Box>
      <List>
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <h3>Lista de Contatos</h3>
        </Container>
        <Container>
          {contacts.map((c, i) => (
            <div key={i}>
              <ContactItem
                name={c.nome}
                phones={c.telefone}
                removeContact={() => removeContact(c.id)}
              />
            </div>
          ))}
        </Container>
      </List>
    </Box>
  );
}

export default ContactList;

ContactList.propTypes = {
  filtredData: PropTypes.array,
  clearName: PropTypes.bool,
  clearPhone: PropTypes.bool,
  setFilter: PropTypes.func,
};
