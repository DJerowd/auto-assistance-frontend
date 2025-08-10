import PropTypes from 'prop-types';

export default function ActionButton({ label, onClick, disabled = false, style = {}, type = 'button', className = '' }) {
  return (
    <button
      className={`btn btn-action ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={style}
    >
      {label}
    </button>
  );
}

ActionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.string,
  className: PropTypes.string
};