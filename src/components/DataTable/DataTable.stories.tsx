import React, { useState } from 'react';
import { DataTable, Column } from './DataTable';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

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
  { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 22 },
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  render: (args) => <DataTable<User> {...args} />,
  args: {
    data,
    columns,
  },
};

export const Sortable: Story = {
  render: (args) => <DataTable<User> {...args} />,
  args: {
    data,
    columns,
  },
};

export const Selectable: Story = {
  render: (args) => {
    const [, setSelected] = useState<User[]>([]);
    return (
      <DataTable<User>
        {...args}
        selectable
        onRowSelect={setSelected}
        data={data}
        columns={columns}
      />
    );
  },
};

export const Loading: Story = {
  render: (args) => <DataTable<User> {...args} loading />,
  args: {
    data,
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  render: (args) => <DataTable<User> {...args} data={[]} />,
  args: {
    data: [],
    columns,
  },
};
