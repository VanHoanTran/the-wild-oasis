import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import {
  HiOutlinePencil,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
} from 'react-icons/hi2';
import CreateCabinForm from './CreateCabinForm';
import useDeleteCabin from './useDeleteCabin';
import useCreateUpdateCabin from './useCreateUpdateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createOrUpdateCabin } = useCreateUpdateCabin(false);
  const { id, ...repCabin } = cabin;

  const handleDuplicate = () => {
    createOrUpdateCabin({ ...repCabin, name: `Copy of ${repCabin.name}` });
  };

  return (
    <Table.Row role='row'>
      <Img src={cabin.image} alt={cabin.name} />
      <Cabin>{cabin.name}</Cabin>
      <div>Fits up to {cabin.maxCapacity}</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      {cabin.discount ? (
        <Discount>{formatCurrency(cabin.discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button
                icon={<HiOutlineSquare2Stack />}
                onClick={handleDuplicate}
              >
                Duplicate
              </Menus.Button>

              <Modal.Open opens='delete-cabin'>
                <Menus.Button icon={<HiOutlineTrash />}>Delete</Menus.Button>
              </Modal.Open>

              <Modal.Open opens='update-cabin'>
                <Menus.Button icon={<HiOutlinePencil />}>Edit</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='update-cabin'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name='delete-cabin'>
              <ConfirmDelete
                resourceName='cabins'
                disabled={isDeleting}
                onConfirm={() => deleteCabin(id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
