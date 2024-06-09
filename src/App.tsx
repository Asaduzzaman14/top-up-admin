import { Suspense, lazy, useEffect,  } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

const Profile = lazy(() => import('./pages/Profile'));

import { SkeletonTheme } from 'react-loading-skeleton';
import useColorMode from './hooks/useColorMode';
import Lazyloding from './components/Lazyloding';

import BizTokenDashboard from './pages/Dashboard/TizaraTokenDashboard';
import Catagory from './pages/Catagory/Catagory';
 import AddServices from './pages/Services/AddProducts';
 import Allusers from './pages/Users/Allusers';
import Products from './pages/Services/Products';
import Orders from './pages/Orders/Orders';
import Banner from './pages/Banner/Banner';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [colorMode] = useColorMode();

  return (
    <>
      <SkeletonTheme
        baseColor={`${colorMode === 'light' ? '#e5e6ea' : '#1d2a39'}`}
        highlightColor="#47566c"
      >
        <Routes>
          <Route
            index
            element={
              <>
                <PageTitle title="SignIn" />
                <SignIn />
              </>
            }
          />

          <Route
            path="/dashboard"
            element={
              <>
                <PageTitle title="Top up" />
                <BizTokenDashboard />
              </>
            }
          />

          <Route
            path="/catagory"
            element={
              <>
                <PageTitle title="Catagory" />
                <Catagory />
              </>
            }
          />

          <Route
            path="/all-product"
            element={
              <>
                <PageTitle title="All Product" />
                <Products />
              </>
            }
          />

          <Route
            path="/add-service"
            element={
              <>
                <PageTitle title="services" />
                <AddServices />
              </>
            }
          />

          <Route
            path="/all-users"
            element={
              <>
                <PageTitle title="All Users" />
                <Allusers />
              </>
            }
          />
         
          <Route
            path="/all-orders"
            element={
              <>
                <PageTitle title="All Orders" />
                <Orders />
              </>
            }
          />
         
          <Route
            path="/deposits"
            element={
              <>
                <PageTitle title="All Deposits" />
                <Orders />
              </>
            }
          />

          
          <Route
            path="/banner"
            element={
              <>
                <PageTitle title="Banner" />
                <Banner />
              </>
            }
          />

          

          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile" />
                <Suspense fallback={<Lazyloding />}>
                  <Profile />
                </Suspense>
              </>
            }
          />

          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup" />
                <SignUp />
              </>
            }
          />
        </Routes>
      </SkeletonTheme>
    </>
  );
}

export default App;
