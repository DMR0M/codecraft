import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Row, Col, Modal, Stack } from 'react-bootstrap';

import AppBadge from './AppBadge';


const RowData = ({ id, title, language, code, usecase, filterTags: tags, deleteHandler, filters: filterState }) => {
    const [showModal, setShowModal] = useState(false);

    const handleDelete = () => {
        deleteHandler(id);
        setShowModal(false);
    };

    return (
        <>
            <Container className="bg-primary rounded border my-4 p-3">
                {/* Header Row */}
                <Row className="mb-2 text-white">
                    <Col xs={4} sm={3} md={2}>Title:</Col>
                    <Col xs={4} sm={3} md={2}>Language:</Col>
                    <Col xs={4} sm={3} md={2}>Description:</Col>
                    <Col xs={4} sm={3} md={2}></Col>
                    <Col xs={4} sm={3} md={2}></Col>
                    <Col xs={4} sm={3} md={2}></Col>
                </Row>

                {/* Data Row */}
                <Row>
                    <Col xs={4} sm={3} md={2} className="mb-3">{title}</Col>
                    <Col xs={4} sm={3} md={2} className="mb-2">{language}</Col>
                    <Col xs={4} sm={3} md={2} className="mb-2">{usecase}</Col>
                    <Col xs={4} sm={3} md={2} className="d-flex justify-content-center align-items-center">
                        <Link
                            to={`/codesnippet_detail/${id}`}
                            state={{ id, title, language, code, usecase, filterTags: tags, filters: filterState }}
                        >
                            <Button variant="outline-secondary" size="sm">View</Button>
                        </Link>
                    </Col>

                    <Col xs={4} sm={3} md={2} className="d-flex justify-content-center align-items-center">
                        <Link
                            to={`/update_codesnippet/${id}`}
                            state={{ id, title, language, code, usecase, filterTags: tags, filters: filterState }}
                        >
                            <Button variant="outline-warning" size="sm">Edit</Button>
                        </Link>
                    </Col>
                    <Col xs={4} sm={3} md={2} className="d-flex justify-content-center align-items-center">
                        <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => setShowModal(true)}
                        >
                            Delete
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4 text-white">
                    <Col xs={2} sm={1} md={1}>Tags:</Col>
                    <Col xs={2} sm={1} md={1}>
                        <Stack direction="horizontal" gap={2}>
                            {tags.map((tag, i) => (
                                <AppBadge 
                                    key={i}
                                    bgColor="light" 
                                    txtColor="dark" 
                                    text={tag}
                                />
                            ))}
                        </Stack>
                    </Col>
                </Row>
            </Container>

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete the code snippet: <strong>{title}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RowData;
