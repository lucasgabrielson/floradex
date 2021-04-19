import React, {useState} from 'react';
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
    const classes = useStyles();

    const [search, setSearch] = useState({});
    return (
        <div>
            <h1>Natural Areas</h1>
            <Toolbar>
                <div className ={classes.searchContainer}>
                    <SearchIcon className={classes.searchIcon}/>
                    <TextField onChange={e => setSearch(e.target.value)} />
                    {JSON.stringify(search)}
                </div>
            </Toolbar>
        </div>
    )
}

export default NaturalAreas
