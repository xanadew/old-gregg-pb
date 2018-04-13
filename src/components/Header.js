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
                    <a href={process.env.REACT_APP_FAILURE}>
                    <button className="logout">BEGONE</button></a>
            </nav>
            <div className={this.state.slide?'slide dropdown':'dropdown'}>
                <a href={process.env.REACT_APP_PRIVATE}>
                <button className='fs_locator'>Home</button></a>
            <a href={process.env.REACT_APP_LOCATOR}>
                <button className='fs_locator'>Field/Store Locator</button></a>
                <a href={process.env.REACT_APP_CREATE}>
                <button className='fs_locator'>Create A Review</button></a>
            </div>
            </div>
        );
    }
}

export default Header;