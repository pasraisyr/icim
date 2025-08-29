import { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Components
import PageHeader from './components/PageHeader';
import ClassSelection from './components/ClassSelection';
import AvailableStudentsTable from './components/AvailableStudentsTable';
import AllocatedStudentsTable from './components/AllocatedStudentsTable';

// API
import { 
  Student, 
  Class, 
  type StudentAllocation, 
  getStudents, 
  getClasses, 
  getStudentAllocations,
  allocateStudent,
  deallocateStudent
} from './api';

const StudentAllocation = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [allocations, setAllocations] = useState<StudentAllocation[]>([]);
  const [availableStudents, setAvailableStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [selectedAllocations, setSelectedAllocations] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [classesData, studentsData, allAllocationsData] = await Promise.all([
          getClasses(),
          getStudents(),
          getStudentAllocations() // Fetch ALL allocations without classId filter
        ]);
        setClasses(classesData);
        setStudents(studentsData);
        setAllocations(allAllocationsData);
      } catch (error) {
        console.error('Error loading data:', error);
        setSnackbar({ open: true, message: 'Failed to load data', severity: 'error' });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Load allocations when class is selected
  useEffect(() => {
    if (selectedClass && allocations.length > 0) {
      // Filter allocations for the selected class
      const classAllocations = allocations.filter(allocation => allocation.class_obj.id === selectedClass.id);
      
      // Filter available students (not already allocated to this class)
      const allocatedStudentIds = classAllocations.map((a: StudentAllocation) => a.student.id);
      const available = students.filter(student => !allocatedStudentIds.includes(student.id));
      setAvailableStudents(available);
    } else {
      setAvailableStudents([]);
    }
  }, [selectedClass, students, allocations]);

  const handleAllocateStudents = async () => {
    if (!selectedClass || selectedStudents.length === 0) return;

    try {
      await Promise.all(
        selectedStudents.map(studentId => 
          allocateStudent({
            student_id: studentId,
            class_obj_id: selectedClass.id
          })
        )
      );

      setSnackbar({ 
        open: true, 
        message: `Successfully allocated ${selectedStudents.length} student(s)`, 
        severity: 'success' 
      });
      
      setSelectedStudents([]);
      // Refresh all allocations
      const updatedAllocations = await getStudentAllocations();
      setAllocations(updatedAllocations);
    } catch (error) {
      console.error('Error allocating students:', error);
      setSnackbar({ open: true, message: 'Failed to allocate students', severity: 'error' });
    }
  };

  const handleDeallocateStudents = async () => {
    if (selectedAllocations.length === 0) return;

    try {
      await Promise.all(
        selectedAllocations.map(allocationId => deallocateStudent(allocationId))
      );

      setSnackbar({ 
        open: true, 
        message: `Successfully removed ${selectedAllocations.length} student(s)`, 
        severity: 'success' 
      });
      
      setSelectedAllocations([]);
      // Refresh all allocations
      const updatedAllocations = await getStudentAllocations();
      setAllocations(updatedAllocations);
    } catch (error) {
      console.error('Error deallocating students:', error);
      setSnackbar({ open: true, message: 'Failed to remove students', severity: 'error' });
    }
  };

  const handleStudentSelect = (studentId: number, checked: boolean) => {
    setSelectedStudents(prev => 
      checked 
        ? [...prev, studentId]
        : prev.filter(id => id !== studentId)
    );
  };

  const handleStudentSelectAll = (checked: boolean) => {
    setSelectedStudents(checked ? availableStudents.map(s => s.id) : []);
  };

  const handleAllocationSelect = (allocationId: number, checked: boolean) => {
    setSelectedAllocations(prev => 
      checked 
        ? [...prev, allocationId]
        : prev.filter(id => id !== allocationId)
    );
  };

  const handleClassSelect = (classId: number) => {
    const selectedClassObj = classes.find(c => c.id === classId);
    setSelectedClass(selectedClassObj || null);
  };

  const handleAllocationSelectAll = (checked: boolean) => {
    setSelectedAllocations(checked ? allocations.map(a => a.id) : []);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={3}>
      <PageHeader />
      
      <ClassSelection
        classes={classes}
        selectedClassId={selectedClass?.id || null}
        allocations={allocations}
        onClassSelect={handleClassSelect}
      />

      {selectedClass && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h6">Available Students</Typography>
              <AvailableStudentsTable
                students={selectedClass && allocations.length === 0 ? students : availableStudents}
                selectedStudents={selectedStudents}
                remainingCapacity={Math.max(0, 30 - allocations.length)} // Assuming max 30 students per class
                onStudentSelect={handleStudentSelect}
                onSelectAll={handleStudentSelectAll}
                onAllocateStudents={handleAllocateStudents}
              />
            </Stack>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography variant="h6">Allocated Students</Typography>
              <AllocatedStudentsTable
                allocations={allocations.filter(allocation => allocation.class_obj.id === selectedClass.id)}
                selectedAllocations={selectedAllocations}
                onAllocationSelect={handleAllocationSelect}
                onSelectAll={handleAllocationSelectAll}
                onDeallocateStudents={handleDeallocateStudents}
              />
            </Stack>
          </Grid>
        </Grid>
      )}

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

export default StudentAllocation;
