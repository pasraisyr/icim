import { useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// project-imports
import MainCard from 'components/MainCard';

// types
interface Subject {
  id: string;
  name: string;
  description: string;
  level: 'Form 1' | 'Form 2' | 'Form 3' | 'Form 4' | 'Form 5';
  status: 'active' | 'inactive';
}

interface Class {
  id: string;
  name: string;
  subjects: string[];
  teacher: string;
  room: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  price: number;
  status: 'active' | 'inactive';
}

interface StudentEnrollment {
  studentId: string;
  studentName: string;
  enrolledClasses: string[];
  enrollmentDate: string;
}

// Mock data (same as in ClassesManagement)
const availableSubjects: Subject[] = [
  {
    id: '1',
    name: 'Advanced Mathematics',
    description: 'Calculus, Statistics, and Mathematical Analysis',
    level: 'Form 5',
    status: 'active'
  },
  {
    id: '2',
    name: 'Physics',
    description: 'Mechanics, Thermodynamics, and Electromagnetism',
    level: 'Form 4',
    status: 'active'
  },
  {
    id: '3',
    name: 'Chemistry',
    description: 'Organic and Inorganic Chemistry',
    level: 'Form 4',
    status: 'active'
  },
  {
    id: '4',
    name: 'Literature',
    description: 'English Literature and Creative Writing',
    level: 'Form 4',
    status: 'active'
  },
  {
    id: '5',
    name: 'Islamic Studies',
    description: 'Quran, Hadith, and Islamic Jurisprudence',
    level: 'Form 3',
    status: 'active'
  }
];

const availableClasses: Class[] = [
  {
    id: '1',
    name: 'Form 5 Science A',
    subjects: ['1', '2'],
    teacher: 'Dr. Ahmad Hassan',
    room: 'Lab 101',
    schedule: 'Mon, Wed, Fri - 9:00 AM',
    capacity: 30,
    enrolled: 25,
    price: 280,
    status: 'active'
  },
  {
    id: '2',
    name: 'Form 4 Arts B',
    subjects: ['4'],
    teacher: 'Ms. Sarah Johnson',
    room: 'Room 205',
    schedule: 'Tue, Thu - 2:00 PM',
    capacity: 25,
    enrolled: 18,
    price: 140,
    status: 'active'
  },
  {
    id: '3',
    name: 'Form 3 Science C',
    subjects: ['2', '3'],
    teacher: 'Ms. Fatimah Ali',
    room: 'Lab 203',
    schedule: 'Mon, Wed - 11:00 AM',
    capacity: 28,
    enrolled: 22,
    price: 250,
    status: 'active'
  }
];

// Sample student enrollments
const studentEnrollments: StudentEnrollment[] = [
  {
    studentId: '1',
    studentName: 'Ahmad Farid bin Abdullah',
    enrolledClasses: ['1', '2'],
    enrollmentDate: '2024-09-01'
  },
  {
    studentId: '2',
    studentName: 'Siti Aminah binti Hassan',
    enrolledClasses: ['1'],
    enrollmentDate: '2024-09-01'
  },
  {
    studentId: '3',
    studentName: 'Raj Kumar a/l Suresh',
    enrolledClasses: ['2', '3'],
    enrollmentDate: '2024-09-15'
  }
];

// ==============================|| PAYMENT CALCULATOR ||============================== //

export default function PaymentCalculator() {
  const [selectedStudent, setSelectedStudent] = useState<StudentEnrollment | null>(studentEnrollments[0]);

  // Helper function to get subject names from IDs
  const getSubjectNames = (subjectIds: string[]): string[] => {
    return subjectIds.map(id => {
      const subject = availableSubjects.find(s => s.id === id);
      return subject ? subject.name : 'Unknown Subject';
    });
  };

  // Calculate total monthly payment for a student
  const calculateMonthlyPayment = (enrollment: StudentEnrollment): number => {
    return enrollment.enrolledClasses.reduce((total, classId) => {
      const classItem = availableClasses.find(c => c.id === classId);
      return total + (classItem ? classItem.price : 0);
    }, 0);
  };

  // Get enrolled class details
  const getEnrolledClassDetails = (enrollment: StudentEnrollment) => {
    return enrollment.enrolledClasses.map(classId => {
      return availableClasses.find(c => c.id === classId);
    }).filter(Boolean) as Class[];
  };

  return (
    <Grid container spacing={3}>
      {/* Page Header */}
      <Grid item xs={12}>
        <MainCard>
          <Stack spacing={1}>
            <Typography variant="h4" color="primary">
              Payment Calculator
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Calculate monthly payments based on class enrollments
            </Typography>
          </Stack>
        </MainCard>
      </Grid>

      {/* Student Selection */}
      <Grid item xs={12}>
        <MainCard title="Select Student">
          <Stack direction="row" spacing={2} flexWrap="wrap">
            {studentEnrollments.map((student) => (
              <Button
                key={student.studentId}
                variant={selectedStudent?.studentId === student.studentId ? 'contained' : 'outlined'}
                onClick={() => setSelectedStudent(student)}
              >
                {student.studentName}
              </Button>
            ))}
          </Stack>
        </MainCard>
      </Grid>

      {/* Payment Breakdown */}
      {selectedStudent && (
        <Grid item xs={12}>
          <MainCard title={`Payment Breakdown - ${selectedStudent.studentName}`}>
            <Stack spacing={3}>
              {/* Enrolled Classes */}
              <Stack spacing={2}>
                <Typography variant="h6">Enrolled Classes:</Typography>
                {getEnrolledClassDetails(selectedStudent).map((classItem) => (
                  <Card key={classItem.id} variant="outlined">
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="subtitle1" fontWeight="bold">
                            {classItem.name}
                          </Typography>
                          <Typography variant="h6" color="primary">
                            RM{classItem.price}/month
                          </Typography>
                        </Stack>
                        
                        <Stack spacing={1}>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Teacher:</strong> {classItem.teacher}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Schedule:</strong> {classItem.schedule}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            <strong>Room:</strong> {classItem.room}
                          </Typography>
                        </Stack>

                        <Box>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                            <strong>Subjects covered:</strong>
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap">
                            {getSubjectNames(classItem.subjects).map((subjectName, index) => (
                              <Chip 
                                key={index}
                                label={subjectName}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>

              <Divider />

              {/* Total Payment */}
              <Card sx={{ bgcolor: 'primary.lighter', borderColor: 'primary.main' }} variant="outlined">
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack>
                      <Typography variant="h6">
                        Total Monthly Payment
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Enrolled since: {new Date(selectedStudent.enrollmentDate).toLocaleDateString()}
                      </Typography>
                    </Stack>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      RM{calculateMonthlyPayment(selectedStudent)}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              {/* Payment Breakdown Summary */}
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Summary
                  </Typography>
                  <Stack spacing={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">
                        Total Classes Enrolled:
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {selectedStudent.enrolledClasses.length}
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body2">
                        Total Subjects Covered:
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {Array.from(new Set(
                          getEnrolledClassDetails(selectedStudent)
                            .flatMap(c => c.subjects)
                        )).length}
                      </Typography>
                    </Stack>
                    <Divider />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="body1" fontWeight="bold">
                        Monthly Payment:
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" color="primary">
                        RM{calculateMonthlyPayment(selectedStudent)}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </MainCard>
        </Grid>
      )}
    </Grid>
  );
}
