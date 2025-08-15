import { Link } from 'react-router-dom';
import { useApi } from '../../Hooks/useApi';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

import '../../Styles/pages/dashboard.css'

export default function Dashboard() {
    const { data:vData, loading:vLoading, error:vError } = useApi('/vehicles?limit=1000');
    const { data:mData, loading:mLoading, error:mError } = useApi('/maintenances?limit=1000');
    const vehicles = vData?.data?.vehicles || [];
    const reminders = mData?.data?.reminders || [];

    const groupAndCount = (items, key) => {
        return items.reduce((accumulator, currentItem) => {
            const value = currentItem[key];
            accumulator[value] = (accumulator[value] || 0) + 1;
            return accumulator;
        }, {});
    };

    const byBrand = groupAndCount(vehicles, 'brand');
    const byColor = groupAndCount(vehicles, 'color');
    const byVehicleId = groupAndCount(reminders, 'vehicle_id');
    
    if (vLoading || mLoading) return <p>Carregando...</p>;
    if (vError || mError) return <p>Erro ao carregar dados</p>;

    return (
        <div className='container'>
            <Header/>
            <div className='content'>
                <div className='dashboard-cards'>
                    <Link className='btn' to="/garage"> Garage </Link>
                    <div className='card'>Total vehicles: {vehicles.length}</div>
                    <div className='card'>Vehicles of different brands: {Object.keys(byBrand).length}</div>
                    <div className='card'>Vehicles of different colors: {Object.keys(byColor).length}</div>
                </div>

                <div className='dashboard-cards'>
                    <Link className='btn' to="/reminders"> Reminders </Link>
                    <div className='card'>Total reminders: {reminders.length}</div>
                    <div className='card'>Reminders of different vehicles: {Object.keys(byVehicleId).length}</div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}