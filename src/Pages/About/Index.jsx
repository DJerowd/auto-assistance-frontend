import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

export default function About() {
    return (
        <div className='container'>
            <Header/>
            <div className='content'>
                <h1>About</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                </p>
            </div>
            <Footer/>
        </div>
    );
};