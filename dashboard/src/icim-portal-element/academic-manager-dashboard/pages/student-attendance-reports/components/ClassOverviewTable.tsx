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
import type { ClassOverviewTableProps } from '../api';

// ==============================|| CLASS OVERVIEW TABLE ||============================== //

const ClassOverviewTable = ({
  overviews,
  loading = false
}: ClassOverviewTableProps) => {

  const getAttendanceRateColor = (rate: number) => {
    if (rate >= 90) return 'success';
    if (rate >= 75) return 'warning';
    return 'error';
  };

  if (loading) {
    return (
      <MainCard title="Class Attendance Overview" content={false}>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  return (
    <MainCard title={`Class Attendance Overview (${overviews.length} classes)`} content={false}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class</TableCell>
              <TableCell align="center">Students</TableCell>
              <TableCell align="center">Sessions</TableCell>
              <TableCell align="center">Total Records</TableCell>
              <TableCell align="center">Present</TableCell>
              <TableCell align="center">Absent</TableCell>
              <TableCell align="center">Late</TableCell>
              <TableCell>Attendance Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {overviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    No class data found for the selected criteria
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              overviews.map((overview) => (
                <TableRow key={overview.class.id} hover>
                  <TableCell>
                    <Stack spacing={0.5}>
                      <Typography variant="subtitle2">
                        {overview.class.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {overview.class.level}
                      </Typography>
                      {overview.class.schedule && (
                        <Typography variant="caption" color="text.secondary">
                          {overview.class.schedule}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">
                      {overview.class.student_count}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {overview.attendance_stats.total_sessions}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2">
                      {overview.attendance_stats.total_records}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={overview.attendance_stats.present} 
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={overview.attendance_stats.absent} 
                      color="error"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Chip 
                        label={overview.attendance_stats.late} 
                        color="warning"
                        size="small"
                        variant="outlined"
                      />
                      <Chip 
                        label={overview.attendance_stats.excused} 
                        color="info"
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" color={`${getAttendanceRateColor(overview.attendance_stats.attendance_rate)}.main`}>
                          {overview.attendance_stats.attendance_rate}%
                        </Typography>
                        <Chip 
                          label={
                            overview.attendance_stats.attendance_rate >= 90 ? 'Excellent' : 
                            overview.attendance_stats.attendance_rate >= 75 ? 'Good' : 'Needs Attention'
                          }
                          color={getAttendanceRateColor(overview.attendance_stats.attendance_rate) as any}
                          size="small"
                        />
                      </Stack>
                      <LinearProgress 
                        variant="determinate" 
                        value={overview.attendance_stats.attendance_rate}
                        color={getAttendanceRateColor(overview.attendance_stats.attendance_rate) as any}
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

export default ClassOverviewTable;
