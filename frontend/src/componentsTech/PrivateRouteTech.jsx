import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function PrivateRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        toast.error("You need to log in to access this section.", { id: "auth-error" });
        return null; // Prevent navigation
    }

    const allowedRoles = [
        'superAdminTech',
        'CSETechHod',
        'CSECyberHod',
        'ITTechHod',
        'ADSTechHod',
        'ECETechHod',
        'EEETechHod',
    ];

    if (!allowedRoles.includes(user.role)) {
        toast.error("You don't have access to this section.", { id: "access-error" });
        return null; // Prevent navigation
    }

    return children;
}

export default PrivateRoute;