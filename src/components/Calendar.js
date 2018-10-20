import React, { Component } from "react";

import BigCalendar from "react-big-calendar";
import moment from "moment";

// BigCalendar styles
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

export class Calendar extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <BigCalendar
              {/*
                defaultView={"week"}
                events={[/* TODO: import events */]}
                localizer={localizer}
                style={{height: "420px"}}
              */}
            />
        );
    }
}
