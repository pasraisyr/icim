import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import AcademicManagerLayout from '../layout/AcademicManagerLayout';

// render - academic manager pages
const ManagerDashboard = Loadable(lazy(() => import('../pages/ManagerDashboard')));
const StudentsManagement = Loadable(lazy(() => import('../pages/StudentsManagement')));
const TeachersManagement = Loadable(lazy(() => import('../pages/TeachersManagement')));
const ClassesManagement = Loadable(lazy(() => import('../pages/ClassesManagement')));
const SubjectsManagement = Loadable(lazy(() => import('../pages/SubjectsManagement')));
const TeacherAllocation = Loadable(lazy(() => import('../pages/TeacherAllocation')));
const StudentAllocation = Loadable(lazy(() => import('../pages/StudentAllocation')));
const TeacherAttendanceView = Loadable(lazy(() => import('../pages/TeacherAttendanceView')));
const StudentAttendanceView = Loadable(lazy(() => import('../pages/StudentAttendanceView')));

// ==============================|| ACADEMIC MANAGER DASHBOARD ROUTES ||============================== //

const AcademicManagerRoutes = {
  path: '/academic-manager',
  element: <AcademicManagerLayout />,
  children: [
    {
      index: true,
      element: <ManagerDashboard />
    },
    {
      path: 'dashboard',
      element: <ManagerDashboard />
    },
    {
      path: 'students',
      element: <StudentsManagement />
    },
    {
      path: 'teachers',
      element: <TeachersManagement />
    },
    {
      path: 'classes',
      element: <ClassesManagement />
    },
    {
      path: 'subjects',
      element: <SubjectsManagement />
    },
    {
      path: 'teacher-allocation',
      element: <TeacherAllocation />
    },
    {
      path: 'student-allocation',
      element: <StudentAllocation />
    },
    {
      path: 'teacher-attendance',
      element: <TeacherAttendanceView />
    },
    {
      path: 'student-attendance',
      element: <StudentAttendanceView />
    }
  ]
};

export default AcademicManagerRoutes;
