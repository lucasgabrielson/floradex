import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addToHunts(action) {
    try {
        console.log( 'addToHunts', action.payload );
        const response = yield axios.post(`/api/my-hunts/?userId=${action.payload.id}&endpoint=${action.payload.endpoint}`);
    } catch (error) {
        console.log('Error adding hunt to my hunts', error);
    }
}

function* deleteFromHunts(action) {
    try {
        console.log( 'deleteFromHunts', action.payload );
        const response = yield axios.delete(`/api/my-hunts/?userId=${action.payload.id}&endpoint=${action.payload.endpoint}`);
    } catch (error) {
        console.log('Error delete hunt from my hunts', error);
    }
}

function* addToHuntsSaga() {
    yield takeLatest('ADD_TO_HUNTS', addToHunts);
    yield takeLatest('DELETE_FROM_HUNTS', deleteFromHunts);
}

export default addToHuntsSaga;
