import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const NaturalAreaItemSpeciesList = ({row, index, type}) => {
    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {row.cname}
                </TableCell>
                <TableCell align="right">{type}</TableCell>
                <TableCell align="right">{'Details'}</TableCell>
            </TableRow>
        </>
    )
}

export default NaturalAreaItemSpeciesList
