import React, { useState } from 'react';
import styles from './DataTable.module.css';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

type SortState<T> = {
  column: Column<T> | null;
  direction: 'asc' | 'desc';
};

export function DataTable<T extends { [key: string]: any }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>({ column: null, direction: 'asc' });
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    setSort((prev) => {
      if (prev.column?.key === col.key) {
        return { column: col, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { column: col, direction: 'asc' };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sort.column) return data;
    const { dataIndex } = sort.column;
    return [...data].sort((a, b) => {
      if (a[dataIndex] < b[dataIndex]) return sort.direction === 'asc' ? -1 : 1;
      if (a[dataIndex] > b[dataIndex]) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sort]);

  const handleSelectRow = (idx: number) => {
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      if (onRowSelect) {
        onRowSelect(Array.from(newSet).map(i => sortedData[i]));
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    if (selected.size === sortedData.length) {
      setSelected(new Set());
      if (onRowSelect) onRowSelect([]);
    } else {
      const all = new Set(sortedData.map((_, i) => i));
      setSelected(all);
      if (onRowSelect) onRowSelect(sortedData);
    }
  };

  return (
    <div className={styles.dataTableWrapper}>
      <table className={styles.dataTable} aria-busy={loading}>
        <thead>
          <tr>
            {selectable && (
              <th>
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={selected.size === sortedData.length && sortedData.length > 0}
                  onChange={handleSelectAll}
                  disabled={loading || sortedData.length === 0}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                className={col.sortable ? styles.sortable : ''}
                aria-sort={
                  sort.column?.key === col.key
                    ? sort.direction === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : undefined
                }
                tabIndex={col.sortable ? 0 : -1}
                role={col.sortable ? 'button' : undefined}
              >
                {col.title}
                {col.sortable && sort.column?.key === col.key && (
                  <span className={styles.sortIcon}>{sort.direction === 'asc' ? '▲' : '▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className={styles.loadingCell}>
                Loading...
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className={styles.emptyCell}>
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, idx) => (
              <tr key={idx} className={selected.has(idx) ? styles.selectedRow : ''}>
                {selectable && (
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Select row ${idx + 1}`}
                      checked={selected.has(idx)}
                      onChange={() => handleSelectRow(idx)}
                      disabled={loading}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key}>{String(row[col.dataIndex])}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
