import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking as updateBookingApi } from '../../services/apiBookings';
import { useNavigate } from 'react-router-dom';
const useUpdateBooking = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: updateBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['booking'],
        // or we can use
        // active: true
      });
      toast.success('The booking has been successfully checked-in.');
      navigate('/');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkin, isCheckingIn };
};

export default useUpdateBooking;
