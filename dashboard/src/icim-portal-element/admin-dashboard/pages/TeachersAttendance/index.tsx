import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from '../../../../components/MainCard';
import AttendanceForm from './components/AttendanceForm';
import AttendanceTable from './components/AttendanceTable';
import { simpleAttendanceAPI } from './api';

const initialAttendance = {};

const TeachersAttendance = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [attendance, setAttendance] = useState<{ [teacherId: string]: string }>(initialAttendance);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);

  useEffect(() => {
    // Fetch teachers on mount
    setLoading(true);
    simpleAttendanceAPI.getTeachers()
      .then((teacherData) => {
        setTeachers(teacherData);
      })
      .catch(() => setError('Failed to fetch teachers'))
      .finally(() => setLoading(false));
  }, []);

 useEffect(() => {
    // Fetch attendance records for selected teacher
    if (selectedTeacher) {
      setLoading(true);
      simpleAttendanceAPI.getSubmittedAttendance(selectedTeacher)
        .then((attendanceData) => {
          setAttendanceRecords(attendanceData);
        })
        .catch(() => setError('Failed to fetch attendance records'))
        .finally(() => setLoading(false));
    } else {
      setAttendanceRecords([]);
    }
  }, [selectedTeacher]);

  const handleTeacherChange = (id: string) => {
    setSelectedTeacher(id);
    setAttendance({});
    setSuccess(null);
    setError(null);
  };


  const handleDateChange = (newDate: string) => {
    setDate(newDate);
  };

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Teacher Attendance">
          <AttendanceForm
            teachers={teachers}
            selectedTeacher={selectedTeacher}
            loading={loading}
            error={error}
            success={success}
            onTeacherChange={handleTeacherChange}
          />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Attendance Records">
          <AttendanceTable
            records={attendanceRecords}
            selectedTeacher={selectedTeacher}
            teachers={teachers}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default TeachersAttendance;
