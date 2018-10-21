import request from 'superagent'
import moment from 'moment';

const calendarKeys = ["Benjamin Franklin", "Berkeley", "Branford", "Davenport", "Ezra Stiles", "Grace Hopper", "Jonathan Edwards", "Morse","Pauli Murray", "Pierson", "Saybrook", "Silliman", "Timothy Dwight", "Trumbull"]
//dictionary to lookup calendar IDs
var calendarIDs = {
  "Benjamin Franklin": "89uislochklmg213v8sktm1kg4@group.calendar.google.com",
  "Berkeley": "61i9s53njcannp5rokjn74rdfk@group.calendar.google.com",
  "Branford": "s04fqegomdi0ohhegtbbt37uek@group.calendar.google.com",
  "Davenport": "g0ib5gvjr5amkgpn58mljfivqs@group.calendar.google.com",
  "Ezra Stiles": "q5fpik9uid4nm5kklrv733iu6k@group.calendar.google.com",
  "Grace Hopper": "a379l7ndecltc2igi8hu00ab20@group.calendar.google.com",
  "Jonathan Edwards": "nchcgsl1bq1cma5gr6ebcvth44@group.calendar.google.com",
  "Morse": "p69m87tsoohqrdnk5b70ua2q48@group.calendar.google.com",
  "Pauli Murray": "4k0mo21vp1rcl4tukbcqn7ir5k@group.calendar.google.com",
  "Pierson": "1pc4a6fn4ltacft1ld3uls8ub8@group.calendar.google.com",
  "Saybrook": "mnaol3jvm0vklvpqc9dflsg4bo@group.calendar.google.com",
  "Silliman": "nmth1a4f8g2ndscrseum06k40k@group.calendar.google.com",
  "Timothy Dwight": "ok5of9dkqlgptrnbs04hfk8ejc@group.calendar.google.com",
  "Trumbull": "6edlpp84r8mv7lnv5frbcjl63o@group.calendar.google.com"
}

const API_KEY = 'AIzaSyD6pL7YHpTTYSGcDNf85fb6EKQo7IvwYTQ'

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const CLIENT_ID = '891051467002-fkb8esjv6on51nvij8l462psg8p8566s.apps.googleusercontent.com'



function getEvents(callback, startDate, endDate, collegeNames){
  // console.log(collegeNames);
  //console.log("StartDate: "+startDate);
  //console.log("EndDate: "+endDate);

  var cals = [];
  //NOTE: Recurring events might not be handled gracefully
  for (var idx in collegeNames){
    // console.log(name);
    var events = [];
    var name = collegeNames[idx];
    var calID = calendarIDs[name];
    const url = "https://www.googleapis.com/calendar/v3/calendars/"+calID+"/events";
    //console.log(url)
    window.gapi.client.request({
      'path':url,
      // 'params':{
      //     'timeMin': startDate,
      //     'timeMax': endDate,
      //     'maxResults': 1000
      // }
      'params':{
        'maxResults': 1000
      }
    }).then((response) => {
      //console.log(response)
      for (var idxx in response["result"]["items"]){
        //console.log("Parsing: " + name)

        var event = response["result"]["items"][idxx];
        var title = ""
        var description = ""
        var startTime = null
        var endTime = null
        var allDay = false
        var location = ""

        if(event["title"]){
          title = event.title;
        }
        if(event["description"]){
          description = event.description;
        }
        if(event.end.date){   //all-day event
          allDay = true
        }else{
            startTime = event.start.dateTime;
            endTime = event.end.dateTime;
        }
        if(event["location"]){
          location = event["location"]
        }
        var eventObj
        if(allDay){
          eventObj = {
            'title': title,
            'description': description,
            'startTime': null,
            'endTime': null,
            'allDay': true,
            'location': location
          }
        }
        else{
          eventObj = {
            'title': title,
            'description': description,
            'startTime': startTime,
            'endTime': endTime,
            'allDay': false,
            'location': location
          }
        }
        events.push(eventObj);
      }
      var calObj = {
        'name': name,
        'events': events
      }
      cals.push(calObj);
    }
  )
}
  callback(cals);
}

export function getCollegeEvents (callback, startDate, endDate, collegeNames) {
  // console.log(collegeNames);

  startDate = moment(startDate).format();
  endDate = moment(endDate).format();
  const script = document.createElement("script");
  //const {google} = require('googleapis');
  script.src = "https://apis.google.com/js/client.js";

  script.onload = () => {
    window.gapi.load('client', () => {

      var GoogleAuth = window.gapi.auth2.getAuthInstance();
      if(GoogleAuth==null || !GoogleAuth.isSignedIn.get()){
        window.gapi.client.init(
          'apiKey': API_KEY,
          'clientId': CLIENT_ID,
          'discoveryDocs': DISCOVERY_DOCS,
          'scope': SCOPES);

        window.gapi.auth2.init({ client_id: CLIENT_ID, scope: SCOPES});

        Promise.resolve(window.gapi.auth2.getAuthInstance().signIn()).then(() => {
            getEvents(callback, startDate, endDate, collegeNames)
        });
      }
      else{
        //getEvents(callback, startDate, endDate, collegeNames);
      }

      })

  };

  document.body.appendChild(script)

}
