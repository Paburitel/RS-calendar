/**
 * Created by Paburitel on 28.05.2017.
 */
import React from 'react';
import Header from '../Header';
import Trainer from '../castomComponents/Trainer';
import { connect } from 'react-redux';
import Footer from '../Footer';
import Spinner from '../castomComponents/spinner'

import { Grid, Col, Row } from 'react-bootstrap';
class Trainers extends React.Component {
    render() {
        const trainers = this.props.trainers;
        return (
            <div>
                <Header/>
                {!this.props.trainers.size ? <Spinner/> :
                    <Grid fluid={false}>
                        <Row>
                            <Col
                                className="text-center"
                                sm={12}
                                xs={12}>
                                <h2>Your trainers.</h2>
                            </Col>
                        </Row>
                        <Row className="trainers">
                            {trainers.map((tr, i) => (
                                <Trainer
                                    trainer={tr}
                                    key={i}
                                />
                            ))}
                        </Row>

                    </Grid>
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

export default connect(stateStore)(Trainers);
