import React, { Component } from 'react';
import './Landing.css';

export default class Landing extends Component {
    render() {
        return (
            <div className="App">
                <div className="Background">
                    <div className="splash-screen">
                    <div className="logo-main"></div>
                    <a href={process.env.REACT_APP_LOGIN}>
                    <button className="login">Login / Register
                    </button>
                    </a>
                    </div>
                </div>
            </div>
        );
    }
}