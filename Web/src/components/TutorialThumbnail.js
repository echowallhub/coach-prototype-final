import React from 'react';
import { Link } from 'react-router';

import styles from './App.css';

export class TutorialThumbnail extends React.Component{
  render(){
    return(
      <Link to={'/tutorial/'+this.props.tutorial._id} className="col-xs-4" style={{marginTop: '10px'}}>
        <div>
          <img src={"http://dev.syudo.site"+this.props.tutorial.videos[0].preview_frames_url[0]} width="100%"/>
        </div>
        <div style={{marginTop: '10px'}}>
          <p><img src="tutorial_logo.png" width="20"/><strong>{this.props.tutorial.name}</strong></p>
          <p><strong>{this.props.tutorial.description}</strong></p>
        </div>
      </Link>
    );
  }
}
