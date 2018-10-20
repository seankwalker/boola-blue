import React, { Component } from 'react';
import Header from './components/header.js'; 
import Footer from './components/footer.js'; 

import {Heading, Pane} from 'evergreen-ui';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>

        <Footer/> 
      </div>
    );
  }
}

export default App;
