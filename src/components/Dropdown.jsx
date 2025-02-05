import Form from 'react-bootstrap/Form';


const Dropdown = ({ id, name, label, value, onChange, options }) => (
    <Form.Group className='mb-3'>
        <Form.Label htmlFor={id}>{label}</Form.Label>
        <Form.Select id={id} name={name} value={value} onChange={onChange}>
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
