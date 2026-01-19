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
  Wallet2,
  Global
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
  wallet2: Wallet2,
  global: Global,
};

// ==============================|| ADMIN DASHBOARD - MENU ITEMS ||============================== //

const adminMenuItems: { items: NavItemType[] } = {
  items: [
    // {
    //   id: 'admin-dashboard',
    //   title: 'Admin Dashboard',
    //   icon: icons.dashboard,
    //   type: 'group',
    //   children: [
    //     {
    //       id: 'admin-icims-dashboard',
    //       title: 'Dashboard',
    //       type: 'item',
    //       url: '/admin-icims/dashboard',
    //       icon: icons.dashboard,
    //       breadcrumbs: true
    //     }
    //   ]
    // },
    {
      id: 'management',
      title: 'management',
      icon: icons.chart,
      type: 'group',
      children: [
        {
          id: 'students-management',
          title: 'students-management',
          type: 'collapse',
          icon: icons.students,
          children: [
            {
              id: 'student-details',
              title: "student-details",
              type: 'item',
              url: '/admin-icims/students',
              icon: icons.students,
              breadcrumbs: true
            },
            // {
            //   id: 'student-class-allocation',
            //   title: "Student Class Allocation",
            //   type: 'item',
            //   url: '/admin-icims/student-class-allocation',
            //   icon: icons.students,
            //   breadcrumbs: true
            // }
          ]
        },
        {
          id: 'teachers-management',
          title: 'teachers-management',
          type: 'item',
          url: '/admin-icims/teachers',
          icon: icons.teachers,
          breadcrumbs: true
        },
        {
          id: 'classes-management',
          title: 'classes-management',
          type: 'item',
          url: '/admin-icims/classes',
          icon: icons.classes,
          breadcrumbs: true
        },
        {
          id: 'subjects-management',
          title: 'subjects-management',
          type: 'item',
          url: '/admin-icims/subjects',
          icon: icons.subjects,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'verification',
      title: 'verification',
      icon: icons.allocation,
      type: 'group',
      children: [
        {
          id: 'verification-status',
          title: 'student-verification-status',
          type: 'item',
          url: '/admin-icims/verification-status',
          icon: icons.teacherAllocation,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'payment',
      title: 'payment',
      icon: icons.dollarCircle,
      type: 'group',
      children: [
        // {
        //   id: 'teacher-payment-view',
        //   title: 'Teacher Payment',
        //   type: 'item',
        //   url: '/admin-icims/teacher-payment',
        //   icon: icons.wallet2,
        //   breadcrumbs: true
        // },
        {
          id: 'student-payment-record',
          title: 'student-payment-record',
          type: 'item',
          url: '/admin-icims/student-payment-record',
          icon: icons.dollarCircle,
          breadcrumbs: true
        }
      ]
    },

    {
      id: 'allocation',
      title: 'allocation',
      icon: icons.allocation,
      type: 'group',
      children: [
        {
          id: 'teacher-allocation',
          title: 'teacher-allocation',
          type: 'item',
          url: '/admin-icims/teacher-allocation',
          icon: icons.teacherAllocation,
          breadcrumbs: true
        },
        {
          id: 'student-allocation',
          title: 'student-allocation',
          type: 'item',
          url: '/admin-icims/student-allocation',
          icon: icons.allocation,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'attendance-reports',
      title: 'attendance-reports',
      icon: icons.attendance,
      type: 'group',
      children: [
        {
          id: 'teacher-attendance-view',
          title: 'teacher-attendance',
          type: 'item',
          url: '/admin-icims/teacher-attendance',
          icon: icons.teachers,
          breadcrumbs: true
        },
        {
          id: 'student-attendance-view',
          title: 'student-attendance',
          type: 'item',
          url: '/admin-icims/student-attendance',
          icon: icons.students,
          breadcrumbs: true
        },
        {
          id: 'class-attendance-view',
          title: 'class-attendance',
          type: 'item',
          url: '/admin-icims/classes-attendance',
          icon: icons.classes,
          breadcrumbs: true
        },
      ]
    },
    {
      id: 'website-management',
      title: 'website-management',
      icon: icons.global,
      type: 'group',
      children: [
        {
          id: 'website-management-view',
          title: 'website-management',
          type: 'item',
          url: '/admin-icims/website-management',
          icon: icons.global,
          breadcrumbs: true
        },
        {
          id: 'gallery-management',
          title: 'gallery-management',
          type: 'item',
          url: '/admin-icims/gallery-management',
          icon: icons.global,
          breadcrumbs: true
        },
        {
          id: 'other-payments',
          title: 'other-payments',
          type: 'item',
          url: '/admin-icims/other-payments',
          icon: icons.dollarCircle,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default adminMenuItems;
