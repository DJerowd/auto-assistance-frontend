import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleById } from '../../Hooks/useVehicle.js';

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import VehicleImage from '../../Components/VehicleImage.jsx';
import EditVehicleModal from '../../Components/Modals/EditVehicleModal.jsx';
import DeleteVehicleModal from '../../Components/Modals/DeleteVehicleModal.jsx';

import '../../Styles/components/buttons.css';
import '../../Styles/pages/details.css';
import LoadingSpinner from '../../assets/LoadingSpinner.jsx';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { data, loading, error } = useVehicleById( {}, [id, refreshTrigger]);
  
  useEffect(() => {
    if (data?.data) setVehicle(data.data);
  }, [data]);

  const handleBack = () => {
    navigate('/garage');
  };

  if (loading) {
    return (
      <div className='container'>
        <Header />
        <div className='content'>
          <LoadingSpinner/>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className='container'>
        <Header />
        <div className='content'>
          <p style={{ color: 'var(--color-error)' }}>Error loading vehicle: {error}</p>
          <button className='btn' onClick={handleBack}>Back</button>
        </div>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className='container'>
        <Header />
        <div className='content'>
          <p>Vehicle not found</p>
          <button className='btn' onClick={handleBack}>Back</button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className='container'>
      <Header />
      <div className='content content-details'>
        
        <div className='btn-box'>
          <button className='btn btn-action' onClick={handleBack}>
            ← Back
          </button>
          <button className='btn btn-action' onClick={() => setShowEditModal(true)}>
            Edit
          </button>
          <button className='btn btn-action' style={{ background: 'var(--color-error)' }} onClick={() => setShowDeleteModal(true)}>
            Delete
          </button>
        </div>

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
      </div>

      <EditVehicleModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        vehicle={vehicle}
        onSuccess={() => setRefreshTrigger(prev => prev + 1)}
      />
      <DeleteVehicleModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        vehicleIds={id}
        onSuccess={() => navigate('/garage')}
      />

      <Footer />
    </div>
  );
} 