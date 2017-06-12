/**
 * Created by Paburitel on 21.05.2017.
 */
import React from 'react';

import Weeks from './Weeks';
import Swipeable from 'react-swipeable'

import { Grid, Col, Row, Checkbox, Radio, ButtonGroup } from 'react-bootstrap';
export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'type',
            lecture: true,
            webinar: true,
            workshop: true,
            event:true,
            deadline: true,
            showAll: true,
            checkbox: [
                {
                    value: 'lecture',
                    title: 'Lecture'
                },
                {
                    value: 'webinar',
                    title: 'Webinar'
                },
                {
                    value: 'workshop',
                    title: 'Workshop'
                },
                {
                    value: 'event',
                    title: 'Event'
                },
                {
                    value: 'deadline',
                    title: 'Deadline'
                }
                ]
        };

        this._handleClick = this._handleClick.bind(this);
        this._switchType = this._switchType.bind(this);
        this._switchEvent = this._switchEvent.bind(this);
        this._showAll = this._showAll.bind(this);
        this._left = this._left.bind(this);
        this._right = this._right.bind(this);
    }
    _switchType(e) {
        const type = e.nativeEvent.target.value;
        this.setState({type: type});
    }
    _switchEvent(e) {
        const type = e.nativeEvent.target.value;
        const check = !this.state[type];
        this.setState({[type]: check, showAll: false});
    }
    _showAll(e) {
        const check = e.nativeEvent.target.checked;
        if (check) {
            this.setState({
            lecture: true,
            webinar: true,
            workshop: true,
            event:true,
            deadline: true,
            showAll: true
            })
        } else {
            this.setState({
                lecture: false,
                webinar: false,
                workshop: false,
                event:false,
                deadline: false,
                showAll: false
            })
        }

    }
    _left () {
        console.log("prev-month");
        this._handleClick(null, "prev-month");
    }
    _right () {
        console.log("next-month");
        this._handleClick(null, "next-month");

    }
    _handleClick(e, action) {
        let year = this.props.calendar.get('year');
        let month = this.props.calendar.get('month').number;
        let id = action ? action : e.nativeEvent.target.id;

        if (id === "prev-month") {
            if (month - 1 < 0) {
                month = 11;
                year = year - 1;
            } else {
                month = month - 1;
            }
            this.props.setDate({month: month, year: year});
        }
        if (id === "next-month") {
            if (month + 1 > 11) {
                month = 0;
                year = year + 1;
            } else {
                month = month + 1;
            }
            this.props.setDate({month: month, year: year});
        }
    }

    render() {

        const year = this.props.calendar.get('year');
        const month = this.props.calendar.get('month').text;
        const events = this.props.schedule;

        return (
            <div>
            <Grid fluid={false} className="calendar-container">
                <Row className="text-center">
                    <Col sm={12} className="calendar-control" onClick={this._handleClick}>
                        <div className="year-ctrl">
                            <a href="#" className="arrow arrow-left" id="prev-month"></a>
                                <div className="year-month">
                                    <p>{year}</p>
                                    <p>{month}</p>
                                </div>
                            <a href="#" className="arrow arrow-right" id="next-month"></a>
                        </div>
                    </Col>
                </Row>

                <Row className="desktop selection-group">
                    <Col sm={3}>
                        <span className="group-label">Switch type:</span>
                        <ButtonGroup>
                            <Radio
                                name="eventType"
                                checked={this.state.type === 'name'}
                                value="name"
                                inline={true}
                                onChange={this._switchType}>
                                name
                            </Radio>
                            <Radio
                                name="eventType"
                                checked={this.state.type === 'type'}
                                value="type"
                                inline={true}
                                onChange={this._switchType}>
                                type
                            </Radio>
                        </ButtonGroup>
                    </Col>
                    <Col sm={9} className="text-right">
                        <span className="group-label">Switch events:</span>
                        <ButtonGroup>
                            {
                                this.state.checkbox.map(check => (
                                    <Checkbox
                                        name="eventType"
                                        checked={this.state[check.value]}
                                        value={check.value}
                                        inline={true}
                                        onChange={this._switchEvent}>
                                        {check.title}
                                    </Checkbox>
                                ))
                            }
                            <Checkbox
                                name="eventType"
                                checked={this.state.showAll}
                                value="showAll"
                                inline={true}
                                onChange={this._showAll}>
                                Show all
                            </Checkbox>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row className="text-center">

                    <Col sm={12} className="calendar-wrapper">
                        <Row>
                            <Col className="days-name"
                                 sm={12}>
                                {
                                    this.props.calendar.get('week').map(day => (
                                        <div className="day-name">{day}</div>
                                    ))
                                }
                            </Col>
                        </Row>
                        <Swipeable
                            onSwipedRight={this._left}
                            onSwipedLeft={this._right}
                        >
                            <Row>
                                <Col sm={12}>
                                     {
                                         this.props.calendar.get('days').map((week, i) => (
                                                 <Weeks
                                                     options={this.state}
                                                     week = {week}
                                                     i = {i}
                                                     schedule = {this.props.schedule}
                                                     trainers = {this.props.trainers}
                                                     events = {events}
                                                     map = {this.props.map}
                                                 />
                                             )
                                         )
                                     }
                                </Col>
                            </Row>
                        </Swipeable>

                    </Col>
                </Row>

            </Grid>
            </div>
        )
    }
}
