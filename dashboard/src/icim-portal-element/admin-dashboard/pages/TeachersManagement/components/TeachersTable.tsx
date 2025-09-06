import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Edit, Trash, Teacher as TeacherIcon, Eye } from 'iconsax-react';
import { Teacher } from '../api';

interface TeachersTableProps {
  teachers: Teacher[];
  onEdit: (teacher: Teacher) => void;
  onDelete: (id: number) => void;
}

const TeachersTable = ({ teachers, onEdit, onDelete }: TeachersTableProps) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Join Date</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {teachers.map((teacher) => (
          <TableRow key={teacher.id}>
            <TableCell>
              {teacher.first_name} {teacher.last_name}
            </TableCell>
            <TableCell>{teacher.email}</TableCell>
            <TableCell>{teacher.phone_number}</TableCell>
            <TableCell>
              <Chip 
                label={teacher.status}
                color={teacher.status === 'active' ? 'success' : 'default'}
                size="small"
              />
            </TableCell>
            <TableCell>{teacher.joinDate}</TableCell>
            <TableCell align="center">
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton 
                  size="small" 
                  onClick={() => onEdit(teacher)}
                  color="primary"
                >
                  <Edit size={16} />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => onDelete(teacher.id)}
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

export default TeachersTable;
