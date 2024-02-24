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

function ContactItem({ name, phones }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box sx={{ borderBottom: "1px solid gray" }}>
      <ListItem>
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleChange} />}
          label=""
        />
        <Box width="100%">
          <h3>{name}</h3>
        </Box>

        <Box width="50%" display="flex" justifyContent="end">
          <IconButton>
            <EditIcon />
          </IconButton>

          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      </ListItem>
      <PhoneList checked={checked} phones={phones} />
    </Box>
  );
}

export default ContactItem;

ContactItem.propTypes = {
  name: PropTypes.string,
  phones: PropTypes.array,
};
