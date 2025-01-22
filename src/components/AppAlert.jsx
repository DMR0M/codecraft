import React from 'react';
import { Alert, Button } from 'react-bootstrap';

const AppAlert = ({ showAlert, setShowAlert, alertVariant, alertContent,
                    alertTitle, hasButton, buttonText }) => {
    return (
        <>
            <Alert show={showAlert} variant={alertVariant}>
                <Alert.Heading className="text-center">
                    {alertTitle}
                </Alert.Heading>
                <p>{alertContent}</p>
                <div className="d-flex justify-content-center">
                    {hasButton ? 
                        <Button onClick={() => setShowAlert(false)} variant="outline-success">
                            {buttonText ?? ""}
                        </Button> 
                        : null
                    }
                </div>
            </Alert>
        </>
    );
}

export default AppAlert;
