import { useState, useEffect } from 'react';
import { useUpdateVehicle } from '../../Hooks/useVehicle';
import { useData } from '../../Hooks/useData';
import PropTypes from 'prop-types';
import ImageInput from '../Inputs/ImageInput';
import LoadingSpinner from '../../assets/LoadingSpinner';

import '../../Styles/components/modal.css';
import '../../Styles/components/buttons.css'

export default function EditVehicleModal({ isOpen, onClose, vehicle, onSuccess }) {
    const { updateVehicle, loading, error, success } = useUpdateVehicle();
    const { data: color, loading: colorLoading, error: colorError } = useData('colors');
    const { data: brand, loading: brandLoading, error: brandError } = useData('brands');
    const [formData, setFormData] = useState({
        name: '', brand: '', model: '', version: '', color: '', licensePlate: '', mileage: '', image: ''
    });
    const [colors, setColors] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        if (color) setColors((color.data.data));
        if (brand) setBrands((brand.data.data));
    }, [color, brand]);

    useEffect(() => {
        if (vehicle) setFormData({ name: vehicle.name || '', brand: vehicle.brand || '', model: vehicle.model || '', version: vehicle.version || '', color: vehicle.color || '', licensePlate: vehicle.licensePlate || '', mileage: vehicle.mileage?.toString() || '0', image: '' });
    }, [vehicle]);

    useEffect(() => {
        if (success) {
            onClose();
            onSuccess();
        }
    }, [success, onClose, onSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateVehicle(vehicle.id, formData);
    };

    if (!isOpen) return null;

    if ( colorLoading || brandLoading) return (
        <div className='modal-bg' onClick={() => onClose()}>
          <form className='modal-content' onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h2 className='modal-title'>Add New Vehicle</h2>
              <button className='btn btn-close' type='button' onClick={() => onClose()}>×</button>
            </div>
            <LoadingSpinner/>
          </form>
        </div>
      );
    
      if ( colorError || brandError) return (
        <div className='modal-bg' onClick={() => onClose()}>
          <form className='modal-content' onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h2 className='modal-title'>Add New Vehicle</h2>
              <button className='btn btn-close' type='button' onClick={() => onClose()}>×</button>
            </div>
            <p style={{ color: 'var(--color-danger)' }}>{colorError}</p>
            <p style={{ color: 'var(--color-danger)' }}>{brandError}</p>
          </form>
        </div>
      );

    return (
        <div className='modal-bg' onClick={() => onClose()}>
            <form className='modal-content' onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>

                <div className='modal-header'>
                    <h2 className='modal-title'>Edit Vehicle</h2>
                    <button className='btn btn-close' type='button' onClick={() => onClose()}>×</button>
                </div>

                <ImageInput
                  value={formData.image}
                  onChange={img => {
                    setFormData(f => ({ ...f, image: img }));
                  }}
                />

                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        id='name'
                        className='input'
                        type='text'
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='brand'>Brand</label>
                    <select
                        id='brand'
                        className='select'
                        value={formData.brand}
                        onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                        required
                    >
                        <option value=''>Select a brand</option>
                        {brands.map(brand => (
                        <option key={brand.id} value={brand.brand}>{brand.brand}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='model'>Model</label>
                    <input
                        id='model'
                        className='input'
                        type='text'
                        value={formData.model}
                        onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                        required
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='version'>Version</label>
                    <input
                        id='version'
                        className='input'
                        type='text'
                        value={formData.version}
                        onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='color'>Color</label>
                    <select
                        id='color'
                        className='select'
                        value={formData.color}
                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                        required
                    >
                        <option value=''>Select a color</option>
                        {colors.map((color, index) => (
                        <option key={color.id} value={color.color} style={{color:color.hex}}>{index + 1} {color.color}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='licensePlate'>License Plate</label>
                    <input
                        id='licensePlate'
                        className='input'
                        type='text'
                        value={formData.licensePlate}
                        onChange={(e) => setFormData(prev => ({ ...prev, licensePlate: e.target.value }))}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='mileage'>Mileage</label>
                    <input
                        id='mileage'
                        className='input'
                        type='number'
                        value={formData.mileage}
                        onChange={(e) => setFormData(prev => ({ ...prev, mileage: e.target.value }))}
                        required
                    />
                </div>

                {error && (
                    <p className='modal-error'>
                        {error}
                    </p>
                )}

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

EditVehicleModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  vehicle: PropTypes.object,
  onSuccess: PropTypes.func
};