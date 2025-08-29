// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// project-imports
import MainCard from 'components/MainCard';

// types
import type { AttendanceSummaryTableProps } from '../api';

// ==============================|| ATTENDANCE SUMMARY TABLE ||============================== //

const AttendanceSummaryTable = ({
  summaries,
  loading = false
}: AttendanceSummaryTableProps) => {

  const getAttendanceRateColor = (rate: number) => {
    if (rate >= 90) return 'success';
    if (rate >= 75) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <MainCard title="Student Attendance Summary" content={false}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  return (
    <MainCard title={`Student Attendance Summary (${summaries.length} students)`} content={false}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell align="center">Total Sessions</TableCell>
              <TableCell align="center">Present</TableCell>
              <TableCell align="center">Absent</TableCell>
              <TableCell align="center">Late</TableCell>
              <TableCell align="center">Excused</TableCell>
              <TableCell>Attendance Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {summaries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    No student data found for the selected criteria
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              summaries.map((summary) => (
                <TableRow key={summary.student.id} hover>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle2">
                        {summary.student.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {summary.student.ic}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">
                      {summary.total_sessions}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={summary.present} 
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={summary.absent} 
                      color="error"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={summary.late} 
                      color="warning"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={summary.excused} 
                      color="info"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" color={`${getAttendanceRateColor(summary.attendance_rate)}.main`}>
                          {summary.attendance_rate}%
                        </Typography>
                        <Chip 
                          label={
                            summary.attendance_rate >= 90 ? 'Excellent' : 
                            summary.attendance_rate >= 75 ? 'Good' : 'Needs Improvement'
                          }
                          color={getAttendanceRateColor(summary.attendance_rate) as any}
                          size="small"
                        />
                      </Stack>
                      <LinearProgress 
                        variant="determinate" 
                        value={summary.attendance_rate}
                        color={getAttendanceRateColor(summary.attendance_rate) as any}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

export default AttendanceSummaryTable;
