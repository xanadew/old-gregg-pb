import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./ReviewCards.css"





class ReviewCards extends Component {
    constructor(){
        super()
        this.state = {
            data: [],
        }
       
    }
   
    componentDidMount() {
        this.filterArray()
    }

    filterArray(){
        return axios.get(`/api/reviews`).then( res =>{
            this.setState({
                data: res.data
            })
        })
    }
   
    render() {
        return (
            <div className="why">
            {this.state.data.map((e, i) =>{
                 return (
                    <div key={i}>
                        <div>{this.array}</div>
                        <div className="rapper" style={heighty0}>
                            <div className="titleText">{e.reviewname}</div>
                            <div style={layoutButton}>
                            <Link className="noDecor" to={`/review/${e.reviewsid}`}><span className="buttonReview">Go to Review</span></Link>
                            </div>
                        </div>
                    </div>
                    )
                 })
                }
            </div>
        )
    }
}

const layoutButton = {
    marginTop: '40px'
}

var heighty0 = {
    height: '425px',
}


  
export default ReviewCards;

