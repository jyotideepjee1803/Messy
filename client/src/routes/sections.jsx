import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

// import DashboardLayout from 'src/layouts/dashboard';
import DashboardLayout from '../layouts/dashboard';
import { LandingPage } from '../pages/Landing/Landing';

export const IndexPage = lazy(() => import('../pages/User/MessMenuPage'));
export const BuyCoupon = lazy(() => import('../pages/User/BuyCouponPage'));
export const MyCoupon = lazy(() => import('../pages/User/MyCoupon'));
export const LoginPage = lazy(() => import('../pages/Auth/LoginPage'));
export const RegisterPage = lazy(() => import('../pages/Auth/RegisterPage'));
export const AdminPage = lazy(() => import('../pages/Admin/AdminTaskPage'));
export const InventoryPage = lazy(() => import('../pages/Admin/MealCountPage'));
export const Page404 = lazy(() => import('../pages/NotFoundPage'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
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
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
