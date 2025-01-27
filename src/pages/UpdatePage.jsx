import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Button, Modal, Row, Stack  } from 'react-bootstrap';
import CodeMirror from "@uiw/react-codemirror";
import store from 'store2';

import TextField from '../components/Textfield';
import Dropdown from '../components/Dropdown';
import AppAlert from '../components/AppAlert';
import AppBadge from '../components/AppBadge';
import programmingLanguages from '../utils/progLanguages';
import getLanguageExtension from '../utils/getLanguageExtension';


const UpdatePage = () => {
    const location = useLocation();

    // Destructure initial values from location.state
    const { 
        id, title: initialTitle, 
        language: initialLanguage, 
        code: initialCode, 
        usecase: initialUsecase,
        filterTags,
        filters 
    } = location.state;

    // Component states
    const [title, setTitle] = useState(initialTitle || '');
    const [code, setCode] = useState(initialCode || '');
    const [language, setLanguage] = useState(initialLanguage || '');
    const [usecase, setUsecase] = useState(initialUsecase || '');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([...filterTags]);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showTagAlert, setShowTagAlert] = useState(false);

    const handleUpdate = () => {
        if (!title || !language || !usecase || !code || tags.length === 0) {
            setShowTagAlert(false);
            setShowWarningAlert(true);

            // Hide the warning alert after 1.5 seconds
            setTimeout(() => {
                setShowWarningAlert(false);
            }, 1500);

            return;
        }

        // Create updated snippet object
        const updatedSnippet = { id, title, language, code, usecase, tags };

        // Update the snippets in localStorage
        const existingSnippets = store.get('snippets') || [];
        const updatedSnippets = existingSnippets.filter(
            (snippet) => snippet.id !== id
        );
        // Add updated snippet to the start
        updatedSnippets.unshift(updatedSnippet); 

        store.set('snippets', updatedSnippets);

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
                Update Code Snippet
            </h1>
            <section>
                <Container>
                    {/* Warning Alert */}
                    {showWarningAlert && (
                        <AppAlert
                            alertTitle=""
                            alertVariant="danger"
                            alertContent="⚠️ Please fill in all fields!"
                            hasButton={false}
                            showAlert={showWarningAlert}
                            setShowAlert={setShowWarningAlert}
                        />
                    )}

                    {/* Input Fields */}
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
                            placeholder="Update tags for code snippet "
                            addText="ex. fundamentals, framework, algorithms"
                        />
                    </Row>
                    {showTagAlert && (
                        <AppAlert 
                            alertTitle=""
                            alertVariant="warning" 
                            alertContent="⚠️ Only a maximum of 4 tags are allowed"
                            hasButton={false}
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
                    <p>Update your code here: </p>
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

            {/* Action Buttons */}
            <Container className="my-4 d-flex justify-content-end">
                <Button className="m-3" variant="outline-success" size="lg" onClick={handleUpdate}>
                    Update
                </Button>
                <Link to="/" state={{ filters }}>
                    <Button className="m-3" variant="outline-danger" size="lg">
                        Cancel
                    </Button>
                </Link>
            </Container>

            {/* Notification Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Snippet Updated</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Successfully updated the code snippet!
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/">
                        <Button size="lg" variant="success" onClick={() => setShowModal(false)}>
                            OK
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdatePage;
