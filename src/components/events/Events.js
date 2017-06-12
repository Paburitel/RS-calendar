/**
 * Created by Paburitel on 28.05.2017.
 */
import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import EventTable from '../castomComponents/EventsTable'
import { connect } from 'react-redux';
import Spinner from '../castomComponents/spinner'

class Events extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div>
                <Header/>
                {!this.props.schedule.size ? <Spinner/> :
                    <EventTable
                        eventType = {"event"}
                        schedule = {this.props.schedule}
                        trainers = {this.props.trainers}
                    />
                }

                <Footer/>

            </div>
        )
    }
}

function stateStore(state) {
    console.log('stateStore',state);
    return {
        schedule: state.schedule,
        calendar: state.calendar,
        trainers: state.trainers,
        map: state.map,
        s: state
    }
}

export default connect(stateStore)(Events);
