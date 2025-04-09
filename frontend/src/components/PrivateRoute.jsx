import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        toast.error("You need to log in to access this section.", { id: "auth-error" });
        return null; // Prevent navigation
    }

    // Restrict access for technology roles to engineering sections
    if (
        (user.role === 'superAdminTech' || user.role.endsWith('TechHod')) &&
        window.location.pathname.startsWith('/engineering')
    ) {
        toast.error("You don't have access to this section.", { id: "access-error" });
        return null; // Prevent navigation
    }

    // Restrict access for engineering roles to technology sections
    if (
        (user.role === 'superAdminEng' || user.role.endsWith('EngHod')) &&
        window.location.pathname.startsWith('/technology')
    ) {
        toast.error("You don't have access to this section.", { id: "access-error" });
        return null; // Prevent navigation
    }

    return children;
};

export default PrivateRoute;
