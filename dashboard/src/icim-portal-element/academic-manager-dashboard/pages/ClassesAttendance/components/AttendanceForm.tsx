
import React from 'react';
import {  FormControl, InputLabel, MenuItem, Select, Typography, RadioGroup, FormControlLabel, Radio, Grid, Box, Alert, TextField } from '@mui/material';

interface AttendanceFormProps {
  classes: any[];
  selectedClass: string;
  loading: boolean;
  error: string | null;
  success: string | null;
  onClassChange: (id: string) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({
  classes,
  selectedClass,
  error,
  success,
  onClassChange,
}) => {
  return (
    <Box sx={{ width: '100%', p: 2, mt: 4, mb: 4, background: '#fff', borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h5" gutterBottom>Attendance Form</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box mb={2}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Class</InputLabel>
          <Select value={selectedClass} onChange={e => onClassChange(e.target.value)} label="Class">
            {classes.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default AttendanceForm;
