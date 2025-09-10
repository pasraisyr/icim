import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Edit, Trash, Profile2User, Eye } from 'iconsax-react';
import { Student } from '../api';

interface StudentsTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

const StudentsTable = ({ students, onEdit, onDelete }: StudentsTableProps) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Student Name</TableCell>
          <TableCell>Guardian Name</TableCell>
          {/* <TableCell>Class</TableCell> */}
          <TableCell>Level</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Enrollment Date</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((student) => (
          <TableRow key={student.id}>
            <TableCell>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Profile2User size={20} />
                {student.first_name} {student.last_name}
              </Stack>
            </TableCell>
            <TableCell>{student.guardianName}</TableCell>
            {/* <TableCell>
              {typeof student.studentClass === 'object' && student.studentClass !== null && 'name' in student.studentClass
                ? (student.studentClass as { name: string }).name
                : String(student.studentClass)}
            </TableCell> */}
            <TableCell>{student.level}</TableCell>
            <TableCell>
              <Chip 
                label={student.status}
                color={student.status === 'active' ? 'success' : 'default'}
                size="small"
              />
            </TableCell>
            <TableCell>{student.enrollmentDate}</TableCell>
            <TableCell align="center">
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton 
                  size="small" 
                  onClick={() => onEdit(student)}
                  color="primary"
                >
                  <Edit size={16} />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => onDelete(student.id)}
                  color="error"
                >
                  <Trash size={16} />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default StudentsTable;
