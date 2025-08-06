import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useApi } from '../../Hooks/useApi';

export default function Dashboard() {
  const { data, loading, error } = useApi('/vehicles?limit=1000');

  
  const vehicles = data?.data?.vehicles || [];
  
  const total = vehicles.length;
  const byBrand = vehicles.reduce((acc, v) => {
      acc[v.brand] = (acc[v.brand] || 0) + 1;
      return acc;
    }, {});
    const byColor = vehicles.reduce((acc, v) => {
        acc[v.color] = (acc[v.color] || 0) + 1;
        return acc;
    }, {});
    
    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar dados</p>;

    return (
        <div className='container'>
            <Header/>
            <div className='content'>
                <h1 className='title'>Dashboard</h1>
                <div className='dashboard-cards'>
                    <div className='card'>Total de veículos: {total}</div>
                    <div className='card'>Veículos de marcas diferentes: {Object.keys(byBrand).length}</div>
                    <div className='card'>Veículos de cores diferentes: {Object.keys(byColor).length}</div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}