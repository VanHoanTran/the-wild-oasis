import { useSearchParams } from 'react-router-dom';
import Select from './Select';

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };
  const selectedValue = searchParams.get('sortBy') || '';

  return (
    <Select
      options={options}
      type='white'
      value={selectedValue}
      onChange={handleChange}
    />
  );
};

export default SortBy;
