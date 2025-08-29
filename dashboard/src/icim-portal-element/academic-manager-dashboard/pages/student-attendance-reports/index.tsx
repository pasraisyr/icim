
import { useState, useEffect } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// local imports
import { 
  attendanceReportsAPI,
  AttendanceFilters, 
  AttendanceRecord,
  StudentSummary,
  ClassAttendanceOverview,
  Student,
  ClassInfo,
  ReportView
} from './api';
import {
  AttendanceReportFilters,
  AttendanceStatsCard,
  ReportViewSelector,
  AttendanceDetailTable,
  AttendanceSummaryTable,
  ClassOverviewTable
} from './components';

// assets
import { Profile2User, Calendar, TickCircle, CloseSquare } from 'iconsax-react';

const StudentAttendanceReports = () => {
  const [filters, setFilters] = useState<AttendanceFilters>({
    student_id: null,
    class_id: null,
    date_from: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Default to last month
    date_to: new Date(),
    status: null
  });

  const [currentView, setCurrentView] = useState<ReportView['type']>('summary');
  
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  
  // Data states
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [studentSummaries, setStudentSummaries] = useState<StudentSummary[]>([]);
  const [classOverviews, setClassOverviews] = useState<ClassAttendanceOverview[]>([]);
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load initial data on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  // Auto-generate report when view changes
  useEffect(() => {
    if (!dataLoading) {
      generateReport();
    }
  }, [currentView]);

  const loadInitialData = async () => {
    try {
      setDataLoading(true);
      const [studentsData, classesData] = await Promise.all([
        attendanceReportsAPI.getAllStudents(),
        attendanceReportsAPI.getAllClasses()
      ]);
      
      setStudents(studentsData);
      setClasses(classesData);
      
      // Generate initial summary report
      await loadSummaryData();
    } catch (error) {
      console.error('Error loading initial data:', error);
      setError('Failed to load initial data');
    } finally {
      setDataLoading(false);
    }
  };

  const generateReport = async () => {
    try {
      setLoading(true);
      setError(null);

      switch (currentView) {
        case 'detailed':
          await loadDetailedData();
          break;
        case 'summary':
          await loadSummaryData();
          break;
        case 'overview':
          await loadOverviewData();
          break;
      }

      setSuccess('Report generated successfully');
    } catch (error) {
      console.error('Error generating report:', error);
      setError('Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const loadDetailedData = async () => {
    const response = await attendanceReportsAPI.getAttendanceRecords(filters);
    setAttendanceRecords(response.attendance_records);
  };

  const loadSummaryData = async () => {
    const response = await attendanceReportsAPI.getAttendanceSummary(filters);
    setStudentSummaries(response.student_summaries);
  };

  const loadOverviewData = async () => {
    const response = await attendanceReportsAPI.getClassAttendanceOverview({
      date_from: filters.date_from,
      date_to: filters.date_to
    });
    setClassOverviews(response.class_attendance);
  };

  // Calculate overview stats
  const getOverviewStats = () => {
    switch (currentView) {
      case 'detailed':
        const totalRecords = attendanceRecords.length;
        const presentRecords = attendanceRecords.filter(r => r.attendance.status === 'present').length;
        const absentRecords = attendanceRecords.filter(r => r.attendance.status === 'absent').length;
        const lateRecords = attendanceRecords.filter(r => r.attendance.status === 'late').length;
        return { total: totalRecords, present: presentRecords, absent: absentRecords, late: lateRecords };

      case 'summary':
        const totalStudents = studentSummaries.length;
        const totalSessions = studentSummaries.reduce((sum, s) => sum + s.total_sessions, 0);
        const totalPresent = studentSummaries.reduce((sum, s) => sum + s.present, 0);
        const totalAbsent = studentSummaries.reduce((sum, s) => sum + s.absent, 0);
        return { total: totalStudents, present: totalPresent, absent: totalAbsent, late: totalSessions };

      case 'overview':
        const totalClasses = classOverviews.length;
        const totalClassSessions = classOverviews.reduce((sum, c) => sum + c.attendance_stats.total_sessions, 0);
        const totalClassPresent = classOverviews.reduce((sum, c) => sum + c.attendance_stats.present, 0);
        const totalClassAbsent = classOverviews.reduce((sum, c) => sum + c.attendance_stats.absent, 0);
        return { total: totalClasses, present: totalClassPresent, absent: totalClassAbsent, late: totalClassSessions };

      default:
        return { total: 0, present: 0, absent: 0, late: 0 };
    }
  };

  const stats = getOverviewStats();

  const handleCloseError = () => setError(null);
  const handleCloseSuccess = () => setSuccess(null);

  if (dataLoading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Loading attendance data...</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Student Attendance Reports</Typography>
          <ReportViewSelector 
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        </Stack>
      </Grid>

      {/* Filters */}
      <Grid item xs={12}>
        <AttendanceReportFilters
          filters={filters}
          students={students}
          classes={classes}
          onFiltersChange={setFilters}
          onGenerateReport={generateReport}
          loading={loading}
        />
      </Grid>

      {/* Stats Cards */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AttendanceStatsCard
              title={currentView === 'detailed' ? 'Total Records' : currentView === 'summary' ? 'Total Students' : 'Total Classes'}
              value={stats.total}
              icon={<Profile2User size={24} />}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AttendanceStatsCard
              title="Present"
              value={stats.present}
              icon={<TickCircle size={24} />}
              color="success"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AttendanceStatsCard
              title="Absent"
              value={stats.absent}
              icon={<CloseSquare size={24} />}
              color="error"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AttendanceStatsCard
              title={currentView === 'detailed' ? 'Late' : currentView === 'summary' ? 'Total Sessions' : 'Total Sessions'}
              value={stats.late}
              icon={<Calendar size={24} />}
              color="warning"
            />
          </Grid>
        </Grid>
      </Grid>

      {/* Report Content */}
      <Grid item xs={12}>
        {currentView === 'detailed' && (
          <AttendanceDetailTable
            records={attendanceRecords}
            loading={loading}
          />
        )}
        {currentView === 'summary' && (
          <AttendanceSummaryTable
            summaries={studentSummaries}
            loading={loading}
          />
        )}
        {currentView === 'overview' && (
          <ClassOverviewTable
            overviews={classOverviews}
            loading={loading}
          />
        )}
      </Grid>

      {/* Snackbars */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!success} 
        autoHideDuration={3000} 
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default StudentAttendanceReports;
