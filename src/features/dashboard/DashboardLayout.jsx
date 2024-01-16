import styled from 'styled-components';
import useRecentBookings from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import useRecentStays from './useRecentStays';
import { useCabins } from '../../features/cabins/useCabins';
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
const DashboardLayout = () => {
  const { bookings, isLoading, numDays } = useRecentBookings();
  const { cabins, isLoading: isCabinsLoading } = useCabins();
  const { isLoading: isStaysLoading, confirmedStays } = useRecentStays();
  if (isLoading || isStaysLoading || isCabinsLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        confirmedStays={confirmedStays}
        bookings={bookings}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart numDays={numDays} bookings={bookings} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
