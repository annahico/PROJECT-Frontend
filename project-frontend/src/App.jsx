import './App.css';
import Body from './common/Body/Body'; // Importar como export por defecto
import { Footer } from './common/Footer/Footer';
import { Header } from './common/Header/Header';

function App() {
    return (
        <div className="App">
            <Header />
            <Body />  
            <Footer />
        </div>
    );
}

export default App;
