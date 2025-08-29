// material-ui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

// assets
import { Profile2User, Book, Calendar, DocumentDownload } from 'iconsax-react';

// types
import type { AttendanceReportFiltersProps } from '../api';

// ==============================|| ATTENDANCE REPORT FILTERS ||============================== //

const AttendanceReportFilters = ({
  filters,
  students,
  classes,
  onFiltersChange,
  onGenerateReport,
  loading = false
}: AttendanceReportFiltersProps) => {
  
  const handleStudentChange = (studentId: number | '') => {
    onFiltersChange({
      ...filters,
      student_id: studentId === '' ? null : studentId
    });
  };

  const handleClassChange = (classId: number | '') => {
    onFiltersChange({
      ...filters,
      class_id: classId === '' ? null : classId
    });
  };

  const handleDateFromChange = (date: string) => {
    onFiltersChange({
      ...filters,
      date_from: date ? new Date(date) : null
    });
  };

  const handleDateToChange = (date: string) => {
    onFiltersChange({
      ...filters,
      date_to: date ? new Date(date) : null
    });
  };

  const handleStatusChange = (status: string) => {
    onFiltersChange({
      ...filters,
      status: status === '' ? null : status
    });
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          {/* First Row */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Student</InputLabel>
              <Select
                value={filters.student_id || ''}
                onChange={(e) => handleStudentChange(e.target.value as number | '')}
                label="Student"
                startAdornment={<Profile2User size={16} style={{ marginRight: 8 }} />}
              >
                <MenuItem value="">All Students</MenuItem>
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student.name} ({student.ic})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select
                value={filters.class_id || ''}
                onChange={(e) => handleClassChange(e.target.value as number | '')}
                label="Class"
                startAdornment={<Book size={16} style={{ marginRight: 8 }} />}
              >
                <MenuItem value="">All Classes</MenuItem>
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name} - {cls.level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date From"
              type="date"
              value={filters.date_from?.toISOString().split('T')[0] || ''}
              onChange={(e) => handleDateFromChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <Calendar size={16} style={{ marginRight: 8 }} />
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Date To"
              type="date"
              value={filters.date_to?.toISOString().split('T')[0] || ''}
              onChange={(e) => handleDateToChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: <Calendar size={16} style={{ marginRight: 8 }} />
              }}
            />
          </Grid>

          {/* Second Row */}
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status || ''}
                onChange={(e) => handleStatusChange(e.target.value)}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="present">Present</MenuItem>
                <MenuItem value="absent">Absent</MenuItem>
                <MenuItem value="late">Late</MenuItem>
                <MenuItem value="excused">Excused</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={9}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end" sx={{ height: '100%' }}>
              <Button 
                variant="outlined" 
                startIcon={loading ? <CircularProgress size={16} /> : <DocumentDownload />}
                onClick={onGenerateReport}
                disabled={loading}
                size="large"
              >
                {loading ? 'Generating...' : 'Generate Report'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AttendanceReportFilters;
