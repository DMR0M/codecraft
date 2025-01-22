import React, { useState, useEffect, useReducer } from 'react';
import { Accordion, Container, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import store from 'store2';

import RowData from '../components/RowData';
import TextField from '../components/Textfield';
import Dropdown from '../components/Dropdown';
import programmingLanguages from '../utils/progLanguages';
import filterReducer from '../utils/filterReducer';


const initialState = {
    title: '',
    language: '',
    usecase: '',
};

const HomePage = () => {
    const location = useLocation();
    const [snippets, setSnippets] = useState([]);
    const [state, dispatch] = useReducer(filterReducer, location.state?.filters || initialState);

    useEffect(() => {
        const storedSnippets = store.get('snippets') || [];
        setSnippets(storedSnippets);
    }, []);

    const deleteSnippet = (id) => {
        const updatedSnippets = snippets.filter((snippet) => snippet.id !== id);
        setSnippets(updatedSnippets);
        store.set('snippets', updatedSnippets);
    };

    const filteredSnippets = snippets.filter((snippet) => {
        const matchesTitle = snippet.title.toLowerCase().includes(state.title ? state.title.toLowerCase() : "");
        const matchesLanguage = state.language ? snippet.language === state.language : true;
        const matchesUsecase = snippet.usecase.toLowerCase().includes(state.usecase ? state.usecase.toLowerCase() : "");

        return matchesTitle && matchesLanguage && matchesUsecase;
    });

    return (
        <>
            <h1 className="home-page-title text-white d-flex justify-content-center align-items-center my-4">
                Code Snippets
            </h1>

            <Container>
                <Accordion className="mb-4">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Search Filters</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <TextField
                                    id="code-title"
                                    label="Title:"
                                    value={state.title}
                                    onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
                                    placeholder="Enter the title of the code snippet"
                                />
                                <Dropdown
                                    id="code-language"
                                    label="Language:"
                                    value={state.language}
                                    onChange={(e) => dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })}
                                    options={programmingLanguages}
                                />
                                <TextField
                                    id="code-usecase"
                                    label="Description:"
                                    value={state.usecase}
                                    onChange={(e) => dispatch({ type: 'SET_USECASE', payload: e.target.value })}
                                    placeholder="Enter the description of the code snippet"
                                />
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Container>

            <section>
                {filteredSnippets.length > 0 ? (
                    filteredSnippets.map((snippet, index) => (
                        <RowData
                            key={index}
                            id={snippet.id}
                            title={snippet.title}
                            language={snippet.language}
                            code={snippet.code}
                            usecase={snippet.usecase}
                            deleteHandler={deleteSnippet}
                            filters={state}
                        />
                    ))
                ) : (
                    <p className="text-white fs-5 d-flex justify-content-center align-items-center">
                        🗒️ No snippets found.
                        <Link to="/add_codesnippet" className="ms-2">
                            Add some!
                        </Link>
                    </p>
                )}
                <Container>
                    <p>
                        You have a total of 
                        <strong> {snippets.length ?? 0} code snippets </strong> saved.
                    </p>
                </Container>
            </section>
        </>
    );
};

export default HomePage;
