import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import TeacherLayout from '../layout/TeacherLayout';

// render - teacher pages
const TeacherClasses = Loadable(lazy(() => import('../pages/TeacherClasses')));
const TeacherStudents = Loadable(lazy(() => import('../pages/TeacherStudents')));
const TeacherAttendance = Loadable(lazy(() => import('../pages/TeacherAttendance')));
const TeacherClockIn = Loadable(lazy(() => import('../pages/TeacherClockIn')));

// ==============================|| TEACHER DASHBOARD ROUTES ||============================== //

const TeacherRoutes = {
  path: '/teacher',
  element: <TeacherLayout />,
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
