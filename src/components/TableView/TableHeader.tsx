import { Data, HeadCell } from "./TableView";

import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { MouseEvent } from "react";

interface EnhancedTableProps {
  onRequestSort: (event: MouseEvent<unknown>, newOrderBy: keyof Data) => void;
  order: "asc" | "desc";
  orderBy: keyof Data;
  headCells: readonly HeadCell[];
}

export default function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort,
  headCells,
}: EnhancedTableProps) {
  const createSortHandler =
    (newOrderBy: keyof Data) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, newOrderBy);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align={headCell.align ?? "left"}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
