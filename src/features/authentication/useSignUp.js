import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useSignUp = () => {
  const navigate = useNavigate();
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success('Account successfully created');
      navigate('/users');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isLoading };
};

export default useSignUp;
