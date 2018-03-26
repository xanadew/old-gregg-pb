import React, { Component } from 'react';
import './Dash.css';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReviewCards from './ReviewCards';
import Header from './Header';

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
            <Header/>
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