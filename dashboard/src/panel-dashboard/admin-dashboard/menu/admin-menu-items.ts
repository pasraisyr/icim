// assets
import { 
  Profile2User, 
  Teacher, 
  Book, 
  DocumentText, 
  UserAdd, 
  UserEdit, 
  Calendar, 
  Chart, 
  Home,
  DollarCircle,
  Wallet2
} from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  dashboard: Home,
  students: Profile2User,
  teachers: Teacher,
  classes: Book,
  subjects: DocumentText,
  allocation: UserAdd,
  teacherAllocation: UserEdit,
  attendance: Calendar,
  chart: Chart,
  dollarCircle: DollarCircle,
  wallet2: Wallet2
};

// ==============================|| ADMIN DASHBOARD - MENU ITEMS ||============================== //

const adminMenuItems: { items: NavItemType[] } = {
  items: [
    {
      id: 'admin-dashboard',
      title: 'Admin Dashboard',
      icon: icons.dashboard,
      type: 'group',
      children: [
        {
          id: 'admin-icims-dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/admin-icims/dashboard',
          icon: icons.dashboard,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'management',
      title: 'Management',
      icon: icons.chart,
      type: 'group',
      children: [
        {
          id: 'students-management',
          title: 'Students Management',
          type: 'item',
          url: '/admin-icims/students',
          icon: icons.students,
          breadcrumbs: true
        },
        {
          id: 'teachers-management',
          title: 'Teachers Management',
          type: 'item',
          url: '/admin-icims/teachers',
          icon: icons.teachers,
          breadcrumbs: true
        },
        {
          id: 'classes-management',
          title: 'Classes Management',
          type: 'item',
          url: '/admin-icims/classes',
          icon: icons.classes,
          breadcrumbs: true
        },
        {
          id: 'subjects-management',
          title: 'Subjects Management',
          type: 'item',
          url: '/admin-icims/subjects',
          icon: icons.subjects,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'allocation',
      title: 'Allocation',
      icon: icons.allocation,
      type: 'group',
      children: [
        {
          id: 'teacher-allocation',
          title: 'Teacher Allocation',
          type: 'item',
          url: '/admin-icims/teacher-allocation',
          icon: icons.teacherAllocation,
          breadcrumbs: true
        },
        {
          id: 'student-allocation',
          title: 'Student Allocation',
          type: 'item',
          url: '/admin-icims/student-allocation',
          icon: icons.allocation,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'attendance-reports',
      title: 'Attendance Reports',
      icon: icons.attendance,
      type: 'group',
      children: [
        {
          id: 'teacher-attendance-view',
          title: 'Teacher Attendance',
          type: 'item',
          url: '/admin-icims/teacher-attendance',
          icon: icons.teachers,
          breadcrumbs: true
        },
        {
          id: 'student-attendance-view',
          title: 'Student Attendance',
          type: 'item',
          url: '/admin-icims/student-attendance',
          icon: icons.students,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'payment-reports',
      title: 'Payment Reports',
      icon: icons.dollarCircle,
      type: 'group',
      children: [
        {
          id: 'teacher-payment-view',
          title: 'Teacher Payment',
          type: 'item',
          url: '/admin-icims/teacher-payment',
          icon: icons.wallet2,
          breadcrumbs: true
        },
        {
          id: 'student-payment-view',
          title: 'Student Payment',
          type: 'item',
          url: '/admin-icims/student-payment',
          icon: icons.dollarCircle,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default adminMenuItems;
