import { Alert, Snackbar } from "@mui/material";
import PropTypes from "prop-types";

function NotificationCustom({
  severity,
  description,
  openSnack,
  setOpenSnack,
}) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <Snackbar
      open={openSnack}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {description}
      </Alert>
    </Snackbar>
  );
}

export default NotificationCustom;

NotificationCustom.propTypes = {
  severity: PropTypes.string,
  description: PropTypes.string,
  setOpenSnack: PropTypes.func,
  openSnack: PropTypes.bool,
};
