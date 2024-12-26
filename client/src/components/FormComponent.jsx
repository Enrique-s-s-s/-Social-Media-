import React, { useState } from 'react';

function FormComponent({ fields, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})); 
  };

  const formStyle = {
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(135deg, #f3f4f7, #e0e7ff)',
  };

  const inputStyle = {
    backgroundColor: '#f0f4f8',
    width: '100%',
    padding: '12px',
    marginTop: '8px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border 0.3s ease-in-out',
  };

  const inputFocusStyle = {
    border: '1px solid #6f42c1',
  };

  const labelStyle = {
    fontWeight: '600',
    fontSize: '16px',
    color: '#333',
    marginBottom: '6px',
    display: 'block',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#6f42c1',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s ease, transform 0.2s ease-in-out',
  };

  const buttonHoverStyle = {
    backgroundColor: '#5a36a2',
    transform: 'scale(1.05)',
  };

  const inputStylesWithFocus = {
    ...inputStyle,
    '&:focus': inputFocusStyle,
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {fields.map((field, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <label style={labelStyle}>{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              style={inputStyle}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              rows={field.rows || 4}
              required={field.required}
            ></textarea>
          ) : (
            <input
              type={field.type}
              style={inputStyle}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.required}
              onFocus={(e) => (e.target.style.border = inputFocusStyle.border)}
              onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
        onMouseDown={(e) => (e.target.style.transform = 'scale(1.02)')}
        onMouseUp={(e) => (e.target.style.transform = 'scale(1.05)')}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default FormComponent;
