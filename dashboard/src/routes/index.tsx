import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project-imports
import LoginPage from 'icim-portal-element/auth/LoginPage';
import { TeacherRoutes } from 'icim-portal-element/teacher-dashboard';
import { AcademicManagerRoutes } from 'icim-portal-element/academic-manager-dashboard';
import { IcimsWebsiteRoutes } from 'icim-portal-element/icims-website';
import { AdminRoutes } from 'icim-portal-element/admin-dashboard';

// ==============================|| ROUTES RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: '/login',
      element: <LoginPage />
    },
    IcimsWebsiteRoutes,
    TeacherRoutes,
    AcademicManagerRoutes,
    AdminRoutes
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
