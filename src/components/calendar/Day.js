/**
 * Created by Paburitel on 21.05.2017.
 */
import React from 'react';
import DayEvents from '../schedule/Days-event';
import DaysDate from './DaysDate'

export default class Day extends React.Component {
    constructor(props) {
        super(props);

    }
    _getEvents(events, day) {
        if (!events) return;
        const str = day.ISOdate.slice(0, 10);
        return events.filter(event => event.start.slice(0, 10) === str);

    }
    _checkCurrentDay (day) {
        const dateNow = new Date().toISOString().slice(0, 10);
        const dateChekc = day.slice(0, 10);

        return dateNow === dateChekc ? 'current-day' : '';
    }
    render() {
        const day = this.props.day;
        const events = this._getEvents(this.props.events, day);
        const curDayClass = this._checkCurrentDay(day.ISOdate);
        return (
            <div className={`day ${curDayClass}`} key={this.props.key}>
                <DaysDate
                    day = {day}
                />
                <DayEvents
                    events = {events}
                    trainers = {this.props.trainers}
                    options={this.props.options}
                    map = {this.props.map}
                />
            </div>
        )
    }
}
