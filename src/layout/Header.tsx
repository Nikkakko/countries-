import styled from 'styled-components';
import moonLightLogo from '../assets/svgs/moon-light.svg';
import moonDarkLogo from '../assets/svgs/moon-dark.svg';
import { darkTheme, lightTheme } from '../styles/Theme';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setTheme } from '../features/themeSlice';
import { Link } from '@tanstack/react-router';

interface HeaderProps {
  theme?: typeof darkTheme | typeof lightTheme;
  toggleTheme?: () => void;
}

const Header = () => {
  const { theme } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    if (theme === darkTheme) {
      dispatch(setTheme(lightTheme));
    } else {
      dispatch(setTheme(darkTheme));
    }
  };

  return (
    <HeaderContainer>
      <Link to='/'>
        <Title>Where in the world?</Title>
      </Link>
      <ThemeChange onClick={() => dispatch(toggleTheme)}>
        <MoonLight
          src={theme === darkTheme ? moonLightLogo : moonDarkLogo}
          alt='moon light'
        />
        <Mode>{theme === darkTheme ? 'Dark Mode' : 'Light Mode'}</Mode>
      </ThemeChange>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 16px;

  background: ${({ theme }) => theme.background};
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 14px;
  line-height: 20px;
  width: fit-content;
`;

const ThemeChange = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
`;

const MoonLight = styled.img``;
const Mode = styled.span`
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;

  color: ${({ theme }) => theme.text};
`;

export default Header;
