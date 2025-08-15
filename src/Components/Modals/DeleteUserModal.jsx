import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getLoggedInUser } from '../../utils/auth';
import { useDeleteUser } from '../../Hooks/useUser';
import { PasswordInput } from '../Inputs/FormInputs';

import '../../Styles/components/modal.css';

export default function DeleteUserModal({ isOpen, onClose, onSuccess }) {
  const { deleteUser, loading, error, success } = useDeleteUser();
  const [formData, setFormData] = useState({ password: '' });
  const loggedInUser = getLoggedInUser();

  useEffect(() => {
    if (success) { onSuccess(); }
  }, [success, onClose, onSuccess]);

  const handleDelete = async () => {
    try {
      await deleteUser(loggedInUser.user.id);
    } catch {
      // 
    }
  };

  if (!isOpen) return null;

  return (
    <div className='modal-bg' onClick={onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>

        <div className='modal-header'>
          <h2 className='modal-title'>Confirm Deletion</h2>
          <button className='btn btn-close' type='button' onClick={onClose}>×</button>
        </div>

        <p>Are you sure you want to delete this user?</p>

        {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}

        <div className='form-group'>
          <label htmlFor='name'>Confirm your password</label>
          <input
              id='password'
              className='input'
              type='password'
              placeholder=''
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
          />
        </div>

        <PasswordInput
          id="password"
          label="Confirm your password"
          placeholder="Enter your current Password (Mandatory)"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
        />
        
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

DeleteUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
}