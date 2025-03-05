import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.role === 'superAdminTech' && location.pathname.startsWith('/engineering')) {
        toast.error("You don't have access to this section.");
        return <div className="text-center text-red-500 text-lg"><Toaster /></div>;
    }

    if (user.role === 'superAdminEng' && location.pathname.startsWith('/technology')) {
        toast.error("You don't have access to this section.");
        return <div className="text-center text-red-500 text-lg"><Toaster /></div>;
    }

    return children;
};

export default PrivateRoute;
