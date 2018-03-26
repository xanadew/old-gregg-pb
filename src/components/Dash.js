import React, { Component } from 'react';
import './Dash.css';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReviewCards from './ReviewCards';

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
                
                    <div onClick={()=>this.setState({slide:!this.state.slide})}
                        className="arrow">V</div>
                        <a href="http://localhost:3000/">
                        <button className="logout">BEGONE</button></a>
                </nav>
                <div className={this.state.slide?'slide dropdown':'dropdown'}>
                <a href='http://localhost:3000/#/locator'>
                    <button className='fs_locator'>Field/Store Locator</button></a>
                    <a href='http://localhost:3000/#/create'>
                    <button className='fs_locator'>Create A Review</button></a>
                    <div className='forums'>Forums</div>
                    <div className='events'>Events</div>
                    <div className='np_guide'>New Player Guide</div>
                </div>
                <div>
                    <ReviewCards/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      user: state.user
    }
  }
  
  
  export default connect(mapStateToProps)(Dash)