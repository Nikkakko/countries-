import styled from 'styled-components';
import { formatPopulation } from '../helper/FormatFunctions';

import { CountryTypes } from '../types/countryTypes';

type CountryProps = {
  item: CountryTypes;
};

const Country = ({ item }: CountryProps) => {
  return (
    <Container>
      <Flag src={item.flag} alt={item.name} />
      <Wrapper>
        <Name>{item.name}</Name>
        <Population>
          <StrongTag>Population:</StrongTag> {formatPopulation(item.population)}
        </Population>
        <Region>
          <StrongTag>Region:</StrongTag> {item.region}
        </Region>
        <Capital>
          <StrongTag>Capital:</StrongTag> {item.capital}
        </Capital>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background: ${({ theme }) => theme.background};
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  width: 264px;

  @media (min-width: 1440px) {
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px;
  gap: 8px;

  p {
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
  }
`;

const Flag = styled.img`
  width: 100%;
  height: 100%;
  // fit to container
  object-fit: fit;

  @media (min-width: 1440px) {
    height: 160px;
    object-fit: cover;
  }
`;
const Name = styled.h2`
  font-weight: 800;
  font-size: 18px;
  line-height: 26px;

  margin-bottom: 8px;
`;
const Population = styled.p``;
const Region = styled.p``;
const Capital = styled.p``;

const StrongTag = styled.strong``;
export default Country;
