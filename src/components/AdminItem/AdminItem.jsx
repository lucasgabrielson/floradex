import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


function getModalStyle() {
    return {
        top: `$45%`,
        left: `$45%`,
        transform: `translate(-$45%, -$45%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const AdminItem = ({row, index}) => {
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();


    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const body = (
        <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{row.common_name}</h2>
        <h2>{row.scientific_name}</h2>
        <img src={row.image} />
        </div>

    );

    return (
        <>
           <TableRow>
                <TableCell>{row.common_name}</TableCell>
                <TableCell>{row.scientific_name}</TableCell>
                <TableCell>{row.user_id}</TableCell>
                <TableCell>{row.natural_area_id.slice(53)}</TableCell>
                <TableCell align="right" onClick={() => handleOpen()}>Image</TableCell>                
                <TableCell align="right">Check</TableCell>                
            </TableRow> 
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {body}            
            </Modal>
        </>
    )
}

export default AdminItem
