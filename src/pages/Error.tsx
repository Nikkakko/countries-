import { Link } from '@tanstack/react-router';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setError } from '../features/countrySlice';

const Error = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.country);
  return (
    <ErrorContainer>
      <Title>
        Error 404: Page not found. Please go back to the home page and try
        again.
      </Title>

      <Button onClick={() => dispatch(setError(false))}>
        <Link to='/' preload='intent' preloadDelay={1000}>
          Go Back
        </Link>
      </Button>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 160px);
  padding: 0 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const Button = styled.button`
  padding: 6px 23px;
  border: none;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.293139);
  border-radius: 2px;
  margin-top: 40px;

  cursor: pointer;
`;

export default Error;
