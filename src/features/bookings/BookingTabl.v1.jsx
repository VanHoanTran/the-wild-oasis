import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import { useBookings } from './useBookings';
import Empty from '../../ui/Empty';
import Pagination from '../../ui/Pagination';
import { useSearchPage } from '../../hooks/useSearchPage';
function BookingTable() {
  const { isLoading, bookings: initialBookings, count } = useBookings();
  const { page, setPage } = useSearchPage(count);
  if (isLoading) return <Spinner />;

  if (!initialBookings?.length) return <Empty resourceName='bookings' />;

  let bookings;
  bookings = initialBookings.slice((page - 1) * 10, page * 10);

  return (
    <Menus>
      <Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination
            count={count}
            currentPage={page}
            setCurrentPage={setPage}
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
