import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./ReviewCards.css"
import { connect } from 'react-redux';




class ReviewCards extends Component {
    constructor(){
        super()
        this.state = {
            data: [],
            joinid:[]
        }
       
    }
   
    componentDidMount() {
        this.filterArray();
        axios.get('/api/reviewbyuser').then(res=>{
            this.setState({
                joinid:res.data
            })
        })
    }

    filterArray(){
        return axios.get(`/api/reviews`).then( res =>{
            this.setState({
                data: res.data
            })
        })
    }
   
    render() {
        console.log('reviewcards state:',this.state)
        return (
            <div className="why">
            {this.state.joinid.map((e, i) =>{
                 return (
                    <div key={i}>
                        <div>{this.array}</div>
                        <div className="rapper" style={heighty0}>
                            <div className="titleText">{e.reviewname}</div>
                            <br/>
                            <div className='userText'>{e.auth0_id}</div>
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
    height: '225px',
}

function mapStateToProps(state){
    return {
        user:state.user
    }
}
  
export default connect(mapStateToProps)(ReviewCards);

