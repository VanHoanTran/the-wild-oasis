import styled, { css } from 'styled-components';

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === 'horizontal' &&
    css`
      flex-direction: row;
      justify-items: center;
      justify-content: space-between;
    `}
  ${(props) =>
    props.type === 'vertical' &&
    css`
      flex-direction: column;
      justify-items: center;
      justify-content: space-between;
      gap: 2.6rem;
    `}
`;
Row.defaultProps = {
  type: 'vertical',
};
export default Row;
