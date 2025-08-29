// ==============================|| TEACHER CLASSES - TYPES ||============================== //

export interface ClassData {
  id: number;
  name: string;
  subject: string;
  schedule: string;
  students: number;
  room: string;
  status: 'active' | 'completed' | 'upcoming' | 'inactive';
  level: string;
  scheduleDay: string;
  startTime: string;
  endTime: string;
  price: string;
  subjects_taught: string[];
}

export interface TeacherInfo {
  id: number;
  name: string;
  email: string;
}

export interface TeacherClassesData {
  teacher: TeacherInfo;
  classes: ClassData[];
}

export interface ClassCardProps {
  classData: ClassData;
  onViewDetails: (classId: number) => void;
  onTakeAttendance: (classId: number) => void;
}

export interface ClassTableProps {
  classes: ClassData[];
  onViewDetails: (classId: number) => void;
  onTakeAttendance: (classId: number) => void;
}

export interface TeacherSelectProps {
  teacherId: number | null;
  onTeacherChange: (teacherId: number) => void;
  teachers: TeacherInfo[];
  loading?: boolean;
}
