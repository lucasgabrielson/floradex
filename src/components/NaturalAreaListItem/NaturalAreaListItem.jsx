import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const NaturalAreaListItem = ({row, added, index}) => {
    const addToHunts = () => {
        console.log( 'in addToHunts' );
        added = !added;
    }

    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {row.result.name}
                </TableCell>
                <TableCell align="right">{row.result.county}</TableCell>
                {!added ? <TableCell align="right" onClick={() => addToHunts()}>Add</TableCell> : <TableCell align="right" onClick={() => addToHunts()}>Remove</TableCell> }
            </TableRow>
        </>
    )
}

export default NaturalAreaListItem
