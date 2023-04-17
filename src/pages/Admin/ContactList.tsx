import { Button, TableCell, TableRow } from "@mui/material";
import TableView, {
  Data,
  HeadCell,
} from "../../components/TableView/TableView";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: string
): Data {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, "a"),
  createData("Donut", 452, 25.0, 51, "b"),
  createData("Eclair", 262, 16.0, 24, "c"),
  createData("Frozen yoghurt", 159, 6.0, 24, "d"),
  createData("Gingerbread", 356, 16.0, 49, "d"),
  createData("Honeycomb", 408, 3.2, 87, "d"),
  createData("Ice cream sandwich", 237, 9.0, 37, "d"),
  createData("Jelly Bean", 375, 0.0, 94, "d"),
  createData("KitKat", 518, 26.0, 65, "d"),
  createData("Lollipop", 392, 0.2, 98, "d"),
  createData("Marshmallow", 318, 0, 81, "d"),
  createData("Nougat", 360, 19.0, 9, "d"),
  createData("Oreo", 437, 18.0, 63, "d"),
];

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    label: "?",
  },
  {
    id: "fat",
    label: "Fat (g)",
  },
  {
    id: "carbs",
    label: "Carbs (g)",
  },
  {
    id: "protein",
    label: "Protein (g)",
  },
];

const rowComponent = (row: Data) => {
  return (
    <TableRow hover key={row.name} sx={{ cursor: "pointer" }}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell>{row.calories}</TableCell>
      <TableCell>{row.fat}</TableCell>
      <TableCell>{row.carbs}</TableCell>
      <TableCell>
        <Button>{row.protein}</Button>
      </TableCell>
    </TableRow>
  );
};

export default function ContactList() {
  return (
    <TableView
      rows={rows}
      defaultOrderBy="something"
      headCells={headCells}
      rowComponent={rowComponent}
    ></TableView>
  );
}
