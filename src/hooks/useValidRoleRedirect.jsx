import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context/AuthContext';
import { messageBasic } from '../utils/HelperMessages';

const useValidRoleRedirect = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    // Función para redirigir al usuario según su rol
    const redirectUser = (token) => {
        try {
            const decoded = jwtDecode(token);
            const { userRoleName } = decoded;
            
            // Determinar la ruta de redirección basada en el rol del usuario
            const redirectPath = 
                userRoleName === 'Super Admin' ? '/admin' :
                userRoleName === 'User' ? '/profile' :
                null;

            if (redirectPath) {
                login({ token, decoded });
                navigate(redirectPath);
                messageBasic(
                    'success',
                    'Login successful',
                    'top-end',
                    false,
                    1600
                );
            } else {
                messageBasic(
                    'error',
                    'Invalid role'
                );
            }
        } catch (error) {
            messageBasic(
                'error',
                'Failed to decode token'
            );
        }
    };

    return redirectUser;
};

export default useValidRoleRedirect;
