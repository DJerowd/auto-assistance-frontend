import PropTypes from 'prop-types';
import LoadingSpinner from '../assets/LoadingSpinner.jsx'; // ou o ícone que estiver usando

const VehicleImage = ({ imageUrl, alt = "Image", width = 320, height = 180 }) => {
  return (
    <div className="vehicle-image" style={{ width: `${width}px`, height: `${height}px` }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt}
        />
      ) : (
        <LoadingSpinner style={{ width: `${width}px`, height: `${height}px` }} />
      )}
      <p>{alt}</p>
    </div>
  );
};

VehicleImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default VehicleImage;
