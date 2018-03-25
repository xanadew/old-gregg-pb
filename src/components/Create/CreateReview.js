import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview } from '../../ducks/reducer'
// import { Link } from 'react-router-dom'
import {StyleRoot} from 'radium'





class CreateReview extends Component {
    constructor() {
        super()
        this.state = {
            reviewNameInput: '',
            reviewDescInput: ''
        }
    }
    
    handleNameChange ( value ){
        this.setState({ reviewName: value})
    }
    handleDescChange ( value ){
        this.setState({ reviewDesc: value})
    }

    submitReview(){
        this.props.addReview({
            reviewName: this.state.reviewName,
            reviewDesc: this.state.reviewDesc,
        }).then( () => {
            this.props.history.push('/home')
        })
    }
    

    render() {
        return (
            <div>
                <StyleRoot>
                <div className="homePage">
]                <div className="rapperLarge">
                    <div className="titleText">Create your review</div>
                    <p style={paragraph}>Create a review. You are able to create up to 10 reviews. Once you create a review <br/>
                    you can add tasks.</p>
                    <form className="formyForm">
                        <input 
                            className="inputs" 
                            type="text" 
                            value={this.state.value}
                            onChange={ (e) => this.handleNameChange(e.target.value)}
                            placeholder="Review Title (20 character limit)"/>
                        <input 
                            className="inputs" 
                            type="text" 
                            value={this.state.value}
                            onChange={ (e) => this.handleDescChange(e.target.value)}
                            placeholder="Review Description(optional)"/>
                        <div>
                            <button type="reset"style={buttonLarger} className="buttonReview">Reset</button>
                            <button onClick={() => this.submitReview()} style={buttonLarger} className="buttonReview">Create Review</button>
                        </div>
                    </form>
                </div>
            </div>
            </StyleRoot>
            </div>
        )
    }
}


const buttonLarger = {
    fontSize: '15pt',
    width: '150px',
    '@media (max-width: 453px)': {
        width: '100px',
        fontSize: '10pt'
    }
}

const paragraph = {
    color: 'white'
}

function mapStateToProps(state) {
    return {
      user: state.user,
      review: state.review
    };
  };

  const mapDispathToProps = {
      addReview: addReview
  }


export default connect(mapStateToProps, mapDispathToProps)(CreateReview)
