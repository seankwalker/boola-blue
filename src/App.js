import React, { Component } from 'react';

import {Heading, Pane} from 'evergreen-ui';
import moment from 'moment'

import BigCalendar from 'react-big-calendar'
import { getEvents } from './gcal'

BigCalendar.momentLocalizer(moment)

//require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')
require('react-big-calendar/lib/css/react-big-calendar.css')


class App extends Component {
  constructor () {
    super()
    this.state = {
      events: []
    }
  }

  componentDidMount(){
    getEvents((events)=>{
      this.setState({events})
    })
  }

  render() {
    return (
      <div className="App">
        <BigCalendar

        startAccessor='startDate'
        endAccessor='endDate'
        date={moment().toDate()}
        style={{height: '420px'}}
        events={this.state.events}
        

        />
      </div>
    );
  }
}

export default App;
