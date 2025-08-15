import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVehicleById } from '../../Hooks/useVehicle.js';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import VehicleImage from '../../Components/VehicleImage';
import ActionButton from '../../Components/Buttons/ActionButton';
import ManageVehicleModal from '../../Components/Modals/ManageVehicleModal';
import DeleteVehicleModal from '../../Components/Modals/DeleteVehicleModal';
import LoadingSpinner from '../../assets/LoadingSpinner';

import '../../Styles/components/buttons.css';
import '../../Styles/pages/details.css';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [showModal, setShowModal] = useState({ edit: false, delete: false });
  const { data, loading, error } = useVehicleById( {}, [id]);
  
  useEffect(() => {
    if (data?.data) setVehicle(data.data);
  }, [data]);

  const handleBack = () => {
    navigate('/garage');
  };
  
  return (
    <div className='container'>
      <Header />
      <div className='content content-details'>
        <div className='btn-box'>
          <ActionButton 
            label="← Back" 
            onClick={handleBack} 
          />
          {!loading && !error && vehicle && (
            <>
              <ActionButton 
                label="✎ Edit" 
                onClick={() => setShowModal(showModal => ({ ...showModal, edit: true }))} 
              />
              <ActionButton 
                label="✖ Delete" 
                onClick={() => setShowModal(showModal => ({ ...showModal, delete: true }))} 
                style={{ background: 'var(--color-error)' }}
              />
            </>
          )}
        </div>
        {loading && <LoadingSpinner/>}
        {error && <p className='text-error'>Error loading vehicle: {error}</p>}
        {!loading && !error && !vehicle && <p className='text-error'>No vehicles found.</p>}
        {!loading && !error && vehicle && (
          <>
            <VehicleImage imageUrl={vehicle.image} alt={vehicle.name} width={640} height={360} />

            <div className='vehicle-details-info'>
              <div className='info-section'>
                <h2>Basic Information</h2>
                <div className='info-grid'>
                  <div className='info-item'>
                    <strong>Brand:</strong>
                    <span>{vehicle.brand}</span>
                  </div>
                  <div className='info-item'>
                    <strong>Model:</strong>
                    <span>{vehicle.model}</span>
                  </div>
                  <div className='info-item'>
                    <strong>Version:</strong>
                    <span>{vehicle.version || 'Not informed'}</span>
                  </div>
                  <div className='info-item'>
                    <strong>Color:</strong>
                    <span>{vehicle.color}</span>
                  </div>
                </div>
              </div>

              <div className='info-section'>
                <h2>Documentation</h2>
                <div className='info-grid'>
                  <div className='info-item'>
                      <strong>Year:</strong>
                      <span>{vehicle.year || 'Not informed'}</span>
                  </div>
                  <div className='info-item'>
                      <strong>License Plate:</strong>
                      <span>{vehicle.licensePlate || 'Not informed'}</span>
                  </div>
                  <div className='info-item'>
                      <strong>Mileage:</strong>
                      <span>{vehicle.mileage.toLocaleString('pt-BR')} km</span>
                  </div>
                </div>
              </div>

              <div className='info-section'>
                <h2>History</h2>
                <div className='info-grid'>
                  <div className='info-item'>
                      <strong>Creation Date:</strong>
                      <span>{new Date(vehicle.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className='info-item'>
                      <strong>Last Update:</strong>
                      <span>{new Date(vehicle.updatedAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <ManageVehicleModal
        isOpen={showModal.edit}
        onClose={() => setShowModal(showModal => ({ ...showModal, edit: false }))}
        editingVehicle={vehicle}
        onSuccess={() => window.location.reload()}
      />
      <DeleteVehicleModal
        isOpen={showModal.delete}
        onClose={() => setShowModal(showModal => ({ ...showModal, delete: false }))}
        vehicleIds={id}
        onSuccess={() => navigate('/garage')}
      />

      <Footer />
    </div>
  );
} 