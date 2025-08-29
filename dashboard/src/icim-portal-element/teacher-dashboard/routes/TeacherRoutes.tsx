import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import TeacherLayout from '../layout/TeacherLayout';
import ProtectedRoute from 'icim-portal-element/auth/ProtectedRoute';

// render - teacher pages
const TeacherClasses = Loadable(lazy(() => import('../pages/teacher-classes')));
const TeacherStudents = Loadable(lazy(() => import('../pages/TeacherStudents')));
const TeacherClockIn = Loadable(lazy(() => import('../pages/TeacherClockIn')));
const TeacherAttendance = Loadable(lazy(() => import('../pages/teacher-attendance')));


// ==============================|| TEACHER DASHBOARD ROUTES ||============================== //

const TeacherRoutes = {
  path: '/teacher',
  element: (
    <ProtectedRoute requiredRole='teacher'>
      <TeacherLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <TeacherClasses />
    },
    {
      path: 'classes',
      element: <TeacherClasses />
    },
    {
      path: 'students',
      element: <TeacherStudents />
    },
    {
      path: 'attendance',
      element: <TeacherAttendance />
    },
    {
      path: 'clock-in',
      element: <TeacherClockIn />
    }
  ]
};

export default TeacherRoutes;
