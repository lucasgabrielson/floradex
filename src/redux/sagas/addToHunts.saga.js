import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addToHunts(action) {
    console.log('here');
    try {
        console.log( 'addToHunts', action.payload );
        const response = yield axios.post(`/api/my-hunts/?userId=${action.payload.id}&endpoint=${action.payload.endpoint}`);
        // yield put({ type: 'SET_DNR_APIS', payload: response.data });
    } catch (error) {
        console.log('Error adding hunt to my hunts', error);
    }
}

function* addToHuntsSaga() {
    yield takeLatest('ADD_TO_HUNTS', addToHunts);
}

export default addToHuntsSaga;
