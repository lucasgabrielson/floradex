import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = ({lat, lng}) => {

    const mapStyles = {        
    height: "30vh",
    width: "80%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 70
    };

    const defaultCenter = {
        lat: lat, lng: lng
    }

    return (
        <LoadScript
        googleMapsApiKey=''>
            <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={9}
            center={defaultCenter}
            >
                <Marker position={defaultCenter}/>
            </GoogleMap>

            

        </LoadScript>
    )
}

export default MapContainer;
