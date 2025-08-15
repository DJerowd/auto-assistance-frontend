import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useAddReminder, useUpdateReminder  } from '../../Hooks/useMaintenance';
import { SelectInput, TextInput } from '../Inputs/FormInputs';
import LoadingSpinner from '../../assets/LoadingSpinner';

import '../../Styles/components/modal.css';
import '../../Styles/components/buttons.css';

const INITIAL_FORM_STATE = { vehicle_id: '', title: '', description: '', type: 'km', km_target: '', days_target: '', last_km_record: '', last_maintenance_date: '' };

export default function ManageReminderModal({ isOpen, onClose, onSuccess, editingReminder, vehicles }) {
    const { addReminder, loading: createLoading, error:createError, /*success:createSucess*/ } = useAddReminder();
    const { updateReminder, loading: updateLoading, error:updateError, /*success:updateSucess*/ } = useUpdateReminder();
    const [formData, setFormData] = useState(INITIAL_FORM_STATE);

    useEffect(() => {
        if (isOpen) {
            if (editingReminder) {
                setFormData({ vehicle_id: editingReminder.vehicle_id, title: editingReminder.title, description: editingReminder.description, type: editingReminder.type, km_target: editingReminder.km_target || '', days_target: editingReminder.days_target || '', last_km_record: editingReminder.last_km_record || '', last_maintenance_date: editingReminder.last_maintenance_date ? editingReminder.last_maintenance_date.split('T')[0] : '' });
            } else {
                setFormData(INITIAL_FORM_STATE);
            }
        }
    }, [isOpen, editingReminder]);

    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = editingReminder ? await updateReminder(editingReminder.id, formData) : await addReminder(formData);
        if (result) onSuccess();
    };
  
    const isSubmitting = createLoading || updateLoading;
    const submissionError = createError || updateError;
    
    if (!isOpen) return null;

    return (
        <div className='modal-bg' onClick={onClose}>
            <form className='modal-content' onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>

                <div className='modal-header'>
                    <h2 className='modal-title'>{editingReminder ? 'Edit Reminder' : 'Add New Reminder'}</h2>
                    <button className='btn btn-close' type='button' onClick={onClose}>×</button>
                </div>
                    {/* {vehicles && <>{JSON.stringify(vehicles)}</>} */}


                {isSubmitting ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <SelectInput
                            id="vehicle_id"
                            label="Vehicle"
                            value={formData.vehicle_id}
                            onChange={handleChange}
                            placeholder="No vehicle selected"
                            options={vehicles}
                            renderOption={(vehicle, index) => (
                                <option key={vehicle.id} value={vehicle.id} >
                                    {index + 1} {vehicle.name} - {vehicle.model}
                                </option>
                            )}
                            required
                        />

                        <TextInput
                            id="title"
                            label="Title"
                            placeholder="Reminder title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <SelectInput
                            id="type"
                            label="Type"
                            value={formData.type}
                            onChange={handleChange}
                            placeholder="Select a type"
                            options={[
                                { id:1, value:"km", label:"Kilometers" }, 
                                { id:2, value:"time", label:"Time" }, 
                                { id:3, value:"km_time", label:"Time and Kilometers" }
                            ]}
                            required
                        />
                        {(formData.type === 'km' || formData.type === 'km_time') && (
                            <TextInput
                                id="km_target"
                                label="Kilometers target"
                                placeholder=""
                                type="number"
                                value={formData.km_target}
                                onChange={handleChange}
                                required={formData.type !== 'time'}
                            />
                        )}
                        {(formData.type === 'time' || formData.type === 'km_time') && (
                            <TextInput
                                id="km_target"
                                label="Days target"
                                placeholder=""
                                type="number"
                                value={formData.days_target}
                                onChange={handleChange}
                                required
                            />
                        )}

                        <TextInput
                            id="last_km_record"
                            label="Last kilometer recorded"
                            placeholder=""
                            type="number"
                            value={formData.last_km_record}
                            onChange={handleChange}
                            required
                        />

                        <TextInput
                            id="last_maintenance_date"
                            label="Last maintenance date"
                            placeholder=""
                            type="date"
                            value={formData.last_maintenance_date}
                            onChange={handleChange}
                            required
                        />

                        <div className="col-span-full">
                            <label className="block text-gray-700 font-medium">Description of reminder</label>
                            <textarea
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </>
                )}

                {submissionError && <p className='text-error'>{submissionError}</p>}
                <div className='modal-actions'>
                    <button className='btn btn-cancel' type='button' onClick={onClose}>
                        Cancel
                    </button>
                    <button className='btn btn-save' type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : (editingReminder ? 'Save Changes' : 'Create Reminder')}
                    </button>
                </div>
            </form>
        </div>
    );
};

ManageReminderModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  editingReminder: PropTypes.func,
  vehicles: PropTypes.array
}; 
  