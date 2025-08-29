import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import AcademicManagerLayout from '../layout/AcademicManagerLayout';
import ClassesAttendance from '../pages/ClassesAttendance';
import ProtectedRoute from 'icim-portal-element/auth/ProtectedRoute';

// render - academic manager pages
// const ManagerDashboard = Loadable(lazy(() => import('../pages/ManagerDashboard')));
const StudentsManagement = Loadable(lazy(() => import('../pages/StudentsManagement/index')));
const TeachersManagement = Loadable(lazy(() => import('../pages/TeachersManagement')));
const ClassesManagement = Loadable(lazy(() => import('../pages/ClassesManagement')));
const SubjectsManagement = Loadable(lazy(() => import('../pages/SubjectsManagement')));
const TeacherAllocation = Loadable(lazy(() => import('../pages/TeacherAllocation/index')));
const StudentAllocation = Loadable(lazy(() => import('../pages/StudentAllocation')));
const TeachersAttendance = Loadable(lazy(() => import('../pages/TeachersAttendance')));
const PaymentCalculator = Loadable(lazy(() => import('../pages/PaymentCalculator')));
const StudentsAttendance = Loadable(lazy(() => import('../pages/StudentsAttendance')));
const VerificationStatus = Loadable(lazy(() => import('../pages/VerificationStatus')));
const StudentClassAllocation = Loadable(lazy(() => import('../pages/StudentClassAllocation')));
// ==============================|| ACADEMIC MANAGER DASHBOARD ROUTES ||============================== //

const AcademicManagerRoutes = {
  path: '/academic-manager',
  element: (
    <ProtectedRoute requiredRole='academic_manager'>
      <AcademicManagerLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <StudentsManagement />
    },
    // {
    //   path: 'dashboard',
    //   element: <ManagerDashboard />
    // },
    {
      path: 'students',
      element: <StudentsManagement />
    },
    {
      path: 'student-class-allocation',
      element: <StudentClassAllocation />
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
      path: 'verification-status',
      element: <VerificationStatus />
    },
    {
      path: 'payment-calculator',
      element: <PaymentCalculator />
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
      element: <TeachersAttendance />
    },
    {
      path: 'student-attendance',
      element: <StudentsAttendance />
    },
    {
      path: 'classes-attendance',
      element: <ClassesAttendance />
    },
  ]
};

export default AcademicManagerRoutes;
