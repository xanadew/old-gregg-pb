import React, { Component } from 'react';

class Header extends Component {
    constructor(){
        super();
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
                    <a href="http://localhost:3000/">
                    <button className="logout">BEGONE</button></a>
            </nav>
            <div className={this.state.slide?'slide dropdown':'dropdown'}>
                <a href="http://localhost:3000/#/dash">
                <button className='fs_locator'>Home</button></a>
            <a href='http://localhost:3000/#/locator'>
                <button className='fs_locator'>Field/Store Locator</button></a>
                <a href='http://localhost:3000/#/create'>
                <button className='fs_locator'>Create A Review</button></a>

                <div className='events'>Events</div>
                <div className='np_guide'>New Player Guide</div>
            </div>
            </div>
        );
    }
}

export default Header;