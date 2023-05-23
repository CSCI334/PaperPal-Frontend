import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  MouseEvent,
  ReactNode,
} from "react";
import EnhancedTableHead from "./TableHeader";
import React from "react";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const result = String(b[orderBy]).localeCompare(String(a[orderBy]), "en", { numeric: true })
  if (result < 0) {
    return -1;
  }

  if (result > 0) {
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

export interface Data {
  [key: string]: string | number;
}

export interface HeadCell {
  id: keyof Data;
  label: string;
  align?: "left" | "center" | "right";
}

const DEFAULT_ORDER = "asc";
const DEFAULT_ROWS_PER_PAGE = 5;

interface TableProps {
  rows: Data[];
  headCells: readonly HeadCell[];
  defaultOrderBy: string;
  rowComponent(data: Data): ReactNode;
}

export default function EnhancedTable({
  rows,
  headCells,
  defaultOrderBy,
  rowComponent,
}: TableProps) {
  const [order, setOrder] = useState<"asc" | "desc">(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState<keyof Data>(defaultOrderBy);
  const [page, setPage] = useState(0);
  const [visibleRows, setVisibleRows] = useState<Data[] | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  useEffect(() => {
    let rowsOnMount = rows
      .slice()
      .sort(getComparator<keyof Data>(DEFAULT_ORDER, defaultOrderBy));
    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );

    setVisibleRows(rowsOnMount);
  }, [rows, defaultOrderBy]);

  const handleRequestSort = useCallback(
    (event: MouseEvent<unknown>, newOrderBy: keyof Data) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = rows
        .slice()
        .sort(getComparator(toggledOrder, newOrderBy));

      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage, rows]
  );

  const handleChangePage = useCallback(
    (event: unknown, newPage: number) => {
      setPage(newPage);

      const sortedRows = rows.slice().sort(getComparator(order, orderBy));
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

      const sortedRows = rows.slice().sort(getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );
      setVisibleRows(updatedRows);
    },
    [order, orderBy, rows]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer  >
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              headCells={headCells}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {visibleRows
                ? visibleRows.map((row) => {
                  return <React.Fragment key={row.id}>
                    {rowComponent(row)}
                  </React.Fragment>
                })
                : null}
              {/* {visibleRows ? visibleRows.map(rowComponent) : null} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          sx={{ maxHeight: "1hv" }}
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
