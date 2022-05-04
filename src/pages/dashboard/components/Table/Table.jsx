import React, { useEffect } from "react";
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
} from "@mui/material";
import {
  ArrowDropUp as AcsIcon,
  ArrowDropDown as DescIcon,
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
)

export default function TableComponent({
  columns,
  data,
  CurrentPage,
  PerPage,
  PerRowChangeHandler,
  PageChangeHandler,
  TotalItems, }) {
  const classes = useStyles();
  // var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  // keys.shift(); // delete "id" key
  const {searchText} = useSelector((state) => state.search);

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
    state: { pageIndex, selectedRowIds },
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
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell,index) => {
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
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
