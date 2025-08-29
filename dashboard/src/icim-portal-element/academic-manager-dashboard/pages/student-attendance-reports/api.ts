import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==============================|| INTERFACES ||============================== //

export interface Student {
  id: number;
  name: string;
  ic: string;
}

export interface ClassInfo {
  id: number;
  name: string;
  level: string;
  schedule?: string;
  student_count?: number;
}

export interface SessionInfo {
  id: number;
  date: string;
  start_time: string;
  end_time?: string;
  teacher: string;
}

export interface AttendanceInfo {
  status: 'present' | 'absent' | 'late' | 'excused';
  check_in_time?: string;
  notes?: string;
  marked_by?: string;
  marked_at: string;
}

export interface AttendanceRecord {
  id: number;
  student: Student;
  class: ClassInfo;
  session: SessionInfo;
  attendance: AttendanceInfo;
}

export interface StudentSummary {
  student: Student;
  total_sessions: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendance_rate: number;
}

export interface ClassAttendanceOverview {
  class: ClassInfo;
  attendance_stats: {
    total_records: number;
    total_sessions: number;
    present: number;
    absent: number;
    late: number;
    excused: number;
    attendance_rate: number;
  };
}

export interface AttendanceFilters {
  student_id?: number | null;
  class_id?: number | null;
  date_from?: Date | null;
  date_to?: Date | null;
  status?: string | null;
}

export interface ReportView {
  type: 'detailed' | 'summary' | 'overview';
}

// Component Props
export interface AttendanceReportFiltersProps {
  filters: AttendanceFilters;
  students: Student[];
  classes: ClassInfo[];
  onFiltersChange: (filters: AttendanceFilters) => void;
  onGenerateReport: () => void;
  loading?: boolean;
}

export interface AttendanceDetailTableProps {
  records: AttendanceRecord[];
  loading?: boolean;
}

export interface AttendanceSummaryTableProps {
  summaries: StudentSummary[];
  loading?: boolean;
}

export interface ClassOverviewTableProps {
  overviews: ClassAttendanceOverview[];
  loading?: boolean;
}

export interface AttendanceStatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  subtitle?: string;
}

export interface ReportViewSelectorProps {
  currentView: ReportView['type'];
  onViewChange: (view: ReportView['type']) => void;
}

// ==============================|| ATTENDANCE REPORTS API ||============================== //

export const attendanceReportsAPI = {
  
  // Get detailed attendance records with filtering
  getAttendanceRecords: async (filters: AttendanceFilters): Promise<{
    attendance_records: AttendanceRecord[];
    total_records: number;
    filters_applied: AttendanceFilters;
  }> => {
    try {
      const params = new URLSearchParams();
      
      if (filters.student_id) params.append('student_id', filters.student_id.toString());
      if (filters.class_id) params.append('class_id', filters.class_id.toString());
      if (filters.date_from) params.append('date_from', filters.date_from.toISOString().split('T')[0]);
      if (filters.date_to) params.append('date_to', filters.date_to.toISOString().split('T')[0]);
      if (filters.status) params.append('status', filters.status);
      
      const response = await api.get(`/Academic/attendance/students/?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      throw error;
    }
  },

  // Get attendance summary by student
  getAttendanceSummary: async (filters: AttendanceFilters): Promise<{
    student_summaries: StudentSummary[];
    total_students: number;
    filters_applied: AttendanceFilters;
  }> => {
    try {
      const params = new URLSearchParams();
      
      if (filters.student_id) params.append('student_id', filters.student_id.toString());
      if (filters.class_id) params.append('class_id', filters.class_id.toString());
      if (filters.date_from) params.append('date_from', filters.date_from.toISOString().split('T')[0]);
      if (filters.date_to) params.append('date_to', filters.date_to.toISOString().split('T')[0]);
      
      const response = await api.get(`/Academic/attendance/students/summary/?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching attendance summary:', error);
      throw error;
    }
  },

  // Get class attendance overview
  getClassAttendanceOverview: async (filters: Pick<AttendanceFilters, 'date_from' | 'date_to'>): Promise<{
    class_attendance: ClassAttendanceOverview[];
    total_classes: number;
    filters_applied: Pick<AttendanceFilters, 'date_from' | 'date_to'>;
  }> => {
    try {
      const params = new URLSearchParams();
      
      if (filters.date_from) params.append('date_from', filters.date_from.toISOString().split('T')[0]);
      if (filters.date_to) params.append('date_to', filters.date_to.toISOString().split('T')[0]);
      
      const response = await api.get(`/Academic/attendance/classes/overview/?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching class attendance overview:', error);
      throw error;
    }
  },

  // Get all students (for filter dropdown)
  getAllStudents: async (): Promise<Student[]> => {
    try {
      const response = await api.get('/Academic/students/');
      return response.data.map((student: any) => ({
        id: student.id,
        name: student.studentName,
        ic: student.studentIC,
      }));
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  },

  // Get all classes (for filter dropdown)
  getAllClasses: async (): Promise<ClassInfo[]> => {
    try {
      const response = await api.get('/Academic/classes/');
      return response.data.map((cls: any) => ({
        id: cls.id,
        name: cls.name,
        level: cls.level,
        schedule: `${cls.scheduleDay}, ${cls.startTime} - ${cls.endTime}`,
        student_count: cls.student_count || 0,
      }));
    } catch (error) {
      console.error('Error fetching classes:', error);
      throw error;
    }
  },

  // Export attendance data (future enhancement)
  exportAttendanceReport: async (filters: AttendanceFilters, format: 'csv' | 'pdf' = 'csv'): Promise<Blob> => {
    try {
      const params = new URLSearchParams();
      
      if (filters.student_id) params.append('student_id', filters.student_id.toString());
      if (filters.class_id) params.append('class_id', filters.class_id.toString());
      if (filters.date_from) params.append('date_from', filters.date_from.toISOString().split('T')[0]);
      if (filters.date_to) params.append('date_to', filters.date_to.toISOString().split('T')[0]);
      if (filters.status) params.append('status', filters.status);
      params.append('format', format);
      
      const response = await api.get(`/Academic/attendance/export/?${params.toString()}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting attendance report:', error);
      throw error;
    }
  },
};

export default api;
