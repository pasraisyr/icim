// ==============================|| TEACHER DASHBOARD - TYPES ||============================== //

export interface ClassData {
  id: string;
  name: string;
  subject: string;
  schedule: string;
  students: number;
  room: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  class: string;
  grade: string;
  attendance: number;
  lastActive: string;
  status: 'active' | 'inactive';
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  date: string;
  class: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string;
  notes?: string;
}

export interface ClockRecord {
  id: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  totalHours?: number;
  status: 'present' | 'absent' | 'partial';
  location?: string;
}

export interface Student {
  id: string;
  name: string;
  avatar?: string;
}
