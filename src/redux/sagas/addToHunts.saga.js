import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addToHunts(action) {
    try {
        console.log( 'addToHunts', action.payload );
        const response = yield axios.post(`/api/my-hunts/?userId=${action.payload.id}&endpoint=${action.payload.endpoint}`);
        yield put({ type: 'GET_MY_HUNTS', payload: action.payload.id} )
    } catch (error) {
        console.log('Error adding hunt to my hunts', error);
    }
}

function* updateHunts(action) {
    try {
        console.log( 'updateHunts', action.payload );
        const response = yield axios.put(`/api/my-hunts/?userId=${action.payload.id}&endpoint=${action.payload.endpoint}&displayed=${action.payload.displayed}`);
        yield put({ type: 'GET_MY_HUNTS', payload: action.payload.id} )
    } catch (error) {
        console.log('Error updating hunt in my hunts', error);
    }
}

function* getHunts(action) {
    try {
        console.log( 'getHunts', action.payload );
        const response = yield axios.get(`/api/my-hunts/${action.payload}`);
        yield put({ type: 'SET_USER_HUNTS', payload: response.data} )
    } catch (error) {
        console.log('Error getting my hunts', error);
    }
}


function* addToHuntsSaga() {
    yield takeLatest('ADD_TO_HUNTS', addToHunts);
    yield takeLatest('UPDATE_HUNTS', updateHunts);
    yield takeLatest('GET_MY_HUNTS', getHunts)
}

export default addToHuntsSaga;
