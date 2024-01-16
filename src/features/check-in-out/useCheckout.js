import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateBooking as updateBookingApi } from '../../services/apiBookings';
const useCheckout = () => {
  const queryClient = useQueryClient();
  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBookingApi({
        id: bookingId,
        obj: {
          status: 'checked-out',
        },
      }),
    onSuccess: () => {
      // this will let you access all active query keys
      // console.log(
      //   queryClient
      //     .getQueryCache()
      //     .getAll()
      //     .map((cache) => cache.queryKey)
      // );

      queryClient.invalidateQueries({
        //queryKey: ['booking'],
        refetchType: 'active',
      });
      toast.success('The booking has been successfully checked-out .');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { checkout, isCheckingOut };
};

export default useCheckout;
