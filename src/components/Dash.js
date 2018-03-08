import React, { Component } from 'react';
import './Dash.css';

class Dash extends Component {
    constructor(){
        super();
        this.state={
            slide:true
        }
    }
    render() {
        return (
            <div className="Dash">
                <nav className="nav">
                <div className="logout"></div>
                    <div onClick={()=>this.setState({slide:!this.state.slide})}
                        className="arrow"></div>
                </nav>
                <div className={this.state.slide?'slide dropdown':'dropdown'}>
                    <div className='fs_locator'>Field/Store Locator</div>
                    <div className='rec_stores'>Recommended Online Stores</div>
                    <div className='fs_reviews'>Field/Store Reviews</div>
                    <div className='forums'>Forums</div>
                    <div className='events'>Events</div>
                    <div className='np_guide'>New Player Guide</div>
                </div>
            </div>
        );
    }
}

export default Dash;