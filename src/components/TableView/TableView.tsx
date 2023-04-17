import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  MouseEvent,
} from "react";

interface Data {
  name: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: string;
}

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

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: "asc" | "desc",
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Data;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    label: "Dessert (100g serving)",
  },
  {
    id: "calories",
    label: "Calories",
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

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "calories";
const DEFAULT_ROWS_PER_PAGE = 5;

interface EnhancedTableProps {
  onRequestSort: (event: MouseEvent<unknown>, newOrderBy: keyof Data) => void;
  order: "asc" | "desc";
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
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

export default function EnhancedTable() {
  const [order, setOrder] = useState<"asc" | "desc">(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState<keyof Data>(DEFAULT_ORDER_BY);
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState<Data[] | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  useEffect(() => {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );
    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
  }, []);

  const handleRequestSort = useCallback(
    (event: MouseEvent<unknown>, newOrderBy: keyof Data) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        rows,
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage]
  );

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);
    },
    [order, orderBy, rowsPerPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );
      setVisibleRows(updatedRows);
    },
    [order, orderBy]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows
                ? visibleRows.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.name}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell component="th" id={labelId} scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.calories}</TableCell>
                        <TableCell>{row.fat}</TableCell>
                        <TableCell>{row.carbs}</TableCell>
                        <TableCell>{row.protein}</TableCell>
                      </TableRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
