import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens='cabin-form'>
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default AddCabin;

// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   const handleOpenModal = () => setIsOpenModal((open) => !open);
//   return (
//     <div>
//       <ButtonIcon onClick={handleOpenModal}>
//         <HiOutlinePlusCircle />
//       </ButtonIcon>
//       {isOpenModal && (
//         <Modal handleClose={handleOpenModal}>
//           <CreateCabinForm hideForm={handleOpenModal} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default AddCabin;
