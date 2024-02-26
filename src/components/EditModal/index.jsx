import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { api } from "../../Api/api";

function EditModal({ contactId, open, setOpen, setContacts }) {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && contactId) {
      getData();
    }
  }, [open, contactId]);

  const getData = async () => {
    try {
      await api
        .get(`contato/${contactId}`)
        .then((response) => setFormData(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = async () => {
    setOpen(false);
    try {
      await api.get("contato").then((response) => setContacts(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Validação dinâmica
    const validationErrors = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length === 0) {
      const payload = {
        nome: formData.nome,
        idade: parseInt(formData.idade),
      };

      await api.put(`contato/${contactId}`, payload);
      console.log(payload); // Aqui você pode enviar os dados para onde desejar
      handleClose();
    } else {
      setErrors(formErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    for (const key in data) {
      const validationErrors = validateField(key, data[key]);
      if (Object.keys(validationErrors).length > 0) {
        errors[key] = validationErrors[key];
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
        if (isNaN(value) || parseInt(value) <= 0) {
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
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Editar Contato</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: "0.5rem" }}>
          Editar detalhes do contato:
        </DialogContentText>
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button type="submit">Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;

EditModal.propTypes = {
  contactId: PropTypes.number,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  setContacts: PropTypes.func,
};