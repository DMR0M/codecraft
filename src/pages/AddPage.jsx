import React, { useState, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
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
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    console.log(language.toLowerCase());

    const navigate = useNavigate();

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
        store.set('snippets', [...existingSnippets, newSnippet]);

        // Clear fields
        setTitle('');
        setCode('');
        setLanguage('');
        setUsecase('');
        setShowWarningAlert(false);
        setShowSuccessAlert(true);

        // Automatically navigate after a delay
        setTimeout(() => {
            setShowSuccessAlert(false);
            navigate('/');
        }, 1500);
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
        </>
    );
};

export default AddPage;