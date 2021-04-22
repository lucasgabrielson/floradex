import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const FloraListItem = ({row, index}) => {

    const dispatch = useDispatch();

    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {row.cname}
                </TableCell>
                <TableCell align="right">{row.species}</TableCell>
                <TableCell align="right">Natural Areas</TableCell>

            </TableRow>
        </>
    )
}

export default FloraListItem
