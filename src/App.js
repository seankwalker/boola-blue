import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import { GoogleAuthorize } from 'react-google-authorize';
import moment from 'moment';
import { getCollegeEvents } from './gcal'
import {Heading, Pane} from "evergreen-ui";
 import { CollegeSelector } from "./components/CollegeSelector";
import { Calendar } from "./components/Calendar";
 import styles from "./lib/styles.css"
require('style-loader')
require('css-loader')

const localizer = BigCalendar.momentLocalizer(moment);

const API_KEY = 'AIzaSyD6pL7YHpTTYSGcDNf85fb6EKQo7IvwYTQ'
const calendarID = "yale.edu_el8ehm6an5qh56ovh9au9kqruc@group.calendar.google.com"

let url = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const CLIENT_ID = '891051467002-fkb8esjv6on51nvij8l462psg8p8566s.apps.googleusercontent.com'

const responseGoogle = (response) => {
  console.log(response);
}


class App extends React.Component {
  constructor () {

    super()
    this.state = {
      events: []
    }
  }

  componentDidMount () {
    //console.log(this.loadCalApi());
    const calendarKeys = ["Benjamin Franklin", "Berkeley", "Branford", "Davenport", "Ezra Stiles", "Grace Hopper", "Jonathan Edwards", "Morse","Pauli Murray", "Pierson", "Saybrook", "Silliman", "Timothy Dwight", "Trumbull"]
    getCollegeEvents(console.log, "Sat, 20 Oct 2018 01:10:43 GMT", "Mon, 22 Oct 2018 01:10:43 GMT", calendarKeys)
  }
  render () {
    return (
      <div className="App">
        <Pane className={styles.headerContent}>
          <Heading className={styles.headerContent} size={900}>
            Yale Residential College Calendar
          </Heading>
          <CollegeSelector className={styles.headerContent} />
        </Pane>
        <Pane id={styles.calendar}>
        <BigCalendar
          style={{height: '420px'}}
          events={this.state.events}
          localizer={localizer}
        />
        </Pane>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));


export default App;
