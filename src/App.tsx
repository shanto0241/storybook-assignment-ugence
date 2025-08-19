import React, { useState } from 'react';
import './App.css';
import { InputField } from './components/InputField';
import { DataTable, Column } from './components/DataTable';

// Example data for DataTable
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
const columns: Column<User>[] = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
];
const initialData: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 28 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 34 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 22 },
];

function App() {
  const [inputValue, setInputValue] = useState('');
  const [tableData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  return (
    <div className="App" style={{ padding: 32, maxWidth: 800, margin: '0 auto' }}>
      <h2>InputField Demo</h2>
      <InputField
        label="Username"
        placeholder="Enter your username"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        helperText="Try the clear and password toggle!"
        clearable
        passwordToggle
        type="password"
        variant="outlined"
        size="md"
        style={{ marginBottom: 32 }}
      />

      <h2>DataTable Demo</h2>
      <DataTable<User>
        data={tableData}
        columns={columns}
        selectable
        onRowSelect={setSelectedRows}
      />
      <div style={{ marginTop: 16 }}>
        <strong>Selected Rows:</strong>
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
