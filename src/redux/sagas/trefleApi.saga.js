import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* trefleApis(action) {
    try {
        console.log( 'in trefleApis', action.payload );
        const response = yield axios.get('/api/trefle-apis/' + action.payload);
        yield put({ type: 'SET_FLORA_IMAGE', payload: response.data });
    } catch (error) {
        console.log('Error getting apis from database', error);
    }
}

function* trefleApisSaga() {
    yield takeLatest('GET_FLORA_IMAGE', trefleApis);
}

export default trefleApisSaga;