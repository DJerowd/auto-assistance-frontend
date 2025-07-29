import { useState, useEffect } from 'react';
import { useAddVehicle } from '../../Hooks/useVehicle'
import PropTypes from 'prop-types';

import '../../Styles/components/modal.css';
import '../../Styles/components/buttons.css'

export default function VehicleForm({ isOpen, onClose, onSuccess }) {
  const { addVehicle, loading, error, success } = useAddVehicle();
  const [formData, setFormData] = useState({
    name: 'New Vehicle', brand: '', model: '', version: '', color: '', licensePlate: '', mileage: '0'
  });

  const brands = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Volkswagen', 'BMW', 'Mercedes-Benz',
    'Audi', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Lexus', 'Acura',
    'Infiniti', 'Volvo', 'Jaguar', 'Land Rover', 'Porsche', 'Ferrari', 'Lamborghini',
    'Maserati', 'Bentley', 'Rolls-Royce', 'Tesla', 'Fiat', 'Peugeot', 'Renault',
    'Citroën', 'Opel', 'Skoda', 'Seat', 'Alfa Romeo', 'Lancia'
  ];

  const colors = [
    'White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Yellow',
    'Orange', 'Purple', 'Pink', 'Brown', 'Beige', 'Gold', 'Bronze', 'Navy',
    'Maroon', 'Teal', 'Lime', 'Cyan', 'Magenta', 'Indigo', 'Violet', 'Coral',
    'Salmon', 'Turquoise', 'Olive', 'Khaki', 'Cream', 'Ivory', 'Charcoal'
  ];

  useEffect(() => {
    if (success) {
        onClose();
        onSuccess();
    }
  }, [success, onClose, onSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addVehicle(formData);
    if (!error) {
      setFormData({ name: 'New Vehicle', brand: '', model: '', version: '', color: '', licensePlate: '', mileage: '0' });
    }
  };

  if (!isOpen) return null;
  
  return (
    <div className='modal-bg' onClick={() => onClose()}>
      <form className='modal-content' onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        
        <div className='modal-header'>
          <h2 className='modal-title'>Add New Vehicle</h2>
          <button className='btn btn-close' type='button' onClick={() => onClose()}>×</button>
        </div>

        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            className='input'
            type='text'
            placeholder='Vehicle name'
            value={formData.name}
            onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='brand'>Brand</label>
          <select
            id='brand'
            className='select'
            value={formData.brand}
            onChange={e => setFormData(f => ({ ...f, brand: e.target.value }))}
            required
          >
            <option value=''>Select a brand</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='model'>Model</label>
          <input
            id='model'
            className='input'
            type='text'
            placeholder='Vehicle model'
            value={formData.model}
            onChange={e => setFormData(f => ({ ...f, model: e.target.value }))}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='version'>Version</label>
          <input
            id='version'
            className='input'
            type='text'
            placeholder='Version (optional)'
            value={formData.version}
            onChange={e => setFormData(f => ({ ...f, version: e.target.value }))}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='color'>Color</label>
          <select
            id='color'
            className='select'
            value={formData.color}
            onChange={e => setFormData(f => ({ ...f, color: e.target.value }))}
            required
          >
            <option value=''>Select a color</option>
            {colors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='licensePlate'>License Plate</label>
          <input
            id='licensePlate'
            className='input'
            type='text'
            placeholder='License plate (optional)'
            value={formData.licensePlate}
            onChange={e => setFormData(f => ({ ...f, licensePlate: e.target.value }))}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='mileage'>Mileage</label>
          <input
            id='mileage'
            className='input'
            type='number'
            placeholder='Mileage (optional)'
            value={formData.mileage}
            onChange={e => setFormData(f => ({ ...f, mileage: e.target.value }))}
          />
        </div>

        {error && <p className='modal-error'>{error}</p>}
        {success && <p className='modal-success'>Vehicle added successfully</p>}

        <div className='modal-actions'>
          <button className='btn btn-cancel' type='button' onClick={onClose}>
            Cancel
          </button>
          <button className='btn btn-save' type='submit' disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

VehicleForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
}; 