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
        let treesFiltered = [];
        let trees = [];
            for( let i = 0; i < naturalAreas.length; i++ ) {
                let objectToPush = { id: naturalAreas[i].result.id, name: naturalAreas[i].result.name, county: naturalAreas[i].result.county, trees: naturalAreas[i].result.species.tree_shrub }
                trees.push(objectToPush);
            }  
        for( let i = 0; i < 1; i++) {
            for( let j = 0; j < trees[0].trees.length; j++) {
                treesFiltered.push({id: [{id: trees[0].id, name: trees[0].name, county: trees[0].county}], sname: trees[0].trees[j].sname, cname: trees[0].trees[j].cname, species: 'Tree' })
            }
        }
        for( let i = 1; i < trees.length; i++ ) {
            for( let j = 0; j < trees[i].trees.length; j++) {
                // The plants in Lester Lake SNA have sname and cname reversed so we must check this case separately
                if( trees[i].id === 'sna02046') {
                    if( treesFiltered.some( x => x.sname.toUpperCase() === trees[i].trees[j].cname.toUpperCase())) {
                        const index = treesFiltered.findIndex( x => x.sname.toUpperCase().split('').join('') === trees[i].trees[j].cname.toUpperCase().split('').join(''));
                        treesFiltered[index].id.push({id: trees[i].id, name: trees[i].name, county: trees[i].county});
                    } else {
                        treesFiltered.push({id: [{id: trees[i].id, name: trees[i].name, county: trees[i].county}], sname: trees[i].trees[j].cname, cname: trees[i].trees[j].sname, species: 'Tree' })
                    }
                } else {
                    if( treesFiltered.some( x => x.sname.toUpperCase() === trees[i].trees[j].sname.toUpperCase())) {
                        const index = treesFiltered.findIndex( x => x.sname.toUpperCase().split('').join('') === trees[i].trees[j].sname.toUpperCase().split('').join(''));
                        treesFiltered[index].id.push({id: trees[i].id, name: trees[i].name, county: trees[i].county});
                    } else {
                        treesFiltered.push({id: [{id: trees[i].id, name: trees[i].name, county: trees[i].county}], sname: trees[i].trees[j].sname, cname: trees[i].trees[j].cname, species: 'Tree' })
                    }
                }
            }
        }

        let grassesFiltered = [];
        let grasses = [];
            for( let i = 0; i < naturalAreas.length; i++ ) {
                let objectToPush = { id: naturalAreas[i].result.id, name: naturalAreas[i].result.name, county: naturalAreas[i].result.county, grasses: naturalAreas[i].result.species.grass_sedge }
                grasses.push(objectToPush);
            }  
        for( let i = 0; i < 1; i++) {
            for( let j = 0; j < grasses[0].grasses.length; j++) {
                grassesFiltered.push({id: [{id: grasses[0].id, name: grasses[0].name, county: grasses[0].county}], sname: grasses[0].grasses[j].sname, cname: grasses[0].grasses[j].cname, species: 'Grass' })
            }
        }
        for( let i = 1; i < grasses.length; i++ ) {
            for( let j = 0; j < grasses[i].grasses.length; j++) {
                if( grasses[i].id === 'sna02046') {
                    if( grassesFiltered.some( x => x.sname.toUpperCase() === grasses[i].grasses[j].cname.toUpperCase())) {
                        const index = grassesFiltered.findIndex( x => x.sname.toUpperCase().split('').join('') === grasses[i].grasses[j].cname.toUpperCase().split('').join(''));
                        grassesFiltered[index].id.push({id: grasses[i].id, name: grasses[i].name, county: grasses[i].county});
                    } else {
                        grassesFiltered.push({id: [{id: grasses[i].id, name: grasses[i].name, county: grasses[i].county}], sname: grasses[i].grasses[j].cname, cname: grasses[i].grasses[j].sname, species: 'Grass' })
                    }
                } else {
                    if( grassesFiltered.some( x => x.sname.toUpperCase().split('').join('') === grasses[i].grasses[j].sname.toUpperCase().split('').join(''))) {
                        const index = grassesFiltered.findIndex( x => x.sname.toUpperCase().split('').join('') === grasses[i].grasses[j].sname.toUpperCase().split('').join(''));
                        grassesFiltered[index].id.push({id: grasses[i].id, name: grasses[i].name, county: grasses[i].county});
                    } else {
                        grassesFiltered.push({id: [{id: grasses[i].id, name: grasses[i].name, county: grasses[i].county}], sname: grasses[i].grasses[j].sname, cname: grasses[i].grasses[j].cname, species: 'Grass' })
                    }
                }  
            }
        }

        let wildflowersFiltered = [];
        let wildflowers = [];
            for( let i = 0; i < naturalAreas.length; i++ ) {
                let objectToPush = { id: naturalAreas[i].result.id, name: naturalAreas[i].result.name, county: naturalAreas[i].result.county, wildflowers: naturalAreas[i].result.species.wildflower }
                wildflowers.push(objectToPush);
            }  
        for( let i = 0; i < 1; i++) {
            for( let j = 0; j < wildflowers[0].wildflowers.length; j++) {
                wildflowersFiltered.push({id: [{id: wildflowers[0].id, name: wildflowers[0].name, county: wildflowers[0].county}], sname: wildflowers[0].wildflowers[j].sname, cname: wildflowers[0].wildflowers[j].cname, species: 'Wildflower' })
            }
        }
        for( let i = 1; i < wildflowers.length; i++ ) {
            for( let j = 0; j < wildflowers[i].wildflowers.length; j++) {
                if( wildflowers[i].id === 'sna02046') {
                    if( wildflowersFiltered.some( x => x.sname.toUpperCase() === wildflowers[i].wildflowers[j].cname.toUpperCase())) {
                        const index = wildflowersFiltered.findIndex( x => x.sname.toUpperCase().split('').join('') === wildflowers[i].wildflowers[j].cname.toUpperCase().split('').join(''));
                        wildflowersFiltered[index].id.push({id: wildflowers[i].id, name: wildflowers[i].name, county: wildflowers[i].county });
                    } else {
                        wildflowersFiltered.push({id: [{id: wildflowers[i].id, name: wildflowers[i].name, county: wildflowers[i].county}], sname: wildflowers[i].wildflowers[j].cname, cname: wildflowers[i].wildflowers[j].sname, species: 'Wildflower' })
                    }
                } else {
                    if( wildflowersFiltered.some( x => x.sname.toUpperCase().split('').join('') === wildflowers[i].wildflowers[j].sname.toUpperCase().split('').join(''))) {
                        const index = wildflowersFiltered.findIndex( x => x.sname.toUpperCase().split('').join('') === wildflowers[i].wildflowers[j].sname.toUpperCase().split('').join(''));
                        wildflowersFiltered[index].id.push({id: wildflowers[i].id, name: wildflowers[i].name, county: wildflowers[i].county});
                    } else {
                        wildflowersFiltered.push({id: [{id: wildflowers[i].id, name: wildflowers[i].name, county: wildflowers[i].county}], sname: wildflowers[i].wildflowers[j].sname, cname: wildflowers[i].wildflowers[j].cname, species: 'Wildflower' })
                    }
                }
            }
        }
        const total = treesFiltered.concat(grassesFiltered).concat(wildflowersFiltered);
        return total;
    }
    return (
        <div>
            <h1>Flora</h1>
            <div className ={classes.searchContainer}>
                    <SearchIcon onClick={() => searchForNaturalArea()} className={classes.searchIcon}/>
                    <TextField onChange={e => setSearch(e.target.value)} />
                    {/* {JSON.stringify(naturalAreas.map( x => x.result.species.tree_shrub))} */}
                    {/* {JSON.stringify(flora())} */}
                    <FloraList total={flora()}/>
            </div>
        </div>
    )
}

export default Flora
