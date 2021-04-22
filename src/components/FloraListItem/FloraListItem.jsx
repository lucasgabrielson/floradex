import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
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

const FloraListItem = ({row, index}) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [openSNA, setOpenSNA] = useState(false);
    const dispatch = useDispatch();
    let floraImage = [];
    floraImage = useSelector( store => store.trefleApis);

    const handleOpen = () => {
        
        dispatch({type: 'GET_FLORA_IMAGE', payload: row.sname});
        setOpen(true);
    };

    const handleOpenSNA = () => {
        setOpenSNA(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch({type: 'CLEAR_FLORA'})
    };

    const handleCloseSNA = () => {
        setOpenSNA(false);
    };

    const displayImage = () => {
        let display = ''
        if( !Array.isArray(floraImage) ) {
            if( floraImage.data.find( x => x.image_url !== null) !== undefined ) {
                display = <img src={floraImage.data.find( x => x.image_url !== null).image_url}/>
            }
            else {
                display = <p>No Image Available</p>
            }
        } else {
            display = <p>Loading...</p>
        }
        return display
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{row.cname}</h2>
        <h2>{row.sname}</h2>
        {displayImage()}
        </div>

    );

    const bodyList = (
        <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Natural Areas</h2>
        <ul>
        {Array.isArray(row.id) ? row.id.map( x => <li>{x.name} {x.county}</li>) : ''}
        </ul>        
        </div>
    );

    return (
        <>
            <TableRow key={index}>
                <TableCell component="th" scope="row" onClick={handleOpen}>
                    {row.cname}
                </TableCell>
                <TableCell align="right">{row.species}</TableCell>
                <TableCell align="right" onClick={handleOpenSNA}>Natural Areas</TableCell>
            </TableRow>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {body}
            </Modal>
            <Modal
                open={openSNA}
                onClose={handleCloseSNA}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                {bodyList}
            </Modal>
        </>
    )
}

export default FloraListItem
