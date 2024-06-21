import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';

const Profile = lazy(() => import('./pages/Profile'));

import { SkeletonTheme } from 'react-loading-skeleton';
import useColorMode from './hooks/useColorMode';
import Lazyloding from './components/Lazyloding';

import Catagory from './pages/Catagory/Catagory';
import AddServices from './pages/Services/AddProducts';
import Allusers from './pages/Users/Allusers';
import Products from './pages/Services/Products';
import Orders from './pages/Orders/Orders';
import Banner from './pages/Banner/Banner';
import Payment from './pages/Payment/Payment';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import PendingOrders from './pages/Orders/PendingOrders';
import RejectedOrders from './pages/Orders/RejectedOrders';
import Deposits from './pages/Deposits/Deposits';
import ManualPayment from './pages/ManualPayment/ManualPayment';
import TermsAndCondition from './pages/TermsAndCondition';
import PrivacyAndPolicy from './pages/PrivacyAndPolicy';
import Setting from './pages/Setting';
import CompleteOrder from './pages/Orders/CompleteOrder';
import ProtectedRoute from './hooks/ProtectedRoute';

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
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/catagory"
            element={
              <>
                <PageTitle title="Catagory" />
                <ProtectedRoute>
                  <Catagory />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/all-product"
            element={
              <>
                <PageTitle title="All Product" />
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/add-service"
            element={
              <>
                <PageTitle title="services" />
                <ProtectedRoute>
                  <AddServices />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/all-users"
            element={
              <>
                <PageTitle title="All Users" />
                <ProtectedRoute>
                  <Allusers />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/order/all-orders"
            element={
              <>
                <PageTitle title="All Orders" />
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/order/pending-orders"
            element={
              <>
                <PageTitle title="Pending Orders" />
                <ProtectedRoute>
                  <PendingOrders />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/order/complete-orders"
            element={
              <>
                <PageTitle title="Complete Orders" />
                <ProtectedRoute>
                  <CompleteOrder />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/order/rejected-order"
            element={
              <>
                <PageTitle title="Rejected Orders" />
                <ProtectedRoute>
                  <RejectedOrders />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/deposits"
            element={
              <>
                <PageTitle title="All Deposits" />
                <ProtectedRoute>
                  <Deposits />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/payment"
            element={
              <>
                <PageTitle title="Payment" />
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/manual-payment"
            element={
              <>
                <PageTitle title="Manual Payment" />
                <ProtectedRoute>
                  <ManualPayment />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/banner"
            element={
              <>
                <PageTitle title="Banner" />
                <ProtectedRoute>
                  <Banner />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile" />
                <Suspense fallback={<Lazyloding />}>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </Suspense>
              </>
            }
          />

          <Route
            path="/setting"
            element={
              <>
                <PageTitle title="setting" />
                <ProtectedRoute>
                  <Setting />
                </ProtectedRoute>
              </>
            }
          />

          <Route
            path="/terms-and-condition"
            element={
              <>
                <PageTitle title="Terms and condition" />
                <TermsAndCondition />
              </>
            }
          />
          <Route
            path="/privacy-and-policy"
            element={
              <>
                <PageTitle title="Privacy and policy" />
                <PrivacyAndPolicy />
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
