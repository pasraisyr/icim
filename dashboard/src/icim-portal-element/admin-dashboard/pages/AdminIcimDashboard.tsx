import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';
import EcommerceDataCard from 'components/cards/statistics/EcommerceDataCard';
import { GRID_COMMON_SPACING } from 'config';

// assets
import { 
  Profile2User, 
  Teacher, 
  Book, 
  DocumentText, 
  Calendar,
  ArrowUp,
  ArrowDown
} from 'iconsax-react';

// ==============================|| ADMIN ICIM DASHBOARD ||============================== //

export default function AdminIcimDashboard() {
  const theme = useTheme();

  // Mock data - replace with actual API calls
  const [dashboardData] = useState({
    totalStudents: 1456,
    totalTeachers: 87,
    totalClasses: 45,
    totalSubjects: 23,
    studentsGrowth: 12.5,
    teachersGrowth: 8.2,
    classesGrowth: 6.7,
    subjectsGrowth: 15.3
  });

  return (
    <Grid container spacing={GRID_COMMON_SPACING}>
      {/* Page Header */}
      <Grid size={12}>
        <MainCard>
          <Stack spacing={2}>
            <Typography variant="h4" color="primary">
              Admin ICIM Dashboard
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Manage students, teachers, classes, and academic operations
            </Typography>
          </Stack>
        </MainCard>
      </Grid>

      {/* Statistics Cards */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <EcommerceDataCard
          title="Total Students"
          count={dashboardData.totalStudents.toLocaleString()}
          iconPrimary={<Profile2User />}
          percentage={
            <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> {dashboardData.studentsGrowth}%
            </Typography>
          }
        >
          <Box />
        </EcommerceDataCard>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <EcommerceDataCard
          title="Total Teachers"
          count={dashboardData.totalTeachers.toString()}
          color="warning"
          iconPrimary={<Teacher />}
          percentage={
            <Typography sx={{ color: 'warning.dark', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> {dashboardData.teachersGrowth}%
            </Typography>
          }
        >
          <Box />
        </EcommerceDataCard>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <EcommerceDataCard
          title="Total Classes"
          count={dashboardData.totalClasses.toString()}
          color="success"
          iconPrimary={<Book />}
          percentage={
            <Typography sx={{ color: 'success.darker', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> {dashboardData.classesGrowth}%
            </Typography>
          }
        >
          <Box />
        </EcommerceDataCard>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <EcommerceDataCard
          title="Total Subjects"
          count={dashboardData.totalSubjects.toString()}
          color="error"
          iconPrimary={<DocumentText />}
          percentage={
            <Typography sx={{ color: 'error.dark', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ArrowUp size={16} style={{ transform: 'rotate(45deg)' }} /> {dashboardData.subjectsGrowth}%
            </Typography>
          }
        >
          <Box />
        </EcommerceDataCard>
      </Grid>

      {/* Quick Actions */}
      {/* <Grid size={{ xs: 12, md: 6 }}>
        <MainCard title="Quick Actions">
          <Stack spacing={2}>
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Profile2User size={24} />
                  <Box>
                    <Typography variant="h6">Student Management</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Add, edit, or remove students
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
            
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Teacher size={24} />
                  <Box>
                    <Typography variant="h6">Teacher Management</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Manage teacher profiles and assignments
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
            
            <Card variant="outlined">
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Calendar size={24} />
                  <Box>
                    <Typography variant="h6">Attendance Reports</Typography>
                    <Typography variant="body2" color="textSecondary">
                      View teacher and student attendance
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </MainCard>
      </Grid> */}

      {/* Recent Activities
      <Grid size={{ xs: 12, md: 6 }}>
        <MainCard title="Recent Activities">
          <Stack spacing={2}>
            <Box sx={{ borderLeft: 3, borderColor: 'primary.main', pl: 2, py: 1 }}>
              <Typography variant="subtitle2">New teacher registered</Typography>
              <Typography variant="body2" color="textSecondary">
                Sarah Johnson joined Mathematics department
              </Typography>
              <Typography variant="caption" color="textSecondary">2 hours ago</Typography>
            </Box>
            
            <Box sx={{ borderLeft: 3, borderColor: 'warning.main', pl: 2, py: 1 }}>
              <Typography variant="subtitle2">Class schedule updated</Typography>
              <Typography variant="body2" color="textSecondary">
                Physics class moved to Lab 204
              </Typography>
              <Typography variant="caption" color="textSecondary">5 hours ago</Typography>
            </Box>
            
            <Box sx={{ borderLeft: 3, borderColor: 'success.main', pl: 2, py: 1 }}>
              <Typography variant="subtitle2">25 new students enrolled</Typography>
              <Typography variant="body2" color="textSecondary">
                Batch admission completed successfully
              </Typography>
              <Typography variant="caption" color="textSecondary">1 day ago</Typography>
            </Box>
            
            <Box sx={{ borderLeft: 3, borderColor: 'error.main', pl: 2, py: 1 }}>
              <Typography variant="subtitle2">Subject curriculum updated</Typography>
              <Typography variant="body2" color="textSecondary">
                Computer Science curriculum revised
              </Typography>
              <Typography variant="caption" color="textSecondary">2 days ago</Typography>
            </Box>
          </Stack>
        </MainCard>
      </Grid> */}
    </Grid>
  );
}
