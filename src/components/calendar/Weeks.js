/**
 * Created by Paburitel on 21.05.2017.
 */
import React from 'react';

import Day from './Day';

export default class Weeks extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const week = this.props.week.map((day, i) => (
                <Day
                    day = {day}
                    key = {i}
                    schedule = {this.props.schedule}
                    events = {this.props.events}
                    trainers = {this.props.trainers}
                    options={this.props.options}
                    map = {this.props.map}
                />

        ))
        return (
            <div className="week">
                {week}
            </div>
        )
    }
}
