import "../assets/css/login.css";
import UserContext from "../UserContext";
import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.access !== "undefined") {
                console.log('User exist');
                retrieveUser(data.access);                
            }
            else {
                Swal.fire({
                    title: 'Failed!',
                    icon: 'error',
                    text: data.message
                });
            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Error!',
                icon: 'error',
                text: error
            });
        });
    };

    const retrieveUser = (token) => {
        fetch(`${process.env.REACT_APP_API_URL}/user/details`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                id: data._id
            });
            localStorage.setItem("token", token);
            Swal.fire({
                title: 'Success!',
                icon: 'success',
                text: 'Account logged in!'
            });
            navigate('/utility/generator');
        });
    };

    return (
        (user.id !== null)
        ?
        <Navigate to="/utility/generator" />
        :
        <Container className="page--login h-100">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h3 className="title">Login</h3>
                    <Form onSubmit={userLogin}>
                        <Container className="border-2 form-container p-3">
                            <FloatingLabel controlId="userId" label="Email" className="mb-3">
                                <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel controlId="password" label="Password" className="mb-3">
                                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            </FloatingLabel>
                        </Container>

                        <Stack direction="horizontal" gap="2" className="justify-content-end mt-3">
                            <Button type="submit" variant="primary" className="w-25">Login</Button>
                            <Button type="button" as={Link} to="/signup" variant="outline-primary" className="w-25">Sign Up</Button>
                        </Stack>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};