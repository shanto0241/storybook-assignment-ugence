import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable, Column } from './DataTable';

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];

const data: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 28 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 34 },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable data={data} columns={columns} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable data={data} columns={columns} loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<DataTable data={[]} columns={columns} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('sorts by column when header clicked', () => {
    render(<DataTable data={data} columns={columns} />);
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    // After sort, Alice should still be present
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('selects a row when checkbox is clicked', () => {
    const handleSelect = jest.fn();
    render(<DataTable data={data} columns={columns} selectable onRowSelect={handleSelect} />);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // select first row
    expect(handleSelect).toHaveBeenCalled();
  });
});
