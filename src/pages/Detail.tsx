import {
  Link,
  useNavigate,
  useParams,
  createBrowserHistory,
} from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSingleCountry } from '../features/countrySlice';
import styled from 'styled-components';
import { formatCountryName, formatPopulation } from '../helper/FormatFunctions';
import Error from './Error';

type styledProps = {
  label?: string;
  second?: boolean;
};

const Detail = () => {
  const { countryName } = useParams();
  const { singleCountry, countries, error } = useAppSelector(
    state => state.country
  );
  const history = createBrowserHistory();

  const countryData = [
    { label: 'Native Name', value: singleCountry[0]?.nativeName },
    {
      label: 'Population',
      value: formatPopulation(singleCountry[0]?.population),
    },
    { label: 'Region', value: singleCountry[0]?.region },
    { label: 'Sub Region', value: singleCountry[0]?.subregion },
    { label: 'Capital', value: singleCountry[0]?.capital },
  ];

  const countryData2 = [
    { label: 'Top Level Domain', value: singleCountry[0]?.topLevelDomain },
    { label: 'Currencies', value: singleCountry[0]?.currencies[0].name },
    { label: 'Languages', value: singleCountry[0]?.languages[0].name },
  ];

  const borderCountries = [
    {
      label: 'Border Countries',
      value: singleCountry[0]?.borders?.map((border: string) => border) ?? [
        'No border countries',
      ],
    },
  ];

  const dispatch = useAppDispatch();

  const navigate = useNavigate({
    from: '/detail/$countryName',
  });

  const handleNavigate = () => {
    // navigate to  recent route
    navigate({
      to: history.back() as any,
    });
  };

  useEffect(() => {
    if (countryName) {
      dispatch(setSingleCountry(countryName));
    }
  }, [countryName, dispatch]);

  return (
    <Container>
      <BackButton onClick={handleNavigate}>Go Back</BackButton>
      {error ? (
        <Error />
      ) : (
        <Wrapper>
          <ImgWrapper>
            <CountrtyImg src={singleCountry[0]?.flag} alt='flag' />
          </ImgWrapper>
          <CountryInfo>
            <Title>
              {formatCountryName(singleCountry[0]?.name) ||
                formatCountryName(singleCountry[0]?.nativeName)}
            </Title>
            <InfoWrapper>
              <Info1Container>
                {countryData?.map(({ label, value }) => (
                  <Info key={label} label={label}>
                    {label !== 'Border Countries' && (
                      <>
                        <StrongTag>{label}: </StrongTag>
                        {value}
                      </>
                    )}
                  </Info>
                ))}
              </Info1Container>

              <Info2Container>
                {countryData2?.map(({ label, value }) => (
                  <Info>
                    <>
                      <StrongTag>{label}: </StrongTag>
                      {value}
                    </>
                  </Info>
                ))}
              </Info2Container>
            </InfoWrapper>

            {borderCountries?.map(({ label, value }) => (
              <BorderWrapper>
                <StrongTag>{label}: </StrongTag>
                <BorderBtn>
                  {value?.map((border: any, index: number) => (
                    <Link
                      to={`/detail/$countryName`}
                      key={index}
                      params={{
                        countryName: border,
                      }}
                      disabled={border === 'No Border Countries' ? true : false}
                    >
                      <Border>{border}</Border>
                    </Link>
                  ))}
                </BorderBtn>
              </BorderWrapper>
            ))}
          </CountryInfo>
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px 28px 60px 28px;

  @media (min-width: 1440px) {
    padding: 80px 80px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1440px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 144px;
    margin-top: 80px;
  }
`;
const BackButton = styled.button`
  padding: 6px 23px;
  border: none;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.293139);
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    transform: scale(0.98);
  }

  @media (min-width: 1440px) {
  }
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 64px;
  overflow: hidden;

  @media (min-width: 1440px) {
    width: 559.71px;
    height: max-content;
    margin-top: 0;
  }
`;

const CountrtyImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fit;
  border-radius: 5px;
`;

const CountryInfo = styled.div`
  margin-top: 42px;
  display: flex;
  flex-direction: column;

  @media (min-width: 1440px) {
    width: 574px;
    justify-content: space-between;
    /* flex-direction: row; */

    height: auto;

    margin: 0;
  }
`;

const InfoWrapper = styled.div`
  @media (min-width: 1440px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Title = styled.h2`
  font-weight: 800;
  font-size: 22px;
  line-height: 30px;
  color: ${({ theme }) => theme.text};

  margin-bottom: 16px;
`;

const Info = styled.div<styledProps>`
  display: flex;
  flex-direction: row;
  gap: 6px;

  font-size: 14px;
  line-height: 32px;

  color: ${({ theme }) => theme.text};

  @media (min-width: 1440px) {
    /* flex-direction: column; */

    margin: 0;
  }
`;

const Info1Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info2Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin-top: 32px;

  @media (min-width: 1440px) {
    margin-top: 0;
  }
`;

const StrongTag = styled.strong`
  width: fit-content;
  height: fit-content;
`;

const Border = styled.span`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.293139);
  border-radius: 2px;
  padding: 6px 32px;

  font-weight: 300;
  font-size: 12px;
  line-height: 16px;

  cursor: pointer;
`;

const BorderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-top: 32px;

  @media (min-width: 1440px) {
    flex-direction: row;
    margin-top: 70px;
    /* align-items: center; */
  }
`;

const BorderBtn = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export default Detail;
