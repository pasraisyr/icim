
import React from 'react';
import {  FormControl, InputLabel, MenuItem, Select, Typography, RadioGroup, FormControlLabel, Radio, Grid, Box, Alert, TextField } from '@mui/material';

interface AttendanceFormProps {
  teachers: any[];
  selectedTeacher: string;
  loading: boolean;
  error: string | null;
  success: string | null;
  onTeacherChange: (id: string) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  teachers,
  selectedTeacher,
  error,
  success,
  onTeacherChange,
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
              <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default AttendanceForm;
