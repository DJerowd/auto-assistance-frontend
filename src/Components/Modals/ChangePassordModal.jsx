import { useState } from 'react';
import PropTypes from 'prop-types';

import { PasswordInput } from '../Inputs/FormInputs';

import '../../Styles/components/modal.css';

export default function ChangePassordModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({ newPassword: '', confirmNewPassword: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSuccess()
    };

    if (!isOpen) return null;

    return (
        <div className='modal-bg' onClick={() => onClose()}>
            <form className='modal-content' onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>

                <div className='modal-header'>
                    <h2 className='modal-title'>Change Password</h2>
                    <button className='btn btn-close' type='button' onClick={() => onClose()}>×</button>
                </div>

                <PasswordInput
                    id="newPassword"
                    label="New Password"
                    placeholder=""
                    value={formData.newPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                    required
                />

                <PasswordInput
                    id="confirmNewPassword"
                    label="Confirm New Password"
                    placeholder=""
                    value={formData.confirmNewPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
                    required
                />

                <PasswordInput
                    id="password"
                    label="Confirm your password"
                    placeholder="Enter your current Password (Mandatory)"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                />

                <div className='modal-actions'>
                    <button type='button' className='btn btn-cancel' onClick={() => onClose()}>
                        Cancel
                    </button>
                    <button type='submit' className='btn btn-save'>
                        Save
                    </button>
                </div>
                
            </form>
        </div>
    );
} 

ChangePassordModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func
};