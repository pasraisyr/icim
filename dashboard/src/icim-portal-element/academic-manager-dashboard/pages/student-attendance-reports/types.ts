// ==============================|| STUDENT ATTENDANCE REPORTS - TYPES ||============================== //

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
