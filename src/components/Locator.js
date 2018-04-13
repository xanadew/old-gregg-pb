/*global google*/
import React from "react"
import './Locator.css';
import _ from 'lodash';
import { compose, withProps, withHandlers, withState } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import {SearchBox} from "react-google-maps/lib/components/places/SearchBox"
import Header from './Header';


const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA5eCcxmxACztRIVrfTXxr28d_uegRmMks&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div  style={{ height: `100%` }} />,
        containerElement: <div  style={{ height: `400px` }} />,
        mapElement: <div className='map' style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    withState('places', 'updatePlaces', ''),
    withState('selectedPlace', 'updateSelectedPlace', null),
    withHandlers(() => {
        const refs = {
            map: undefined,
        }

        return {
            onMapMounted: () => ref => {
                refs.map = ref
            },
            onSearchBoxMounted: () => ref => {
                refs.searchBox = ref
            },
            onPlacesChanged: () => ref => {
                const places = refs.searchBox.getPlaces();
                const bounds = new google.maps.LatLngBounds();
      
                places.forEach(place => {
                  if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport)
                  } else {
                    bounds.extend(place.geometry.location)
                  }
                });
                },
            fetchPlaces: ({ updatePlaces }) => () => {
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
            },
            onToggleOpen: ({ updateSelectedPlace}) => key => {
                updateSelectedPlace(key);
            }
        }
    }),
)((props) => {
    return (<div>
        <GoogleMap
            onTilesLoaded={props.fetchPlaces}
            ref={props.onMapMounted}
            onBoundsChanged={props.fetchPlaces}
            defaultZoom={10}
            defaultCenter={{ lat: 40.2574448, lng: -111.7089488 }}
        >
        <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}>
            <input
            type='text'
            placeholder='ghost of text past'
            style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '140px',
                height: '32px',
                marginTop: '27px',
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`
            }}
            />
            </SearchBox>
            {props.places && props.places.map((place, i) =>
                <Marker 
                onClick={() => props.onToggleOpen(i)} 
                key={i} position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}>
                {props.selectedPlace === i && <InfoWindow onCloseClick={props.onToggleOpen}>
                    <div>
                        {props.places[props.selectedPlace].name} <br/>
                        {props.places[props.selectedPlace].rating}
                        
                    </div>
                </InfoWindow>}
                </Marker>
            )}
       </GoogleMap>
        
            <ul className='placeslist'>
            {props.places&& props.places.map(( place, i ) =>
              <li key={i}>
                {props.places[i].name},<br/> 
                {props.places[i].vicinity}
              </li>
            )}
          </ul>
          </div>
          
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
               <Header/>
                    <MyMapComponent />
            </div>
            
        )
    }
}