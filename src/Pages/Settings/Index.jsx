import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import ActionButton from '../../Components/Buttons/ActionButton';

import '../../Styles/components/buttons.css'
import '../../Styles/pages/setting.css'

export default function Settings() {
    const navigate = useNavigate();
    const [configs, setConfigs] = useState({ primary_color: '', font_family: '', font_size: '' })

    const predefinedColors = ['#E42528', '#FF6400', '#F0C917', '#7FA000', '#007BFF', '#8E44AD', '#F91880'];
    const predefinedFontFamilies = ['system-ui', 'Arial, Inter, sans-serif', 'Roboto, Helvetica Neue', 'Courier New'];
    const predefinedFontSizes = ['1rem', '1.2rem', '1.4rem', '1.6rem'];

    useEffect(() => {
        if (configs.primary_color) document.documentElement.style.setProperty('--color-primary', configs.primary_color);
        if (configs.font_family) document.documentElement.style.setProperty('--font-family-base', configs.font_family);
        if (configs.font_size) document.documentElement.style.setProperty('--font-size-base', configs.font_size);
        localStorage.setItem('configs', JSON.stringify(configs));
    }, [configs]);

    return (
        <div className='container'>
            <Header/>
            <div className='content'>
                <div className="btn-box">
                    <ActionButton label="← Back" onClick={() => navigate('/')} />
                </div>

                <section className='settings-section'>
                    <h2 className='subtitle'>Tela</h2>
                    <p>Gerencie o estilo da fonte, tamanho da fonte e cor do plano de fundo.</p>
                    <div className='settings-option'>
                        <strong>Color</strong>
                        <span className="options">
                            {predefinedColors.map((color) => (
                                <button
                                    key={color}
                                    className={`color-iten ${configs.primary_color === color ? 'selected' : ''}`}
                                    style={{ backgroundColor: color, color: color }}
                                    onClick={() => setConfigs(c => ({ ...c, primary_color: color }))}
                                />
                            ))}
                        </span>
                    </div>
                    <div className='settings-option'>
                        <strong>Font family</strong>
                        <select className='select' value={configs.font_family} onChange={(e) => setConfigs(c => ({ ...c, font_family: e.target.value }))}>
                            {predefinedFontFamilies.map((font) => (
                                <option key={font} value={font}>{font}</option>
                            ))}
                        </select>
                    </div>
                    <div className='settings-option'>
                        <strong>Font size</strong>
                        <span className="options">
                            {predefinedFontSizes.map((font) => (
                                <button key={font} style={{fontSize: font, background: 0, border: 0}} onClick={() => setConfigs(f => ({ ...f, font_size: font }))}>Aa</button>
                            ))}
                        </span>
                    </div>
                </section>

                <section className='settings-section'>
                    <h2 className='subtitle'>Conta</h2>
                    <p>Gerencie sua conta.</p>

                    <div className='settings-option'>
                        <strong>Editar informações da conta</strong>
                        <button className='btn'> Editar </button>
                    </div>
                    <div className='settings-option'>
                        <strong>Altere sua senha</strong>
                        <button className='btn'> Alterar </button>
                    </div>
                    <div className='settings-option'>
                        <strong>Excluir conta</strong>
                        <button className='btn' style={{ background: 'var(--color-error)' }}> Excluir </button>
                    </div>
                </section>

            </div>
            <Footer/>
        </div>
    );
};