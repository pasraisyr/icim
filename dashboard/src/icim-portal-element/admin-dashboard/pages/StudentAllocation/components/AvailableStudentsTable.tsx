import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import { Profile2User, UserAdd } from 'iconsax-react';
import { Student } from '../api';

interface AvailableStudentsTableProps {
  students: Student[];
  selectedStudents: number[];
  remainingCapacity: number;
  onStudentSelect: (studentId: number, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onAllocateStudents: () => void;
}

const AvailableStudentsTable = ({ 
  students, 
  selectedStudents, 
  remainingCapacity,
  onStudentSelect, 
  onSelectAll, 
  onAllocateStudents 
}: AvailableStudentsTableProps) => {
  const isAllSelected = selectedStudents.length === students.length && students.length > 0;
  const isIndeterminate = selectedStudents.length > 0 && selectedStudents.length < students.length;

  if (students.length === 0) {
    return (
      <Alert severity="warning">
        No available students for this class. All eligible students are already allocated.
      </Alert>
    );
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Checkbox
            checked={isAllSelected}
            indeterminate={isIndeterminate}
            onChange={(e) => onSelectAll(e.target.checked)}
          />
          <Typography variant="body2">
            Select All ({selectedStudents.length} selected)
          </Typography>
        </Stack>
        <Button
          variant="contained"
          startIcon={<UserAdd />}
          onClick={onAllocateStudents}
          disabled={selectedStudents.length === 0 || remainingCapacity <= 0}
        >
          Allocate Selected
        </Button>
      </Stack>
      <Divider />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">Select</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) => onStudentSelect(student.id, e.target.checked)}
                    disabled={remainingCapacity <= 0 && !selectedStudents.includes(student.id)}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Profile2User size={20} />
                    {student.first_name} {student.last_name}
                  </Stack>
                </TableCell>
                <TableCell>{student.level}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default AvailableStudentsTable;
