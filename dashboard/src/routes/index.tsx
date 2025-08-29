import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project-imports
import ComponentsRoutes from './ComponentsRoutes';
import LoginPage from 'icim-portal-element/auth/LoginPage';
import MainRoutes from './MainRoutes';
import { TeacherRoutes } from 'icim-portal-element/teacher-dashboard';
import { AcademicManagerRoutes } from 'icim-portal-element/academic-manager-dashboard';
import { IcimsWebsiteRoutes } from 'icim-portal-element/icims-website';
import { AdminRoutes } from 'icim-portal-element/admin-dashboard';
import Loadable from 'components/Loadable';
// import { SimpleLayoutType } from 'config';
// import SimpleLayout from 'layout/Simple';

// render - landing page
const PagesLanding = Loadable(lazy(() => import('pages/landing')));

// ==============================|| ROUTES RENDER ||============================== //

const router = createBrowserRouter(
  [
    // {
    //   path: '/',
    //   element: <SimpleLayout layout={SimpleLayoutType.LANDING} />,
    //   children: [
    //     {
    //       index: true,
    //       element: <PagesLanding />
    //     }
    //   ]
    // },
    {
      path: '/login',
      element: <LoginPage />
    },
    ComponentsRoutes,
    MainRoutes,
    IcimsWebsiteRoutes,
    TeacherRoutes,
    AcademicManagerRoutes,
    AdminRoutes
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
