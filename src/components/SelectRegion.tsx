import { MouseEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ExpandMore, ExpandMore1, ExpandMore2 } from '../assets/svgs';
import { filterByRegion, setRegions } from '../features/countrySlice';
import { darkTheme } from '../styles/Theme';

const SelectRegion = () => {
  const dispatch = useAppDispatch();
  const { countries, regions } = useAppSelector(state => state.country);
  const { theme } = useAppSelector(state => state.theme);
  const [showMenuItems, setShowMenuItems] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('');

  // write type for this func
  function handleSelect(region: string) {
    dispatch(filterByRegion(region));
    setSelectedRegion(region);
    setShowMenuItems(false);
  }

  useEffect(() => {
    dispatch(setRegions());
  }, []);

  return (
    <Wrapper>
      <Menu onClick={() => setShowMenuItems(!showMenuItems)}>
        <Label>
          {selectedRegion === '' ? 'Filter by Region' : selectedRegion}
        </Label>
        <Arrow
          src={theme === darkTheme ? ExpandMore : ExpandMore1}
          alt='expand more'
        />
      </Menu>

      {showMenuItems && (
        <MenuItems>
          {regions.map(region => (
            <OptionItem
              key={region}
              value={region}
              onClick={() => {
                handleSelect(region);
              }}
            >
              {region}
            </OptionItem>
          ))}
        </MenuItems>
      )}
    </Wrapper>
  );
};

const Menu = styled.div`
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.0532439);
  border-radius: 5px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 14px 24px;
  border: none;

  &:focus {
    outline: none;
  }

  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  /* identical to box height, or 167% */

  color: #ffffff;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`;

const OptionItem = styled.option`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  margin-top: 4px;

  width: fit-content;
`;

const MenuItems = styled(Menu)`
  margin-top: 4px;
  display: block;
  position: absolute;

  width: 200px;
`;

const Label = styled.label`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  /* position: absolute; */
  width: 200px;
  margin-top: 40px;
`;

const Arrow = styled.img``;
export default SelectRegion;
