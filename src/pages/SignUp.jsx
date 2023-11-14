import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from "react-bootstrap";
import "../assets/css/signup.css";
import { Link } from "react-router-dom";

export default function SignUp() {
    return (
        <Container className="my-3">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h3 className="title">Sign Up</h3>
                    <Form>
                        <Container className="border-2 form-container p-3">
                            <Stack direction="horizontal" className="mb-3" gap={3}>
                                <FloatingLabel controlId="firstName" label="First Name" className="w-100">
                                    <Form.Control type="text" placeholder="First Name" />
                                </FloatingLabel>
                                <FloatingLabel controlId="middleName" label="Middle Name" className="w-100">
                                    <Form.Control type="text" placeholder="Middle Name" />
                                </FloatingLabel>
                            </Stack>

                            <FloatingLabel controlId="lastName" label="Last Name" className="mb-3">
                                <Form.Control type="text" placeholder="Last Name" />
                            </FloatingLabel>

                            <FloatingLabel controlId="email" label="Email" className="mb-3">
                                <Form.Control type="email" placeholder="Email" />
                            </FloatingLabel>

                            <FloatingLabel controlId="phone" label="Mobile Number: (09XX XXX XXXX)" className="mb-3">
                                <Form.Control type="number" placeholder="Mobile Number" pattern="[0-9]{11}" />
                            </FloatingLabel>

                            <FloatingLabel controlId="password" label="Password" className="mb-3">
                                <Form.Control type="password" placeholder="Password" />
                            </FloatingLabel>

                            <FloatingLabel controlId="role" label="Role">
                                <Form.Select aria-label="Select role">
                                    <option disabled selected>Select role...</option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </Form.Select>
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