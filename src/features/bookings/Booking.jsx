import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import { useMoveBack } from '../../hooks/useMoveBack';
import useBookingDetails from './useBookingDetails';
import { useNavigate } from 'react-router-dom';
import { HiArrowUpOnSquare, HiTrash } from 'react-icons/hi2';
import useCheckout from '../check-in-out/useCheckout';
import useDeleteBooking from '../check-in-out/useDeleteBooking';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Empty from '../../ui/Empty';
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking, bookingId } = useBookingDetails();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  if (!booking) return <Empty resource='booking' />;
  if (isLoading) return <Spinner />;
  const { status } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === 'checked-out' && (
          <Modal>
            <Modal.Open opens='delete-booking'>
              <Button variation='danger' icon={<HiTrash />}>
                Remove
              </Button>
            </Modal.Open>
            <Modal.Window name='delete-booking'>
              <ConfirmDelete
                disabled={isDeleting}
                resourceName={`booking #${bookingId}`}
                onConfirm={() =>
                  deleteBooking(bookingId, {
                    onSettled: () => moveBack(),
                  })
                }
              />
            </Modal.Window>
          </Modal>
        )}
        {status === 'checked-in' && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
          >
            Check out
          </Button>
        )}
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
