import request from 'superagent'

const CALENDAR_ID = 'yale.edu_0m2hiitilfrba1duifi9maf960@group.calendar.google.com'
const API_KEY = 'AIzaSyC82TYeG6yXixD1q4i_RTqDQC_JlfWJA8Q'
let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`

export function getEvents (callback) {
  request
    .get(url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
          events.push({
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary,
          })
        })
        callback(events)
      }
    })
}
