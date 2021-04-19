import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '50%',
    height: '50%'
};

export class MapContainer extends Component {
    render() {
        return (
            <>
                <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={
                {
                    lat: 44.771794,
                    lng: -93.37262,
                }
                } 
                >
                <Marker position={{ lat: 44.771794, lng: -93.37262 }}/>
                </Map>
            </>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ''
})(MapContainer);

// import React from 'react'
// 
// const Map = () => {
//     return (
//         <>
//             <Map
//                 google={this.props.google}
//                 zoom={14}
//                 style={mapStyles}
//                 initialCenter={
//                 {
//                     lat: 44.771794,
//                     lng: -93.37262,
//                 }
//                 } 
//             >
//                 <Marker position={{ lat: 44.771794, lng: -93.37262 }}/>
//             </Map>
//         </>
//     )
// }
// 
// export default Map