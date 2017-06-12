/**
 * Created by Paburitel on 02.06.2017.
 */
import React from 'react';
import Events from  './Event';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import { Grid, Col, Row } from 'react-bootstrap';

export default class webinars extends React.Component {
    constructor(props) {
        super(props);

    }
    _getEvents(events, trainers, str) {
        console.log("START", events);
        if (!events) return;
        class Web {
            constructor(id, start, title, des, location, date) {
                this.id = id;
                this.start = start;
                this.title = title;
                this.des = des;
                this.location = location;
                this.date = date;
            }
        }

        const ev = events.filter(event => {
            if (event.type === str) {
                event.trainers = [];
                for (let i = 0; i < event.speakers.length; i++) {
                    let id = event.speakers[i];
                    trainers.forEach(trainer => {
                        if (trainer.id === id) event.trainers.push(trainer);
                    });
                }
                return true;
            }
        });
        console.log("TABLE!!!!", ev);
        const foreTable = ev.map((ev, i)=> {
            const id = i+1;

            const date = ev.start.slice(0, 10);
            const start = ev.start.slice(11, 16);
            const eve = ev;
            const des = ev.description;
            const loc = ev.location;


            return new Web (id,  start, eve, des, loc, date);
        });

        return foreTable;

    }
    _modal(cell) {
        return (
            <div>
                <Events
                    event={cell}
                    options={{type: "name"}}
                    showTime={false}
                />
            </div>
        )
    }
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate()");
        return true;
    }

    render() {
        const events = this.props.schedule;
        const trainers = this.props.trainers;
        const eventType = this.props.eventType;
        const event = this._getEvents(events, trainers, eventType);
        console.log("TABLE", this.props);
        return (
            <div>
                <Grid fluid={false}>
                    <Row>
                        <Col
                            className="text-center"
                            sm={12}
                            xs={12}>
                            <h2>Your {eventType}.</h2>
                        </Col>
                    </Row>
                    <Row>
                        <div className="desktop">
                            <BootstrapTable data={ event } striped >
                                <TableHeaderColumn dataField='id' isKey width='5%'></TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='date'
                                    filter={ { type: 'TextFilter', delay: 500 } }
                                    width='15%'
                                >
                                    Date
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='start' width='10%' >Time</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='title'
                                    width='15%'
                                    dataFormat={this._modal}
                                >
                                    Title
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='des'
                                    tdStyle={ { whiteSpace: 'normal' } }
                                    width='30%'
                                >
                                    Description
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='location'
                                    tdStyle={ { whiteSpace: 'normal' } }
                                    width='30%'
                                >
                                    Location
                                </TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                        <div className="mobile">
                            <BootstrapTable data={ event } striped >
                                <TableHeaderColumn
                                    isKey
                                    dataField='date'
                                    filter={ { type: 'TextFilter', delay: 500 } }
                                    width='30%'
                                >
                                    Date
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField='start' width='20%'>Time</TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='title'
                                    width='25%'
                                    dataFormat={this._modal}
                                >
                                    Title
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                    dataField='location'
                                    tdStyle={ { whiteSpace: 'normal' } }
                                    width='25%'
                                >
                                    Location
                                </TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </Row>

                </Grid>
            </div>
        )
    }
}
