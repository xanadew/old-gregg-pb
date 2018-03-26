import React, { Component } from 'react'
import axios from 'axios'
import './Modal.css';
import {StyleRoot} from 'radium';

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reviewNameInput: '',
            reviewDescInput: ''
        }
      
        this.editReview=this.editReview.bind(this)
    }

    editReview(){
        return axios.put(`/api/review/${this.props.review}`, {
            reviewName: this.state.reviewName, 
            reviewDesc: this.state.reviewDesc})
            .then(res=>{
                this.props.closed();
                this.props.history.push('/dash');
        }).catch(console.log)
    }

        handleNameChange ( value ){
            this.setState({ reviewName: value})
        }
        handleDescChange ( value ){
            this.setState({ reviewDesc: value})
        }

    render() {    
        return (
            <div>
               <StyleRoot>
                <div className={this.props.show ? "ModalOpen" : "ModalClosed"}>
                    <div className="titleText">Edit</div>
                <form className="formyForm" >
                        <input 
                            className="inputs" 
                            type="text" 
                            value={this.state.reviewName}
                            onChange={ (e) => this.handleNameChange(e.target.value)}
                            placeholder={"Review Title (20 character limit)"}/>
                        <input 
                            className="inputs" 
                            type="text" 
                            value={this.state.reviewDesc}
                            onChange={ (e) => this.handleDescChange(e.target.value)}
                            placeholder="Review Description"/>
                        <div>
                            <button onClick={this.props.closed} style={buttonLarger} className="buttonReview">Cancel</button>
                            <button onClick={this.editReview} type="submit" style={buttonLarger} className="buttonReview">Edit</button>
                        </div>
                    </form>
                </div>
              </StyleRoot>
            </div>
        )
    }
}

const buttonLarger = {
    fontSize: '15pt',
    width: '150px',
    '@media (max-width: 800px)': {
        width: '100px',
        fontSize: '10pt'
    }
}

export default Modal

