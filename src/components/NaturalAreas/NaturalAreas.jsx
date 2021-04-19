import React, {useState, useDispatch, useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    Toolbar,
    TextField
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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

        }
}));

const NaturalAreas = () => {
    useEffect(() => {
        dispatch({ type: 'FETCH_NATURAL_AREAS' });
    }, []);

    const classes = useStyles();

    const dispatch = useDispatch();


    const [search, setSearch] = useState({});

    const searchForNaturalArea = () => {
        console.log( 'in searchForNaturalArea' );
    }

  // const getDNREndpoints = () => {
  //   console.log( 'in getDNREndpoints' );
  //   dispatchEvent
  //   axios.get('/api/dnr')
  //     .then( response => {
  //       console.log( response );
  //     })
  // }
    return (
        <div>
            <h1>Natural Areas</h1>
            <Toolbar>
                <div className ={classes.searchContainer}>
                    <SearchIcon onClick={() => searchForNaturalArea()} className={classes.searchIcon}/>
                    <TextField onChange={e => setSearch(e.target.value)} />
                </div>
            </Toolbar>
        </div>
    )
}

export default NaturalAreas
