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

function* leaderboardSaga() {
    yield takeLatest('GET_LEADERBOARD', leaderboard);
}

export default leaderboardSaga;