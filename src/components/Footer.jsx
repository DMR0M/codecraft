import React from 'react';
import { Container } from 'react-bootstrap';


const Footer = () => {
  return (
    <footer>
      <Container className="text-center mt-5">
        <p>
          Powered by <a href="https://emkc.org" target="_blank" rel="noopener noreferrer">PistonAPI</a>
        </p>
        <p>
          For more information about the API, visit <a href="https://piston.readthedocs.io/en/latest/api-v2/" target="_blank" rel="noopener noreferrer">PistonAPI Docs</a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
