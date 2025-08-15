import { useEffect, useState } from 'react';
import { getLoggedInUser } from '../../utils/auth';
import PropTypes from 'prop-types';

import { useUpdateUser } from '../../Hooks/useUser';

import '../../Styles/components/modal.css';
import '../../Styles/components/buttons.css'
import { PasswordInput, TextInput } from '../Inputs/FormInputs';

export default function EditUserModal({ isOpen, onClose, onSuccess }) {
    const loggedInUser = getLoggedInUser();
    const { updateUser, loading, error, success } = useUpdateUser();
    const [formData, setFormData] = useState({ name: loggedInUser.user.name || '', email: loggedInUser.user.email || '', password: '' });

    useEffect(() => {
        if (success) { onSuccess(); }
    }, [success, onClose, onSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(loggedInUser.user.id, formData);
        } catch {
            // 
        }
    };

    if (!isOpen) return null;

    return (
        <div className='modal-bg' onClick={() => onClose()}>
            <form className='modal-content' onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>

                <div className='modal-header'>
                    <h2 className='modal-title'>Edit User</h2>
                    <button className='btn btn-close' type='button' onClick={() => onClose()}>×</button>
                </div>

                <TextInput
                    id="name"
                    label="Username"
                    placeholder=""
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                />

                <TextInput
                    id="email"
                    label="Email"
                    placeholder=""
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                />

                <PasswordInput
                    id="password"
                    label="Confirm your password"
                    placeholder="Current Password (Mandatory)"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                />

                {error && <p className='text-error'>{error}</p>}

                <div className='modal-actions'>
                    <button type='button' className='btn btn-cancel' onClick={() => onClose()}>
                        Cancel
                    </button>
                    <button type='submit' className='btn btn-save' disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
                
            </form>
        </div>
    );
} 

EditUserModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func
};