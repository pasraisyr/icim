import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import AdminLayout from '../layout/AdminLayout';
import ProtectedRoute from 'icim-portal-element/auth/ProtectedRoute';
import TeachersAttendance from 'icim-portal-element/admin-dashboard/pages/TeachersAttendance';
import StudentsAttendance from 'icim-portal-element/admin-dashboard/pages/StudentsAttendance';
import ClassesAttendance from 'icim-portal-element/admin-dashboard/pages/ClassesAttendance';


// render - admin pages
// const AdminIcimDashboard = Loadable(lazy(() => import('../pages/AdminIcimDashboard')));
const StudentsManagement = Loadable(lazy(() => import('../pages/StudentsManagement')));
const TeachersManagement = Loadable(lazy(() => import('../pages/TeachersManagement')));
const ClassesManagement = Loadable(lazy(() => import('../pages/ClassesManagement')));
const SubjectsManagement = Loadable(lazy(() => import('../pages/SubjectsManagement')));
const TeacherAllocation = Loadable(lazy(() => import('../pages/TeacherAllocation')));
const StudentAllocation = Loadable(lazy(() => import('../pages/StudentAllocation')));
const PaymentCalculator = Loadable(lazy(() => import('../pages/PaymentCalculator')));
const FrontendManagement = Loadable(lazy(() => import('../pages/AboutSetup')));
const VerificationStatus = Loadable(lazy(() => import('../pages/VerificationStatus')));
const StudentClassAllocation = Loadable(lazy(() => import('../pages/StudentClassAllocation')));
const PaymentRecord = Loadable(lazy(() => import('../pages/PaymentRecord')));
const OtherPayments = Loadable(lazy(() => import('../pages/OtherPayments')));
// ==============================|| ACADEMIC MANAGER DASHBOARD ROUTES ||============================== //

const AdminRoutes = {
  path: '/admin-icims',
  element: (
    <ProtectedRoute requiredRole="1">
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      index: true,
      element: <StudentsManagement />
    },
    // {
    //   path: 'dashboard',
    //   element: <AdminIcimDashboard />
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
    {
      path: 'website-management',
      element: <FrontendManagement />
    },
    {
      path:'other-payments',
      element: <OtherPayments />
    },
    {
      path:'student-payment-record',
      element: <PaymentRecord />
    }
  ]
};

export default AdminRoutes;
