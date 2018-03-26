import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addReview } from '../../ducks/reducer'
// import { Link } from 'react-router-dom'
import {StyleRoot} from 'radium';
import Header from '../Header';




class CreateReview extends Component {
    constructor() {
        super()
        this.state = {
            reviewNameInput: '',
            reviewDescInput: ''
        }
        this.submitReview=this.submitReview.bind(this);
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
            this.props.history.push('/dash')
        })
    }
    

    render() {
        return (
            <div>
                <StyleRoot>
                <div className="homePage">
                <div className="rapperLarge">
                    <div className="titleText">Create your review</div>
                    <p style={paragraph}>Create a review. You are able to create up to 10 reviews. Once you create a review <br/>
                    you can add tasks.</p>
                    <form className="formyForm">
                        <input 
                            className="inputs" 
                            type="text" 
                            value={this.state.value}
                            onChange={ (e) => this.handleNameChange(e.target.reviewName)}
                            placeholder="Field Name (20 character limit)"/>
                        <input 
                            className="inputs" 
                            type="text" 
                            value={this.state.value}
                            onChange={ (e) => this.handleDescChange(e.target.reviewDesc)}
                            placeholder="Review Description(optional)"/>
                        <div>
                            <button type="reset"style={buttonLarger} className="buttonReview">Reset</button>
                            <button onClick={() => this.submitReview()} type='submit' style={buttonLarger} className="buttonReview">Create Review</button>

                        </div>
                    </form>
                </div>
            </div>
            <Header/>
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
