import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// import DashboardLayout from 'src/layouts/dashboard';
import DashboardLayout from '../layouts/dashboard';
import { LandingPage } from '../pages/Landing/Landing';
import AppLoader from '../components/Loaders/AppLoader';

export const IndexPage = lazy(() => import('../pages/User/MessMenuPage'));
export const BuyCoupon = lazy(() => import('../pages/User/BuyCouponPage'));
export const MyCoupon = lazy(() => import('../pages/User/MyCoupon'));
export const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
export const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
export const ResetPasswordPage = lazy(() => import('../pages/Auth/ResetPassword'));
export const NewPasswordPage = lazy(()=>import('../pages/Auth/NewPasswordPage'))
export const AdminPage = lazy(() => import('../pages/Admin/AdminTaskPage'));
export const InventoryPage = lazy(() => import('../pages/Admin/MealCountPage'));
export const Page404 = lazy(() => import('../pages/NotFoundPage'));

// ----------------------------------------------------------------------

const ProtectedRoute = ({element} : any) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser") as string);
  const isAuthenticated = (user && (Date.now() < parseInt(user?.expiryTime)));
  return isAuthenticated ? element : <Navigate to="/login" replace/>;
}

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <ProtectedRoute element={
        <DashboardLayout>
          <Suspense fallback={
            <AppLoader/>
          }>
            <Outlet />
          </Suspense>
        </DashboardLayout>
        }/>
      ),
      children: [
        { path: 'mess', element: <IndexPage />, index: true },
        { path: 'buycoupon', element: <BuyCoupon /> },
        { path: 'mycoupon', element: <MyCoupon /> },
        {
          path: 'admin',
          element: <AdminPage />,
        },
        {
          path: 'inventory',
          element: <InventoryPage />,
        },
      ],
    },
    {
      element: (
          <Suspense fallback={
            <AppLoader/>
          }>
            <Outlet />
          </Suspense>
      ),
      children:[
        {
          path: '/',
          element: <LandingPage/>
        },
        {
          path: 'login',
          element: <LoginPage />,
        },
        {
          path: 'register',
          element: <RegisterPage/>
        },
        {
          path: 'reset-password',
          element: <ResetPasswordPage/>
        },
        {
          path : 'new-password',
          element: <NewPasswordPage/>
        },
        {
          path: '404',
          element: <Page404 />,
        },
        {
          path: '*',
          element: <Navigate to="/404" replace />,
        },    
      ]
    },
  ]);

  return routes;
}
