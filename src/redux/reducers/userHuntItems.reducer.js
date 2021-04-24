const userHunts = (state = [] , action) => {
    switch (action.type) {
        case 'SET_USER_HUNT_ITEMS':
            state = [...state, action.payload]
            return state;
        case 'CLEAR_USER_HUNT_ITEMS':
            state = [];
            return state;
        default:
            return state;
    }
};

export default userHunts;
