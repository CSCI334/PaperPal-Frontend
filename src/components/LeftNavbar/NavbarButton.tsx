import { useNavigate } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

export interface Props {
  title: string;
  selected?: boolean;
  icon?: React.ReactElement;
  onClick?: () => void;
  
  onSelected?: () => void;
}

const NavbarButton = ({ title, selected = false, icon, onClick }: Props) => {

  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={selected}
        onClick={onClick}
        sx={{
          width: "80%",
          mb: "5px",
          borderTopRightRadius: "25px",
          borderBottomRightRadius: "25px",
          borderBottomLeftRadius: "0px",
          borderTopLeftRadius: "0px",
          justifyContent: "left",
          backgroundColor: selected ? "#72BAD1" : undefined,
          "&.Mui-selected": {
            backgroundColor: "#72BAD1",
          },
          "&.Mui-focusVisible": {
            backgroundColor: "#72BAD1",
          },
          ":hover": {
            backgroundColor: "#72BAD1",
          },
        }}
      >
        {icon && <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

export default NavbarButton;