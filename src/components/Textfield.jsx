import React from 'react';
import Form from 'react-bootstrap/Form';


const TextField = ({ id, name, as, label, value, onChange, rows, addText, placeholder }) => (
    <Form.Group className='mb-3'>
        <Form.Label htmlFor={id}>{label}</Form.Label>
        <Form.Control
            type='text'
            name={name}
            id={id}
            as={as ?? 'input'}
            value={value}
            onChange={onChange}
            rows={rows ?? 1}
            placeholder={placeholder}
        />
        <Form.Text className="mt-2">
            {addText}
        </Form.Text>
    </Form.Group>
);

export default TextField;
