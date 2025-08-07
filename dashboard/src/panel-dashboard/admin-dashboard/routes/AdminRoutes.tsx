import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';
import AdminLayout from '../layout/AdminLayout';


// render - admin pages
const AdminIcimDashboard = Loadable(lazy(() => import('../pages/AdminIcimDashboard')));
const StudentsManagement = Loadable(lazy(() => import('../pages/StudentsManagement')));
const TeachersManagement = Loadable(lazy(() => import('../pages/TeachersManagement')));
const ClassesManagement = Loadable(lazy(() => import('../pages/ClassesManagement')));
const SubjectsManagement = Loadable(lazy(() => import('../pages/SubjectsManagement')));
const TeacherAllocation = Loadable(lazy(() => import('../pages/TeacherAllocation')));
const StudentAllocation = Loadable(lazy(() => import('../pages/StudentAllocation')));
const TeacherAttendanceView = Loadable(lazy(() => import('../pages/TeacherAttendanceView')));
const StudentAttendanceView = Loadable(lazy(() => import('../pages/StudentAttendanceView')));
const PaymentCalculator = Loadable(lazy(() => import('../pages/PaymentCalculator')));

// ==============================|| ACADEMIC MANAGER DASHBOARD ROUTES ||============================== //

const AdminRoutes = {
  path: '/admin-icims',
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <AdminIcimDashboard />
    },
    {
      path: 'dashboard',
      element: <AdminIcimDashboard />
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
      element: <TeacherAttendanceView />
    },
    {
      path: 'student-attendance',
      element: <StudentAttendanceView />
    }
  ]
};

export default AdminRoutes;
