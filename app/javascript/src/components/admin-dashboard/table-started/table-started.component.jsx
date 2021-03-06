import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper
} from '@material-ui/core';

import { useStyles } from './table-started.styles';

import { RowMenu } from '../row-menu/row-menu.component';
import { confirmSwalMessage } from '../../shared/swal-message/swal-message';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'title', disablePadding: false, label: 'Title' },
  { id: 'author_name', disablePadding: false, label: 'Author(s)' },
  { id: 'created_at', disablePadding: false, label: 'Started' },
  { id: 'actions', disablePadding: false, label: 'Actions' }
];

function EnhancedTableHead(props) {
  const tableStyles = useStyles();
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={tableStyles.tableContainer}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            className={tableStyles.tableTitle}
            align='left'
            padding='default'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              className={tableStyles.tableTitle}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const TableStarted = ({ ctrResults, deleteCTRResultsStart }) => {
  const classes = useStyles();
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('created_at');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (ctrResults) {
      setRows(ctrResults);
    }
  }, [ctrResults]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const goToEdit = (id, e) => {
    e.preventDefault();
    window.location.href = `/submission/results/${id}`;
  };

  const deleteCTR = (resultId, e) => {
    e.preventDefault();

    confirmSwalMessage(
      'Are you sure you want to delete the CTR details?',
      'warning',
      () => deleteCTRResultsStart(resultId)
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody className={classes.tableBody}>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  let author_name = row.author_first_name
                    ? row.author_first_name
                    : '';

                  author_name = row.author_last_name
                    ? author_name + ' ' + row.author_last_name
                    : 'N/A';

                  return (
                    <TableRow className={classes.tableRow} key={index}>
                      <TableCell
                        className={classes.tableData}
                        padding='default'
                        component='th'
                        id={labelId}
                        scope='row'
                      >
                        {row.title}
                      </TableCell>
                      <TableCell
                        scope='row'
                        className={classes.tableData}
                        align='left'
                      >
                        {author_name}
                      </TableCell>
                      <TableCell
                        scope='row'
                        className={classes.tableData}
                        align='left'
                      >
                        {row.created_at.substring(0, 10)}
                      </TableCell>
                      <TableCell
                        scope='row'
                        className={classes.tableData}
                        align='left'
                      >
                        <RowMenu
                          row={row}
                          goToEdit={goToEdit}
                          deleteCTR={deleteCTR}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default TableStarted;
