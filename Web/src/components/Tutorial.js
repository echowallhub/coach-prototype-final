import React from 'react';
import { Link, browserHistory } from 'react-router';
import cookie from 'react-cookie';
import Modal from 'react-modal';

import styles from './App.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export class Tutorial extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      tutorial: {},
      id: "452c43d3-7f8b-41a3-bc29-ce709bc3e6f4",
      canEnrolled: false,
      modalIsOpen: false
    }
    this.enroll = this.enroll.bind(this);

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(){
    // console.log(this.props.params.id);
    fetch('http://dev.syudo.site/tutorial/'+this.props.params.id).then(res => {
      return res.text()
    }).then(data => {
      let tutorial = JSON.parse(data);
      console.log(tutorial);
      this.setState({
        videos: tutorial.videos,
        tutorial: tutorial
      });

      let user = cookie.load('user');
      let canEnrolled = true;
      for(let tutorial of user.enrolled_tutorials){
        if(tutorial == this.props.params.id){
          canEnrolled = false;
        }
      }

      if(tutorial.tutor._id == user._id){
        canEnrolled = false;
      }

      if(canEnrolled){
        this.setState({
          canEnrolled
        });
      }
    });
  }

  showVideos(){
    return this.state.videos.map( (video, index) =>{
        return(
          <Link to={'/video'+video.url} style={{marginTop: '20px'}} className="row" key={index}>
            <div className="col-xs-5">
              <img src={"http://dev.syudo.site"+video.preview_frames_url[0]} style={{width: '100%'}}/>
            </div>
            <div className="col-xs-7">
              <div style={{marginTop: '50px', marginLeft: '30px'}}>
                {video.description}
              </div>
            </div>
          </Link>
        )
    });
  }

  enroll(){
    let tutorial_id = this.props.params.id;
    let data = {
      id: this.state.id,
      tutorial_id
    }
    fetch('http://dev.syudo.site/account/'+this.state.id+"/enroll", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify(data)
    }).then(res => {
      console.log(res);
    });
    this.openModal();
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    let user = cookie.load('user');
    let enrolled_tutorials = user.enrolled_tutorials;
    user.enrolled_tutorials = [
      ...enrolled_tutorials, this.props.params.id
    ]
    cookie.save('user', user);
    location.reload();
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render(){

    let element = "";
    if(this.state.canEnrolled){
        element = <button type="button" className="btn btn-primary" onClick={this.enroll}>Enroll</button>;
    }

    return(
      <div className="row">
        <div className="col-xs-11">
          <button type="button" className="btn btn-default" style={{marginBottom: '10px'}} onClick={browserHistory.goBack}>Back</button>
          <h3>Tutorial {this.state.tutorial.name}</h3>
          {this.showVideos()}
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h1>Enroll Success</h1>
          </Modal>
        </div>
        <div className="col-xs-1">
          {element}
        </div>
      </div>
    );
  }
}
