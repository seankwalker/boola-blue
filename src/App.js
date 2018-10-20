import React from 'react'
import { render } from 'react-dom'
import ReactDOM from 'react-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { GoogleAuthorize } from 'react-google-authorize';
import moment from 'moment';
import { getEvents } from './gcal'
import {Heading, Pane} from "evergreen-ui";
 import { CollegeSelector } from "./components/CollegeSelector";
import { Calendar } from "./components/Calendar";
 import styles from "./lib/styles.css"
require('style-loader')
require('css-loader')

const localizer = BigCalendar.momentLocalizer(moment);

//const API_KEY = '59165c89d8cc05963285ea6f1024922201847e52'
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
  /*loadClientWhenGapiReady = (script) => {
    console.log('Trying To Load Client!');
    console.log(script)
    if(script.getAttribute('gapi_processed')){
      console.log('Client is ready! Now you can access gapi. :)');
      if(window.location.hostname==='localhost'){
        script.onload = () => {
          window.gapi.client.init({

            'apiKey': API_KEY,
            'clientId': CLIENT_ID,
            'discoveryDocs': DISCOVERY_DOCS,
            'scope': SCOPES
            // clientId and scope are optional if auth is not required.
            //'clientId': '106336438439334956700.apps.googleusercontent.com',
          }).then(function() {
            // 3. Initialize and make the API request.
            window.gapi.auth2.getAuthInstance().signIn();

            window.gapi.client.calendar.events.list({
              'calendarId': 'primary',
              'timeMin': (new Date()).toISOString(),
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': 10,
              'orderBy': 'startTime'
            }).then(function(response) {
              console.log(response)
            });


          }).then(function(response) {
            console.log(response.result);
          }, function(reason) {
            console.log('Error: ' + reason.result.error.message);
          });
        };
      }
    }
    else{
      console.log('Client wasn\'t ready, trying again in 100ms');
      setTimeout(() => {this.loadClientWhenGapiReady(script)}, 100);
    }
  }*/


  loadCalApi() {
    const script = document.createElement("script");
    //const {google} = require('googleapis');
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.init(
          'apiKey': API_KEY,
          'clientId': CLIENT_ID,
          'discoveryDocs': DISCOVERY_DOCS,
          'scope': SCOPES);

          window.gapi.auth2.init({ client_id: CLIENT_ID, scope: SCOPES});

          Promise.resolve(window.gapi.auth2.getAuthInstance().signIn()).then(()=>{
            //const request = require("request");
            const url = "https://www.googleapis.com/calendar/v3/calendars/"+calendarID+"/events";

            // var ga = window.gapi.auth2.getAuthInstance();
            // var cu = ga.currentUser.get();
            // console.log("Scopes: " + cu.getGrantedScopes());

            window.gapi.client.request({
              'path':url
            }).then(function(response) {
              console.log(response.result);
            }, function(reason){
              console.log('Error: ' + reason.result.error.message);
            }

            )
          });

          // response = window.gapi.auth2.getAuthInstance().signIn();
          //   response.then(function(val){
          //     window.gapi.client.calendar.events.list({
          //     'calendarId': 'primary',
          //     'timeMin': (new Date()).toISOString(),
          //     'showDeleted': false,
          //     'singleEvents': true,
          //     'maxResults': 10,
          //     'orderBy': 'startTime'
          //   }).then(function(response) {
          //     console.log(response)
          //   });
          // })
        })

            //window.gapi.auth2.getAuthInstance().signIn().then(function(val){console.log(val)});

            // window.gapi.client.load('youtube', 'v3', () => {
            //   this.setState({ gapiReady: true });
            // });

          // }).then(function(){
          //   window.gapi.auth2.getAuthInstance.signIn();
          //   window.gapi.client.calendar.events.list({
          //     'calendarId': 'primary',
          //     'timeMin': (new Date()).toISOString(),
          //     'showDeleted': false,
          //     'singleEvents': true,
          //     'maxResults': 10,
          //     'orderBy': 'startTime'
          //   }).then(function(response) {
          //     console.log(response)
          //   });
          // });
    };
      /*window.gapi.load('client', () => {
        window.gapi.client.init(
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'discoveryDocs': DISCOVERY_DOCS,
        'scope': SCOPES)
        // clientId and scope are optional if auth is not required.
        //'clientId': '106336438439334956700.apps.googleusercontent.com',
      }).then(function() {
        // 3. Initialize and make the API request.
        window.gapi.auth2.getAuthInstance().signIn();

        window.gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
          console.log(response)
        });


      }).then(function(response) {
        console.log(response.result);
      }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
      });
    };

*/

    document.body.appendChild(script)
  }
  componentDidMount () {
    console.log(this.loadCalApi());
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
        <Calendar
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
