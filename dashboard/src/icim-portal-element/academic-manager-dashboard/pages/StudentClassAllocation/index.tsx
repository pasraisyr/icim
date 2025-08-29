import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Components
import StudentClassAllocationTable from './components/StudentClassAllocationTable';


// API
import { 
  Class, 
  type StudentAllocation, 
  getClasses, 
  getStudentAllocations,
} from './api';

const StudentClassAllocation = () => {
  const [allocations, setAllocations] = useState<StudentAllocation[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [allAllocationsData, allClassesData] = await Promise.all([
          getStudentAllocations(),
          getClasses()
        ]);
        setAllocations(allAllocationsData);
        setClasses(allClassesData);
      } catch (error) {
        console.error('Error loading data:', error);
        setSnackbar({ open: true, message: 'Failed to load data', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading...</Typography>
      </Box>
    );
  }
  return (
    <Stack spacing={3}>
      <Typography variant="h6">Student Allocations</Typography>
      <StudentClassAllocationTable allocations={allocations} classes={classes} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default StudentClassAllocation;
