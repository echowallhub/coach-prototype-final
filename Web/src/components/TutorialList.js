import React from 'react';

import { TList } from './TList';
import styles from './App.css';

export class TutorialList extends React.Component{
  render(){
    return(
      <div>
        {/* Tutorial List */}
        <div>
          <select className="form-control" style={{marginBottom: '10px'}}>
            <option defaultValue>All</option>
            <option>Boxing</option>
            <option>Yoga</option>
            <option>Fitness</option>
            <option>Cardio</option>
          </select>

          <TList></TList>
        </div>
      </div>
    );
  }
}
