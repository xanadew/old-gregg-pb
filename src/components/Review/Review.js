import React, { Component } from 'react';
import axios from 'axios';
import {StyleRoot} from 'radium';
import ReactLoading from 'react-loading';


import Modal from "./Modal";


export class Review extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            modalIsOpen: false,
            reviewNameInput: '',
            reviewDescInput: ''
        }

        this.deleteReview = this.deleteReview.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.showModal = this.showModal.bind(this)
    }

    componentWillUnmount(){
        console.log("review is unmounting")
    }

    componentWillMount(){
        console.log("review is mounting")

    }

    componentDidMount() {
        return axios.get(`/api/review/${this.props.match.params.reviewsid}`).then(res => {
            this.setState({
                data: res.data
            })
        })
    }

    deletereview(){
        return axios.delete(`/api/review/subtasks/${this.props.match.params.reviewsid}`).then(results=>{
                    this.props.history.push('/home')
        }).catch(console.log)
    }

    handleNameChange ( value ){
        console.log(value)
        this.setState({ reviewName: value})
    }
    handleDescChange ( value ){
        console.log(value)
        this.setState({ reviewDesc: value})
    }

    showModal = () => {
        console.log('ismodalopen?')
        this.setState({modalIsOpen: true});
      }
    
    closeModal = () => {
        console.log('ismodalclosed?')
        this.setState({modalIsOpen: false});
      }

    render() {
        console.log('review rendering')
        const e = this.state.data
        return (
            <div>
                <StyleRoot>
                <div className="homePage">
                    {e.reviewsid ? 
                    <div key={e.reviewsid}>
                        {this.state.modalIsOpen ? 
                        <Modal review={e.reviewsid} show={this.state.modalIsOpen} closed={this.closeModal}/>
                        : null}
                        <div className="rapper">
                            <div style={styleYo.primary}>
                                <div style={[styleYo.base, styleYo.name]}>{e.reviewname}</div>
                                <div style={[styleYo.base, styleYo.desc]}>{e.description}</div>
                                <div style={[styleYo.base, styleYo.dates]}>Start Date: 
                                {e.startdate}<br/>
                                review Date: {e.enddate}
                                <div style={buttonTwo}>
                                <button className="buttonReview" style={button} onClick={this.deleteReview}>Delete review</button>
                                <button onClick={() => this.showModal()} style={button} className="buttonReview">Edit</button>
                                </div>
                                </div>
                            </div>
                                <div><ReactLoading type="bubbles" color="white"/></div>
                            }
                        </div>
                    </div>
                            :  <div className="loadingBackDrop">
                                    <div><div><ReactLoading type="bubbles" color="white" width="200px" height="200px"/></div></div>
                                </div>}
                </div>
                </StyleRoot>
            </div>
        )
    }

}

const styleYo = {
    primary: {
        backgroundColor: '#3F3E54',
        fontFamily: 'Raleway',
        padding: '10px',
        height: '90px'    
    },
    base: {
        padding: '4px',
    },
    name: {
        textAlign: 'left',
        fontSize: '20pt',
        color: 'white',
        '@media(max-width: 488px)':{
            fontSize: '12pt',
        }
    },
    dates: {
        textAlign: 'right',
        color: 'white',
        position: 'absolute',
        top: '110px',
        right: '35px',
        
    },
    desc: {
        fontSize: '15pt',
        textAlign: 'left',
        color: '#292839',
        '@media(max-width: 600px)':{
            fontSize: '12pt',
            width: '30vw'
        }
    }
}

const button = {
    border: 'none',
    padding: '5px 15px',
    margin: '5px',
    outline: 'none'
}

const buttonTwo = {
    textAlign: 'center',
    marginTop: '20px'
}

const backdrop = {
    height: '100vh',
    backgroundColor: 'rgb(41,40,57)',
    zIndex: '200',
}

export default Review