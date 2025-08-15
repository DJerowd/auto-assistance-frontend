import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useAddVehicle, useUpdateVehicle } from '../../Hooks/useVehicle';
import { useData } from '../../Hooks/useData';
import { SelectInput, TextInput } from '../Inputs/FormInputs';
import ImageInput from '../Inputs/ImageInput';
import LoadingSpinner from '../../assets/LoadingSpinner';

import '../../Styles/components/modal.css';
import '../../Styles/components/buttons.css';

const INITIAL_FORM_STATE = { name: 'New Vehicle', brand: '', model: '', version: '', color: '', licensePlate: '', year: '', mileage: '', image: null };

export default function ManageVehicleModal({ isOpen, onClose, onSuccess, editingVehicle }) {
  const { addVehicle, loading:addLoading, error:createError, succes:addSuccess } = useAddVehicle();
  const { updateVehicle, loading: updateLoading, error:updateError, success:updateSuccess } = useUpdateVehicle();
  const { data: colorsData, loading: colorLoading, error: colorError } = useData('colors');
  const { data: brandsData, loading: brandLoading, error: brandError } = useData('brands');
  const colors = useMemo(() => colorsData?.data?.data || [], [colorsData]);
  const brands = useMemo(() => brandsData?.data?.data || [], [brandsData]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    if (isOpen) {
      if (editingVehicle) {
        setFormData({ name: editingVehicle.name || '', brand: editingVehicle.brand || '', model: editingVehicle.model || '', version: editingVehicle.version || '', color: editingVehicle.color || '', licensePlate: editingVehicle.licensePlate || '', year: editingVehicle.year || '', mileage: editingVehicle.mileage || 0, image: '' });setFormData({ name: editingVehicle.name || '', brand: editingVehicle.brand || '', model: editingVehicle.model || '', version: editingVehicle.version || '', color: editingVehicle.color || '', licensePlate: editingVehicle.licensePlate || '', year: editingVehicle.year || '', mileage: editingVehicle.mileage || '', image: null });
      } else {
        setFormData(INITIAL_FORM_STATE);
      }
    }
  }, [isOpen, editingVehicle]);

  useEffect(() => {
    if(addSuccess || updateSuccess) { 
      alert(editingVehicle ? 'Vehicle edited successfully' : 'Vehicle added successfully');
      onSuccess();
    }
  }, [editingVehicle, onSuccess, addSuccess, updateSuccess]);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }, []);
  
  const handleImageChange = useCallback((img) => {
    setFormData((prev) => ({ ...prev, image: img }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = editingVehicle ? await updateVehicle(editingVehicle.id, formData) : await addVehicle(formData)
    if (result) {
      alert(addSuccess || updateSuccess);
      onSuccess();
    }
  };

  const isDataLoading = colorLoading || brandLoading;
  const dataError = colorError || brandError;
  const isSubmitting = addLoading || updateLoading;
  const submissionError = createError || updateError;

  if (!isOpen) return null;
  
  return (
    <div className='modal-bg' onClick={onClose}>
      <form className='modal-content' onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        
        <div className='modal-header'>
          <h2 className='modal-title'>{editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}</h2>
          <button className='btn btn-close' type='button' onClick={onClose}>×</button>
        </div>

        {isSubmitting || isDataLoading ? (
          <LoadingSpinner />
        ) : dataError ? (
          <p className='text-error'>{dataError}</p>
        ) : (
          <>
            <ImageInput
              value={formData.image}
              onChange={handleImageChange}
            />

            <TextInput
              id="name"
              label="Name"
              placeholder="Vehicle name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <SelectInput
              id="brand"
              label="Brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Select a brand"
              options={brands.map(b => ({ id: b.id, value: b.brand, label: b.brand }))}
              required
            />

            <TextInput
              id="model"
              label="Model"
              placeholder="Vehicle model"
              value={formData.model}
              onChange={handleChange}
              required
            />

            <TextInput
              id="version"
              label="Version"
              placeholder="Version (optional)"
              value={formData.version}
              onChange={handleChange}
            />

            <SelectInput
              id="color"
              label="Color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Select a color"
              options={colors}
              renderOption={(color, index) => (
                <option
                  key={color.id}
                  value={color.color}
                  style={{ color: color.hex }}
                >
                  {index + 1} {color.color}
                </option>
              )}
              required
            />
            <TextInput
              id="licensePlate"
              label="License Plate"
              placeholder="License plate (optional)"
              value={formData.licensePlate}
              onChange={handleChange}
            />
            <TextInput
              id="year"
              label="Year"
              type="number"
              placeholder="Year of manufacture (optional)"
              value={formData.year}
              onChange={handleChange}
            />
            <TextInput
              id="mileage"
              label="Mileage"
              type="number"
              placeholder="Mileage (optional)"
              value={formData.mileage}
              onChange={handleChange}
            />

          </>
        )}

        {submissionError && <p className='text-error'>{submissionError}</p>}
        <div className='modal-actions'>
          <button className='btn btn-cancel' type='button' onClick={onClose}>
            Cancel
          </button>
          <button className='btn btn-save' type='submit' disabled={isSubmitting || isDataLoading}>
            {isSubmitting ? 'Saving...' : (editingVehicle ? 'Save Changes' : 'Create Vehicle')}
          </button>
        </div>
      </form>
    </div>
  );
}

ManageVehicleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  editingVehicle: PropTypes.object
}; 