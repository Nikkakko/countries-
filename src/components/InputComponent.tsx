import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { Search, Search1, Search2 } from '../assets/svgs';
import { filterByInput } from '../features/countrySlice';
import { darkTheme, lightTheme } from '../styles/Theme';
import SelectRegion from './SelectRegion';

const InputComponent = () => {
  const { theme } = useAppSelector(state => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(filterByInput(searchTerm));
    }, 300); // set delay to 300ms

    return () => clearTimeout(delay); // clear the timeout on unmount or when searchTerm changes
  }, [searchTerm, dispatch]);

  return (
    <Container>
      <FormGroup
        onSubmit={e => {
          e.preventDefault();
          dispatch(filterByInput(searchTerm));
        }}
      >
        <SearchIcon src={theme === darkTheme ? Search : Search1} alt='search' />
        <Input
          type='text'
          placeholder='Search for a country...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </FormGroup>
      <SelectRegion />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1440px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const FormGroup = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  gap: 26px;

  width: 100%;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
  border-radius: 5px;
  overflow: hidden;

  @media (min-width: 1440px) {
    width: 480px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 74px;
  background: ${({ theme }) => theme.background};

  border: none;
  color: ${({ theme }) => theme.text};

  &::placeholder {
    color: ${({ theme }) => theme.text};
    /* opacity: 0.6; */
  }

  color: ${({ theme }) => theme.text};

  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  width: 16px;
  height: 16px;
  left: 32px;
`;
export default InputComponent;
