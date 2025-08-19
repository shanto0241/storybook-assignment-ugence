import React, { useState, InputHTMLAttributes } from 'react';
import styles from './InputField.module.css';

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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
  type?: string;
  passwordToggle?: boolean;
}

const sizeClass = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

const variantClass = {
  filled: styles.filled,
  outlined: styles.outlined,
  ghost: styles.ghost,
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'md',
  loading = false,
  clearable = false,
  type = 'text',
  passwordToggle = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password' || passwordToggle;
  const inputType = isPassword && showPassword ? 'text' : type;

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onChange) {
      const event = {
        ...e,
        target: { value: '' },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div
      className={[
        styles.inputField,
        sizeClass[size],
        variantClass[variant],
        disabled ? styles.disabled : '',
        invalid ? styles.invalid : '',
        loading ? styles.loading : '',
      ].join(' ')}
    >
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={invalid}
          aria-label={label}
          {...rest}
        />
        {isPassword && passwordToggle && (
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
        {clearable && value && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            tabIndex={-1}
            aria-label="Clear input"
          >
            ×
          </button>
        )}
        {loading && <span className={styles.loader} aria-label="Loading..." />}
      </div>
      {helperText && !invalid && <div className={styles.helperText}>{helperText}</div>}
      {invalid && errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default InputField;
