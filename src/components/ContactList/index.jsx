import { Alert, Box, Container, List, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../Api/api";
import ContactItem from "../ContactItem";
import PropTypes from "prop-types";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [onRemoved, setOnRemoved] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const getData = async () => {
    try {
      await api.get("contato").then((response) => setContacts(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRemove();
  }, [onRemoved]);

  const handleRemove = async () => {
    onRemoved && setOpenSnack(true);
    onRemoved === true &&
      (await api.get("contato").then((response) => setContacts(response.data)));

    setOnRemoved(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [openSnack]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <Box>
      <List>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Contato removido com sucesso!
          </Alert>
        </Snackbar>

        <Container>
          {contacts.map((c, i) => (
            <div key={i}>
              <ContactItem
                name={c.nome}
                phones={c.telefone}
                contactId={c.id}
                onRemoved={setOnRemoved}
                setContacts={setContacts}
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
