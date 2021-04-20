const userHunts = (state = [], action) => {
    switch (action.type) {
        case 'SET_USER_HUNTS':
            return action.payload;
        default:
            return state;
    }
};

export default userHunts;