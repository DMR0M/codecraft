import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import CodeMirror from "@uiw/react-codemirror";
import store from 'store2';

import TextField from '../components/Textfield';
import Dropdown from '../components/Dropdown';
import AppAlert from '../components/AppAlert';
import programmingLanguages from '../utils/progLanguages';
import getLanguageExtension from '../utils/getLanguageExtension';


const UpdatePage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Destructure initial values from location.state
    const { id, title: initialTitle, language: initialLanguage, code: initialCode, usecase: initialUsecase, filters } = location.state;

    // Component states
    const [title, setTitle] = useState(initialTitle || '');
    const [code, setCode] = useState(initialCode || '');
    const [language, setLanguage] = useState(initialLanguage || '');
    const [usecase, setUsecase] = useState(initialUsecase || '');
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleUpdate = () => {
        if (!title || !language || !usecase || !code) {
            setShowWarningAlert(true);

            // Hide the warning alert after 1.5 seconds
            setTimeout(() => {
                setShowWarningAlert(false);
            }, 1500);

            return;
        }

        // Create updated snippet object
        const updatedSnippet = { id, title, language, code, usecase };

        // Update the snippets in localStorage
        const existingSnippets = store.get('snippets') || [];
        const updatedSnippets = existingSnippets.map((snippet) =>
            snippet.id === id ? updatedSnippet : snippet
        );

        store.set('snippets', updatedSnippets);

        setShowWarningAlert(false);
        setShowSuccessAlert(true);

        setTimeout(() => {
            setShowSuccessAlert(false);
            navigate('/', { state: { filters } }); // Pass filters back to Home
        }, 1500);
    };

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

                    {/* Success Alert */}
                    {showSuccessAlert && (
                        <AppAlert
                            alertTitle=""
                            alertVariant="success"
                            alertContent="✅ Code Snippet Updated Successfully!"
                            hasButton={false}
                            showAlert={showSuccessAlert}
                            setShowAlert={setShowSuccessAlert}
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
                    />
                    <p>Code Snippet: </p>
                    <CodeMirror
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
        </>
    );
};

export default UpdatePage;
