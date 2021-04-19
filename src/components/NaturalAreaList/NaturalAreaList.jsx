import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const NaturalAreaList = ({naturalAreas}) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Natural Area</TableCell>
                    <TableCell align="right">County</TableCell>
                    <TableCell align="right">Add to Hunts</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {naturalAreas.map((row, index) => (
                    <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        {row.result.name}
                    </TableCell>
                    <TableCell align="right">{row.result.county}</TableCell>
                    <TableCell align="right">Add</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default NaturalAreaList






