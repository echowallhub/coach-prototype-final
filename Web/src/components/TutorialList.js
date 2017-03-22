import React from 'react';

import { TList } from './TList';
import styles from './App.css';
import cookie from 'react-cookie';

export class TutorialList extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      filter: "all"
    }

    this.changeOrdering = this.changeOrdering.bind(this);
  }
  

  changeOrdering(event){
    let filter = event.target.value
    this.setState({
      filter
    })
  }

  render(){
    return(
      <div>
        {/* Tutorial List */}
        <div>
          <select className="form-control" style={{marginBottom: '10px'}} onChange={this.changeOrdering} ref={(select) => {this.ordering = select}}>
            <option defaultValue value="all">All</option>
            <option value="Boxing">Boxing</option>
            <option value="Yoga">Yoga</option>
            <option value="Fitness">Fitness</option>
            <option value="Cardio">Cardio</option>
          </select>

          <TList filter={this.state.filter}></TList>
        </div>
      </div>
    );
  }
}
