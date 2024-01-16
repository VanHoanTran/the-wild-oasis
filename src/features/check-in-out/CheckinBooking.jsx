import styled from 'styled-components';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import useBookingDetails from '../bookings/useBookingDetails';
import Spinner from '../../ui/Spinner';
import useCheckin from './useCheckin';
import { useEffect, useState } from 'react';
import CheckBox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import useSettings from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { isLoading: isCheckingIn, booking } = useBookingDetails();
  const { checkin } = useCheckin();
  // addBreakfast keeps track of adding breakfast decision
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { isLoading: isSettingsLoading, settings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid);
    setAddBreakfast(booking?.hasBreakfast);
  }, [booking]);

  if (isCheckingIn || isSettingsLoading) return <Spinner />;

  const {
    id: bookingId,
    guests: { fullName },
    cabinPrice,
    isPaid,
    extrasPrice,
    // hasBreakfast is a decision being decided before check-in time.
    hasBreakfast,
    numNights,
    numGuests,
  } = booking;

  // breakfastPrice could be changed at the check-in time
  // if they add breakfast when they booked a cabin, then use that price
  // unless calculate the price at this moment.
  const optionalBreakfastPrice = extrasPrice
    ? extrasPrice
    : numGuests * numNights * settings.breakfastPrice;

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin({
      id: bookingId,
      obj:
        // hasn't added breakfast and want to add breakfast
        !hasBreakfast && addBreakfast
          ? {
              status: 'checked-in',
              isPaid: true,
              hasBreakfast: true,
              extrasPrice: optionalBreakfastPrice,
              totalPrice: cabinPrice + optionalBreakfastPrice,
            }
          : // unless just check-in
            {
              status: 'checked-in',
              isPaid: true,
            },
    });
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <CheckBox
            id='breakfast'
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          id='confirm'
          disabled={
            hasBreakfast
              ? isPaid || isCheckingIn
              : !addBreakfast || isCheckingIn
          }
          checked={confirmPaid}
          onChange={() => setConfirmPaid((paid) => !paid)}
        >
          I confirm that {fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(cabinPrice)
            : `${formatCurrency(
                cabinPrice + optionalBreakfastPrice
              )} (${formatCurrency(cabinPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
