import { Button, Col, Container, FloatingLabel, Form, Row, Stack } from "react-bootstrap";
import "../assets/css/login.css";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h3 className="title">Login</h3>
                    <Form>
                        <Container className="border-2 form-container p-3">
                            <FloatingLabel controlId="userId" label="Email" className="mb-3">
                                <Form.Control type="email" placeholder="Email" />
                            </FloatingLabel>

                            <FloatingLabel controlId="password" label="Password" className="mb-3">
                                <Form.Control type="password" placeholder="Password" />
                            </FloatingLabel>

                            <FloatingLabel controlId="role" label="Role">
                                <Form.Select aria-label="Select role">
                                    <option disabled>Select role...</option>
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </Form.Select>
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