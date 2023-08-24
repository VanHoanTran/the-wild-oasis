import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';
function Cabins() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>filter/sort</p>
      </Row>
      <Row>
        <CabinTable />
      </Row>
      <Row>
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;