import PropTypes from 'prop-types';
import '../Styles/assets/loading.css'
export default function LoadingSpinner({ width = "100%", height = "100%" }) {
  return (
    <div className="loader-bg" style={{ width: `${width}`, height: `${height}` }}>
      <div className="loader"></div>
    </div>
  );
}
LoadingSpinner.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}