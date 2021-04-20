import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const NaturalAreaListItem = ({row, index}) => {
    const [added, setAdded] = useState( false );

    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);


    const displayCell = () => {
        let display = <TableCell align="right" onClick={() => addToHunts()}>Add</TableCell>
        if( added ) {
            display = <TableCell align="right" onClick={() => removeFromHunts()}>Remove</TableCell>
        }
        return display;
    }

    const addToHunts = () => {
        setAdded(!added);
        dispatch({ type: 'ADD_TO_HUNTS', payload: objectToSend  });
    }

    const removeFromHunts = () => {
        setAdded(!added);
    }

    const objectToSend = {
        id: user.id,
        endpoint: row.result.id
    }

    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {row.result.name}
                </TableCell>
                <TableCell align="right">{row.result.county}</TableCell>
                {displayCell()}
            </TableRow>
        </>
    )
}

export default NaturalAreaListItem
