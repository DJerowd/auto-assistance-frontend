import { useState } from 'react';
import PropTypes from 'prop-types';

import '../../Styles/components/inputs.css';

export default function SearchInput({ value, onSearch, placeholder = "Search...", disabled = false, className = 'input input-search' }) {
    const [searchTerm, setSearchTerm] = useState(value || '');

    const handleSubmit = (e) => {
        onSearch(e.target.value);
    };

    return (
        <label className={className} >
            <input
                type="text"
                value={searchTerm}
                placeholder={placeholder}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e) }}
                disabled={disabled}
            />
            <div aria-label="Search" disabled={disabled}>
                <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                </svg>
            </div>
        </label>
    );
};

SearchInput.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    onSearch: PropTypes.func,
    placeholder: PropTypes.string,
    debounce: PropTypes.number,
    disabled: PropTypes.bool,
    className: PropTypes.string
};