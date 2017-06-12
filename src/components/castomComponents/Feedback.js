/**
 * Created by Paburitel on 04.06.2017.
 */
import React from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class Day extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.send = this.send.bind(this);
    }

    open() {
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }
    send() {
        store.dispatch({
                type: 'SEND_FEEDBACK',
                // should be valid address
                // payload: this.props.event.location,
                payload: {
                    id: this.props.id,
                    target: this.props.target,
                    value: this.input.value,
                }
            }
        )

        alert("Feedback has been sent");
        this.setState({showModal: false});
    }
    onOpen() {

    }



    render() {
        const name = this.props.name;


        return (
            <div className="feedback">


                <Button
                    onClick={this.open}
                    bsStyle="primary"
                >
                    Leave feedback
                </Button>

                <Modal className="modal-container"
                       show={this.state.showModal}
                       onHide={this.close}
                       onEntering={this.onOpen}
                       animation={true}
                       bsSize="large"
                       aria-labelledby="ModalHeader"
                       restoreFocus={true}>

                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'><h3>{`Feedback fore ${name}`}</h3></Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormGroup controlId="parameterDescription">
                            <ControlLabel>leave feedback</ControlLabel>
                            <FormControl
                                componentClass="textarea"
                                rows={6}
                                placeholder="your feedback..."
                                inputRef={ref => { this.input = ref; }}
                            >
                            </FormControl>
                        </FormGroup>


                    </Modal.Body>

                    <Modal.Footer>
                        <Button bsStyle="success" onClick={this.send}>Send</Button>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
