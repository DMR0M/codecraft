import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Button, Modal, Row, Stack } from 'react-bootstrap';
import CodeMirror from "@uiw/react-codemirror";
import axios from 'axios';

import TextField from '../components/Textfield';
import Dropdown from '../components/Dropdown';
import AppAlert from '../components/AppAlert';
import AppBadge from '../components/AppBadge';
import programmingLanguages from '../utils/progLanguages';
import getLanguageExtension from '../utils/getLanguageExtension';

const UpdatePage = () => {
    const location = useLocation();

    const {
        id,
        title: initialTitle,
        language: initialLanguage,
        code: initialCode,
        usecase: initialUsecase,
        filterTags,
        filters
    } = location.state;

    const [formData, setFormData] = useState({
        title: initialTitle || '',
        language: initialLanguage || '',
        code: initialCode || '',
        usecase: initialUsecase || '',
        tag: '',
        tags: [...filterTags],
    });

    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showTagAlert, setShowTagAlert] = useState(false);

    const handleUpdate = async () => {
        const { title, language, code, usecase, tags } = formData;

        if (!title || !language || !usecase || !code || tags.length === 0) {
            setShowTagAlert(false);
            setShowWarningAlert(true);
            setTimeout(() => setShowWarningAlert(false), 1500);
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Get the stored token

            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/api/update-snippet/${id}`,
                {
                    title,
                    language,
                    code,
                    usecase,
                    tags,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token in header
                    },
                }
            );

            if (response.status === 200) {
                setShowWarningAlert(false);
                setShowModal(true);
            }
        } catch (err) {
            console.error("Error updating snippet:", err);
            alert("Failed to update snippet. Please try again.");
        }
    };

    const handleTags = () => {
        if (formData.tags.length === 4) {
            setShowWarningAlert(false);
            setShowTagAlert(true);
            setTimeout(() => setShowTagAlert(false), 2500);
            return;
        }

        if (formData.tag.trim()) {
            setFormData((prev) => ({
                ...prev,
                tags: [...prev.tags, prev.tag.toLowerCase()],
                tag: '',
            }));
        }
    };

    const handleTagClick = (tagText) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagText),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            <h1 className="home-page-title text-white d-flex justify-content-center align-items-center my-4">
                Update Code Snippet
            </h1>
            <section>
                <Container>
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

                    <TextField
                        id="code-title"
                        name="title"
                        label="Title:"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter the title of the code snippet"
                    />
                    <Dropdown
                        id="code-language"
                        name="language"
                        label="Language:"
                        value={formData.language}
                        onChange={handleChange}
                        options={programmingLanguages}
                    />
                    <TextField
                        id="code-usecase"
                        name="usecase"
                        label="Description:"
                        value={formData.usecase}
                        onChange={handleChange}
                        placeholder="Enter the description of the code snippet"
                        as="textarea"
                        rows={2}
                    />

                    <Row>
                        <TextField
                            id="code-tags"
                            name="tag"
                            label="Tags:"
                            value={formData.tag}
                            onChange={handleChange}
                            placeholder="Update tags for code snippet"
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
                    <Button
                        className="m-3"
                        variant="outline-danger"
                        onClick={() =>
                            setFormData((prev) => ({
                                ...prev,
                                tags: [],
                            }))
                        }
                    >
                        Reset Tags
                    </Button>

                    <Row className="my-2">
                        <Stack className="m-2" direction="horizontal" gap={2}>
                            {formData.tags.map((tag, i) => (
                                <AppBadge
                                    key={i}
                                    bgColor="light"
                                    txtColor="dark"
                                    text={tag}
                                    hasCloseBtn={true}
                                    btnClickHander={() => handleTagClick(tag)}
                                />
                            ))}
                        </Stack>
                    </Row>

                    <p>Update your code here:</p>
                    <CodeMirror
                        className="border rounded"
                        value={formData.code}
                        height="400px"
                        theme="dark"
                        extensions={[getLanguageExtension(formData.language.toLowerCase())]}
                        onChange={(value) =>
                            setFormData((prev) => ({
                                ...prev,
                                code: value,
                            }))
                        }
                    />
                </Container>
            </section>

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
