import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Trainspotting', '28 Days Later'];

const hasVoted="Trainspotting";

ReactDOM.render(
  <Voting pair={pair} hasVoted={hasVoted} />, document.getElementById('app')
);
