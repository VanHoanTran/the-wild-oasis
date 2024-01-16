import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

const useUser = () => {
  const {
    isLoading,

    data: user,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });
  return { isLoading, user, isAuth: user?.role === 'authenticated' };
};

export default useUser;
