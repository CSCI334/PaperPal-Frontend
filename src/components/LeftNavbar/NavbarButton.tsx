import { Inbox } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface Props {
  title: string;
  selected?: boolean;
}

const btnStyle = {
  width: "80%",
  mb: "5px",
  borderTopRightRadius: "25px",
  borderBottomRightRadius: "25px",
  borderBottomLeftRadius: "0px",
  borderTopLeftRadius: "0px",
  justifyContent: "left",
};

const style = (selected: boolean | undefined) => {
  if (selected != undefined ? selected : false)
    return {
      ...btnStyle,
      backgroundColor: "#72BAD1",
      "&.Mui-selected": {
        backgroundColor: "#72BAD1",
      },
      "&.Mui-focusVisible": {
        backgroundColor: "#72BAD1",
      },
      ":hover": {
        backgroundColor: "#72BAD1",
      },
    };
  return btnStyle;
};

console.log(style(true));
export default function NavbarButton({ title, selected }: Props) {
  return (
    <ListItem disablePadding>
      <ListItemButton sx={style(selected)}>
        <ListItemIcon
          sx={{
            color: "inherit",
          }}
        >
          <Inbox />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
}
