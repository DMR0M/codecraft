import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container, Button, Modal, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/Navbar-logo.png';

import { useAuth } from '../contexts/AuthContext';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleLogoutModal = () => setLogoutModal(true);

  const handleLogout = () => {
    setLogoutModal(false);
    logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container fluid>
        <Navbar.Brand as="div" className="ms-0 text-white">
          <Link to="/" className="navbar-title d-flex align-items-center">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <span>CodeCraft</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">

            {/* Conditionally render only if logged in */}
            {isAuthenticated && (
              <>
                <Nav.Item>
                  <Link to="/" className="nav-link text-white">
                    View Code Snippets
                  </Link>
                </Nav.Item>

                <Nav.Item>
                  <Link to="/add_codesnippet" className="nav-link text-white">
                    Add Code Snippet
                  </Link>
                </Nav.Item>
              </>
            )}

            <Nav.Item>
              <Link to="/about" className="nav-link text-white">
                About Me
              </Link>
            </Nav.Item>
          </Nav>

          <Nav.Item>
            <Button variant="link" className="text-white nav-link" onClick={handleShow}>
              How to Use
            </Button>
          </Nav.Item>

          {isAuthenticated && (
            <Nav.Item>
              <Button variant="link" className="text-white nav-link" onClick={handleLogoutModal}>
                Logout
              </Button>
            </Nav.Item>
          )}
          {/* Confirmation Logout Modal */}
          <Modal show={logoutModal} onHide={() => setLogoutModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <strong> Are you sure you want to logout? </strong>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={() => setLogoutModal(false)}>
                      No
                  </Button>
                  <Button variant="secondary" onClick={handleLogout}>
                      Yes
                  </Button>
              </Modal.Footer>
          </Modal>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>How to Use CodeCraft</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ul>
                <li>
                  <strong>View Code Snippets:</strong><br />
                  Browse saved code snippets in the "View Code Snippet" page. You can use the
                  search filters to easily find the snippet you are looking for.
                </li>
                <br />
                <li>
                  <strong>Add a Snippet:</strong><br />
                  Navigate to "Add Code Snippet" to create a new code snippet entry.
                </li>
                <br />
                <li>
                  <strong>Manage Snippets:</strong><br />
                  In the "View Code Snippet" page, select a code snippet entry to view, edit, or
                  delete it.
                </li>
                <br />
                <li>
                  <strong>Run Code Snippets:</strong><br />
                  After selecting "view" for a code snippet entry, click "Execute Code" button,
                  then click the "Run Code" button.
                </li>
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
