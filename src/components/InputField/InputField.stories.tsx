import React, { useState } from 'react';
import { InputField } from './InputField';
import type { Meta, StoryObj } from '@storybook/react-webpack5';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
  },
};
export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'This is a helper text',
    variant: 'outlined',
    size: 'md',
  },
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <InputField {...args} variant="filled" label="Filled" />
      <InputField {...args} variant="outlined" label="Outlined" />
      <InputField {...args} variant="ghost" label="Ghost" />
    </div>
  ),
  args: {
    placeholder: 'Type here...',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16 }}>
      <InputField {...args} size="sm" label="Small" />
      <InputField {...args} size="md" label="Medium" />
      <InputField {...args} size="lg" label="Large" />
    </div>
  ),
  args: {
    placeholder: 'Type here...',
  },
};

export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <InputField {...args} label="Disabled" disabled />
      <InputField {...args} label="Invalid" invalid errorMessage="Invalid input" />
      <InputField {...args} label="Loading" loading />
    </div>
  ),
  args: {
    placeholder: 'Type here...',
  },
};

export const WithClearButton: Story = {
  render: (args) => {
    const [value, setValue] = useState('Clear me');
    return (
      <InputField
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
        clearable
        label="Clearable"
      />
    );
  },
};

export const PasswordToggle: Story = {
  render: (args) => {
    const [value, setValue] = useState('password');
    return (
      <InputField
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
        passwordToggle
        type="password"
        label="Password"
      />
    );
  },
};
