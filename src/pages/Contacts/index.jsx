import { Box, CircularProgress, Container, TextField } from "@mui/material";
import { AccountCircle, Phone } from "@mui/icons-material";
import ContactList from "../../components/ContactList";
import { useEffect, useState } from "react";
import { api } from "../../Api/api";

function Contatos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      let responseData;
      if (textValue.name.length > 0) {
        responseData = await api.get(`contato/search/${textValue.name}`);
      } else if (textValue.phone.length > 0) {
        responseData = await api.get(`contato/telefone/${textValue.phone}`);
      } else {
        responseData = await api.get(`contato`);
      }
      setData(responseData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
    >
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
      {loading ? (
        <CircularProgress />
      ) : (
        <ContactList data={data} getData={handleGetData} />
      )}
    </Box>
  );
}

export default Contatos;
