import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function ConfirmModal(props) {
  const { onClose, open } = props;

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Tem certeza que deseja remover o contato?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Esta ação removerá permanentemente o contato e seus telefones
          cadastrados.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Não</Button>
        <Button onClick={handleOk} autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
