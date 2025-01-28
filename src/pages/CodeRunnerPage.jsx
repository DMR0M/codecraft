import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import { Helmet } from "react-helmet";

import pistonLanguageVersions from "../utils/pistonAPILanguageVersions";


const CodeRunnerPage = () => {
  const location = useLocation();
  const { 
    id, 
    title = "", 
    code = "", 
    usecase = "", 
    validLanguage, 
    filterTags,
  } = location.state || {};

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const transformLanguage = (lang) => {
    if (lang === "C++") {
        return "cpp"
    };
    if (lang === "C#") {
        return "csharp"
    };
    return lang;
  };
  
  const languageForExecution = transformLanguage(validLanguage);

  const handleRunCode = async () => {
    setIsLoading(true);
    setError("");
    setOutput("");

    const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute";

    const pistonPayload = {
      language: languageForExecution.toLowerCase(),
      version: pistonLanguageVersions[languageForExecution.toLowerCase()],
      files: [
        {
          name: "main",
          content: code,
        },
      ],
      stdin: input,
    };

    try {
      const response = await fetch(PISTON_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pistonPayload),
      });

      if (!response.ok) {
        throw new Error("Error executing code: " + response.statusText);
      }

      const data = await response.json();
      const { run, stdout, stderr } = data;
      setOutput(run.output || stdout || stderr || "No output");
    } catch (err) {
      setError("An error occurred while executing your code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark-dimmed.min.css"
        />
      </Helmet>
      <Container className="my-5">
        <h1 className="text-center">Test the Code Snippet</h1>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Code (Read-Only):</Form.Label>
            <pre className={`code-view language-${languageForExecution} rounded`}>
              <code>{code || "No code available to display."}</code>
            </pre>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Input (Optional):</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Provide input data for your code..."
            />
          </Form.Group>
          <Container className="m-3">
            <Button
              variant="primary"
              onClick={handleRunCode}
              disabled={isLoading || !code}
            >
              {isLoading ? "Running..." : "Run Code"}
            </Button>
            <Link to={`/codesnippet_detail/${id}`} state={
                { 
                  id, 
                  title, 
                  language: validLanguage, 
                  usecase, 
                  code, 
                  filterTags, 
                }
              }>
              <Button className="m-3" variant="primary" size="lg">
                Back
              </Button>
            </Link>
          </Container>
        </Form>

        {output && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Output: </Form.Label>
              <Form.Control as="textarea" rows={10} value={output} readOnly />
            </Form.Group>
          </Form>
        )}

        {error && (
          <Alert className="mt-4" variant="danger">
            {error}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default CodeRunnerPage;
