const apis = (state = [], action) => {
    switch (action.type) {
        case 'SET_DNR_APIS':
        return action.payload;
        default:
        return state;
    }
};

export default apis;