import React from 'react';
import { Link, browserHistory } from 'react-router';

import styles from './App.css';

export class Video extends React.Component{

  render(){
    return(
      <div className="row">
        <button type="button" className="btn btn-default" style={{marginBottom: '10px'}} onClick={browserHistory.goBack}>Back</button>
        <video controls width="100%">
          <source src={"http://dev.syudo.site/static/"+this.props.params.id} type="video/mp4" />
        </video>
      </div>
    )
  }
}
