import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

export default function List(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell align="left">NAME</TableCell>
            <TableCell align="right">TARGET</TableCell>
            <TableCell align="right">ACTUAL</TableCell>
            <TableCell align="right">DEFICIT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(row => (
            <TableRow key={row.sku}>
              <TableCell component="th" scope="row">
                {row.sku}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="right">{row.target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
              <TableCell align="right">{row.available.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
              <TableCell align="right">{row.target > row.available ? (row.target - row.available).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}