
import React from 'react';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography, RadioGroup, FormControlLabel, Radio, Grid, Box, Alert, TextField } from '@mui/material';

interface AttendanceFormProps {
  teachers: any[];
  classes: any[];
  students: any[];
  selectedTeacher: string;
  selectedClass: string;
  date: string;
  attendance: { [studentId: string]: string };
  loading: boolean;
  error: string | null;
  success: string | null;
  onTeacherChange: (id: string) => void;
  onClassChange: (id: string) => void;
  onDateChange: (date: string) => void;
  onAttendanceChange: (studentId: string, status: string) => void;
  onSubmit: () => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  teachers,
  classes,
  students,
  selectedTeacher,
  selectedClass,
  date,
  attendance,
  loading,
  error,
  success,
  onTeacherChange,
  onClassChange,
  onDateChange,
  onAttendanceChange,
  onSubmit,
}) => {
  return (
    <Box sx={{ width: '100%', p: 2, mt: 4, mb: 4, background: '#fff', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h5" gutterBottom>Attendance Form</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box mb={2}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Teacher</InputLabel>
          <Select value={selectedTeacher} onChange={e => onTeacherChange(e.target.value)} label="Teacher">
            {teachers.map((t) => (
              <MenuItem key={t.id} value={t.id}>{t.first_name} {t.last_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }} disabled={!selectedTeacher}>
          <InputLabel>Class</InputLabel>
          <Select value={selectedClass} onChange={e => onClassChange(e.target.value)} label="Class">
            {classes.map((c: any) => (
              <MenuItem key={c.class_obj.id} value={c.class_obj.id}>{c.class_obj.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={e => onDateChange(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Box>
      {students.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>Mark Attendance</Typography>
          <Grid container spacing={2}>
            {students.map((student: any) => (
              <Grid item xs={12} key={student.id}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography>{student.studentName || student.name}</Typography>
                  <RadioGroup
                    row
                    value={attendance[student.id] || 'absent'}
                    onChange={e => onAttendanceChange(student.id, e.target.value)}
                  >
                    <FormControlLabel value="present" control={<Radio />} label="Present" />
                    <FormControlLabel value="absent" control={<Radio />} label="Absent" />
                  </RadioGroup>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      <Box mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={loading || !selectedTeacher || !selectedClass || !date || students.length === 0}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit Attendance'}
        </Button>
      </Box>
    </Box>
  );
};

export default AttendanceForm;
