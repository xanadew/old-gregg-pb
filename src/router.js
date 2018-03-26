import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from '././components/Landing';
import Dash from '././components/Dash';
import Review from './components/Review/Review';
import CreateReview from './components/Create/CreateReview';
import Modal from './components/Review/Modal';
import Locator from './components/Locator';



export default (
    <Switch>
        <Route exact path="/(access_token.*)?" component={ Landing }/>
        {/* <Route exact path="/" component={ Landing }/> */}
        <Route path="/dash" component={ Dash }/>
        <Route path="/review/:reviewsid" component={ Review }/>
        <Route path="/review/:reviewsid" component={ Modal }/>
        <Route path="/create" component={ CreateReview }/>
        <Route path="/locator" component={Locator}/>
    </Switch>
)