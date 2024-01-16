import { useMutation } from '@tanstack/react-query';
import { updateUserPassword as updateUserPasswordApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

const useUpdateUserPassword = () => {
  const { isLoading: isUpdating, mutate: updateUserPassword } = useMutation({
    mutationFn: updateUserPasswordApi,

    onSuccess: () => {
      toast.success(`Successfully update user's password`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUserPassword, isUpdating };
};

export default useUpdateUserPassword;
