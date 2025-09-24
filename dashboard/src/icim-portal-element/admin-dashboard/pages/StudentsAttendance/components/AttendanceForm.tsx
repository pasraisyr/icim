
import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, Typography, RadioGroup, FormControlLabel, Radio, Grid, Box, Alert, TextField } from '@mui/material';

interface AttendanceFormProps {
  students: any[];
  selectedStudent: string;
  loading: boolean;
  error: string | null;
  success: string | null;
  onStudentChange: (id: string) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  students,
  selectedStudent,
  error,
  success,
  onStudentChange,
}) => {
  
  return (
    <Box sx={{ width: '100%', p: 2, mt: 4, mb: 4, background: '#fff', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h5" gutterBottom>Attendance Form</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box mb={2}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Student</InputLabel>
          <Select value={selectedStudent} onChange={e => onStudentChange(e.target.value)} label="Student">
            {students.map((s) => (
              <MenuItem key={s.id} value={s.id}>{s.studentName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default AttendanceForm;
