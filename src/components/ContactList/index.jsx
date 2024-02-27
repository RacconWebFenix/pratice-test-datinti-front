import { Alert, Box, Container, List, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import ContactItem from "../ContactItem";
import PropTypes from "prop-types";

function ContactList({ data, getData }) {
  const [onRemoved, setOnRemoved] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  // const getData = async () => {
  //   try {
  //     await api
  //       .get("contato")
  //       .then((response) =>
  //         setContacts(filtredData.length === 0 ? response.data : filtredData)
  //       );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    handleRemove();
  }, [onRemoved]);

  const handleRemove = async () => {
    onRemoved && setOpenSnack(true);
    onRemoved === true && getData();

    setOnRemoved(false);
  };

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
          {data.map((c, i) => (
            <div key={i}>
              <ContactItem
                name={c.nome}
                phones={c.telefone}
                contactId={c.id}
                onRemoved={setOnRemoved}
                getData={getData}
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
  data: PropTypes.array,
  getData: PropTypes.func,
};
