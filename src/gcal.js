import request from 'superagent'

const calendarID = "yale.edu_el8ehm6an5qh56ovh9au9kqruc@group.calendar.google.com"
const APIKey = "AIzaSyC82TYeG6yXixD1q4i_RTqDQC_JlfWJA8Q"
let url = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`

// const

export function getEvents (callback) {
  request
    .get(url)
    .set('API-Key', '59165c89d8cc05963285ea6f1024922201847e52')
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
