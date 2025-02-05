import { useState } from 'react';
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
    const [formData, setFormData] = useState({
        title: '',
        code: '',
        language: '',
        usecase: '',
        tag: '',
        tags: [],
    });
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showTagAlert, setShowTagAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);

    console.log(formData);

    const handleSave = () => {
        const { title, code, language, usecase, tags } = formData;

        if (!title || !language || !usecase || !code || tags.length === 0) {
            setShowTagAlert(false);
            setShowWarningAlert(true);

            setTimeout(() => {
                setShowWarningAlert(false);
            }, 2500);
            return;
        }

        const id = uuidv4();
        const newSnippet = { id, ...formData, tags };

        const existingSnippets = store.get('snippets') || [];
        store.set('snippets', [newSnippet, ...existingSnippets]);

        // Reset formData
        setFormData({
            title: '',
            code: '',
            language: '',
            usecase: '',
            tag: '',
            tags: [],
        });
        setShowWarningAlert(false);
        setShowModal(true);
    };

    const handleTags = () => {
        if (formData.tags.length === 4) {
            setShowWarningAlert(false);
            setShowTagAlert(true);

            setTimeout(() => {
                setShowTagAlert(false);
            }, 2500);
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
                Add Code Snippet
            </h1>
            <section>
                <Container>
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
                    <Button className="m-2" variant="outline-light" onClick={handleTags}>
                        + Add Tag
                    </Button>
                    <Button className="m-3" variant="outline-danger" onClick={() => setFormData((prev) => ({ ...prev, tags: [] }))}>
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

                    <p>Write your code here: </p>
                    <CodeMirror
                        className="border rounded"
                        value={formData.code}
                        height="400px"
                        theme="dark"
                        extensions={[getLanguageExtension(formData.language.toLowerCase())]}
                        onChange={(value) =>
                            setFormData((prev) => ({ ...prev, code: value }))
                        }
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

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Added a Code Snippet</Modal.Title>
                </Modal.Header>
                <Modal.Body>Successfully created a new code snippet!</Modal.Body>
                <Modal.Footer>
                    <Link to="/">
                        <Button variant="success">OK</Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddPage;
