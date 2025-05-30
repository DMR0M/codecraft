import React, { useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import TextField from '../components/Textfield';
import AppAlert from '../components/AppAlert';
import { useAuth } from '../contexts/AuthContext'; // added

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showAlert, setShowAlert] = useState(false);
  const [showPasswordAlert, setShowPasswordAlert] = useState(false);
  const [showConfirmPasswordAlert, setShowConfirmPasswordAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(""); // for backend error handling

  const { register } = useAuth(); // AuthContext function

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setError("");
  };

  const handleRegister = async () => {
    // All fields are required validation
    if (!Object.values(formData).every(input => input)) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);
      return;
    }

    // Password validation
    if (formData.password.length < 8) {
      setShowPasswordAlert(true);
      setTimeout(() => setShowPasswordAlert(false), 2500);
      return;
    }

    // Confirm Password validation
    if (formData.confirmPassword !== formData.password) {
      setShowConfirmPasswordAlert(true);
      setTimeout(() => setShowConfirmPasswordAlert(false), 2500);
      return;
    }

    // Register call
    const res = await register(formData.username.toLowerCase(), formData.email.toLowerCase(), formData.password);
    if (res.success) {
      setShowModal(true);
    } else {
      setError(res.message); // show backend error
    }
  };

  return (
    <>
      <h1 className="home-page-title text-white d-flex justify-content-center align-items-center my-4">
        Create An Account
      </h1>
      <Container className="my-3">
        {/* Alert: Fill in all fields */}
        {showAlert && (
          <AppAlert
            alertTitle=""
            alertVariant="danger"
            alertContent="⚠️ Please fill in all fields!"
            hasButton={false}
            buttonText=""
            showAlert={showAlert}
            setShowAlert={setShowAlert}
          />
        )}
        {/* Alert: Backend error */}
        {error && (
          <AppAlert
            alertTitle=""
            alertVariant="danger"
            alertContent={`❌ ${error}`}
            hasButton={false}
            buttonText=""
            showAlert={!!error}
            setShowAlert={setError}
          />
        )}
        <TextField
          id="username"
          name="username"
          label="Username: "
          value={formData.username}
          onChange={handleFormChange}
          placeholder="Enter your username"
          addText="Please provide a unique username"
        />
        <TextField
          id="email"
          name="email"
          label="Email: "
          value={formData.email}
          onChange={handleFormChange}
          placeholder="Enter your email"
          addText="Please provide a unique email address"
        />
        <TextField
          type="password"
          id="password"
          name="password"
          label="Password: "
          value={formData.password}
          onChange={handleFormChange}
          placeholder="Enter your password"
          addText="Please provide a password with at least 8 characters"
        />
        {/* Alert: Password too short */}
        {showPasswordAlert && (
          <AppAlert
            alertTitle=""
            alertVariant="warning"
            alertContent="⚠️ Password must be at least 8 characters long!"
            hasButton={false}
            buttonText=""
            showAlert={showPasswordAlert}
            setShowAlert={setShowPasswordAlert}
          />
        )}
        <TextField
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password: "
          value={formData.confirmPassword}
          onChange={handleFormChange}
          placeholder="Enter your password again"
        />
        {/* Alert: Passwords don't match */}
        {showConfirmPasswordAlert && (
          <AppAlert
            alertTitle=""
            alertVariant="warning"
            alertContent="⚠️ Password does not match!"
            hasButton={false}
            buttonText=""
            showAlert={showConfirmPasswordAlert}
            setShowAlert={setShowConfirmPasswordAlert}
          />
        )}
      </Container>

      <Container className="my-4 d-flex justify-content-end">
        <Button className="m-3" variant="outline-success" size="lg" onClick={handleRegister}>
          Create My Account
        </Button>
        <Link to="/login">
          <Button className="m-3" variant="outline-danger" size="lg">
            Back
          </Button>
        </Link>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>Successfully registered your account!</Modal.Body>
        <Modal.Footer>
          <Link to="/login">
            <Button variant="success">OK</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterPage;
