import React from 'react';
import styles from './App.css';
import { Link, browserHistory } from 'react-router';
import cookie from 'react-cookie';

export class CreateTutorial extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      description: "",
      category: "",
      tutor: cookie.load('user'),
      file: {},
      videoName: "",
      videoDescription: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleFileUpload(event) {
    // const file = files[0];
    var file = event.target.files[0];
    this.setState({
      file
    });
  }

  handleSubmit(event){
    event.preventDefault();

    fetch('http://dev.syudo.site/tutorial', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(this.state)
    }).then( res => {
      return res.text()
    }).then( data => {
      let tutorial = JSON.parse(data);
      let tutorialId = tutorial.tutorial_id;

      let formData = new FormData();
      formData.append('file', this.state.file);
      formData.append('tutorial_id', tutorialId);
      formData.append('name', this.state.videoName);
      formData.append('description', this.state.videoDescription);

      fetch('http://dev.syudo.site/video', {
        method: "POST",
        body: formData
      }).then( res => {
        return res.text()
      }).then( data => {
        this.props.router.push('/')
      });
    });
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit} style={{marginTop: '20px'}}>
        <button type="button" className="btn btn-default" style={{marginBottom: '10px'}} onClick={browserHistory.goBack}>Back</button>
        <h3>Create Tutorial</h3>

        <div className="form-group" style={{marginTop: '40px'}}>
           <label htmlFor="exampleInputFile">Name</label>
           <input type="text" className="form-control" value={this.state.name} onChange={this.handleInputChange} name="name"/>
        </div>

        <div className="form-group" style={{marginTop: '40px'}}>
           <label htmlFor="exampleInputFile">Description</label>
           <input type="text" className="form-control" onChange={this.handleInputChange} name="description"/>
        </div>

        <div className="form-group" style={{marginTop: '40px'}}>
           <label htmlFor="exampleSelect1">Choose Category</label>
           <select className="form-control" value={this.state.category} onChange={this.handleInputChange} name="category">
             <option></option>
             <option value="Boxing">Boxing</option>
             <option value="Yoga">Yoga</option>
             <option value="Fitness">Fitness</option>
             <option value="Cardio">Cardio</option>
           </select>
         </div>

         <div className="form-group" style={{marginTop: '40px'}}>
            <label htmlFor="exampleInputFile">Upload Video</label>
            <input type="file" className="form-control-file" name="file" onChange={this.handleFileUpload} ref="file"/>
            {/* <small id="fileHelp" className="form-text text-muted">Upload Video for the tutorial.</small> */}
          </div>

          <div className="form-group" style={{marginTop: '40px'}}>
             <label htmlFor="exampleInputFile">Video Name</label>
             <input type="text" className="form-control" onChange={this.handleInputChange} name="videoName"/>
          </div>

          <div className="form-group" style={{marginTop: '40px'}}>
             <label htmlFor="exampleInputFile">Video Description</label>
             <input type="text" className="form-control" onChange={this.handleInputChange} name="videoDescription"/>
          </div>

          <div className="text-center" style={{marginTop: '50px', marginBottom: '200px'}}>
              <button type="submit" className="btn btn-primary col-xs-offset-4 col-xs-4">Submit</button>
          </div>

         {/* <button type="button" className="btn btn-default" style={{marginLeft: '10px'}} onClick={browserHistory.goBack}>Cancel</button> */}
      </form>
    );
  }
}
