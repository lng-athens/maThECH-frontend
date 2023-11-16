import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from "react-bootstrap";
import "../assets/css/signup.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function SignUp() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if(mobileNumber.length > 11) {
            setMobileNumber(mobileNumber.slice(0, 11));
        }
    }, [firstName, middleName, lastName, email, mobileNumber, password, confirmPassword]);

    const signup = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                middleName: middleName,
                lastName: lastName,
                email: email,
                mobile_no: mobileNumber,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === true) {
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    text: data.message
                })
                .then(result => {
                    if (result.isConfirmed) {
                        setFirstName('');
                        setMiddleName('');
                        setLastName('');
                        setEmail('');
                        setMobileNumber('');
                        setPassword('');
                        setConfirmPassword('');
                        navigate('/login');
                    }
                });
            }
            else {
                Swal.fire({
                    title: 'Failed!',
                    icon: 'error',
                    text: data.message
                });
            }
        });
    };

    return (
        (user.id !== null)
        ?
        <Navigate to="/utility/generator" />
        :
        <Container className="page--signup my-3">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h3 className="title">Sign Up</h3>
                    <Form onSubmit={signup}>
                        <Container className="border-2 form-container p-3">
                            <Stack direction="horizontal" className="mb-3" gap={3}>
                                <FloatingLabel controlId="firstName" label="First Name" className="w-100">
                                    <Form.Control type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />
                                </FloatingLabel>
                                <FloatingLabel controlId="middleName" label="Middle Name" className="w-100">
                                    <Form.Control type="text" placeholder="Middle Name" value={middleName} onChange={e => setMiddleName(e.target.value)} />
                                </FloatingLabel>
                            </Stack>

                            <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
                                <Form.Control type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel controlId="email" label="Email" className="mb-3">
                                <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel controlId="phone" label="Mobile Number: (09XX XXX XXXX)" className="mb-3">
                                <Form.Control type="number" placeholder="Mobile Number" pattern="[0-9]{11}" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel controlId="password" label="Password" className="mb-3">
                                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                            </FloatingLabel>

                            <FloatingLabel controlId="confirmPassword" label="Confirm Password">
                                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            </FloatingLabel>
                        </Container>
                        <Stack direction="horizontal" gap={3} className="justify-content-end mt-3">
                            <Button type="submit" variant="primary" className="w-25">Register</Button>
                            <Button type="button" variant="outline-primary" as={Link} to="/login" className="w-25">Go to Login</Button>
                        </Stack>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};