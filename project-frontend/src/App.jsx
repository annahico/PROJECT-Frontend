import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import { Body } from "./pages/Body/Body";

function App() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/services')
            .then(response => {
                setServices(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <>
            <Body />
            <div className="App">
                <header className="App-header">
                    <h1>Our Services</h1>
                    <ul>
                        {services.map(service => (
                            <li key={service.id}>
                                <h2>{service.name}</h2>
                                <p>{service.description}</p>
                            </li>
                        ))}
                    </ul>
                </header>
            </div>
        </>
    );
}

export default App;
