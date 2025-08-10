import PropTypes from 'prop-types';

export default function FilterSelect({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = 'select select-filter'
}) {
  return (
    <select className={className} value={value} onChange={onChange}>
      <option value=''>{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value ?? opt} value={opt.value ?? opt}>
          {opt.label ?? opt}
        </option>
      ))}
    </select>
  );
}

FilterSelect.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string
      })
    ])
  ).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string
};