import { useState, useEffect } from 'react';
import { useUpdateVehicle } from '../../Hooks/useVehicle';
import PropTypes from 'prop-types';

import '../../Styles/components/modal.css';
import '../../Styles/components/buttons.css'

export default function EditVehicleModal({ isOpen, onClose, vehicle, onSuccess }) {
    const { updateVehicle, loading, error, success } = useUpdateVehicle();
    const [formData, setFormData] = useState({
        name: '', brand: '', model: '', version: '', color: '', licensePlate: '', mileage: ''
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
        if (vehicle) setFormData({ name: vehicle.name || '', brand: vehicle.brand || '', model: vehicle.model || '', version: vehicle.version || '', color: vehicle.color || '', licensePlate: vehicle.licensePlate || '', mileage: vehicle.mileage?.toString() || '0'});
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

    return (
        <div className='modal-bg' onClick={() => onClose()}>
            <form className='modal-content' onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>

                <div className='modal-header'>
                    <h2 className='modal-title'>Editar Veículo</h2>
                    <button className='btn btn-close' type='button' onClick={() => onClose()}>×</button>
                </div>

                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
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
                    <label htmlFor='brand'>Marca</label>
                    <select
                        id='brand'
                        className='select'
                        value={formData.brand}
                        onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                        required
                    >
                        <option value=''>Selecione uma marca</option>
                        {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='model'>Modelo</label>
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
                    <label htmlFor='version'>Versão</label>
                    <input
                        id='version'
                        className='input'
                        type='text'
                        value={formData.version}
                        onChange={(e) => setFormData(prev => ({ ...prev, version: e.target.value }))}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='color'>Cor</label>
                    <select
                        id='color'
                        className='select'
                        value={formData.color}
                        onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                        required
                    >
                        <option value=''>Selecione uma cor</option>
                        {colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label htmlFor='licensePlate'>Placa</label>
                    <input
                        id='licensePlate'
                        className='input'
                        type='text'
                        value={formData.licensePlate}
                        onChange={(e) => setFormData(prev => ({ ...prev, licensePlate: e.target.value }))}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='mileage'>Quilometragem</label>
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
                        Cancelar
                    </button>
                    <button type='submit' className='btn btn-save' disabled={loading}>
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
                
            </form>
        </div>
    );
} 

EditVehicleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  vehicle: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired
};