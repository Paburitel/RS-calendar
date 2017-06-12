/**
 * Created by Paburitel on 23.05.2017.
 */
import React from 'react';

import Event from '../castomComponents/Event';

export default class DayEvent extends React.Component {
    constructor(props) {
        super(props);

    }
    _getEvents(events, trainers, options) {
        if (!events) return;

        const ev = events.map(event => {
            event.trainers = [];
            for (let i = 0; i < event.speakers.length; i++) {
                let id = event.speakers[i];
                trainers.forEach(trainer => {
                    if (trainer.id === id) event.trainers.push(trainer);
                });
            }
            return event;
        });

        let el;
        if (ev.size) {
            // console.log(ev);
            el = ev.map(ev => {
                    if (options[ev.type]) {
                        return (<Event
                            setClassName={true}
                            options={this.props.options}
                            event={ev}
                            showTime={true}
                            map = {this.props.map}
                        />)
                    }
                }
            )
        }
        return el;
    }

    render() {
        const trainers = this.props.trainers;
        const options = this.props.options;
        const events = this._getEvents(this.props.events, trainers, options);
        // console.log('[DAY-EV]', events);
        return (
            <div className="event-wrapper">
                    {events}

            </div>
        )
    }
}
