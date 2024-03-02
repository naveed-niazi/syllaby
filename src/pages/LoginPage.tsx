import Login from '@components/Login';
import useAuth from '@hooks/useAuth';
import { redirect } from 'react-router-dom';

interface Props {
  isNew?: boolean;
}

function LoginPage({ isNew = false }: Props) {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    redirect('/');
  }
  return <Login isNew={isNew} />;
}

export default LoginPage;
