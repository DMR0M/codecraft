import React from 'react';
import Form from 'react-bootstrap/Form';


const Dropdown = ({ id, label, value, onChange, options }) => (
    <Form.Group className='mb-3'>
        <Form.Label htmlFor={id}>{label}</Form.Label>
        <Form.Select id={id} value={value} onChange={onChange}>
            <option value=''>Select a language</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </Form.Select>
    </Form.Group>
);

export default Dropdown;
