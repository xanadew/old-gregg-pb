/*global google*/
import React from "react"
import './Locator.css'
import { compose, withProps, withHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA5eCcxmxACztRIVrfTXxr28d_uegRmMks&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div className='map' style={{ height: `400px` }} />,
        mapElement: <div className='map' style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', ''),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            fetchPlaces: ({ updatePlaces }) => () => {
                let places;
                const bounds = refs.map.getBounds();
                const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
                const request = {
                    bounds: bounds,
                    type: ['points_of_interest'],
                    name: 'paintball'
                };
                service.nearbySearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log(results);
                        updatePlaces(results);
                    }
                })
            }
        }
    }),
)((props) => {
    return (
        <GoogleMap
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            onBoundsChanged={props.fetchPlaces}
            defaultZoom={10}
            defaultCenter={{ lat: 40.2574448, lng: -111.7089488 }}
        >
            {props.places && props.places.map((place, i) =>
                <Marker key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }} />
            )}
        </GoogleMap>
    )
})

export default class Locator extends React.PureComponent {
    constructor(props){
        super(props);

        this.state={
            slide:true
        }
    }
    render() {
        return (
            <div>
            <nav className="nav">
                
            <div onClick={()=>this.setState({slide:!this.state.slide})}
                className="arrow">V</div>
            <div className="arrow">FIELD/STORE LOCATOR</div>
                <a href="http://localhost:3000/">
                <button className="logout">BEGONE</button></a>
        </nav>
        <div className={this.state.slide?'slide dropdown':'dropdown'}>
                    <button className='fs_locator'>Field/Store Locator</button>
                    <div className='rec_stores'>Recommended Online Stores</div>
                    <div className='fs_reviews'>Field/Store Reviews</div>
                    <div className='forums'>Forums</div>
                    <div className='events'>Events</div>
                    <div className='np_guide'>New Player Guide</div>
                </div>
                    <MyMapComponent />
            </div>
            
        )
    }
}