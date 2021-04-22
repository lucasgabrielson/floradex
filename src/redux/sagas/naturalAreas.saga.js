import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* naturalAreas(action) {
    for( let i = 0; i < 6; i++) {
        try {
            console.log( 'in naturalAreas' );
            const response = yield axios.get('/api/natural-areas/' + i);
            yield put({ type: 'SET_NATURAL_AREAS', payload: response.data });
        } catch (error) {
            console.log('Error getting natural areas from dnr api', error);
        }
    }
}

function* naturalArea(action) {
    try {
        console.log( 'in naturalArea' );
        const response = yield axios.get(`/api/natural-areas/?id=${action.payload}`)
        yield put({ type: 'SET_NATURAL_AREA', payload: response.data });
    } catch ( error ) {
        console.log('Error getting natural area from dnr api', error)
    }
}

function* naturalAreasSaga() {
    yield takeLatest('FETCH_NATURAL_AREAS', naturalAreas);
    yield takeLatest('FETCH_NATURAL_AREA', naturalArea);
}

export default naturalAreasSaga;