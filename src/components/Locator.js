import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import './Locator.css';
import Map from './Map';

export class Locator extends Component {
    render() {
        return (
            <div>
                <h1>FIELDS N STORES N SHIT, OH MY</h1>
                <Map google={this.props.google}/>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
}) (Locator)