import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserData as updateUserDataApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateUserData } = useMutation({
    mutationFn: updateUserDataApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success(`Successfully update user's data`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateUserData, isUpdating };
};

export default useUpdateUserData;
