const leaderboard = (state = [], action) => {
    switch (action.type) {
        case 'SET_LEADERBOARD':
            return action.payload;
        default:
            return state;
    }
};

export default leaderboard;