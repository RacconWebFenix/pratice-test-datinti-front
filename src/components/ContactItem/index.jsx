import {
  Box,
  FormControlLabel,
  IconButton,
  ListItem,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { useState } from "react";
import PhoneList from "../PhoneList";
import ConfirmModal from "../ConfirmModal";
import { api } from "../../Api/api";
import EditModal from "../EditModal";


function ContactItem({ name, age, phones, contactId, onRemoved, getData }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [checked, setChecked] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);


  const handleClickOpen = () => {
    setOpenEdit(true);
  };

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleOpenRemove = () => {
    setOpenRemove(true);
  };

  const removeContact = async (id) => {
    try {
      await api.delete(`contato/${id}`);

      onRemoved(true);
    } catch (error) {
      onRemoved(false);
      console.log(error);
    }
  };

  const handleClose = (confirm) => {
    setOpenRemove(false);
    confirm && removeContact(contactId);
  };

  return (
    <Box sx={{ borderBottom: "1px solid gray" }}>
      <ListItem>
        <div>
          <span>Telefones</span>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label=""
          />
        </div>
        <Box
          display="flex"
          width="100%"
          justifyContent="center"
          sx={{ ml: "1rem" }}
        >
          <h3>{name}</h3>
        </Box>
        <p style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}>Idade:</p>
        <h3>{age}</h3>
        <Box width="50%" display="flex" justifyContent="end">
          <IconButton onClick={handleClickOpen}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={handleOpenRemove}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </ListItem>
      <PhoneList checked={checked} phones={phones} />
      <ConfirmModal open={openRemove} onClose={handleClose} />
      <EditModal
        contactId={contactId}
        open={openEdit}
        setOpen={setOpenEdit}
        getAllData={getData}
      />
     
    </Box>
  );
}

export default ContactItem;

ContactItem.propTypes = {
  name: PropTypes.string,
  phones: PropTypes.array,
  contactId: PropTypes.number,
  onRemoved: PropTypes.func,
  getData: PropTypes.func,
  age: PropTypes.number,
};
