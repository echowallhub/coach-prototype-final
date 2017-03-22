import React from 'react';
import { Link } from 'react-router';
import { connect } from "react-redux";

import cookie from 'react-cookie';

import { TutorialThumbnail } from './TutorialThumbnail';

export class MyAccount extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      tutorials: [],
    }
  }

  componentDidMount(){
    let user = cookie.load('user');
    let tutorials = user.enrolled_tutorials;

    for(let tutorial of tutorials){
      fetch('http://dev.syudo.site/tutorial/'+tutorial).then(res => {
        return res.text()
      }).then(data => {
        this.setState({
          tutorials: [...this.state.tutorials, JSON.parse(data)]
        });
      });
    }
  }

  tutorialList(){
    return this.state.tutorials.map(function(tutorial, index){
      return (
        <TutorialThumbnail tutorial={tutorial} key={index}/>
      );
    });
  }

  render(){
    let user = cookie.load("user");
    let element = "";
    if(user!==undefined){
      if(user.role=="coach"){
          element = <Link to='/createTutorial'><button type="button" className="btn btn-primary col-md-offset-10 col-md-2 col-xs-offset-9 col-md-3">Create my tutorial</button></Link>;
      }
    }

    return(
      <div>
        <div className="row">
          <h3>{user.user_name}</h3>
        </div>
        <div className="row">
          <h3>My Enrolled Tutorials</h3>
        </div>
        <div className="row">
            {element}
            {this.tutorialList()}
        </div>
      </div>
    );
  }
}
