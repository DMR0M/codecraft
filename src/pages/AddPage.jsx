import React, { useState, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button, Modal } from 'react-bootstrap';
import CodeMirror from "@uiw/react-codemirror";
import store from 'store2';
import { v4 as uuidv4 } from 'uuid';

import TextField from '../components/Textfield';
import Dropdown from '../components/Dropdown';
import AppAlert from '../components/AppAlert';
import programmingLanguages from '../utils/progLanguages';
import getLanguageExtension from '../utils/getLanguageExtension';


const AddPage = () => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('');
    const [usecase, setUsecase] = useState('');
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSave = () => {
        if (!title || !language || !usecase || !code) {
            setShowWarningAlert(true);

            // Hide the warning alert after 1.5 seconds
            setTimeout(() => {
                setShowWarningAlert(false);
            }, 1500);

            return;
        }

        // Generate a unique ID for the snippet
        const id = uuidv4();
        const newSnippet = { id, title, language, code, usecase };

        // Save to localStorage using store2
        const existingSnippets = store.get('snippets') || [];
        store.set('snippets', [newSnippet, ...existingSnippets]);

        // Clear fields
        setTitle('');
        setCode('');
        setLanguage('');
        setUsecase('');
        setShowWarningAlert(false);
        setShowModal(true);
    };

    return (
        <>
            <h1 className="home-page-title text-white d-flex justify-content-center align-items-center my-4">
                Add Code Snippet
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