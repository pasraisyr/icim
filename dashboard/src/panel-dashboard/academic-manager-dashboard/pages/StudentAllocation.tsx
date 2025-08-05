import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

// project-imports
import MainCard from 'components/MainCard';

// assets
import { Profile2User, UserAdd, UserRemove, Book } from 'iconsax-react';

// types
interface Student {
  id: string;
  name: string;
  email: string;
  level: 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4' | 'Form 5';
  status: 'active' | 'inactive';
}

interface Class {
  id: string;
  name: string;
  subjects: string[];
  teacher: string;
  capacity: number;
  enrolled: number;
  price: number;
  status: 'active' | 'inactive';
}

interface StudentAllocation {
  id: string;
  studentId: string;
  classId: string;
  enrollmentDate: string;
  status: 'active' | 'inactive';
}

// mock data
const mockStudents: Student[] = [
  { 
    id: '1', 
    name: 'Ahmad Rahman', 
    email: 'ahmad.rahman@school.edu',
    level: 'Form 5',
    status: 'active'
  },
  { 
    id: '2', 
    name: 'Siti Aminah', 
    email: 'siti.aminah@school.edu',
    level: 'Form 4',
    status: 'active'
  },
  { 
    id: '3', 
    name: 'Muhammad Ali', 
    email: 'muhammad.ali@school.edu',
    level: 'Form 4',
    status: 'active'
  },
  { 
    id: '4', 
    name: 'Fatimah Zahra', 
    email: 'fatimah.zahra@school.edu',
    level: 'Form 5',
    status: 'active'
  },
  { 
    id: '5', 
    name: 'Omar Hassan', 
    email: 'omar.hassan@school.edu',
    level: 'Form 3',
    status: 'active'
  },
  { 
    id: '6', 
    name: 'Aishah Ibrahim', 
    email: 'aishah.ibrahim@school.edu',
    level: 'Form 4',
    status: 'active'
  },
  { 
    id: '7', 
    name: 'Hassan Abdullah', 
    email: 'hassan.abdullah@school.edu',
    level: 'Form 5',
    status: 'active'
  }
];

const mockClasses: Class[] = [
  { 
    id: '1', 
    name: 'Form 5 Science A', 
    subjects: ['1', '2'], // Math & Physics
    teacher: 'Dr. Ahmad Hassan',
    capacity: 30, 
    enrolled: 25,
    price: 280,
    status: 'active'
  },
  { 
    id: '2', 
    name: 'Form 4 Arts B', 
    subjects: ['4'], // Literature
    teacher: 'Ms. Sarah Johnson',
    capacity: 25, 
    enrolled: 18,
    price: 140,
    status: 'active'
  },
  { 
    id: '3', 
    name: 'Form 3 Science C', 
    subjects: ['2', '3'], // Physics & Chemistry
    teacher: 'Ms. Fatimah Ali',
    capacity: 28, 
    enrolled: 22,
    price: 250,
    status: 'active'
  },
  { 
    id: '4', 
    name: 'Form 4 Science A', 
    subjects: ['2', '3'], // Physics & Chemistry
    teacher: 'Dr. Omar Yusuf',
    capacity: 30, 
    enrolled: 15,
    price: 260,
    status: 'active'
  }
];

// Current allocations
const mockAllocations: StudentAllocation[] = [
  {
    id: '1',
    studentId: '1', // Ahmad Rahman
    classId: '1', // Form 5 Science A
    enrollmentDate: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    studentId: '4', // Fatimah Zahra
    classId: '1', // Form 5 Science A
    enrollmentDate: '2024-01-20',
    status: 'active'
  },
  {
    id: '3',
    studentId: '2', // Siti Aminah
    classId: '2', // Form 4 Arts B
    enrollmentDate: '2024-01-10',
    status: 'active'
  }
];

// ==============================|| STUDENT ALLOCATION ||============================== //

export default function StudentAllocation() {
  const [allocations, setAllocations] = useState<StudentAllocation[]>(mockAllocations);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  // Get selected class details
  const selectedClass = mockClasses.find(c => c.id === selectedClassId);

  // Get students already allocated to selected class
  const getAllocatedStudentIds = (classId: string): string[] => {
    return allocations
      .filter(alloc => alloc.classId === classId && alloc.status === 'active')
      .map(alloc => alloc.studentId);
  };

  // Get available students for the selected class (not already allocated)
  const getAvailableStudents = (): Student[] => {
    if (!selectedClassId) return [];
    
    const allocatedStudentIds = getAllocatedStudentIds(selectedClassId);
    return mockStudents.filter(student => 
      student.status === 'active' && 
      !allocatedStudentIds.includes(student.id)
    );
  };

  // Get allocated students for the selected class
  const getAllocatedStudents = (): Student[] => {
    if (!selectedClassId) return [];
    
    const allocatedStudentIds = getAllocatedStudentIds(selectedClassId);
    return mockStudents.filter(student => 
      allocatedStudentIds.includes(student.id)
    );
  };

  // Handle student selection
  const handleStudentSelect = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  // Handle select all students
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const availableStudentIds = getAvailableStudents().map(s => s.id);
      setSelectedStudents(availableStudentIds);
    } else {
      setSelectedStudents([]);
    }
  };

  // Allocate selected students to class
  const handleAllocateStudents = () => {
    if (!selectedClassId || selectedStudents.length === 0) return;

    const newAllocations = selectedStudents.map(studentId => ({
      id: Date.now().toString() + studentId,
      studentId,
      classId: selectedClassId,
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: 'active' as const
    }));

    setAllocations([...allocations, ...newAllocations]);
    setSelectedStudents([]);
  };

  // Remove student from class
  const handleRemoveStudent = (studentId: string) => {
    setAllocations(allocations.map(alloc => 
      alloc.studentId === studentId && alloc.classId === selectedClassId
        ? { ...alloc, status: 'inactive' as const }
        : alloc
    ));
  };

  // Get remaining capacity
  const getRemainingCapacity = (): number => {
    if (!selectedClass) return 0;
    const currentEnrolled = getAllocatedStudents().length;
    return selectedClass.capacity - currentEnrolled;
  };

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <Stack spacing={1}>
            <Typography variant="h4" color="primary">
              Student Allocation
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Select a class and allocate students efficiently
            </Typography>
          </Stack>
        </MainCard>
      </Grid>

      {/* Class Selection */}
      <Grid item xs={12}>
        <MainCard title="Step 1: Select Class">
          <Stack spacing={2}>
            <Typography variant="body2" color="textSecondary">
              Click on any class below to start allocating students
            </Typography>
            
            <Grid container spacing={2}>
              {mockClasses.filter(c => c.status === 'active').map((classItem) => {
                const isSelected = selectedClassId === classItem.id;
                const currentEnrolled = getAllocatedStudentIds(classItem.id).length;
                const remainingSpots = classItem.capacity - currentEnrolled;
                const isFull = currentEnrolled >= classItem.capacity;
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={classItem.id}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        border: isSelected ? 2 : 1,
                        borderColor: isSelected ? 'primary.main' : 'divider',
                        bgcolor: isSelected ? 'primary.lighter' : 'background.paper',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: 2
                        }
                      }}
                      onClick={() => {
                        setSelectedClassId(classItem.id);
                        setSelectedStudents([]);
                      }}
                    >
                      <CardContent>
                        <Stack spacing={2}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Book size={24} color={isSelected ? 'var(--mui-palette-primary-main)' : undefined} />
                            <Typography variant="h6" color={isSelected ? 'primary' : 'text.primary'}>
                              {classItem.name}
                            </Typography>
                          </Stack>
                          
                          <Stack spacing={1}>
                            <Typography variant="body2" color="textSecondary">
                              <strong>Teacher:</strong> {classItem.teacher}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              <strong>Price:</strong> RM{classItem.price}/month
                            </Typography>
                          </Stack>

                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack>
                              <Typography variant="body2" fontWeight="bold">
                                Enrollment
                              </Typography>
                              <Typography variant="h6" color={isFull ? 'error.main' : 'success.main'}>
                                {currentEnrolled}/{classItem.capacity}
                              </Typography>
                            </Stack>
                            
                            <Stack spacing={1}>
                              <Chip 
                                label={isFull ? 'Full' : `${remainingSpots} spots left`}
                                size="small"
                                color={isFull ? 'error' : remainingSpots <= 5 ? 'warning' : 'success'}
                              />
                              {isSelected && (
                                <Chip 
                                  label="Selected"
                                  size="small"
                                  color="primary"
                                  variant="filled"
                                />
                              )}
                            </Stack>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            {selectedClass && (
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>{selectedClass.name}</strong> selected
                  <br />
                  Currently enrolled: {getAllocatedStudents().length} students
                  <br />
                  Available spots: {getRemainingCapacity()} students
                </Typography>
              </Alert>
            )}
          </Stack>
        </MainCard>
      </Grid>

      {/* Student Allocation Section */}
      {selectedClassId && (
        <>
          {/* Available Students */}
          <Grid item xs={12} md={6}>
            <MainCard 
              title={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Available Students</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {getAvailableStudents().length} students available
                  </Typography>
                </Stack>
              }
            >
              <Stack spacing={2}>
                {getAvailableStudents().length > 0 && (
                  <>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Checkbox
                          checked={selectedStudents.length === getAvailableStudents().length && getAvailableStudents().length > 0}
                          indeterminate={selectedStudents.length > 0 && selectedStudents.length < getAvailableStudents().length}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                        <Typography variant="body2">
                          Select All ({selectedStudents.length} selected)
                        </Typography>
                      </Stack>
                      <Button
                        variant="contained"
                        startIcon={<UserAdd />}
                        onClick={handleAllocateStudents}
                        disabled={selectedStudents.length === 0 || getRemainingCapacity() <= 0}
                      >
                        Allocate Selected
                      </Button>
                    </Stack>
                    <Divider />
                  </>
                )}

                {getAvailableStudents().length === 0 ? (
                  <Alert severity="warning">
                    No available students for this class. All eligible students are already allocated.
                  </Alert>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell padding="checkbox">Select</TableCell>
                          <TableCell>Student Name</TableCell>
                          <TableCell>Level</TableCell>
                          <TableCell>Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getAvailableStudents().map((student) => (
                          <TableRow key={student.id}>
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedStudents.includes(student.id)}
                                onChange={(e) => handleStudentSelect(student.id, e.target.checked)}
                                disabled={getRemainingCapacity() <= 0 && !selectedStudents.includes(student.id)}
                              />
                            </TableCell>
                            <TableCell>
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Profile2User size={20} />
                                {student.name}
                              </Stack>
                            </TableCell>
                            <TableCell>{student.level}</TableCell>
                            <TableCell>{student.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Stack>
            </MainCard>
          </Grid>

          {/* Currently Allocated Students */}
          <Grid item xs={12} md={6}>
            <MainCard 
              title={
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">Allocated Students</Typography>
                  <Typography variant="caption" color="textSecondary">
                    {getAllocatedStudents().length}/{selectedClass?.capacity} students
                  </Typography>
                </Stack>
              }
            >
              <Stack spacing={2}>
                {getAllocatedStudents().length === 0 ? (
                  <Alert severity="info">
                    No students allocated to this class yet.
                  </Alert>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Student Name</TableCell>
                          <TableCell>Level</TableCell>
                          <TableCell>Enrollment Date</TableCell>
                          <TableCell align="center">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {getAllocatedStudents().map((student) => {
                          const allocation = allocations.find(a => 
                            a.studentId === student.id && 
                            a.classId === selectedClassId && 
                            a.status === 'active'
                          );
                          return (
                            <TableRow key={student.id}>
                              <TableCell>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Profile2User size={20} />
                                  {student.name}
                                </Stack>
                              </TableCell>
                              <TableCell>{student.level}</TableCell>
                              <TableCell>
                                {allocation ? new Date(allocation.enrollmentDate).toLocaleDateString() : '-'}
                              </TableCell>
                              <TableCell align="center">
                                <IconButton
                                  size="small"
                                  color="error"
                                  onClick={() => handleRemoveStudent(student.id)}
                                >
                                  <UserRemove size={16} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Stack>
            </MainCard>
          </Grid>
        </>
      )}
    </Grid>
  );
}
