import React, { Component } from 'react'; 
import {Heading, Pane} from 'evergreen-ui';
import './components.css'; 

export default class Footer extends React.Component {
  render() {
    return (
        <div className="App-footer"> 
            <div className="App-footer-big"> idk if we have anything important to say tho </div>
            <div className="App-footer-small">© Copyright 2018, All Rights Reserved by Yale University???</div>
         </div> 
    );
  }
}