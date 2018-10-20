import React from 'react'
import { render } from 'react-dom'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { getEvents } from './gcal'

const localizer = BigCalendar.momentLocalizer(moment);

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      events: []
    }
  }
  componentDidMount () {
    getEvents((events) => {
      this.setState({events})
    })
  }
  render () {
    return (
      // React Components in JSX look like HTML tags
      <BigCalendar
        style={{height: '420px'}}
        events={this.state.events}
        localizer={localizer}
      />
    )
  }
}

render(<App />, document.getElementById('root'))
export default App;
