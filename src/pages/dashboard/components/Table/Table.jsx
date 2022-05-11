import React, { useEffect, useState } from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableFooter,
  TablePagination,
  TableContainer,
  Paper,
  TableSortLabel,
  TableCell,
  Chip,
  Checkbox,
  TextField,
  Pagination,
  Select,
  MenuItem,
  Toolbar,
  Typography,
  IconButton,
  alpha,
  Tooltip
} from "@mui/material";
import {
  ArrowDropUp as AcsIcon,
  ArrowDropDown as DescIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from "@material-ui/icons";
import useStyles from "../../styles";
import { useTable } from 'react-table'
import { useFilters, useGlobalFilter, usePagination, useResizeColumns, useRowSelect, useSortBy } from "react-table/dist/react-table.development";
import { useSelector } from "react-redux";
import { useAsyncDebounce } from "react-table/dist/react-table.development";


// const states = {
//   sent: "success",
//   pending: "warning",
//   declined: "secondary",
// };


function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length

  return (
    <TextField
      className="form-control"
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    )
  }
);

const EnhancedTableToolbar = ({ numSelected, tableTitle, addHandler, removeHandler, addRemoveAction }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={removeHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add">
          <IconButton onClick={addHandler}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export const EditTable = ({
  data,
  columns,
  title,
  addHandler,
  removeHandler,
  addRemoveAction = false,
  onSelectedRowChange = null
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSizeallColumns,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable({
    columns,
    data,
    defaultColumn,
    initialState: { hiddenColumns: ["Id"], pageIndex: 0, pageSize: 5 },
  },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.allColumns.push(columns =>
        [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,

        ]
      )
    }
  );

  const [rowSelect, setRowSelect] = useState(0);


  useEffect(() => {
    setRowSelect(Object.keys(selectedRowIds).length);
  }, [selectedRowIds]);

  useEffect(() => {
    if (onSelectedRowChange)
      onSelectedRowChange(selectedFlatRows.map(d => d.original));
  }, [onSelectedRowChange, selectedFlatRows]);


  return (
    <>
      {addRemoveAction ?
        <EnhancedTableToolbar tableTitle={title} addRemoveAction={addRemoveAction} numSelected={rowSelect} addHandler={addHandler} removeHandler={removeHandler} />
        :
        null
      }
      <TableContainer component={Paper}>
        <Table  {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <>
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}

                      >
                        {column.render('Header')}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {headerGroup.headers.map(column => (
                    <TableCell>
                      {column.canFilter ? column.render('Filter') : null}
                    </TableCell>
                  ))}
                </TableRow>
              </>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <TableCell key={index}  {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
                count={data.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onRowsPerPageChange={e => {
                  setPageSize(Number(e.target.value))
                }}
                onPageChange={({ page }) => {
                  gotoPage(page);
                }}
                showFirstButton
                showLastButton
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer >
    </>
  )
}

export const ViewTable = ({
  columns,
  data,
  pagination = false
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({
    columns,
    data,
    defaultColumn,
    initialState: { hiddenColumns: ["Id"], pageIndex: 0, pageSize: 5 },
  },
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
  );
  return (
    <TableContainer component={Paper}>
      <Table  {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <>
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}

                    >
                      {column.render('Header')}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {headerGroup.headers.map(column => (
                  <TableCell>
                    {column.canFilter ? column.render('Filter') : null}
                  </TableCell>
                ))}
              </TableRow>
            </>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return (
                    <TableCell key={index}  {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
        
        {pagination ? (
          <TableFooter>
            <TableRow
            >
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
                count={data.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onRowsPerPageChange={e => {
                  setPageSize(Number(e.target.value))
                }}
                onPageChange={({ page }) => {
                  gotoPage(page);
                }}
                //component={<Pagination/>}
                showFirstButton
                showLastButton
              />
            </TableRow>
          </TableFooter>
        ) : null}
      </Table>
    </TableContainer >
  );
}

export default function TableComponent({
  columns,
  data,
  CurrentPage,
  PerPage,
  PerRowChangeHandler,
  PageChangeHandler,
  TotalItems,
  numRowSelect,
  getRowProps }) {
  const classes = useStyles();
  // var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  // keys.shift(); // delete "id" key
  const { searchText } = useSelector((state) => state.search);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    selectedFlatRows,
    state,
    state: { selectedRowIds },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
    defaultColumn,
    initialState: { hiddenColumns: ["Id"] },
  },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    useResizeColumns,
    hooks => {
      hooks.allColumns.push(columns =>
        [
          {
            id: 'selection',
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,

        ]
      )
    });

  useEffect(() => {
    setGlobalFilter(searchText);
  }, [searchText]);
  useEffect(() => {
    if (numRowSelect)
      numRowSelect(Object.keys(selectedRowIds).length, selectedFlatRows.map(
        d => d.original.Id
      ));
  }, [selectedRowIds, selectedFlatRows]);
  return (
    <TableContainer component={Paper}>
      <Table  {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <>
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                      {...column.getResizerProps()}
                    >
                      {column.render('Header')}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
              <TableRow>
                {headerGroup.headers.map(column => (
                  <TableCell>
                    {column.canFilter ? column.render('Filter') : null}
                  </TableCell>
                ))}
              </TableRow>
            </>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <>
                {getRowProps ? (
                  <TableRow {...row.getRowProps(getRowProps(row))}>
                    {row.cells.map((cell, index) => {
                      return (
                        <TableCell key={index}  {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ) : (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                      return (
                        <TableCell key={index}  {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )}
              </>
            )
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20, 30, 40, 50]}
              count={TotalItems}
              rowsPerPage={PerPage}
              page={CurrentPage - 1}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={PageChangeHandler}
              onRowsPerPageChange={PerRowChangeHandler}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
