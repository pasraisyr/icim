// assets
import { Book, Profile2User, Calendar, Timer } from 'iconsax-react';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  classes: Book,
  students: Profile2User,
  attendance: Calendar,
  clockin: Timer
};

// ==============================|| TEACHER DASHBOARD - MENU ITEMS ||============================== //

const teacherMenuItems: { items: NavItemType[] } = {
  items: [
    {
      id: 'teacher-dashboard',
      title: 'Teacher Dashboard',
      icon: icons.classes,
      type: 'group',
      children: [
        {
          id: 'teacher-classes',
          title: 'My Classes',
          type: 'item',
          url: '/teacher/classes',
          icon: icons.classes,
          breadcrumbs: true
        },
        // {
        //   id: 'teacher-students',
        //   title: 'My Students',
        //   type: 'item',
        //   url: '/teacher/students',
        //   icon: icons.students,
        //   breadcrumbs: true
        // },
        {
          id: 'teacher-attendance',
          title: 'Attendance',
          type: 'item',
          url: '/teacher/attendance',
          icon: icons.attendance,
          breadcrumbs: true
        },
        {
          id: 'teacher-clockin',
          title: 'Clock In/Out',
          type: 'item',
          url: '/teacher/clock-in',
          icon: icons.clockin,
          breadcrumbs: true
        }
      ]
    }
  ]
};

export default teacherMenuItems;
