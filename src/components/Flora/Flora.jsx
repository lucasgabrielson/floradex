import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    Toolbar,
    TextField
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NaturalAreaList from '../NaturalAreaList/NaturalAreaList'

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

const Flora = () => {
    const classes = useStyles();

    // this is the local state for the value of the search bar
    const [search, setSearch] = useState({});

    // this is the local state for the list of sna objects that matched the search
    const [filtered, setFiltered] = useState([]);

    // this stores whether or not a search has happened 
    const [searched, setSearched] = useState(false);

    const naturalAreas = useSelector( store => store.naturalAreas);

    // handles search function
    const searchForNaturalArea = () => {
        console.log( 'in searchForNaturalArea' );
        // create a regex pattern that looks at each letter of the search query
        let pattern = search.split('').map( x => {
            return `(${x})`
        }).join('');
        // creates a regex based on the search pattern and looks globally and is case insensitive
        let regex = new RegExp(`${pattern}`, "gi");
        console.log(regex);
        // sets the filtered array equal to the sna's that match the query
        setFiltered(naturalAreas.filter( area => (area.result.county + ' ' + area.result.name).split('').join('').match(regex)))
        console.log(filtered);
        // set the search state to the opposite of what it was
        setSearched(!searched);
    }   
    
    const flora = () => {
        console.log( 'in flora' );
        // let trees = naturalAreas.map( x => x.result.species.tree_shrub ).flat(1);
        // console.log( trees.length);
        // let grasses = naturalAreas.map( x => x.result.species.grass_sedge)
        // let wildflowers = naturalAreas.map( x => x.result.species.wildflower)
        let total = [];
        let trees = [];
            for( let i = 0; i < naturalAreas.length; i++ ) {
                let objectToPush = { id: naturalAreas[i].result.id, trees: naturalAreas[i].result.species.tree_shrub }
                trees.push(objectToPush);
            }  
        for( let i = 0; i < 1; i++) {
            for( let j = 0; j < trees[0].trees.length; j++) {
                total.push({id: [trees[0].id], sname: trees[0].trees[j].sname, cname: trees[0].trees[j].cname, species: 'Tree' })
            }
        }
        for( let i = 1; i < trees.length; i++ ) {
            for( let j = 0; j < trees[i].trees.length; j++) {
                // console.log(trees[i].trees[j].sname.toUpperCase().split('').join(''))
                // total.some( x => console.log('x.sname', x.sname, 'trees[i].trees[j].sname', trees[i].trees[j].sname));
                // console.log( total.some( x => console.log( 'x.sname', x.sname) ))
                // console.log(total.some( x => x.sname.toUpperCase().split('').join('') === trees[i].trees[j].sname.toUpperCase().split('').join('')))
                if( total.some( x => x.sname.toUpperCase().split('').join('') === trees[i].trees[j].sname.toUpperCase().split('').join(''))) {
                    const index = total.findIndex( x => x.sname.toUpperCase().split('').join('') === trees[i].trees[j].sname.toUpperCase().split('').join(''));
                    console.log( 'in else', index )
                    total[index].id.push(trees[i].id);
                } else {
                    total.push({id: [trees[i].id], sname: trees[i].trees[j].sname, cname: trees[i].trees[j].cname, species: 'Tree' })
                }
            }
        }
        return total;
    }
    return (
        <div>
            <h1>Flora</h1>
            <div className ={classes.searchContainer}>
                    <SearchIcon onClick={() => searchForNaturalArea()} className={classes.searchIcon}/>
                    <TextField onChange={e => setSearch(e.target.value)} />
                    {/* {JSON.stringify(naturalAreas.map( x => x.result.species.tree_shrub))} */}
                    {/* {JSON.stringify(naturalAreas[0].result)} */}
                    {JSON.stringify(flora())}
            </div>
        </div>
    )
}

export default Flora
