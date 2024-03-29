import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* huntsFlora(action) {
    try {
        console.log( 'in huntsFlora', action.payload );
        yield axios.post(`/api/hunts-flora/?cname=${action.payload.cname}&sname=${action.payload.sname}&id=${action.payload.id}&image=${action.payload.image}&endpoint=${action.payload.endpoint}`);
        yield put({ type: 'GET_ADMIN' });
        // yield axios.get('/api/admin');
        // yield put({ type: 'SET_ADMIN', payload: response.data });
    } catch (error) {
        console.log('Error getting apis from database', error);
    }
}

function* huntsFloraSaga() {
    yield takeLatest('SET_MY_HUNTS_FLORA_IMAGE', huntsFlora);
}

export default huntsFloraSaga;