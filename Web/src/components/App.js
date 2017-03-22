import React from 'react';
import { Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import cookie from 'react-cookie';

import { MyAccount } from './MyAccount';
import { Home } from './Home';
import { TutorialList } from './TutorialList';
import { Tutorial } from './Tutorial';
import { CreateTutorial } from './CreateTutorial';
import { Video } from './Video';
import { userReducer } from '../reducers/userReducer';
import {Register} from "./Register";
import {Login} from "./Login";
import {HomePage} from "./HomePage";
// import { getMyselfAction } from '../actions/getMyselfAction';

const store = createStore(userReducer, applyMiddleware(thunkMiddleware));
// getMyselfAction("452c43d3-7f8b-41a3-bc29-ce709bc3e6f4");

export class App extends React.Component{

  constructor (props){
    super(props);
    this.state = {
      username : ""
    };
  }


  requireLogin() {

    if (cookie.load('login') == 'true') {
      browserHistory.push("/#/tutorialList");
      // this.props.router.push('/tutorialList')

    }
  }

  alreadyLogin() {

    if ( cookie.load('login') == 'false' ) {
      browserHistory.push("/#");
      // this.props.router.push('/')
    }

  }

  render(){
    return(
        <Router history={hashHistory}>
          <Route path="/" component={Home}  onEnter={this.requireLogin.bind(this)}>
            <IndexRoute component={HomePage}/>
            <Route path="/myAccount" component={MyAccount} onEnter={this.alreadyLogin.bind(this)}/>
            <Route path="/tutorial/:id" component={Tutorial} onEnter={this.alreadyLogin.bind(this)}/>
            <Route path="/createTutorial" component={CreateTutorial} onEnter={this.alreadyLogin.bind(this)}/>
            <Route path="/video/static/:id" component={Video} onEnter={this.alreadyLogin.bind(this)}/>
            <Route path={"/login"} component={Login}/>
            <Route path={"/register"} component={Register}/>
            <Route path={"/homepage"} component={HomePage} onEnter={this.requireLogin.bind(this)}/>
            <Route path={"/tutorialList"} component={TutorialList} onEnter={this.alreadyLogin.bind(this)}/>
          </Route>
        </Router>
    );
  }
}
