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
import { Edit, Trash, Book } from 'iconsax-react';

import { Class, Subject } from '../api';

interface ClassesTableProps {
  classes: Class[];
  onEdit: (cls: Class) => void;
  onDelete: (id: number) => void;
  getSubjectNames: (subjects: Subject[]) => string;
}

const ClassesTable = ({ classes, onEdit, onDelete, getSubjectNames }: ClassesTableProps) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Class Name</TableCell>
          <TableCell>Subjects</TableCell>
          <TableCell>Level</TableCell>
          <TableCell>Day</TableCell>
          <TableCell>Duration</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Status</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {classes.map((cls) => (
          <TableRow key={cls.id}>
            <TableCell>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Book size={20} />
                <Typography variant="subtitle2">{cls.name}</Typography>
              </Stack>
            </TableCell>
            <TableCell>{getSubjectNames(cls.subjects)}</TableCell>
            <TableCell>{cls.level}</TableCell>
            <TableCell>{cls.scheduleDay.join(', ')}</TableCell>
            <TableCell>{cls.startTime} - {cls.endTime}</TableCell>
            <TableCell>{cls.price}</TableCell>
            <TableCell>
              <Chip 
                label={cls.statuse}
                color={cls.statuse === 'active' ? 'success' : 'default'}
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton 
                  size="small" 
                  onClick={() => onEdit(cls)}
                  color="primary"
                >
                  <Edit size={16} />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => onDelete(cls.id)}
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

export default ClassesTable;
