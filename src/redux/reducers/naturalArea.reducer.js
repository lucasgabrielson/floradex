const naturalArea = (state = [], action) => {
    switch (action.type) {
        case 'SET_NATURAL_AREA':
            return action.payload;
        default:
            return state;
    }
};

export default naturalArea;
