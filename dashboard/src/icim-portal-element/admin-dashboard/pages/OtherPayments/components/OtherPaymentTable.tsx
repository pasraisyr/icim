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
import { OtherPayment } from '../api';

interface OtherPaymentTableProps {
  otherPayments: OtherPayment[];
  onEdit: (otherPayment: OtherPayment) => void;
  onDelete: (id: number) => void;
}

const OtherPaymentTable = ({ otherPayments, onEdit, onDelete }: OtherPaymentTableProps) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Payment Name</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Status</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {otherPayments.map((otherPayment) => (
          <TableRow key={otherPayment.id}>
            <TableCell>
              <Stack direction="row" alignItems="center" spacing={2}>
                <DocumentText size={20} />
                <Typography variant="subtitle2">{otherPayment.name}</Typography>
              </Stack>
            </TableCell>
            <TableCell>RM{Number(otherPayment.price).toFixed(2)}</TableCell>
            <TableCell>
              <Chip 
                label={otherPayment.status ? 'Active' : 'Inactive'}
                color={otherPayment.status ? 'success' : 'default'}
                size="small"
              />
            </TableCell>
            <TableCell align="center">
              <Stack direction="row" spacing={1} justifyContent="center">
                <IconButton 
                  size="small" 
                  onClick={() => onEdit(otherPayment)}
                  color="primary"
                >
                  <Edit size={16} />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => onDelete(otherPayment.id)}
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

export default OtherPaymentTable;
