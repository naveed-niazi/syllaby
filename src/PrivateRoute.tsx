import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@hooks/useAuth'; // Adjust the import path according to your project structure
import { BookProvider } from '@/src/BookContext';

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ?
    <BookProvider>
      <Outlet />
    </BookProvider>
      
    : <Navigate to="/login" />;
};

export default PrivateRoute;
