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
  Home 
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
  chart: Chart
};

// ==============================|| ACADEMIC MANAGER DASHBOARD - MENU ITEMS ||============================== //

const academicManagerMenuItems: { items: NavItemType[] } = {
  items: [
    // {
    //   id: 'academic-manager-dashboard',
    //   title: 'Academic Manager',
    //   icon: icons.dashboard,
    //   type: 'group',
    //   children: [
    //     {
    //       id: 'manager-dashboard',
    //       title: 'Dashboard',
    //       type: 'item',
    //       url: '/academic-manager/dashboard',
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
              url: '/academic-manager/students',
              icon: icons.students,
              breadcrumbs: true
            },
            {
              id: 'student-class-allocation',
              title: "student-class-allocation",
              type: 'item',
              url: '/academic-manager/student-class-allocation',
              icon: icons.students,
              breadcrumbs: true
            }
          ]
        },
        {
          id: 'teachers-management',
          title: 'teachers-management',
          type: 'item',
          url: '/academic-manager/teachers',
          icon: icons.teachers,
          breadcrumbs: true
        },
        {
          id: 'classes-management',
          title: 'classes-management',
          type: 'item',
          url: '/academic-manager/classes',
          icon: icons.classes,
          breadcrumbs: true
        },
        {
          id: 'subjects-management',
          title: 'subjects-management',
          type: 'item',
          url: '/academic-manager/subjects',
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
          url: '/academic-manager/verification-status',
          icon: icons.teacherAllocation,
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
          url: '/academic-manager/teacher-allocation',
          icon: icons.teacherAllocation,
          breadcrumbs: true
        },
        {
          id: 'student-allocation',
          title: 'student-allocation',
          type: 'item',
          url: '/academic-manager/student-allocation',
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
          url: '/academic-manager/teacher-attendance',
          icon: icons.teachers,
          breadcrumbs: true
        },
        {
          id: 'student-attendance-view',
          title: 'student-attendance',
          type: 'item',
          url: '/academic-manager/student-attendance',
          icon: icons.students,
          breadcrumbs: true
        },
        {
          id: 'class-attendance-view',
          title: 'class-attendance',
          type: 'item',
          url: '/academic-manager/classes-attendance',
          icon: icons.classes,
          breadcrumbs: true
        },
      ]
    }
  ]
};

export default academicManagerMenuItems;
