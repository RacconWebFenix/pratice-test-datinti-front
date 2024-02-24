import { Collapse, List, ListItem } from "@mui/material";
import PropTypes from "prop-types";

function PhoneList({ checked, phones }) {
  return (
    <List>
      <Collapse in={checked}>
        {phones.map((p, i) => (
          <ListItem key={i}>Número: {p.numero}</ListItem>
        ))}
      </Collapse>
    </List>
  );
}

export default PhoneList;

PhoneList.propTypes = {
  checked: PropTypes.bool,
  phones: PropTypes.array,
};
