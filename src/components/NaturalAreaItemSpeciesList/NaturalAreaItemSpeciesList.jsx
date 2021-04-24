import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import UploadImageToS3WithReactS3 from '../UploadImageToS3WithReactS3/UploadImageToS3WithReactS3';

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

const NaturalAreaItemSpeciesList = ({row, index, type, source}) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    let floraImage = [];
    floraImage = useSelector( store => store.trefleApis);

    const handleOpen = () => {
        
        dispatch({type: 'GET_FLORA_IMAGE', payload: row.sname});
        // src = ;
        // src = floraImage.data[0].image_url;
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        dispatch({type: 'CLEAR_FLORA'})
    };

    const handleImageOpen = () => {
        setOpen(true);
    }

    const handleImageClose = () => {
        setOpen(false);
    }

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

    let src = '';

    const body = (
        <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{row.cname}</h2>
        <h2>{row.sname}</h2>
        {displayImage()}
        </div>

    );

    const imageBody = (
        <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Choose Image</h2>
        <UploadImageToS3WithReactS3 setOpen={setOpen}/>
        </div>

    );

    return (
        <>  { source ? 
                <>
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {row.cname}
                        </TableCell>
                        <TableCell align="right">{type}</TableCell>
                        <TableCell align="right">{'Details'}</TableCell>
                        <TableCell align="right" onClick={handleImageOpen}>Add</TableCell>
                    </TableRow>
                    <Modal
                        open={open}
                        onClose={handleImageClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        >
                        {imageBody}
                    </Modal>
                </>
            :
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
            }  
        </>
    )
}

export default NaturalAreaItemSpeciesList
