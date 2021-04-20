import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import Map from '../Map/Map';

const NaturalAreaItem = () => {

    useEffect(() => { dispatch({type: 'FETCH_NATURAL_AREA', payload: id.id}) }, []);

    const dispatch = useDispatch();

    const id = useParams();

    const sna = useSelector( store => store.naturalArea);

    return (
        <div>
            <h1>{!Array.isArray(sna) ? sna.result.name : ''}</h1>
            {/* <Map lat={sna.result.parking[0].point.["epsg:4326"][1]} long={sna.result.parking[0].point.["epsg:4326"][0]}/> */}
            {/* {JSON.stringify(sna.result.parking[0].point.["epsg:4326"][1])} */}
            {/* {JSON.stringify(sna)} */}
        </div>
    )
}

export default NaturalAreaItem

