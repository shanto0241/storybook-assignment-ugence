import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

describe('InputField', () => {
  it('renders with label and placeholder', () => {
    render(<InputField label="Test Label" placeholder="Test Placeholder" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<InputField label="Test" onChange={handleChange} />);
    const input = screen.getByLabelText('Test');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows error message when invalid', () => {
    render(<InputField label="Test" invalid errorMessage="Error!" />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });
});
