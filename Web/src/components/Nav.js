import React from 'react';
import { Navbar, NavItem, MenuItem, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import cookie from 'react-cookie';

import { beCoachAction } from '../actions/beCoachAction';

class NavBarInstance extends React.Component{
  constructor(props){
    super(props);

    this.beACoach = this.beACoach.bind(this);
  }

  beACoach(){
    let c = confirm("confirm to be a coach?")
    if(c){
      let id = cookie.load('user')._id;
      let data = {
        id,
        role: "coach"
      }

      fetch('http://dev.syudo.site/account/'+cookie.load('user')._id, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(data)
      }).then(res =>{
        console.log(res)
        let user = cookie.load('user');
        user.role = "coach";
        cookie.save('user', user);
        location.reload();
      });
    }
  }

  render(){
    let element = "";
    let user = cookie.load('user');
    if(user !== undefined){
      if(user.role != "coach"){
        element = <NavItem eventKey={1} ><Link><div onClick={this.beACoach}>Be a coach</div></Link></NavItem>
      }
    }

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header className="col-md-5 col-xs-8">
          <Navbar.Brand>
            <Link to="/" className="col-xs-12 row">
              <img src="app_logo.png" height="30" className="col-md-3 col-xs-3" style={{marginTop:'-5px'}}/>
              <p className="col-md-9 col-xs-7">Coach Hub</p>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {element}
            <NavItem eventKey={2} ><Link to="/myAccount">My Account</Link></NavItem>
            <NavItem eventKey={3} ><Link to="/logout">Logout</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    beCoachAction: beCoachAction,
  }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(NavBarInstance);
