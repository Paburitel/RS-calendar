/**
 * Created by Paburitel on 29.05.2017.
 */
import React from 'react';
import {  Image} from 'react-bootstrap';
import { Button, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Feedback from './Feedback';

export default class Trainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }
    open() {
        this.setState({showModal: true});
    }

    close() {
        this.setState({showModal: false});
    }
    render() {
        // console.log('[TRAINER]', this.props);
        const trainer = this.props.trainer;
        return (
                <div>
                    <OverlayTrigger placement='top' overlay={ <Tooltip>Click to get to know more.</Tooltip> }>
                        <div
                             className="trainer"
                        >
                            <a href="#" onClick={this.open} data-toggle="tooltip" data-placement="top" title="">
                               <div className="avatar-container">
                                <Image
                                   circle={true}
                                   responsive={true}
                                    src={trainer.avatar}
                                />
                                </div>
                                <div className="text-center">
                                    <p>{trainer.name}</p>
                                </div>
                            </a>
                        </div>

                    </OverlayTrigger>
                    <Modal className="modal-container"
                           show={this.state.showModal}
                           onHide={this.close}
                           animation={true}
                           bsSize="large"
                           aria-labelledby="ModalHeader"
                           restoreFocus={true}>

                        <Modal.Header closeButton>
                            <Modal.Title id='ModalHeader'><h3>{trainer.name}</h3></Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                            <p>Information about trainer </p>
                            <Feedback
                                target = {'trainer'}
                                id = {trainer.id}
                                name = {trainer.name}
                            />

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

