/**
 * Created by Paburitel on 02.06.2017.
 */
import React from 'react';

import { Grid, Col, Row } from 'react-bootstrap';

export default class Footer extends React.Component {
    render() {

        return (

            <footer>
                <Grid fluid={false} >
                    <Row>
                        <Col
                            sm={4}
                        >
                            <a href="https://school.rollingscopes.com"><h4>Rolling Scopes School</h4></a>
                        </Col>
                        <Col
                            sm={8}
                        >
                        </Col>
                    </Row>
                </Grid>
            </footer>
        )
    }
}
