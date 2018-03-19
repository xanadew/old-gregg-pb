import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Map extends Component {
    componentDidUpdate(prevProps, prevState){
        if (prevProps.google !== this.props.google || prevProps.places !== this.props.places){
            this.loadMap();
        }
    }
    loadMap(){
        if (this.props && this.props.google){
            const {google} = this.props;
            const maps = google.maps;

        const mapRef = this.refs.map;
              const node = ReactDOM.findDOMNode(mapRef);

        const mapConfig = Object.assign({},{
            center: {lat: 40.7485722, lng: -74.0068633},
            zoom: 11,
            mapTypeId: 'roadmap'
        })
        this.map = new maps.Map(node, mapConfig);

        }
    }
    render() {
        const style = {
            width: '90vw',
            height: '75vh'
        }
        return (
            <div ref='map' style={style}>
                POW O-('.'Q)
            </div>
        );
    }
}