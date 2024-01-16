import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

const CabinTable = () => {
  const { isLoading, cabins: initialCabins } = useCabins();
  let [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  let cabins;
  const filterField = searchParams.get('discount') || 'all';

  if (filterField === 'all') cabins = initialCabins;
  if (filterField === 'with-discount')
    cabins = initialCabins.filter((cabin) => cabin.discount > 0);
  if (filterField === 'no-discount')
    cabins = initialCabins.filter((cabin) => cabin.discount === 0);

  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  cabins = cabins.sort((prev, next) => (prev[field] - next[field]) * modifier);

  return (
    <Menus>
      <Table columns='1.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header role='row'>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
