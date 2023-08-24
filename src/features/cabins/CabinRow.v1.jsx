import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import {
  HiOutlinePencil,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
} from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
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
  const { isWorking, createOrUpdateCabin } = useCreateUpdateCabin(false);

  const handleDuplicate = () => {
    const { id, ...repCabin } = cabin;
    createOrUpdateCabin({ ...repCabin, name: `Copy of ${repCabin.name}` });
  };
  return (
    <Table.Row role='row'>
      <Img src={cabin.image} alt={cabin.name} />
      <Cabin>{cabin.name}</Cabin>
      <div>Fits up to {cabin.maxCapacity}</div>
      <Price>{formatCurrency(cabin.regularPrice)}</Price>
      <Discount>{formatCurrency(cabin.discount)}</Discount>
      <div>
        <Modal>
          <Modal.Open opens='duplicate-cabin'>
            <ButtonIcon disabled={isWorking} onClick={() => handleDuplicate()}>
              <HiOutlineSquare2Stack />
            </ButtonIcon>
          </Modal.Open>

          <Modal.Window name='duplicate-cabin'>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens='delete-cabin'>
            <ButtonIcon>
              <HiOutlineTrash />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name='delete-cabin'>
            <ConfirmDelete
              onCloseModal={close}
              resourceName='cabins'
              disabled={isDeleting}
              onConfirm={() => deleteCabin(cabin.id)}
            />
          </Modal.Window>

          <Modal.Open opens='update-cabin'>
            <ButtonIcon>
              <HiOutlinePencil />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name='update-cabin'>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
        </Modal>

        <Menus.Menu>
          <Menus.Toggle id={cabin.id} />
          <Menus.List id={cabin.id}>
            <Menus.Button
              icon={<HiOutlineSquare2Stack />}
              onClick={() => handleDuplicate(cabin)}
            >
              Duplicate
            </Menus.Button>
            <Menus.Button icon={<HiOutlinePencil />}>Edit</Menus.Button>
            <Menus.Button
              icon={<HiOutlineTrash />}
              onClick={() => deleteCabin(cabin.id)}
            >
              Delete
            </Menus.Button>
          </Menus.List>
        </Menus.Menu>
      </div>
    </Table.Row>
  );
};

export default CabinRow;
