import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({lat, lng}) => {

    const mapStyles = {        
    height: "30vh",
    width: "30%"
    };

    const defaultCenter = {
        lat: lat, lng: lng
    }

    return (
        <LoadScript
        googleMapsApiKey='AIzaSyAzYdJ_REGD_JmYxTxZ9ZB6P1ayWql_Pns'>
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={11}
            center={defaultCenter}
            >
                <Marker position={defaultCenter}/>
            </GoogleMap>

            

        </LoadScript>
    )
}

export default MapContainer;