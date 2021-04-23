const naturalAreas = (state = [], action) => {
    switch (action.type) {
        case 'SET_NATURAL_AREAS':
            state = [...state, action.payload]
            return state;
        default:
            return state;
    }
};

export default naturalAreas;

