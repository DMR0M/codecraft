import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Button, Alert } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

import copyIcon from '../assets/copy-icon.png';
import editIcon from '../assets/edit-icon.png';


const DetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        id,
        title = 'Untitled',
        language,
        usecase = '',
        code = '',
        filterTags,
        filters = {},
    } = location.state || {};

    const [showAlert, setShowAlert] = useState(false);

    const handleBack = () => {
        navigate('/', { state: { filters } });
    };

    const transformLanguage = (lang) => {
        if (lang === 'C++') return 'cpp';
        if (lang === 'C#') return 'csharp';
        return lang;
    };

    const validLanguage = transformLanguage(language);

    useEffect(() => {
        hljs.highlightAll();
    }, [language, code]);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1500);
    };

    useEffect(() => {
        if (!location.state) {
            navigate('/');
        }
    }, [location.state, navigate]);

    return (
        <>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark-dimmed.min.css"
                />
            </Helmet>
            <section>
                {showAlert && (
                    <Alert
                        variant="success"
                        className="mt-3 text-center"
                        onClose={() => setShowAlert(false)}
                        dismissible
                    >
                        Code copied to clipboard!
                    </Alert>
                )}
                <h1 className="home-page-title text-white d-flex justify-content-center align-items-center m-3">
                    {title}
                </h1>
                <Container className="bg-primary rounded my-4 text-white p-3 mb-3">
                    <Container className="text-end">
                        <Button className="m-2" variant="primary" size="sm" onClick={handleCopy}>
                            <img src={copyIcon} alt="copy-icon" className="page-icon" />
                            Copy
                        </Button>
                        <Link
                            to={`/update_codesnippet/${id}`}
                            state={{ id, title, language, code, usecase, filterTags, filters }}
                        >
                            <Button className="m-2" variant="primary" size="sm">
                                <img src={editIcon} alt="edit-icon" className="page-icon" />
                                Edit
                            </Button>
                        </Link>
                    </Container>
                    <pre className={`code-view language-${validLanguage} rounded`}>
                        <code>{code || 'No code available to display.'}</code>
                    </pre>
                </Container>
                <Container>
                    {["HTML", "CSS"].includes(validLanguage) ? null : (
                        <Button
                            className="m-2"
                            variant="primary"
                            size="sm"
                            onClick={() =>
                                navigate("/run_code", { state: { id, title, code, usecase, validLanguage, filterTags } })
                            }
                            >
                                Execute Code
                        </Button>
                    )}
                    <Button
                        className="m-2"
                        variant="primary"
                        size="sm"
                        onClick={handleBack}
                    >
                        Back to Home
                    </Button>
                </Container>
            </section>
        </>
    );
};

export default DetailPage;
