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
import { Edit, Trash, DocumentText } from 'iconsax-react';
import { Subject } from '../api';

interface SubjectsTableProps {
  subjects: Subject[];
  onEdit: (subject: Subject) => void;
  onDelete: (id: number) => void;
}

const SubjectsTable = ({ subjects, onEdit, onDelete }: SubjectsTableProps) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Subject Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {subjects.map((subject) => (
          <TableRow key={subject.id}>
            <TableCell>
              <Stack direction="row" alignItems="center" spacing={2}>
                <DocumentText size={20} />
                <Typography variant="subtitle2">{subject.name}</Typography>
              </Stack>
            </TableCell>
            <TableCell>
              <Chip 
                label={subject.status}
                color={subject.status === 'active' ? 'success' : 'default'}
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton 
                  size="small" 
                  onClick={() => onEdit(subject)}
                  color="primary"
                >
                  <Edit size={16} />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => onDelete(subject.id)}
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

export default SubjectsTable;
