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
      title: 'Management',
      icon: icons.chart,
      type: 'group',
      children: [
        {
          id: 'students-management',
          title: 'Students Management',
          type: 'collapse',
          icon: icons.students,
          children: [
            {
              id: 'student-details',
              title: "Student Details",
              type: 'item',
              url: '/academic-manager/students',
              icon: icons.students,
              breadcrumbs: true
            },
            {
              id: 'student-class-allocation',
              title: "Student Class Allocation",
              type: 'item',
              url: '/academic-manager/student-class-allocation',
              icon: icons.students,
              breadcrumbs: true
            }
          ]
        },
        {
          id: 'teachers-management',
          title: 'Teachers Management',
          type: 'item',
          url: '/academic-manager/teachers',
          icon: icons.teachers,
          breadcrumbs: true
        },
        {
          id: 'classes-management',
          title: 'Classes Management',
          type: 'item',
          url: '/academic-manager/classes',
          icon: icons.classes,
          breadcrumbs: true
        },
        {
          id: 'subjects-management',
          title: 'Subjects Management',
          type: 'item',
          url: '/academic-manager/subjects',
          icon: icons.subjects,
          breadcrumbs: true
        }
      ]
    },
    {
      id: 'verification',
      title: 'Verification',
      icon: icons.allocation,
      type: 'group',
      children: [
        {
          id: 'verification-status',
          title: 'Student Verification Status',
          type: 'item',
          url: '/academic-manager/verification-status',
          icon: icons.teacherAllocation,
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
          url: '/academic-manager/teacher-allocation',
          icon: icons.teacherAllocation,
          breadcrumbs: true
        },
        {
          id: 'student-allocation',
          title: 'Student Allocation',
          type: 'item',
          url: '/academic-manager/student-allocation',
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
          url: '/academic-manager/teacher-attendance',
          icon: icons.teachers,
          breadcrumbs: true
        },
        {
          id: 'student-attendance-view',
          title: 'Student Attendance',
          type: 'item',
          url: '/academic-manager/student-attendance',
          icon: icons.students,
          breadcrumbs: true
        },
        {
          id: 'class-attendance-view',
          title: 'Class Attendance',
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
