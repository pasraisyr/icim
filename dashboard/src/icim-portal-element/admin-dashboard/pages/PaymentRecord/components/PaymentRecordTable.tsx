import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Edit, Trash, Teacher as TeacherIcon } from 'iconsax-react';

import { PaymentRecordData } from '../api';

interface PaymentRecordTableProps {
  allocations: PaymentRecordData[];
  onEdit: (allocation: PaymentRecordData) => void;
  onDelete: (id: number) => void;
}

const PaymentRecordTable = ({ allocations = [], onEdit, onDelete }: PaymentRecordTableProps) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Student Name</TableCell>
          <TableCell>Student IC</TableCell>
          <TableCell>Student Class</TableCell>
          <TableCell>Payment Method</TableCell>
          <TableCell>Payment Reference</TableCell>
          <TableCell>Receipt</TableCell>
          <TableCell>Selected Payments</TableCell>
          <TableCell>Total Payment</TableCell>
          <TableCell>Submitted At</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.isArray(allocations) && allocations.length > 0 ? (
          allocations.map((allocation) => (
            <TableRow key={allocation.id}>
              <TableCell>{allocation.studentName}</TableCell>
              <TableCell>{allocation.studentIC}</TableCell>
              <TableCell>{allocation.studentClass}</TableCell>
              <TableCell>{allocation.payment_method}</TableCell>
              <TableCell>{allocation.payment_reference}</TableCell>
              <TableCell>
                {allocation.payment_receipt ? (
                  <a href={allocation.payment_receipt} target="_blank" rel="noopener noreferrer">View</a>
                ) : 'N/A'}
              </TableCell>
              <TableCell>
                {allocation.selected_payments && allocation.selected_payments.length > 0
                  ? allocation.selected_payments.map((p: any, idx: number) => {
                      if (typeof p === 'string') {
                        return <div key={idx}>{p}</div>;
                      } else if (typeof p === 'object' && p !== null) {
                        // Show type and amount if available
                        return (
                          <div key={idx}>
                            {p.type}
                            {p.amount !== undefined ? `: ${p.amount}` : ''}
                          </div>
                        );
                      }
                      return null;
                    })
                  : 'N/A'}
              </TableCell>
              <TableCell>{allocation.total_payment}</TableCell>
              <TableCell>{allocation.submitted_at}</TableCell>
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
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={10} align="center">No records found</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default PaymentRecordTable;
