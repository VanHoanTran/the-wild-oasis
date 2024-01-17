import styled from 'styled-components';
import useUser from '../features/authentication/useUser';
import Spinner from '../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  // 1. load the authenticated user
  const { isAuth, isLoading } = useUser();

  // 2. If there is No authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuth && !isLoading) navigate('/login');
  }, [isAuth, navigate, isLoading]);

  // 3. while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  // 4. if there IS a user, redirect to /dashboard
  return children;
};

export default ProtectedRoute;
