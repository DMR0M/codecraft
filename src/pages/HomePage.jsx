import { useState, useEffect, useReducer } from 'react';
import { Accordion, Container, Form, Row, Button, Stack } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RowData from '../components/RowData';
import TextField from '../components/Textfield';
import Dropdown from '../components/Dropdown';
import AppBadge from '../components/AppBadge';
import AppAlert from '../components/AppAlert';
import programmingLanguages from '../utils/progLanguages';
import filterReducer from '../utils/filterReducer';
import { useAuth } from '../contexts/AuthContext';   // Correct for named exports

const initialState = {
    title: '',
    language: '',
    usecase: '',
    tags: [],
};

const HomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();
    const { token, isAuthenticated, loading } = auth;
    const [snippets, setSnippets] = useState([]);
    const [state, dispatch] = useReducer(filterReducer, location.state?.filters || initialState);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [showTagAlert, setShowTagAlert] = useState(false);

    // ✅ Wait for loading to finish before redirecting if not authenticated
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
        }
    }, [loading, isAuthenticated, navigate]);

    // ✅ Fetch snippets only if authenticated and not loading
    useEffect(() => {
        if (!token || loading) return;

        const fetchSnippets = async () => {
            try {
                console.log('API base URL:', import.meta.env.VITE_API_BASE_URL);
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/snippets`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch snippets');
                const data = await response.json();
                setSnippets(data);
            } catch (error) {
                console.error(error.message);
                navigate('/login');
            }
        };

        fetchSnippets();
    }, [token, loading, navigate]);

    const deleteSnippet = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/snippets/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the snippet');
            }
    
            // Remove snippet from UI only after successful deletion
            const updatedSnippets = snippets.filter((snippet) => snippet._id !== id);
            setSnippets(updatedSnippets);
        } catch (error) {
            console.error(error.message);
            alert('❌ Error deleting snippet. Please try again.');
        }
    };

    const filteredSnippets = snippets.filter((snippet) => {
        const matchesTitle = snippet.title.toLowerCase().includes(state.title?.toLowerCase() ?? "");
        const matchesLanguage = state.language ? snippet.language === state.language : true;
        const matchesUsecase = snippet.usecase.toLowerCase().includes(state.usecase?.toLowerCase() ?? "");
        const matchesTags = tags.length !== 0 ? tags.some((tag) => snippet.tags.includes(tag)) : true;
        return matchesTitle && matchesLanguage && matchesUsecase && matchesTags;
    });

    const handleTags = () => {
        if (tags.length === 4) {
            setShowTagAlert(true);
            setTimeout(() => setShowTagAlert(false), 2500);
            return;
        }

        if (tag.trim()) {
            setTags([...tags, tag.trim()]);
            setTag('');
        }
    };

    // ✅ Optional: Show loading state while checking auth
    if (loading) {
        return (
            <div className="text-white text-center mt-5">
                Checking authentication...
            </div>
        );
    }

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
                                    label="Search by title:"
                                    value={state.title}
                                    onChange={(e) => dispatch({ type: 'SET_TITLE', payload: e.target.value })}
                                    placeholder="Enter the title of the code snippet"
                                />
                                <Dropdown
                                    id="code-language"
                                    label="Search by language:"
                                    value={state.language}
                                    onChange={(e) => dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })}
                                    options={programmingLanguages}
                                />
                                <TextField
                                    id="code-usecase"
                                    label="Search by description:"
                                    value={state.usecase}
                                    onChange={(e) => dispatch({ type: 'SET_USECASE', payload: e.target.value })}
                                    placeholder="Enter the description of the code snippet"
                                />
                                <Row>
                                    <TextField
                                        id="code-tags"
                                        label="Search by tags:"
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
                                        hasButton={false}
                                        buttonText=""
                                        showAlert={showTagAlert}
                                        setShowAlert={setShowTagAlert}
                                    />
                                )}
                                <Button className="m-2" variant="outline-light" onClick={() => {
                                    handleTags();
                                    dispatch({ type: 'SET_TAG', payload: tags });
                                }}>
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
                                                hasCloseBtn={false}
                                            />
                                        ))}
                                    </Stack>
                                </Row>
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
                            id={snippet._id}
                            title={snippet.title}
                            language={snippet.language}
                            code={snippet.code}
                            usecase={snippet.usecase}
                            filterTags={snippet.tags}
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
                        {filteredSnippets.length === snippets.length
                            ? <>You have a total of <strong>{snippets.length}</strong> code snippet(s).</>
                            : <>Found <strong>{filteredSnippets.length}</strong> code snippet(s).</>
                        }
                    </p>
                </Container>
            </section>
        </>
    );
};

export default HomePage;
