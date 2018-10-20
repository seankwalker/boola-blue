import React, { Component } from "react";
import {Heading, Pane} from "evergreen-ui";

import { CollegeSelector } from "./components/CollegeSelector";

import styles from "./lib/styles.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pane className={styles.headerContent}>
          <Heading className={styles.headerContent} size={900}>
            Yale Residential College Calendar
          </Heading>
          <CollegeSelector className={styles.headerContent} />
        </Pane>
      </div>
    );
  }
}

export default App;
