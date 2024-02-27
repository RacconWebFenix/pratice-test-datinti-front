import { Box, Container, TextField } from "@mui/material";
import { AccountCircle, Phone } from "@mui/icons-material";
import ContactList from "../../components/ContactList";
import { useEffect, useState } from "react";
import { api } from "../../Api/api";

function Contatos() {
  const [data, setData] = useState([]);
  const [textValue, setTextValue] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    setTextValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    handleGetData();
  }, [textValue.name, textValue.phone]);

  const handleGetData = async () => {
    if (textValue.name.length > 0) {
      await api
        .get(`contato/search/${textValue.name}`)
        .then((res) => setData(res.data));
    } else if (textValue.phone.length > 0) {
      await api
        .get(`contato/telefone/${textValue.phone}`)
        .then((res) => setData(res.data));
    } else {
      await api.get(`contato`).then((res) => setData(res.data));
    }
  };

  return (
    <Box display="grid" flexDirection="column" alignItems="center">
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <h3>Lista de Contatos</h3>
      </Container>
      <Box display="flex" flexDirection="row" sx={{ padding: "0.5rem" }}>
        <Box sx={{ display: "flex", alignItems: "flex-end", padding: "1rem" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Pesquisa por Nome"
            variant="standard"
            name="name"
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-end", padding: "1rem" }}>
          <Phone sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Pesquisa por Telefone"
            variant="standard"
            name="phone"
            onChange={handleChange}
          />
        </Box>
      </Box>
      <ContactList data={data} getData={handleGetData} />
    </Box>
  );
}

export default Contatos;
