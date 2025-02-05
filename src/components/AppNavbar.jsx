import { Link } from 'react-router-dom';
import { Container, Button, Modal, Nav, Navbar } from 'react-bootstrap';
import logo from '../assets/navbar-logo.png';


const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Navbar expand="lg" className="bg-primary">
      <Container fluid>
        <Navbar.Brand as="div" className="ms-0 text-white">
          <Link to="/" className="navbar-title d-flex align-items-center">
            <img
              src={logo}
              alt="Logo"
              className="navbar-logo"
            />
            {/* WebApp Name */}
            <span>CodeCraft</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Home Page */}
            <Nav.Item>
              <Link to="/" className="nav-link text-white">
                View Code Snippets
              </Link>
            </Nav.Item>

            {/* Add Code Snippet Page */}
            <Nav.Item>
              <Link to="/add_codesnippet" className="nav-link text-white">
                Add Code Snippet
              </Link>
            </Nav.Item>

            {/* About Page */}
            <Nav.Item>
              <Link to="/about" className="nav-link text-white">
                About Me
              </Link>
            </Nav.Item>
          </Nav>

          {/* How To Use */}
          <Nav.Item>
              <Button variant="link" className="text-white nav-link" onClick={handleShow}>
                How to Use
              </Button>
            </Nav.Item>

            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>How to Use CodeCraft</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul>
                  <li><strong>View Code Snippets:</strong><br/> 
                    Browse saved code snippets in the "View Code Snippet" page. 
                    You can use the search filters to easily find the snippet you are looking for.
                  </li><br/> 
                  <li><strong>Add a Snippet:</strong><br/> 
                    Navigate to "Add Code Snippet" to create a new code snippet entry.
                  </li><br/> 
                  <li><strong>Manage Snippets:</strong><br/> 
                    In the "View Code Snippet" page, select a code snippet entry to view, edit, or delete it.
                  </li><br/> 
                  <li><strong>Run Code Snippets:</strong><br/> 
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