/**
 * Created by Paburitel on 23.05.2017.
 */

import React from 'react';
import { Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Trainer from "./Trainer";
import Feedback from "./Feedback"

export default class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onOpen = this.onOpen.bind(this);
    }

    open() {
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }
    onOpen() {
        store.dispatch({
                type: 'GET_COOR',
                // should be valid address
                // payload: this.props.event.location,
                payload: "vulісa Akadеmіka Kuprеvіča 1, Building 5, Minsk"
            }
        )
    }

    _duration(time) {
        const hour = Math.floor(time / 3600000);
        const min = Math.floor((time - hour * 3600000) / 60000);

        return `${hour} h :${min} min`;

    }
    _getClass(start, name, isClass) {
        if (!isClass) return '';
        const dateNow = Date.now();
        const startDay = +new Date(start);
        return (startDay >= dateNow) ? `events ${name}` : `events-prev ${name}-prev`;

    }


    render() {
        const event = this.props.event;
        const showTime = this.props.showTime;
        const setClassName = this.props.setClassName;
        const nameType = this.props.options.type;
        const start = showTime ?` ${event.start.slice(11, 16)}` : '';
        const time = this._duration(event.duration);
        const className = this._getClass(event.start, event.type, setClassName);

        return (
            <div className={className}>
                <OverlayTrigger  placement='top' overlay={ <Tooltip>
                    {nameType === 'type' ? event.title : event.type}
                    </Tooltip> }>

                <a className="desktop"
                    href="#" onClick={this.open}
                    data-toggle="tooltip"
                    data-placement="top"
                    title="">
                        {`${nameType === 'type' ? event.type : event.title} ${start}`}
                </a>
                </OverlayTrigger>
                <a className="mobile"
                   href="#" onClick={this.open}
                   title="">
                    {`${showTime ? event.type[0] : event.title}`}<span className="mobile-time"> {start}</span>
                </a>
                    <Modal className="modal-container"
                           show={this.state.showModal}
                           onHide={this.close}
                           onEntering={this.onOpen}
                           animation={true}
                           bsSize="large"
                           aria-labelledby="ModalHeader"
                           restoreFocus={true}>

                        <Modal.Header closeButton>
                            <Modal.Title id='ModalHeader'><h3>{event.title}</h3></Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>{event.description}</p>
                            <p>{`Start: ${start}`}</p>
                            <p>{`Duration: ${time}`}</p>
                            <p>{`Location: ${event.location}`}</p>
                            <div className="map" id="map">

                            </div>
                            <div>
                                <h4>Trainers</h4>
                                <div className="trainers">

                                    {event.trainers.map((tr, i) => (
                                        <Trainer
                                            trainer = {tr}
                                            key = {i}
                                        />
                                    ))}
                                </div>
                            </div>
                            <Feedback
                                target = {'event'}
                                id = {event.id}
                                name = {event.title}
                            />
                            <div>
                                <h4>Resources</h4>
                                <ul>
                                    {
                                        event.resources.map(res => (
                                            <li>
                                                <h5>{res.type}</h5>
                                                <p>{res.description}</p>
                                                <a href={res.resource} target="blanck">Link</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </Modal>
            </div>
        )
    }
}
