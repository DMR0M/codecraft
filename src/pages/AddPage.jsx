import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Modal, Row, Stack } from 'react-bootstrap';
import CodeMirror from "@uiw/react-codemirror";
import store from 'store2';
import { v4 as uuidv4 } from 'uuid';

import TextField from '../components/Textfield';
import Dropdown from '../components/Dropdown';
import AppAlert from '../components/AppAlert';
import AppBadge from '../components/AppBadge';
import programmingLanguages from '../utils/progLanguages';
import getLanguageExtension from '../utils/getLanguageExtension';


const AddPage = () => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('');
    const [usecase, setUsecase] = useState('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showTagAlert, setShowTagAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSave = () => {
        if (!title || !language || !usecase || !code || !tags) {
            setShowTagAlert(false);
            setShowWarningAlert(true);

            // Hide the warning alert after 1.5 seconds
            setTimeout(() => {
                setShowWarningAlert(false);
            }, 2500);

            return;
        }

        // Generate a unique ID for the snippet
        const id = uuidv4();
        const newSnippet = { id, title, language, code, usecase, tags };

        // Save to localStorage using store2
        const existingSnippets = store.get('snippets') || [];
        store.set('snippets', [newSnippet, ...existingSnippets]);

        // Clear fields
        setTitle('');
        setCode('');
        setLanguage('');
        setUsecase('');
        setTags([]);
        setShowWarningAlert(false);
        setShowModal(true);
    };

    const handleTags = () => {
        if (tags.length === 4) {
            setShowWarningAlert(false);
            setShowTagAlert(true);

            // Hide the tag alert after 1.5 seconds
            setTimeout(() => {
                setShowTagAlert(false);
            }, 2500);

            return;
        }

        setTags([...tags, tag.toLowerCase()]);
        setTag('');
    };

    const handleTagClick = (tagText) => {
        setTags(tags.filter(tag => tag !== tagText));
    }

    return (
        <>
            <h1 className="home-page-title text-white d-flex justify-content-center align-items-center my-4">
                Add Code Snippet
            </h1>
            <section>
                <Container>
                    {/* App Alerts */}
                    {showWarningAlert && (
                        <AppAlert 
                            alertTitle=""
                            alertVariant="danger" 
                            alertContent="⚠️ Please fill in all fields!"
                            hasButton={false}
                            buttonText=""
                            showAlert={showWarningAlert}
                            setShowAlert={setShowWarningAlert}
                        />
                    )}
                    <TextField
                        id="code-title"
                        label="Title:"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title of the code snippet"
                    />
                    <Dropdown
                        id="code-language"
                        label="Language:"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        options={programmingLanguages}
                    />
                    <TextField
                        id="code-usecase"
                        label="Description:"
                        value={usecase}
                        onChange={(e) => setUsecase(e.target.value)}
                        placeholder="Enter the description of the code snippet"
                        as="textarea"
                        rows={2}
                    />
                    {/* Code Tags */}
                    <Row>
                        <TextField
                            id="code-tags"
                            label="Tags:"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            placeholder="Enter tags for code snippet "
                            addText="ex. fundamentals, framework, algorithms"
                        />
                    </Row>
                    {showTagAlert && (
                        <AppAlert 
                            alertTitle=""
                            alertVariant="warning" 
                            alertContent="⚠️ Only a maximum of 4 tags are allowed"
                            hasButton={false}s
                            buttonText=""
                            showAlert={showTagAlert}
                            setShowAlert={setShowTagAlert}
                        />
                    )}
                    <Button className="m-2" variant="outline-light" onClick={handleTags}>
                        + Add Tag
                    </Button>
                    <Button className="m-3" variant="outline-danger" onClick={() => setTags([])}>
                        Reset Tags
                    </Button>
                    <Row className="my-2">
                        <Stack className="m-2" direction="horizontal" gap={2}>
                            {tags.map((tag, i) => (
                                <AppBadge 
                                    key={i}
                                    bgColor="light" 
                                    txtColor="dark" 
                                    text={tag}
                                    hasCloseBtn={true}
                                    btnClickHander={handleTagClick}
                                />
                            ))}
                        </Stack>
                    </Row>

                    <p>Write your code here: </p>
                    <CodeMirror
                        className="border rounded"
                        value={code}
                        height="400px"
                        theme="dark"
                        extensions={[getLanguageExtension(language.toLowerCase())]}
                        onChange={(value) => setCode(value)}
                    />
                </Container>
            </section>
            <Container className="my-4 d-flex justify-content-end">
                <Button className="m-3" variant="outline-success" size="lg" onClick={handleSave}>
                    Save
                </Button>
                <Link to={'/'}>
                    <Button className="m-3" variant="outline-danger" size="lg">
                        Cancel
                    </Button>
                </Link>
            </Container>

            {/* Notification Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Added a Code Snippet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Successfully created a new code snippet!
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/">
                        <Button variant="success">
                            OK
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddPage;