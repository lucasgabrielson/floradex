import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
    width: '30%',
    height: '30%'
};

export class MapContainer extends Component {
    render() {
        return (
            <>
                <Map
                google={this.props.google}
                zoom={11}
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


// {/* <Map /> */}
//     {/* <br />
//     <small>
//         <a 
//             href="https://maps.google.com/maps?q='+data.lat+','+data.lon+'&hl=es;z=14&amp;output=embed" 
//             style="color:#0000FF;text-align:left" 
//             target="_blank"
//         >
//             See map bigger
//         </a>
//     </small> */}