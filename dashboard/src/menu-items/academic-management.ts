// assets
import { 
  Profile2User, 
  Teacher, 
  Book, 
  DocumentText, 
  UserAdd,
  Calendar,
  Home
} from 'iconsax-react';

// types
import { NavItemType } from 'types/menu';

// icons
const icons = {
  dashboard: Home,
  management: Teacher,
  students: Profile2User,
  teachers: Teacher,
  classes: Book,
  subjects: DocumentText,
  allocation: UserAdd,
  attendance: Calendar
};

// ==============================|| MENU ITEMS - ACADEMIC MANAGEMENT ||============================== //

const academicManagement: NavItemType = {
  id: 'group-academic-management',
  title: 'academic-management',
  icon: icons.management,
  type: 'group',
  children: [
    {
      id: 'academic-manager-portal',
      title: 'academic-manager-portal',
      type: 'item',
      icon: icons.dashboard,
      url: '/academic-manager/students',
      breadcrumbs: true
    },
    {
      id: 'teacher-portal',
      title: 'teacher-portal',
      type: 'item',
      icon: icons.teachers,
      url: '/teacher/classes',
      breadcrumbs: true
    }
  ]
};

export default academicManagement;
