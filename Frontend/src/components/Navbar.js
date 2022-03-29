import React from "react"
import {Navbar, Nav, Container, Button} from "react-bootstrap"

function NavigationBar() {
    return (
        <Navbar className="color-nav" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="#">OBR MONITORING TOOL</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>

                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Button variant="outline-light">Logout</Button>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar