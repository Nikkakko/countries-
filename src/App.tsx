import {
  Outlet,
  RouterProvider,
  Link,
  ReactRouter,
  Route,
  RootRoute,
} from '@tanstack/react-router';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import Header from './layout/Header';
import Detail from './pages/Detail';
import Home from './pages/Home';
import { GlobalStyles } from './styles/globalStyles';
import { useAppSelector } from './app/hooks';
import Error from './pages/Error';

const rootRoute = new RootRoute({
  component: Root,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const detailPage = new Route({
  getParentRoute: () => rootRoute,
  path: '/detail/$countryName',
  component: Detail,
});

const errorPage = new Route({
  getParentRoute: () => rootRoute,
  path: '*' || '/error',
  component: () => <Error />,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, detailPage, errorPage]);

// Create the router using your route tree
const router = new ReactRouter({ routeTree });

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function Root() {
  // const [themes, setThemes] = useState(darkTheme);

  // const toggleTheme = () => {
  //   setTheme(theme === darkTheme ? lightTheme : darkTheme);
  // };

  const { theme } = useAppSelector(state => state.theme);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Main>
        <Header />
        <Outlet />
      </Main>
    </ThemeProvider>
  );
}

const App = () => {
  return <RouterProvider router={router} />;
};

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
`;

export default App;
