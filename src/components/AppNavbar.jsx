import UserContext from "../UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

export default function AppNavbar() {
    const { user, setUser } = useContext(UserContext);

    const logout = () => {
        localStorage.clear();
        setUser({id: null});
    }

    return (
        <Navbar expand="md" className="mathech-bg-primary">
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-inline">
                    <Image alt="logo" src={process.env.PUBLIC_URL + '/logo512.png'} width={30} height={30} className="d-inline-block align-bottom" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="header-nav" className="mathech-fc-tertiary mathech-border-tertiary"><FontAwesomeIcon icon="fa-solid fa-bars" /></Navbar.Toggle>

                <Navbar.Collapse id="header-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                    </Nav>

                    <Nav className="ms-auto gap-2 user-controls">
                    {user.id !== null
                    ?
                        <Button type="button" variant="danger" onClick={logout}>Logout</Button>
                    :
                    <>
                        <Button as={Link} to="/login" variant="info">Login</Button>
                        <Button as={Link} to="/signup" variant="outline-info">Sign Up</Button>
                    </>
                    }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};