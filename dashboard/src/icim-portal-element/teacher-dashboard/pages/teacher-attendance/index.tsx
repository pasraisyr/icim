import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from '../../../../components/MainCard';
import AttendanceForm from './components/AttendanceForm';
import AttendanceTable from './components/AttendanceTable';
import attendanceAPI from './api';

const initialAttendance = {};

const TeacherAttendance = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [attendance, setAttendance] = useState<{ [studentId: string]: string }>(initialAttendance);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      attendanceAPI.getMyAttendance(),
      attendanceAPI.getTeacherClasses()
    ])
      .then(([attendanceData, classData]) => {
        setAttendanceRecords(attendanceData);
        setClasses(classData);
      })
      .catch(() => setError('Failed to fetch attendance records or classes'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      attendanceAPI.getStudentsInClass(Number(selectedClass))
        .then(setStudents)
        .catch(() => setError('Failed to fetch students for this class'))
        .finally(() => setLoading(false));
    } else {
      setStudents([]);
    }
  }, [selectedClass]);

  const handleClassChange = (id: string) => {
    setSelectedClass(id);
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

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Submit attendance for each student
      await Promise.all(
        students.map((s: any) =>
          attendanceAPI.inputAttendance({
            student_id: s.id,
            classroom_id: Number(selectedClass),
            status: attendance[s.id] || 'absent',
            date,
          })
        )
      );
      setSuccess('Attendance submitted successfully!');
      // Refresh attendance records
      const attendanceData = await attendanceAPI.getMyAttendance();
      setAttendanceRecords(attendanceData);
    } catch (err) {
      setError('Failed to submit attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Teacher Attendance">
          <AttendanceForm
            classes={classes}
            students={students}
            selectedClass={selectedClass}
            date={date}
            attendance={attendance}
            loading={loading}
            error={error}
            success={success}
            onClassChange={handleClassChange}
            onDateChange={handleDateChange}
            onAttendanceChange={handleAttendanceChange}
            onSubmit={handleSubmit}
          />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Attendance Records">
          <AttendanceTable
            records={attendanceRecords}
            students={students}
            classes={classes}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default TeacherAttendance;
