import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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

const NaturalAreaItemSpeciesList = ({row, index, type}) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const floraImage = useSelector( store => store.trefleApis)

    const handleOpen = () => {
        setOpen(true);
        dispatch({type: 'GET_FLORA_IMAGE', payload: row.sname});
    };

    const handleClose = () => {
        setOpen(false);
    };

    const src = floraImage.data.find( x => x.image_url !== null).image_url

    const body = (
        <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{row.cname}</h2>
        <h2>{row.sname}</h2>
        {/* <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </p> */}
        <img src={src} />
        </div>
    );

    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    {row.cname}
                </TableCell>
                <TableCell align="right">{type}</TableCell>
                <TableCell align="right" onClick={handleOpen}>{'Details'}</TableCell>
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

export default NaturalAreaItemSpeciesList
