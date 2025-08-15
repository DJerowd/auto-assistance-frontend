import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';

import useMaintenance from '../../Hooks/useMaintenance.js';
import { useApi } from '../../Hooks/useApi'

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import ActionButton from '../../Components/Buttons/ActionButton';
import LoadingSpinner from '../../assets/LoadingSpinner.jsx';
import FilterSelect from '../../Components/Selects/FilterSelect.jsx';
import SearchInput from '../../Components/Inputs/SearchInput.jsx';
import ManageReminderModal from '../../Components/Modals/ManageReminderModal.jsx';
import Pagination from '../../Components/Pagination.jsx';

import '../../Styles/pages/reminders.css';

export default function Reminders() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [selectedItens, setSelectedItens] = useState([]);
    const [filters, setFilters] = useState({ limit: 10, vehicleId: '', search: '' });
    const [showModal, setShowModal] = useState({ add: false, delete: false });

    const { data: remindersData, loading, error } = useMaintenance( {}, [page, filters]);
    const reminders = useMemo(() => remindersData?.reminders || [], [remindersData?.reminders]);
    const totalPages = remindersData?.totalPages || 1;

    const { data: allVehiclesData } = useApi('/vehicles?limit=1000', {}, []);
    const allVehicles = useMemo(() => allVehiclesData?.data?.vehicles || [], [allVehiclesData?.data?.vehicles]);

    return (
        <div className='container'>
            <Header/>
            <div className='content'>

                <h2 className="title">Reminders</h2>

                <div className="btn-box">
                    <ActionButton 
                        label="← Back" 
                        onClick={() => navigate('/dashboard')} 
                    />
                    <ActionButton 
                        label="+ Add reminder" 
                        onClick={() => setShowModal(showModal => ({ ...showModal, add: true }))} 
                    />
                    <ActionButton
                        label="☑ Select all" 
                        onClick={() => setSelectedItens(reminders.map(v => v.id))} 
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
                        <ActionButton 
                            label="☒ Clear filters" 
                            onClick={() => { setFilters({ search: '' }); setPage(1) }} 
                            disabled={!filters.brand && !filters.color && !filters.search} 
                        />
                        <FilterSelect
                            id="vehicle_id"
                            value={filters.vehicleId}
                            onChange={(e) => setFilters(f => ({ ...f, vehicleId: e.target.value }))}
                            placeholder="No vehicle selected"
                            options={ allVehicles.map((vehicle, index) => ( {id: vehicle.id, value: vehicle.id, label: index + " " + vehicle.name + " - " + vehicle.model } ))}
                            renderOption={(vehicle, index) => (
                                <option key={vehicle.id} value={vehicle.id} >
                                    {index + 1} {vehicle.name} - {vehicle.model}
                                </option>
                            )}
                            required
                        />
                        <SearchInput
                            value={filters.search}
                            onSearch={(value) => { setFilters(f => ({ ...f, search: value })); setPage(1) }}
                            placeholder="Search vehicles..."
                        />
                        <FilterSelect
                            value={filters.limit}
                            onChange={(e) => { setFilters(f => ({ ...f, limit: e.target.value })); setPage(1) }}
                            options={[
                                { value: '1', label: 'Limit 1' },  
                                { value: '2', label: 'Limit 2' },    
                                { value: '3', label: 'Limit 3' },
                                { value: '5', label: 'Limit 5' },
                                { value: '10', label: 'Limit 10' },
                                { value: '15', label: 'Limit 15' },
                                { value: '20', label: 'Limit 20' },
                                { value: '25', label: 'Limit 25' },
                                { value: '30', label: 'Limit 30' }
                            ]}
                        />
                    </div>
                }

                {loading ? (
                    <LoadingSpinner/>
                ) : error ? (
                    <p className='text-error'>Error loading vehicle: {error}</p>
                ) : !reminders ? ( 
                    <p className='text-error'>No vehicles found.</p>
                ) :  (
                    <table className="maintenance-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Título</th>
                                <th>Tipo</th>
                                <th>KM Restantes</th>
                                <th>Dias Restantes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reminders.map((reminder) => (
                                <tr key={reminder.id}>
                                    <td>
                                        <input
                                            className='select select-checkbox'
                                            type="checkbox"
                                            checked={selectedItens.includes(reminder.id)}
                                            onChange={() => setSelectedItens(prev => prev.includes(reminder.id) ? prev.filter(i => i !== reminder.id) : [...prev, reminder.id])}
                                            title={`Select ${reminder.name}`}
                                        />
                                    </td>
                                    <td>{reminder.title}</td>
                                    <td>{reminder.type}</td>
                                    <td>{reminder.km_remaining !== null ? reminder.km_remaining : '-'}</td>
                                    <td>{reminder.days_remaining !== null ? reminder.days_remaining : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>

            <ManageReminderModal
                isOpen={showModal.add}
                onClose={() => setShowModal(showModal => ({ ...showModal, add: false }))}
                onSuccess={() => window.location.reload()}
                vehicles={allVehicles}
            />
            <Footer/>
        </div>
    );
};