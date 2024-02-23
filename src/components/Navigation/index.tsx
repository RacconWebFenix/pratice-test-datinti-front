import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import ContactIcons from "@mui/icons-material/Contacts";
import React from "react";

export default function Navigation({ value, setValue }) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Contatos" icon={<ContactIcons />} />
        <BottomNavigationAction label="Cadastro" icon={<AddCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
