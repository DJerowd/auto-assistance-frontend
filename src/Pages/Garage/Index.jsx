import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../Hooks/useApi'
import { useVehicle } from '../../Hooks/useVehicle'

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Pagination from '../../Components/Pagination'
import SearchInput from '../../Components/Inputs/SearchInput';
import VehicleImage from '../../Components/VehicleImage';
import ActionButton from '../../Components/Buttons/ActionButton';
import FilterSelect from '../../Components/Selects/FilterSelect';
import AddVehicleModal from '../../Components/Modals/AddVehicleModal'
import DeleteVehicleModal from '../../Components/Modals/DeleteVehicleModal';
import LoadingSpinner from '../../assets/LoadingSpinner';

import '../../Styles/pages/garage.css'
import '../../Styles/components/buttons.css'
import '../../Styles/components/select.css'

export default function Garage() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [selectedItens, setSelectedItens] = useState([]);
    const [filters, setFilters] = useState({ limit: 10, brand: '', color: '', search: '' });
    const [showModal, setShowModal] = useState({ add: false, delete: false });
    
    const { data: vehiclesData, loading, error } = useVehicle( {}, [page, filters]);
    const vehicles = useMemo(() => vehiclesData?.data?.vehicles || [], [vehiclesData?.data?.vehicles]);
    const totalPages = vehiclesData?.data?.totalPages || 1;
    
    const { data: allVehiclesData } = useApi('/vehicles?limit=1000', {}, []);
    const allVehicles = useMemo(() => allVehiclesData?.data?.vehicles || [], [allVehiclesData?.data?.vehicles]);
    const brands = useMemo(() => [...new Set(allVehicles.map(v => v.brand))], [allVehicles]);
    const colors = useMemo(() => [...new Set(allVehicles.map(v => v.color))], [allVehicles]);


    return (
      <div className='container'>
        <Header/>
        <div className='content content-garage'>

          <h2 className="title">Garage</h2>

          <div className="btn-box">
            <ActionButton 
              label="← Back" 
              onClick={() => navigate('/')} 
            />
            <ActionButton 
              label="+ Add vehicle" 
              onClick={() => setShowModal(showModal => ({ ...showModal, add: true }))} 
            />
            <ActionButton 
              label="☑ Select all" 
              onClick={() => setSelectedItens(vehicles.map(v => v.id))} 
            />
            <ActionButton 
              label="☒ Clear selection" 
              onClick={() => setSelectedItens([])} 
              disabled={selectedItens.length <= 0} 
            />
            <ActionButton 
              label="✖ Delete items" 
              onClick={() => setShowModal(showModal => ({ ...showModal, delete: true }))} 
              disabled={selectedItens.length <= 0} 
              style={{ background: 'var(--color-error)' }} 
            />
          </div>

          {filters &&
            <div className="btn-box">
              <FilterSelect
                value={filters.brand}
                onChange={(e) => { setFilters(f => ({ ...f, brand: e.target.value })); setPage(1) }}
                options={brands}
                placeholder="All brands"
              />
              <FilterSelect
                value={filters.color}
                onChange={(e) => { setFilters(f => ({ ...f, color: e.target.value })); setPage(1) }}
                options={colors}
                placeholder="All colors"
              />
              <FilterSelect
                value={filters.limit}
                onChange={(e) => { setFilters(f => ({ ...f, limit: e.target.value })); setPage(1) }}
                options={[
                  { value: '3', label: 'Limit 3' },
                  { value: '5', label: 'Limit 5' },
                  { value: '10', label: 'Limit 10' },
                  { value: '15', label: 'Limit 15' },
                  { value: '20', label: 'Limit 20' },
                  { value: '25', label: 'Limit 25' },
                  { value: '30', label: 'Limit 30' }
                ]}
              />
              <SearchInput
                value={filters.search}
                onSearch={(value) => { setFilters(f => ({ ...f, search: value })); setPage(1) }}
                placeholder="Search vehicles..."
              />
            </div>
          }
            
          {loading && <LoadingSpinner/>}
          {error && <p style={{ color: 'var(--color-danger)' }}>{error}</p>}
          {!loading && !error && vehicles.length === 0 && <p>No vehicles found.</p>}
          {!loading && !error && vehicles.length > 0 && (
            <>
              <div className="vehicles-grid">
                {vehicles.map(vehicle => (
                  <div className="vehicle-card" key={vehicle.id} onClick={() => { navigate(`/garage/vehicle/${vehicle.id}`) }}>
                    <div style={{ alignSelf: 'flex-end' }} onClick={(e) => e.stopPropagation()}>
                      <input
                        className='select select-checkbox'
                        type="checkbox"
                        checked={selectedItens.includes(vehicle.id)}
                        onChange={() => setSelectedItens(prev => prev.includes(vehicle.id) ? prev.filter(i => i !== vehicle.id) : [...prev, vehicle.id])}
                        title={`Select ${vehicle.name}`}
                      />
                    </div>
                    <VehicleImage imageUrl={vehicle.image} alt={vehicle.name} width={240} height={135} />
                    <div className="vehicle-info">
                      <p><strong>Brand:</strong> {vehicle.brand}</p>
                      <p><strong>Model:</strong> {vehicle.model}</p>
                      <p><strong>Version:</strong> {vehicle.version ? vehicle.version : 'Não informado'}</p>
                      <p><strong>Color:</strong> {vehicle.color}</p>
                      <p><strong>License Plate:</strong> {vehicle.licensePlate ? vehicle.licensePlate : 'Não informado'}</p>
                      <p><strong>Mileage:</strong> {vehicle.mileage.toLocaleString('pt-BR')} km</p>
                    </div>
                  </div>
                ))}
              </div>

              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </div>

        <AddVehicleModal
          isOpen={showModal.add}
          onClose={() => setShowModal(showModal => ({ ...showModal, add: false }))}
          onSuccess={() => window.location.reload()}
        />
        <DeleteVehicleModal
          isOpen={showModal.delete}
          onClose={() => setShowModal(showModal => ({ ...showModal, delete: false }))}
          vehicleIds={selectedItens}
          onSuccess={() => window.location.reload()}
        />

        <Footer/>
      </div>
    )
}