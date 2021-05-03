import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    Toolbar,
    TextField
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NaturalAreaList from '../NaturalAreaList/NaturalAreaList';
import FloraList from '../FloraList/FloraList';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles( theme => ({
    // root: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    // },
    // textField: {
    //     marginLeft: theme.spacing(1),
    //     marginRight: theme.spacing(1),
    //     width: '25ch',
    // },
        searchContainer: {
            display: 'flex',
            
        },
        searchIcon: {

        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
}));


const Flora = () => {
    const classes = useStyles();

    useEffect(() => { handleToggle(); }, []);

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        if( !didMount ) {
            setOpen(!open);
        }
        
    };

    const dispatch = useDispatch();

    // this is the local state for the value of the search bar
    // const [search, setSearch] = useState({});
    let search = '';

    // this is the local state for the list of sna objects that matched the search
    const [filtered, setFiltered] = useState([]);

    // this stores whether or not a search has happened 
    const [searched, setSearched] = useState(false);

    const [didMount, setDidMount] = useState(false)

    const floraByNaturalArea = useSelector( store => store.naturalAreasProcessing);


    const displayList = () => {
        let display = <FloraList total={floraByNaturalArea} />
        if( searched ) {
            display = <FloraList total={filtered} />
        }
        return display;
    }
    // handles search function
    const searchForNaturalArea = (e) => {
        search += e.target.value;
        console.log( 'search', search );
        // create a regex pattern that looks at each letter of the search query
        if( search.length > 0) {
            let pattern = search.split('').map( x => {
            return `(${x})`
            }).join('');
            // creates a regex based on the search pattern and looks globally and is case insensitive
            let regex = new RegExp(`${pattern}`, "gi");
            console.log(regex);
            // sets the filtered array equal to the sna's that match the query
            setFiltered(floraByNaturalArea.filter( row => (row.cname + ' ' + row.sname + ' ' + row.species).match(regex)))
            console.log(filtered);
            // set the search state to the opposite of what it was
            setSearched(true);
        } else {
            setSearched(false);
        }
        
    }   
    if( floraByNaturalArea.length === 156 ) {
        dispatch({ type: 'PROCESS_NATURAL_AREAS'})
    }

    if( floraByNaturalArea.length > 160 && !didMount ) {
        setOpen(false);
        setDidMount(true);
    }
    
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <h1>Flora</h1>
            <div className ={classes.searchContainer}>
                <Toolbar>
                    <div className ={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon}/>
                        <TextField onChange={e => searchForNaturalArea(e)} />
                    </div>
                </Toolbar>
                {/* {JSON.stringify(naturalAreas.map( x => x.result.species.tree_shrub))} */}
                {/* {JSON.stringify(flora())} */}      
            </div>
            {floraByNaturalArea.length > 6 && displayList()}  
            <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>

        </div>
    )
}

export default Flora
