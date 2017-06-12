import Immutable from 'immutable';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from './Header';
import Footer from './Footer';
import Spinner from './castomComponents/spinner'
import installDevTools from 'immutable-devtools';
installDevTools(Immutable);


import Calendar from './calendar/Calendar';

class App extends React.Component {
    constructor (props) {
        super(props)

    }

    render() {

        return (
                <div>
                    <Header/>
                    {!this.props.schedule.size ? <Spinner/> :
                        <Calendar
                            calendar={this.props.calendar}
                            schedule={this.props.schedule}
                            trainers={this.props.trainers}
                            setDate={this.props.setDate}
                            getSchedule={this.props.getSchedule}
                            map={this.props.map}

                        />
                    }
                    <Footer/>
                </div>
        )
    }
}

function stateStore(state) {
    return {
        schedule: state.schedule,
        calendar: state.calendar,
        trainers: state.trainers,
        map: state.map,
        s: state
    }

}

function mapActionsToProps(dispatch) {
    return {
        setDate: obj => dispatch({
            type: 'SET_CALENDAR',
            payload: obj
        }),
        getSchedule: obj => dispatch({
            type: 'GET_SCHEDULE',
            payload: obj
        }),
    }
}

export default connect(stateStore, mapActionsToProps)(App);
