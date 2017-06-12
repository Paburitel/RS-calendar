/**
 * Created by Paburitel on 05.06.2017.
 */
import React from 'react';

export default class ControlType extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        const day = this.props.day;

        return (
            <div
                className={day.flag ? "day-date" : "day-date day-disable"}
                id={day.flag ? day.day : `${day.day}-dis`}
                data-day={day.flag ? day.day : null}
            >
                {day.day}
            </div>

        )
    }
}
