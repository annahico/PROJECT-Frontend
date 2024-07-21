
import { Route, Routes } from 'react-router-dom';
import { AllAppointments } from '../AllAppointments/AllAppointments';
import { AllCustomers } from '../AllCustomers/AllCustomers';
import { Appointments } from '../Appointments/appointments';
import { Gallery } from '../Gallery/Gallery';
import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { MyDates } from '../MyDates/MyDates';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { LoginWorker } from '../WorkerLogin/WorkerLogin';
export const Body = () => {
     return (
         <>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/gallery" element={<Gallery />}/>
                <Route path="/loginworker" element={<LoginWorker />}/>
                <Route path="/mydates" element={<MyDates />}/>
                <Route path="/allcustomers" element={<AllCustomers />}/>
                <Route path="/allappointments" element={<AllAppointments />}/>
                <Route path="/appointments" element={<Appointments />}/>


            </Routes>
         </>
     )
}