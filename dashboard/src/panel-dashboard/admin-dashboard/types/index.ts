// ==============================|| ADMIN DASHBOARD - TYPES ||============================== //

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  class: string;
  status: 'active' | 'inactive';
  enrollmentDate: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  experience: number;
  status: 'active' | 'inactive';
  joinDate: string;
}

export interface Class {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  room: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  status: 'active' | 'inactive';
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  department: string;
  level: 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4' | 'Form 5';
  status: 'active' | 'inactive';
}

export interface TeacherAllocation {
  id: string;
  teacherId: string;
  teacherName: string;
  subjectId: string;
  subjectName: string;
  classId: string;
  className: string;
  schedule: string;
  room: string;
  status: 'active' | 'inactive';
}

export interface StudentAllocation {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
}

export interface TeacherAttendance {
  id: string;
  teacherId: string;
  teacherName: string;
  date: string;
  clockIn: string;
  clockOut: string;
  status: 'present' | 'absent' | 'late' | 'half-day';
  hoursWorked: number;
  subject: string;
}

export interface StudentAttendance {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  className: string;
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn: string;
  remarks?: string;
}
