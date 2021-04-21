const apis = (state = {}, action) => {
    switch (action.type) {
        case 'SET_FLORA_IMAGE':
            return action.payload;
        default:
            return state;
    }
};

export default apis;
