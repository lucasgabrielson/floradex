const users = (state = [], action) => {
    switch (action.type) {
        case 'SET_TOTAL_USERS':
        return action.payload;
        default:
        return state;
    }
};

export default users;