import React from "react";
// import { NavBarInstance } from './Nav';
import { browserHistory } from "react-router";
import { Link } from 'react-router';


export class HomePage extends React.Component {
    

    render() {
        return (
            <div className="container text-center" id="home_background">
                <button style={{color : 'white'}} className="btn btn-secondary btn-lg btn-block"><Link to="/login">Login</Link></button>
                <button style={{color : 'white'}}  className="btn btn-secondary btn-lg btn-block"><Link to="/register">Register</Link></button>
            </div>
        );
    }
}