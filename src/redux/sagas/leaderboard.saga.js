import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* leaderboard() {
    try {
        console.log( 'in leaderboard' );
        const response = yield axios.get('/api/leaderboard');
        yield put({ type: 'SET_LEADERBOARD', payload: response.data });
    } catch (error) {
        console.log('Error getting leaderboard data from database', error);
    }
}

function* totalUsers(action) {
    try {
        console.log( 'in totalUsers' );
        const response = yield axios.get('/api/leaderboard/' + action.payload);
        yield put({ type: 'SET_TOTAL_USERS', payload: response.data });
    } catch (error) {
        console.log('Error getting total user data from database', error);
    }
}

function* leaderboardSaga() {
    yield takeLatest('GET_LEADERBOARD', leaderboard);
    yield takeLatest('GET_TOTAL_USERS', totalUsers);
}

export default leaderboardSaga;