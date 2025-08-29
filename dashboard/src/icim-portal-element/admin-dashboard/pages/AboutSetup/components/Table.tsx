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
import { About } from '../api';

interface AboutsTableProps {
  abouts: About[];
  onEdit: (about: About) => void;
  onDelete: (id: number) => void;
}

const AboutsTable = ({ abouts, onEdit, onDelete }: AboutsTableProps) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          {/* <TableCell>Status</TableCell> */}
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {abouts.map((about) => (
          <TableRow key={about.id}>
            <TableCell>
              <Typography variant="subtitle2">{about.title}</Typography>
            </TableCell>
            <TableCell>
              <Stack direction="row" alignItems="center" spacing={2}>
                <DocumentText size={20} />
                <Typography variant="subtitle2">{about.description}</Typography>
              </Stack>
            </TableCell>
            {/* <TableCell>
              <Chip 
                label={about.status}
                color={about.status === 'active' ? 'success' : 'default'}
                size="small"
              />
            </TableCell> */}
            <TableCell align="center">
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton 
                  size="small" 
                  onClick={() => onEdit(about)}
                  color="primary"
                >
                  <Edit size={16} />
                </IconButton>
                {/* <IconButton 
                  size="small" 
                  onClick={() => onDelete(about.id)}
                  color="error"
                >
                  <Trash size={16} />
                </IconButton> */}
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default AboutsTable;
