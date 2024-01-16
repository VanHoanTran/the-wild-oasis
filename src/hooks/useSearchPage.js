import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../utils/constants';
export const useSearchPage = (maxCount) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = (value) => {
    searchParams.set('page', value);
    setSearchParams(searchParams);
  };
  // does not exist => set to 1
  // is not a number => set to 1
  // number, less than 0, or greater than maxCount/PAGE_SIZE + 1 => 1
  const pageParams = searchParams.get('page');
  let page;
  console.log(Number(pageParams));
  if (
    Number(pageParams) <= 0 ||
    Number(pageParams) > maxCount / PAGE_SIZE + 1
  ) {
    page = 1;
    setPage(1);
    return { page, setPage };
  }
  page = Number(pageParams);
  return { page, setPage };
};
