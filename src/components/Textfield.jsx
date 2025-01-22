import React from 'react';
import Form from 'react-bootstrap/Form';


const TextField = ({ id, as, label, value, onChange, rows, placeholder }) => (
    <Form.Group className='mb-3'>
        <Form.Label htmlFor={id}>{label}</Form.Label>
        <Form.Control
            type='text'
            id={id}
            as={as ?? 'input'}
            value={value}
            onChange={onChange}
            rows={rows ?? 1}
            placeholder={placeholder}
        />
    </Form.Group>
);

export default TextField;
