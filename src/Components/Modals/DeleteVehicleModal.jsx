import { useState } from 'react';
import { useDeleteVehicle } from '../../Hooks/useVehicle';
import '../../Styles/components/modal.css';
import PropTypes from 'prop-types';

export default function DeleteVehicleModal({ isOpen, onClose, vehicleIds, onSuccess, message }) {
  const { deleteVehicle } = useDeleteVehicle();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const ids = Array.isArray(vehicleIds) ? vehicleIds : [vehicleIds];

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      for (const id of ids) {
        await deleteVehicle(id);
      }
      setLoading(false);
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Error deleting. Try again.');
      setLoading(false);
    }
  };

  return (
    <div className='modal-bg' onClick={onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>

        <div className='modal-header'>
          <h2 className='modal-title'>Confirm Deletion</h2>
          <button className='btn btn-close' type='button' onClick={onClose}>×</button>
        </div>

        <p>{message || (ids.length > 1
          ? `Are you sure you want to delete ${ids.length} vehicle(s) selected?`
          : 'Are you sure you want to delete this vehicle?')}
        </p>

        {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}
        
        <div className='modal-actions'>
          <button className='btn btn-cancel' onClick={onClose}>Cancel</button>
          <button className='btn btn-save' style={{ background: 'var(--color-error)' }} onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>

      </div>
    </div>
  );
} 

DeleteVehicleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  vehicleIds: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  onSuccess: PropTypes.func,
  message: PropTypes.string
}