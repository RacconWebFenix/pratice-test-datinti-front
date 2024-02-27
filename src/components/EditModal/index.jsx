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
import NotificationCustom from "../NotificationCustom";

function EditModal({ contactId, open, setOpen, getAllData }) {
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
  });

  const [openSnack, setOpenSnack] = useState(false);

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
    getAllData();
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

      setOpenSnack(true);

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
        if (isNaN(value) || parseInt(value) <= 0 || !value) {
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
    <>
      <NotificationCustom
        description={"Contato atualizado com sucesso."}
        setOpenSnack={setOpenSnack}
        openSnack={openSnack}
        severity="success"
      />
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
    </>
  );
}

export default EditModal;

EditModal.propTypes = {
  contactId: PropTypes.number,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  getAllData: PropTypes.func,
};
