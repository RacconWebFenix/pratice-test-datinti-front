import { Box, Container, List } from "@mui/material";
import { useEffect, useState } from "react";
import ContactItem from "../ContactItem";
import PropTypes from "prop-types";

import NotificationCustom from "../NotificationCustom";

function ContactList({ data, getData }) {
  const [onRemoved, setOnRemoved] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    handleRemove();
  }, [onRemoved]);

  const handleRemove = async () => {
    onRemoved && setOpenSnack(true);
    onRemoved === true && getData();

    setOnRemoved(false);
  };

  return (
    <Box>
      <NotificationCustom
        description={"Contato removido com sucesso."}
        setOpenSnack={setOpenSnack}
        openSnack={openSnack}
        severity="success"
      />
      <List>
        <Container>
          {data.map((c, i) => (
            <Box key={i}>
              <ContactItem
                name={c.nome}
                phones={c.telefone}
                age={c.idade}
                contactId={c.id}
                onRemoved={setOnRemoved}
                getData={getData}
              />
            </Box>
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
