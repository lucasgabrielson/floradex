import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {useSelector} from 'react-redux'

const LeaderboardItem = ({row, index}) => {
    const user = useSelector( store => store.user);
    return (
        <>
            <TableRow key={index}>
                {row.username === user.username ? <TableCell component="th" scope="row">
                    <strong>{row.username}</strong>
                </TableCell>
                :
                <TableCell component="th" scope="row">  
                    {row.username}
                </TableCell>
                }
                <TableCell align="right">{index + 1}</TableCell>          
            </TableRow>
        </>
    )
}

export default LeaderboardItem
