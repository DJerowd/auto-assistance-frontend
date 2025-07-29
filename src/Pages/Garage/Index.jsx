import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApi } from '../../Hooks/useApi'

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import Pagination from '../../Components/Pagination.jsx'
import AddVehicleModal from '../../Components/Modals/AddVehicleModal.jsx'
import DeleteVehicleModal from '../../Components/Modals/DeleteVehicleModal.jsx';
import CarIcon from '../../assets/car-sport.jsx'

import '../../Styles/list.css'
import '../../Styles/components/buttons.css'
import '../../Styles/components/select.css'

function buildQuery(page, filters) {
  const params = new URLSearchParams()
  params.append('page', page)
  if (filters.limit) params.append('limit', filters.limit)
  if (filters.brand) params.append('brand', filters.brand)
  if (filters.color) params.append('color', filters.color)
  return `/vehicles?${params.toString()}`
}

export default function Garage() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [selectedItens, setSelectedItens] = useState([]);
    const [filters, setFilters] = useState({ limit: 10, brand: '', color: '' });
    const endpoint = buildQuery(page, filters);
    
    const { data: vehiclesData, loading, error } = useApi(endpoint, {}, [page, filters]);
    const { data: allVehiclesData } = useApi('/vehicles?limit=1000', {}, []);
    const totalPages = vehiclesData?.data?.totalPages || 1;

    const vehicles = useMemo(() => vehiclesData?.data?.vehicles || [], [vehiclesData?.data?.vehicles]);
    const allVehicles = useMemo(() => allVehiclesData?.data?.vehicles || [], [allVehiclesData?.data?.vehicles]);

    const brands = useMemo(() => [...new Set(allVehicles.map(v => v.brand))], [allVehicles]);
    const colors = useMemo(() => [...new Set(allVehicles.map(v => v.color))], [allVehicles]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
      <div className='container'>
        <Header/>
        <div className='content content-garage'>
          <h2 className="title">Garage</h2>

          <div className="btn-box">
            <button className='btn btn-action' onClick={() => setShowAddModal(true)}>
              + Add vehicle
            </button>

            <button className='btn btn-action' onClick={ () => setSelectedItens(vehicles.map(v => v.id))} type="button">
              Select all
            </button>

            <button className='btn btn-action' onClick={() => setSelectedItens([])} type="button" disabled={selectedItens.length <= 0}>
              Clear selection
            </button>

            <button className='btn btn-action' style={{ background: 'var(--color-error)' }} onClick={() => setShowDeleteModal(true)} type="button" disabled={selectedItens.length <= 0}>
              Delete items
            </button>
          </div>

          <div className="btn-box">
            <select 
              className='select select-filter' 
              value={filters.brand} 
              onChange={(e) => { setFilters(f => ({ ...f, brand: e.target.value })); setPage(1); }}
            >
              <option value=''>All brands</option>
              {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
            </select>

            <select 
              className='select select-filter' 
              value={filters.color} 
              onChange={(e) => { setFilters(f => ({ ...f, color: e.target.value })); setPage(1); }}
            >
              <option value=''>All colors</option>
              {colors.map(color => <option key={color} value={color}>{color}</option>)}
            </select>

            <select 
              className='select select-filter' 
              value={filters.limit} 
              onChange={(e) => { setFilters(f => ({ ...f, limit: e.target.value })); setPage(1); }}
            >
              <option value="3">Limit 3</option>
              <option value="5">Limit 5</option>
              <option value="10">Limit 10</option>
              <option value="15">Limit 15</option>
              <option value="20">Limit 20</option>
              <option value="25">Limit 25</option>
              <option value="30">Limit 30</option>
            </select>
          </div>

          {loading && <p>Loading vehicles...</p>}
          {error && <p style={{ color: 'var(--color-danger)' }}>{error}</p>}
          {!loading && !error && vehicles.length === 0 && <p>No vehicles found.</p>}
          {!loading && !error && vehicles.length > 0 && (
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
                  <h3 className="vehicle-name">{vehicle.name}</h3>
                  <CarIcon className="vehicle-image" width="120" height="120" />
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
          )}
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>

        <AddVehicleModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => window.location.reload()}
        />
        <DeleteVehicleModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          vehicleIds={selectedItens}
          onSuccess={() => window.location.reload()}
        />

        <Footer/>
      </div>
    )
}