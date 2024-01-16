import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../services/apiBookings';

const useBookingDetails = () => {
  // get id from params
  const { bookingId } = useParams();
  //get data using react query
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
  });
  return { bookingId, isLoading, booking, error };
};

export default useBookingDetails;
