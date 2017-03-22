import React from 'react';
import { NavBarInstance } from './Nav';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import cookie from 'react-cookie';

import { getMyselfAction } from '../actions/getMyselfAction';

export class Home extends React.Component{

  // componentDidMount(){
  //   fetch('http://dev.syudo.site/account/'+'452c43d3-7f8b-41a3-bc29-ce709bc3e6f4').then(res => {
  //     return res.json()
  //   }).then(data => {
  //     console.log(data);
  //     cookie.save('user', data);
  //   })
  // }

  render(){
    return(
      <div style={{background: '#f1f1f1'}}>
        <NavBarInstance />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
