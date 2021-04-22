import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FloraListItem from '../FloraListItem/FloraListItem';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const FloraList = ({total}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Flora</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Natural Areas</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {total !== undefined ? total.map((row, index) => (<FloraListItem row={row} index={index}/>)) : ''}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default React.memo(FloraList)
