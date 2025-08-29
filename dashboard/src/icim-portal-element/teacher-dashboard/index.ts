// ==============================|| TEACHER DASHBOARD - MAIN INDEX ||============================== //

// Export all teacher dashboard components from one place
export { default as TeacherLayout } from './layout/TeacherLayout';
export { default as TeacherRoutes } from './routes/TeacherRoutes';
export { default as teacherMenuItems } from './menu/teacher-menu-items';

// Export pages
export { default as TeacherClasses } from './pages/teacher-classes';
export { default as TeacherStudents } from './pages/TeacherStudents';
export { default as TeacherAttendance } from './pages/teacher-attendance';
export { default as TeacherClockIn } from './pages/TeacherClockIn';

// Export components
export { default as TeacherNavigation } from './components/TeacherNavigation';
export { default as TeacherDrawer } from './components/TeacherDrawer';
export { default as TeacherHeader } from './components/TeacherHeader';
export { default as TeacherFooter } from './components/TeacherFooter';
export { default as TeacherDrawerContent } from './components/TeacherDrawerContent';

// Types
export type { ClassData, StudentData, AttendanceRecord, ClockRecord } from './types/teacher-types';
