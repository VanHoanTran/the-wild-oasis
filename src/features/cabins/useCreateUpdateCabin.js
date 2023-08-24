import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin, updateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

const useCreateUpdateCabin = ({ isEditSession }) => {
  const queryClient = useQueryClient();
  const { mutate: createOrUpdateCabin, isLoading: isWorking } = useMutation({
    mutationFn: isEditSession ? updateCabin : createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      toast.success(
        isEditSession
          ? ' The cabin successfully updated'
          : 'New cabin successfully created'
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isWorking, createOrUpdateCabin };
};

export default useCreateUpdateCabin;
