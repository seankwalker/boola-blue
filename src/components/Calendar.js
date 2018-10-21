import React, { Component } from "react";

import BigCalendar from "react-big-calendar";
import moment from "moment";

// BigCalendar styles
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = BigCalendar.momentLocalizer(moment);

export class Calendar extends Component {
    constructor(props) {
        super(props);
        this.handleRangeChange = this.handleRangeChange.bind(this);
    }

    handleRangeChange = (obj) => {
        let startDate;
        let endDate;

        setTimeout(100);

        let range = document.getElementsByClassName("rbc-toolbar-label")[0].innerHTML;
        console.log(range);

        const monthStringToNum = {
            "January": "01",
            "February": "02",
            "March": "03",
            "April": "04",
            "May": "05",
            "June": "06",
            "July": "07",
            "August": "08",
            "September": "09",
            "October": "10",
            "November": "11",
            "December": "12"
        };

        const abbreviatedMonthStringToNum = {
            "Jan": "01",
            "Feb": "02",
            "Mar": "03",
            "Apr": "04",
            "May": "05",
            "Jun": "06",
            "Jul": "07",
            "Aug": "08",
            "Sep": "09",
            "Oct": "10",
            "Nov": "11",
            "Dec": "12"
        };

        let splitRange = range.split(" ");
        switch (splitRange.length) {
            case 2:
                startDate = monthStringToNum[splitRange[0]] + "-" + splitRange[1];
                endDate = new Date(2018, parseInt(monthStringToNum[splitRange[0]]), 0).getDate().toString();
                break;
            case 3:
                startDate = abbreviatedMonthStringToNum[splitRange[1]] + "-" + splitRange[2];
                endDate = startDate;
                break;
            case 4:
                startDate = monthStringToNum[splitRange[0]] + "-" + splitRange[1];
                endDate = monthStringToNum[splitRange[0]] + "-" + splitRange[3];
                break;
            default:
                break;
        }

        console.log(startDate, endDate);
        // call query function on dates
    }

    render() {
        return (
            <BigCalendar
                defaultView={"week"}
                events={[]}
                localizer={localizer}
                style={{height: "420px"}}
                onRangeChange={this.handleRangeChange}
            />
        );
    }
}
