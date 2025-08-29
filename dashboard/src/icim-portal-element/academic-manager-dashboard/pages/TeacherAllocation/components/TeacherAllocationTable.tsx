import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Edit, Trash, Teacher as TeacherIcon } from 'iconsax-react';

import { TeacherAllocationData, Teacher, Class, Subject } from '../api';


interface TeacherAllocationTableProps {
  allocations: TeacherAllocationData[];
  onEdit: (allocation: TeacherAllocationData) => void;
  onDelete: (id: number) => void;
  getTeacherName: (teacher: Teacher) => string;
  getClassName: (classObj: Class) => string;
  getSubjectNames: (subjects: Subject[]) => string[];
}


const TeacherAllocationTable = ({ allocations, onEdit, onDelete, getTeacherName, getClassName, getSubjectNames }: TeacherAllocationTableProps) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Teacher</TableCell>
          <TableCell>Class</TableCell>
          <TableCell>Subjects</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allocations.map((allocation) => (
          <TableRow key={allocation.id}>
            <TableCell>
              <Stack direction="row" alignItems="center" spacing={2}>
                <TeacherIcon size={20} />
                {getTeacherName(allocation.teacher)}
              </Stack>
            </TableCell>
            <TableCell>{getClassName(allocation.class_obj)}</TableCell>
            <TableCell>{getSubjectNames(allocation.subjects).join(', ')}</TableCell>
            <TableCell align="center">
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton
                  size="small"
                  onClick={() => onEdit(allocation)}
                  color="primary"
                >
                  <Edit size={16} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDelete(allocation.id)}
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

export default TeacherAllocationTable;
