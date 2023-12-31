import "../assets/css/util.generator.css";
import UserContext from "../UserContext";
import { useContext, useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Row, Stack } from "react-bootstrap";
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

    const [inputQuery, setInputQuery] = useState("");
    const [outputResult, setOutputResult] = useState("");

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

    const handleQueryRequest = async () => {
        try{
            const response = await fetch('https://api.edenai.run/v2/text/generation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNDk3N2FhYzgtN2E0My00MjM5LTg2YmItYWQ1ZGMxOWVjNmQ1IiwidHlwZSI6ImFwaV90b2tlbiJ9.fYMByfYw7nHQ1NpkRx1X9HyLLBGpc9pTLtFbgQ-pjYc'
                },
                body: JSON.stringify({
                    show_original_response: false,
                    fallback_providers: "",
                    providers: "cohere",
                    text: inputQuery,
                    temperature: 0.2,
                    max_tokens: 250,
                }),
            });
    
            if (!response.ok) {
                throw new Error('EdenAI API request failed');
            }
    
            const responseData = await response.json();
            console.log(responseData.cohere);
            const generatedTextWithBreaks = responseData.cohere.generated_text.replace(/\n/g, '<br>');
            setOutputResult(generatedTextWithBreaks);
        }
        catch (error) {
            console.error(error);
        }
    };
    

    return (
        (user.id === null)
        ?
        <Navigate to="/login" />
        :
        <Container fluid={true} className="page--generator p-0" style={{ height: generatorHeight }}>
            <Row className="m-0" style={{ height: generatorHeight }}>
                <div id="sidebarNav" className=" p-0" style={{ width: sidebarWidth, transition: 'width ease-in-out 0.3s' }}>
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

                <div id="queryPage" className="m-0 p-0 position-relative" style={{ width: queryPageWidth, transition: 'width ease-in-out 0.3s' }}>
                    <div id="queryResultContainer" className="mx-auto">
                        <p dangerouslySetInnerHTML={{ __html: outputResult }} className="mt-3"></p>
                    </div>

                    <div id="inputContainer" className="input--container position-absolute w-100 bottom-0 pt-5">
                        <Stack direction="horizontal" gap={2} id="panelGroup" className="panel-group pb-3 mx-auto">
                            <Stack direction="vertical" gap={0} className="inpgroup--container align-items-center">
                                <InputGroup className="inpgroup--query">
                                    <InputGroup.Text className="align-items-start">Query</InputGroup.Text>
                                    <Form.Control as="textarea" id="inputQuery" value={inputQuery} onChange={e => setInputQuery(e.target.value)} />
                                </InputGroup>
                            </Stack>
                            <Button type="button" variant="primary" onClick={handleQueryRequest}><FontAwesomeIcon icon="fa-solid fa-paper-plane" /></Button>
                        </Stack>
                    </div>
                </div>
            </Row>
        </Container>
    );
}