/**
 * Created by Paburitel on 18.05.2017.
 */
import React from 'react';
import { Navbar, NavbarItems, Item, NavbarDropdown, DropdownMenu, Nav, NavItem  } from 'react-bootstrap';
import { LinkContainer  } from 'react-router-bootstrap';
export default class Header extends React.Component {
    render() {
        const link = [
            {
                link: '/trainers',
                title: 'Trainers'
            },
            {
                link: '/lectures',
                title: 'Lectures'
            },
            {
                link: '/webinars',
                title: 'Webinars'
            },
            {
                link: '/workshops',
                title: 'Workshops'
            },
            {
                link: '/events',
                title: 'Events'
            },
            {
                link: '/deadlines',
                title: 'Deadlines'
            },
            ];
        return (

            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <LinkContainer to="/">
                                <a href="#">Rolling Scopes Calendar</a>
                            </LinkContainer>

                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            {
                                link.map(link => (
                                    <LinkContainer to={link.link}>
                                        <NavItem>{link.title}</NavItem>
                                    </LinkContainer>
                                ))
                            }
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
