import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import MyAccount from './MyAccount';
import Home from './Home';
import { TutorialList } from './TutorialList';
import { Tutorial } from './Tutorial';
import { CreateTutorial } from './CreateTutorial';
import { Video } from './Video';
import { userReducer } from '../reducers/userReducer';
// import { getMyselfAction } from '../actions/getMyselfAction';

const store = createStore(userReducer, applyMiddleware(thunkMiddleware));
// getMyselfAction("452c43d3-7f8b-41a3-bc29-ce709bc3e6f4");

export class App extends React.Component{

  render(){
    return(
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={Home}>
            <IndexRoute component={TutorialList}/>
            <Route path="/myAccount" component={MyAccount}/>
            <Route path="/tutorial/:id" component={Tutorial}/>
            <Route path="/createTutorial" component={CreateTutorial}/>
            <Route path="/video/static/:id" component={Video}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
