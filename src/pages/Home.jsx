import { Container } from "react-bootstrap";
import UserContext from "../UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Home() {
    const { user } = useContext(UserContext);
    
    return (
        (user.id !== null)
        ?
        <Navigate to="/utility/generator" />
        :
        <Container fluid className="page--home">
            <h3>Home Page</h3>
        </Container>
    );
};