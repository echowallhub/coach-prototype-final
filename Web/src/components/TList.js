import React from 'react';
import { Link } from 'react-router';

import { TutorialThumbnail } from './TutorialThumbnail';

export class TList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tuturials: []
    }
  }

  componentDidMount(){
    fetch('http://dev.syudo.site/tutorial').then(res => {
      return res.text()
    }).then(data => {
      let tutorials = JSON.parse(data);
      this.setState({
        tuturials: tutorials
      });
    });
  }

  tutorialList(){
    return this.state.tuturials.map(function(tutorial, index){
      return (
        <TutorialThumbnail tutorial={tutorial} key={index}/>
      );
    });
  }

  render(){
    return(
      <div>
        <div className="row">
          {this.tutorialList()}
        </div>
      </div>
    );
  }
}
