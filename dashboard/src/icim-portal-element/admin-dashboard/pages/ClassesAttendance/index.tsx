import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from '../../../../components/MainCard';
import AttendanceForm from './components/AttendanceForm';
import AttendanceTable from './components/AttendanceTable';
import { simpleAttendanceAPI } from './api';

const initialAttendance = {};

const ClassesAttendance = () => {
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
    // Fetch classes on mount
    setLoading(true);
    simpleAttendanceAPI.getClasses()
      .then((classData) => {
        setClasses(classData);
      })
      .catch(() => setError('Failed to fetch classes'))
      .finally(() => setLoading(false));
  }, []);

 useEffect(() => {
    // Fetch attendance records for selected class
    if (selectedClass) {
      setLoading(true);
      simpleAttendanceAPI.getSubmittedAttendance(selectedClass)
        .then((attendanceData) => {
          setAttendanceRecords(attendanceData);
        })
        .catch(() => setError('Failed to fetch attendance records'))
        .finally(() => setLoading(false));
    } else {
      setAttendanceRecords([]);
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

  

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Teacher Attendance">
          <AttendanceForm
            classes={classes}
            selectedClass={selectedClass}
            loading={loading}
            error={error}
            success={success}
            onClassChange={handleClassChange}
          />
        </MainCard>
      </Grid>
      <Grid item xs={12}>
        <MainCard title="Attendance Records">
          <AttendanceTable
            records={attendanceRecords}
            students={students}
            selectedClass={selectedClass}
            classes={classes}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default ClassesAttendance;
