import React, { Component } from 'react';

export class Marker extends Component {
    componentDidUpdate(prevProps){
        if ((this.props.map !== prevProps.map)||(this.props.position !== prevProps.position)){
            this.renderMarker();
        }
    }
    renderMarker(){
        let {map, google, position, mapCenter} = this.props;
        let pos = position || mapCenter;
        position = new.google.maps.LatLng(pos.lat, pos.lng);
        const pref = {
            map: map,
            position: position
        };
        const evtNames = ['click', 'mouseover'];

        this.marker = new google.maps.Marker(pref);

        evtNames.forEach(e => {
            this.marker.addListener(e, this.handleEvent(e));
        })
    }
    handleEvent(evtName){
        return (e) => {
            const evtName = `on${camelize(evt)}`
            if (this.props[evtName]){
                this.props[evtName](this.props, this.marker, e);
            }
        }
    }
    componentWillUnmount(){
        if (this.marker){
            this.marker.setMap(null);
        }
    }
    render() {
        return null;
    }
}

Marker.PropTypes = {
    position: React.PropTypes.object,
    map: React.PropTypes.object
}
