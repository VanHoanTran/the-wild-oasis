import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import useLogout from './useLogout';

const Logout = () => {
  const { logout, isLoading: isLoggingOut } = useLogout();
  return (
    <ButtonIcon onClick={logout} disabled={isLoggingOut}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
};

export default Logout;
