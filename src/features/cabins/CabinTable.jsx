import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import {useSearchParams} from 'react-router-dom'


const CabinTable = () => {
  const { isLoading, cabins: initialCabins } = useCabins();
  let cabins = initialCabins;

  
  let [searchParams ] = useSearchParams();
  const sortBy = searchParams.get('discount') || 'all';

    if (sortBy ==='with-discount')
      cabins = cabins.filter(cabin=> cabin.discount > 0)
    if(sortBy ==='no-discount')
      cabins = cabins.filter(cabin=>cabin.discount === 0)

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header role='row'>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
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
