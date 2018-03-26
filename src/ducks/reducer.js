import axios from 'axios'

const initialState = {
    user: null,
    data: []
  };
  
  const GETREVIEWS = 'GETREVIEWS';
  const ADDREVIEW = "CREATEREVIEW";
  const GET_USER='GET_USER';

  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GETREVIEWS + "_FULFILLED":
     
        return { ...state, data: action.payload };

      case ADDREVIEW + "_FULFILLED":
          return {...state, review: action.payload};

      case GET_USER + "_FULFILLED":
        return {...state, user: action.payload};

      default:
        return state;
    }
  };
  
  export function getUser(){                             //action creator
    let request=axios.get('/auth/me').then(res=>{
        console.log(res.data)
        return res.data;
    })               
    return {
        type:GET_USER,
        payload:request          
    }
}

  export var getReviews = () => {
    var request = axios.get('/api/reviews').then(response => {
      if(response.data){
        return response.data
      }
    })
    return {
      type: GETREVIEWS,
      payload: request,
    }
  };


  export var addReview = (body) => {
    var request = axios.post('/api/review', body).then(response => {
      if(response.data){
        return response.data
      }
    })
    return {
    type: ADDREVIEW,
    payload: request
    }
  }