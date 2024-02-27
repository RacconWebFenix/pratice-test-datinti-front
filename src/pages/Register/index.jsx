import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Box,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { api } from "../../Api/api";

function Register() {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    telefones: [""],
  });

  const [openSnack, setOpenSnack] = useState(false);

  const [errors, setErrors] = useState({});

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "telefones") {
      const newTelefones = [...formData.telefones];
      newTelefones[index] = value;
      setFormData((prevState) => ({
        ...prevState,
        telefones: newTelefones,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    // Validação dinâmica
    const validationErrors = validateField(name, value);
    if (index !== undefined) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`${name}${index}`]: validationErrors[name],
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationErrors[name],
      }));
    }
  };

  const handleAddTelefone = () => {
    setFormData((prevState) => ({
      ...prevState,
      telefones: [...prevState.telefones, ""],
    }));
  };

  const handleRemoveTelefone = (index) => {
    const newTelefones = [...formData.telefones];
    newTelefones.splice(index, 1);
    setFormData((prevState) => ({
      ...prevState,
      telefones: newTelefones,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      const payload = {
        nome: formData.nome,
        idade: parseInt(formData.idade), // Convertendo para número
        telefone: formData.telefones.map((numero) => ({ numero })), // Mapeando para o formato desejado
      };

      const res = await api.post("contato", payload);
      res.status === 201 && setOpenSnack(true);

      // Resetar o formulário após o envio, se necessário
      setFormData({
        nome: "",
        idade: "",
        telefones: [""],
      });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key].forEach((value, index) => {
          const validationErrors = validateField(key, value);
          if (Object.keys(validationErrors).length > 0) {
            errors[`${key}${index}`] = validationErrors[key];
          }
        });
      } else {
        const validationErrors = validateField(key, data[key]);
        if (Object.keys(validationErrors).length > 0) {
          errors[key] = validationErrors[key];
        }
      }
    }
    return errors;
  };

  const validateField = (name, value) => {
    const errors = {};
    switch (name) {
      case "nome":
        if (!value.trim()) {
          errors[name] = "Campo obrigatório";
        }
        break;
      case "idade":
        if (!value.trim()) {
          errors[name] = "Campo obrigatório";
        } else if (isNaN(value) || parseInt(value) <= 0) {
          errors[name] = "A idade deve ser um número positivo";
        }
        break;
      case "telefones":
        if (!value.trim()) {
          errors[name] = "Campo obrigatório";
        }
        break;
      default:
        break;
    }
    return errors;
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" justifyContent="center">
        <h1>Cadastro</h1>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              error={errors.nome ? true : false}
              helperText={errors.nome}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Idade"
              name="idade"
              type="number"
              value={formData.idade}
              onChange={handleChange}
              error={errors.idade ? true : false}
              helperText={errors.idade}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection="row"
            justifyContent="end"
          >
            <Button variant="contained" onClick={handleAddTelefone}>
              Adicionar Telefone
            </Button>
          </Grid>
          {formData.telefones.map((telefone, index) => (
            <Grid
              item
              xs={12}
              key={index}
              display="flex"
              flexDirection="column"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                justifyItems="center"
              >
                <TextField
                  fullWidth
                  label={`Telefone ${index + 1}`}
                  name="telefones"
                  value={telefone}
                  onChange={(e) => handleChange(e, index)}
                  error={errors[`telefones${index}`] ? true : false}
                  helperText={errors[`telefones${index}`]}
                />

                <IconButton
                  sx={{ ml: "1rem" }}
                  onClick={() => handleRemoveTelefone(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Contato adicionado com sucesso.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Register;
