# UDS Assignment Components

This project contains two reusable, scalable React components built with TypeScript and modern best practices:

- **InputField**: A flexible input component with validation, variants, sizes, clear button, and password toggle.
- **DataTable**: A data table with sorting, row selection, loading, and empty states.

## Components Overview

### InputField
A customizable input component supporting:
- Label, placeholder, helper text, error message
- States: disabled, invalid, loading
- Variants: filled, outlined, ghost
- Sizes: small, medium, large
- Optional: clear button, password toggle
- Accessibility (ARIA labels)
- Light & dark theme ready (customize CSS)

**Props:**
```ts
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  clearable?: boolean;
  passwordToggle?: boolean;
  type?: string;
}
```

### DataTable
A generic, typed table component supporting:
- Display of tabular data
- Column sorting (click header)
- Row selection (single/multiple)
- Loading and empty states
- Accessibility (ARIA)

**Props:**
```ts
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}
```

## Usage Example

Import and use in your app:
```tsx
import { InputField } from './components/InputField';
import { DataTable } from './components/DataTable';

// InputField
<InputField
  label="Username"
  placeholder="Enter username"
  clearable
  passwordToggle
  variant="outlined"
  size="md"
/>

// DataTable
const columns = [
  { key: 'id', title: 'ID', dataIndex: 'id', sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
];
const data = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
<DataTable data={data} columns={columns} selectable />
```

## Storybook
Run Storybook to view and interact with components:
```bash
npm run storybook
```

## Testing
Run all tests:
```bash
npm test -- --watchAll=false
```

## Project Scripts
- `npm start` – Start the development server
- `npm run build` – Build for production
- `npm run storybook` – Launch Storybook
- `npm test` – Run tests

---

For more details, see the source code in `src/components/InputField` and `src/components/DataTable`.
