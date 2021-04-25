const naturalAreas = (state = [], action) => {
    switch (action.type) {
        case 'SET_NATURAL_AREAS_FOR_PROCESSING':
            if( action.payload === undefined ) {

            } else{
                state = [...state, action.payload]
            }
            return state;
        case 'PROCESS_NATURAL_AREAS':
            let treesFiltered = [];
            let trees = [];
            for( let i = 0; i < state.length; i++ ) {
                let objectToPush = { id: state[i].result.id, name: state[i].result.name, county: state[i].result.county, trees: state[i].result.species.tree_shrub }
                trees.push(objectToPush);
            }  
        for( let i = 0; i < 1; i++) {
            for( let j = 0; j < trees[0].trees.length; j++) {
                treesFiltered.push({id: [{id: trees[0].id, name: trees[0].name, county: trees[0].county}], sname: trees[0].trees[j].sname, cname: trees[0].trees[j].cname, species: 'Tree' })
            }
        }
        for( let i = 1; i < trees.length; i++ ) {
            for( let j = 0; j < trees[i].trees.length; j++) {
                // || wildflowers[i].id === 'sna01004' || wildflowers[i].id === 'sna02062'
                // The plants in Lester Lake SNA have sname and cname reversed so we must check this case separately
                if( trees[i].id === 'sna02046' ) {
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
            for( let i = 0; i < state.length; i++ ) {
                let objectToPush = { id: state[i].result.id, name: state[i].result.name, county: state[i].result.county, grasses: state[i].result.species.grass_sedge }
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
            for( let i = 0; i < state.length; i++ ) {
                let objectToPush = { id: state[i].result.id, name: state[i].result.name, county: state[i].result.county, wildflowers: state[i].result.species.wildflower }
                wildflowers.push(objectToPush);
            }  
        for( let i = 0; i < 1; i++) {
            for( let j = 0; j < wildflowers[0].wildflowers.length; j++) {
                wildflowersFiltered.push({id: [{id: wildflowers[0].id, name: wildflowers[0].name, county: wildflowers[0].county}], sname: wildflowers[0].wildflowers[j].sname, cname: wildflowers[0].wildflowers[j].cname, species: 'Wildflower' })
            }
        }
        for( let i = 1; i < wildflowers.length; i++ ) {
            for( let j = 0; j < wildflowers[i].wildflowers.length; j++) {
                if( wildflowers[i].id === 'sna02046' ) {
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

        case 'CLEAR_PROCESSED_NATURAL_AREAS':
            state = [];
            return state;
        default:
            return state;
    }
};

export default naturalAreas;