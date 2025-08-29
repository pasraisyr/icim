import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import MainCard from '../../../../components/MainCard';
import AttendanceForm from './components/AttendanceForm';
import AttendanceTable from './components/AttendanceTable';
import { simpleAttendanceAPI } from './api';

const initialAttendance = {};

const TeacherAttendance = () => {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [attendance, setAttendance] = useState<{ [studentId: string]: string }>(initialAttendance);
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

  useEffect(() => {
    // Fetch classes when teacher changes
    if (selectedTeacher) {
      setLoading(true);
      simpleAttendanceAPI.getTeacherClasses(selectedTeacher)
        .then((classData) => {
          setClasses(classData);
          setStudents([]);
          setSelectedClass('');
        })
        .catch(() => setError('Failed to fetch classes'))
        .finally(() => setLoading(false));
    }
  }, [selectedTeacher]);

  useEffect(() => {
    // Fetch students when class changes
    if (selectedTeacher && selectedClass) {
      setLoading(true);
      simpleAttendanceAPI.getClassStudents(selectedTeacher, selectedClass)
        .then((studentData) => {
          setStudents(studentData);
        })
        .catch(() => setError('Failed to fetch students'))
        .finally(() => setLoading(false));
    }
  }, [selectedClass, selectedTeacher]);

  const handleTeacherChange = (id: string) => {
    setSelectedTeacher(id);
    setAttendance({});
    setSuccess(null);
    setError(null);
  };

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
      const payload = {
        teacher_id: Number(selectedTeacher),
        class_id: Number(selectedClass),
        date,
        attendance: students.map((s) => ({
          student_id: (s as any).id,
          status: attendance[(s as any).id] || 'absent',
        })),
      };
      await simpleAttendanceAPI.submitAttendance(payload);
  setSuccess('Attendance submitted successfully!');
      // Refresh attendance records
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
            teachers={teachers}
            classes={classes}
            students={students}
            selectedTeacher={selectedTeacher}
            selectedClass={selectedClass}
            date={date}
            attendance={attendance}
            loading={loading}
            error={error}
            success={success}
            onTeacherChange={handleTeacherChange}
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
            selectedTeacher={selectedTeacher}
            teachers={teachers}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default TeacherAttendance;
