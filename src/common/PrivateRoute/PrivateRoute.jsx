import { Navigate } from 'react-router-dom';

// Componente de ruta privada que protege el acceso a páginas según el rol del usuario
export function PrivateRoute({ Page }) {
    // Obtener los datos del usuario desde el localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Verificar si el token existe y si el rol del usuario es 'Super Admin'
    const isAuthenticated = userData?.token && userData?.decoded.userRoleName === 'Super Admin';

    // Renderizar la página si el usuario está autenticado, de lo contrario redirigir al login
    return isAuthenticated ? <Page /> : <Navigate to="/login" />;
}
