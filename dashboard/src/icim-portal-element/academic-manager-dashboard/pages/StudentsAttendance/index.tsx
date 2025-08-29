import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from '../../../../components/MainCard';
import AttendanceForm from './components/AttendanceForm';
import AttendanceTable from './components/AttendanceTable';
import { simpleAttendanceAPI } from './api';

const initialAttendance = {};

const StudentsAttendance = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [attendance, setAttendance] = useState<{ [studentId: string]: string }>(initialAttendance);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);

  useEffect(() => {
    // Fetch classes on mount
    setLoading(true);
    simpleAttendanceAPI.getStudents()
      .then((studentData) => {
        setStudents(studentData);
      })
      .catch(() => setError('Failed to fetch students'))
      .finally(() => setLoading(false));
  }, []);

 useEffect(() => {
    // Fetch attendance records for selected student
    if (selectedStudent) {
      setLoading(true);
      simpleAttendanceAPI.getSubmittedAttendance(selectedStudent)
        .then((attendanceData) => {
          setAttendanceRecords(attendanceData);
        })
        .catch(() => setError('Failed to fetch attendance records'))
        .finally(() => setLoading(false));
    } else {
      setAttendanceRecords([]);
    }
  }, [selectedStudent]);


  const handleStudentChange = (id: string) => {
    setSelectedStudent(id);
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
            students={students}
            selectedStudent={selectedStudent}
            loading={loading}
            error={error}
            success={success}
            onStudentChange={handleStudentChange}
          />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Attendance Records">
          <AttendanceTable
            records={attendanceRecords}
            students={students}
            selectedStudent={selectedStudent}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default StudentsAttendance;
