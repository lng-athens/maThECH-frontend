import "../assets/css/util.generator.css";
import UserContext from "../UserContext";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Stack } from "react-bootstrap";
import useWindowHeight from "../hooks/useWindowHeight";
import useWindowWidth from "../hooks/useWindowWidth";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Generator() {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(true);
    const [sidebarWidth, setSidebarWidth] =useState("0px");
    const [queryPageWidth, setQueryPageWidth] = useState("0px");
    const windowHeight = useWindowHeight();
    const windowWidth = useWindowWidth();
    const navbarHeight = 56;

    const generatorHeight = windowHeight - navbarHeight;

    useEffect(() => {
        if (windowWidth >= 992) {
            if (open === true) {
                setSidebarWidth("20vw");
                setQueryPageWidth("80vw");
            }
            else {
                setSidebarWidth("5vw");
                setQueryPageWidth("95vw");
            }
        }
        else {
            if (open === true) {
                setSidebarWidth("30vw");
                setQueryPageWidth("70vw");
            }
            else {
                setSidebarWidth("10vw");
                setQueryPageWidth("90vw");
            }
        }
    }, [open, windowWidth]);

    const toggleSize = () => {setOpen(!open)};

    return (
        (user.id === null)
        ?
        <Navigate to="/login" />
        :
        <Container fluid={true} className="page--generator p-0" style={{ height: generatorHeight }}>
            <Row className="m-0" style={{ height: generatorHeight }}>
                <div id="sidebarNav" className="h-100 p-0" style={{ width: sidebarWidth, transition: 'width ease-in-out 0.3s' }}>
                    <Stack direction="horizontal" gap={3} className="p-3 justify-content-center">
                        <Button id="btnNewTest" type="button" variant="outline-primary" className="flex-grow-1 flex-shrink-0" style={{ display: open ? 'block' : 'none', opacity: open ? 1 : 0, transition: 'opacity ease-in-out 0.3s' }}>New Test</Button>
                        <Button id="btnToggleSidebar" onClick={toggleSize} variant="primary"><FontAwesomeIcon icon="fa-solid fa-compress" /></Button>
                    </Stack>

                    <Stack id="testList" direction="vertical" gap={3} className="p-3 justify-content-center" style={{ display: open ? 'flex' : 'none', opacity: open ? 1 : 0, transition: 'opacity ease-in-out 0.3s' }}>
                        <Button type="button" variant="outline-info" style={{ width: `calc(${sidebarWidth} - 2rem)` }}><FontAwesomeIcon icon="fa-regular fa-file-lines" />&#8194;Test 1</Button>
                        <Button type="button" variant="outline-info" style={{ width: `calc(${sidebarWidth} - 2rem)` }}><FontAwesomeIcon icon="fa-regular fa-file-lines" />&#8194;Test 2</Button>
                        <Button type="button" variant="outline-info" style={{ width: `calc(${sidebarWidth} - 2rem)` }}><FontAwesomeIcon icon="fa-regular fa-file-lines" />&#8194;Test 3</Button>
                        <Button type="button" variant="outline-info" style={{ width: `calc(${sidebarWidth} - 2rem)` }}><FontAwesomeIcon icon="fa-regular fa-file-lines" />&#8194;Test 4</Button>
                        <Button type="button" variant="outline-info" style={{ width: `calc(${sidebarWidth} - 2rem)` }}><FontAwesomeIcon icon="fa-regular fa-file-lines" />&#8194;Test 5</Button>
                    </Stack>
                </div>

                <div id="queryPage" className="h-100" style={{ width: queryPageWidth, transition: 'width ease-in-out 0.3s' }}></div>
            </Row>
        </Container>
    );
}