import axios from 'axios'

const initialState = {
    user: null,
    data: []
  };
  
  const LOGIN = 'LOGIN';
  const GETREVIEWS = 'GETREVIEWS';
  const ADDREVIEW = "CREATEREVIEW";

  
  export default (state = initialState, action) => {
    switch (action.type) {
      case LOGIN + "_FULFILLED":
        return { ...state, user: action.payload };
      
      case GETREVIEWS + "_FULFILLED":
     
        return { ...state, data: action.payload };

      case ADDREVIEW + "_FULFILLED":
          return {...state, review: action.payload};

      default:
        return state;
    }
  };
  
  export const login = () => {
    var request = axios.get('/user-data').then(response => {
      if (response.data) {
        return response.data
      }
    })
    return {
      type: LOGIN,
      payload: request,
    };
  };

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