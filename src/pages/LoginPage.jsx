import React, { useState } from "react";
import { Container, Button, Modal, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import TextField from "../components/Textfield";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const handleLogin = async () => {
    const { username, password } = formData;

    if (!username || !password) {
      setError("Both fields are required to log in.");
      return;
    }

    const res = await login(username.toLowerCase(), password);
    if (res.success) {
      setShowModal(true);
      // Auto close modal and redirect after 1.5 seconds
      setTimeout(() => {
        setShowModal(false);
        navigate("/");
      }, 1500);
    } else {
      setError(res.message);
    }
  };

  return (
    <>
      <h1 className="home-page-title text-white d-flex justify-content-center align-items-center my-4">
        Login To CodeCraft
      </h1>
      <Container className="my-3">
        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}

        <TextField
          id="username"
          name="username"
          label="Username: "
          value={formData.username}
          onChange={handleFormChange}
          placeholder="Enter your username"
        />

        <TextField
          type="password"
          id="password"
          name="password"
          label="Password: "
          value={formData.password}
          onChange={handleFormChange}
          placeholder="Enter your password"
        />

        <p>If you don't have an account yet click <strong>Sign Up</strong></p>
      </Container>

      <Container className="my-4 d-flex justify-content-end">
        <Button className="m-3" variant="outline-success" size="lg" onClick={handleLogin}>
          Sign In
        </Button>
        <Link to="/register">
          <Button className="m-3" variant="outline-light" size="lg">
            Sign Up
          </Button>
        </Link>
      </Container>

      {/* Modal shows briefly on success then auto redirects */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Welcome ${formData.username}!`}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => {
            setShowModal(false);
            navigate("/");
          }}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginPage;
