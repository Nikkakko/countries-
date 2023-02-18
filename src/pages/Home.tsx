import { Link } from '@tanstack/react-router';
import styled from 'styled-components';
import { useAppSelector } from '../app/hooks';
import Country from '../components/Country';
import InputComponent from '../components/InputComponent';
import SelectRegion from '../components/SelectRegion';

const Home = () => {
  const { countries, isLoading } = useAppSelector(state => state.country);

  return (
    <HomeContainer>
      <InputComponent />

      <CountryWrapper>
        {countries.map((country: any, i: number) => (
          // use Link component to navigate to detail page
          <Link
            key={i}
            to='/detail/$countryName'
            params={{ countryName: country.name }}
          >
            <Country item={country} />
          </Link>
        ))}
      </CountryWrapper>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 24px;

  @media (min-width: 1440px) {
    padding: 48px 80px;
  }
`;

const CountryWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  margin-top: 32px;

  padding: 0 55px;

  @media (min-width: 1440px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 75px;
    column-gap: 74px;
    padding: 0;

    margin-top: 48px;
  }
`;

export default Home;
