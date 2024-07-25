import Box from '@mui/material/Box';
import { Route, Routes } from "react-router-dom";
import Footer from "../common/Layout/Footer/Footer";
import Header from "../common/Layout/Header/Header";
import { PrivateRoute } from "../common/PrivateRoute/PrivateRoute";
import Admin from "../pages/Admin/Admin";
import Appointments from "../pages/Appointments/Appointments";
import Artists from "../pages/Artists/Artists";
import HomePage from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Services from "../pages/Services/Services";

export default function AppRoutes() {
   return (
      <Box display="flex" flexDirection="column" minHeight="95vh">
         <Header />
         <Box component="main" flexGrow={1}>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/services" element={<Services />} />
               <Route path="/artists" element={<Artists />} />
               <Route path="/profile" element={<Profile/>}/>
               <Route path="/admin" element={<PrivateRoute Page={Admin} />} />
               <Route path="/appointmnents" element={<Appointments/>} />
            </Routes>
         </Box>
         <Footer />
      </Box>
   );
}