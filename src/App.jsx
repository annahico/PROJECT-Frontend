import { Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./pages/Admin/Admin";
import Appointments from "./pages/Appointments/Appointments";
import Artists from "./pages/Artists/Artists";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="artists" element={<Artists />} />
      <Route path="register" element={<Register />} />
      <Route path="profile" element={<Profile />} />
      <Route path="admin" element={<Admin />} />
      <Route path="appointment" element={<Appointments />} />
    </Routes>
  );
}

export default App;
