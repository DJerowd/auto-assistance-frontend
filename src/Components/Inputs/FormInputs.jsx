import React, { useState } from "react";
import PropTypes from 'prop-types';

import '../../Styles/components/inputs.css'
import '../../Styles/components/buttons.css'

export const TextInput = React.forwardRef( function TextInput(
    { id, label, type = "text", error, endAdornment, required = false, ...rest }, ref
) {
    const errorId = error ? `${id}-error` : undefined;
    return (
        <div className="form-group">
            <label htmlFor={id}> {label} {required && ' *'} </label>
            <input
                id={id}
                className="input ${error ? 'input-error' : ''}`"
                type={type}
                ref={ref}
                required={required}
                aria-describedby={errorId}
                {...rest}
            />
            {endAdornment && <div className="input-adornment">{endAdornment}</div>}
            {error && <p id={errorId} className="error-message">{error}</p>}
        </div>
    );
});
TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    error: PropTypes.string,
    endAdornment: PropTypes.node,
    required: PropTypes.bool,
};

export function PasswordInput(
    { id, label, required = false, error, ...rest }
) {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const EyeIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/></svg>;
    const EyeSlashIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/></svg>;
    return (
        <TextInput
            id={id}
            label={label}
            type={showPassword ? 'text' : 'password'}
            required={required}
            error={error}
            {...rest}
            endAdornment={
                <button
                    type="button"
                    className="btn btn-icon"
                    onClick={toggleShowPassword}
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                    {showPassword ? EyeSlashIcon : EyeIcon}
                </button>
            }
        />
    );
}
PasswordInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
};

export function SelectInput(
    { id, label, value, onChange, options, required = false, error, placeholder = 'Select...', optionLabel = 'label', optionValue = 'value', renderOption, ...rest }
) {
    const errorId = error ? `${id}-error` : undefined;
    return (
        <div className="form-group">
            <label htmlFor={id}> {label} {required && ' *'} </label>
            <select
                id={id}
                className={`select ${error ? 'input-error' : ''}`}
                value={value}
                onChange={onChange}
                required={required}
                aria-describedby={errorId}
                {...rest}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((opt, index) =>
                    renderOption 
                    ? ( renderOption(opt, index))
                    : ( <option key={opt[optionValue]} value={opt[optionValue]}> {opt[optionLabel]} </option> )
                )}
            </select>
            {error && <p id={errorId} className="error-message">{error}</p>}
        </div>
    );
}
SelectInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    required: PropTypes.bool,
    optionLabel: PropTypes.string,
    optionValue: PropTypes.string,
    renderOption: PropTypes.func
};

export const TextAreaInput = React.forwardRef(function TextAreaInput(
  { id, label, required = false, error, ...rest },
  ref
) {
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}{required && ' *'}</label>
      <textarea
        id={id}
        ref={ref}
        className={`input textarea ${error ? 'input-error' : ''}`}
        required={required}
        aria-describedby={errorId}
        {...rest}
      />
      {error && <p id={errorId} className="error-message">{error}</p>}
    </div>
  );
});

TextAreaInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
};