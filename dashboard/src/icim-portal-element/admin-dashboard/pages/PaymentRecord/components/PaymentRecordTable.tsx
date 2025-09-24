import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Edit, Trash } from 'iconsax-react';

import { PaymentRecordData } from '../api';
import { Student } from '../../StudentsManagement/api';

interface PaymentRecordTableProps {
  allocations: PaymentRecordData[];
  students: Student[];
  onEdit: (allocation: PaymentRecordData) => void;
  onDelete: (allocation: PaymentRecordData) => void;
  getStudentInfo: (student_id: number) => string;
  getClassroomName: (student_id: number) => string;
}

const PaymentRecordTable = ({
  allocations = [],
  students = [],
  onEdit,
  onDelete,
  getStudentInfo,
  getClassroomName,
}: PaymentRecordTableProps) => {
  const [search, setSearch] = useState('');

  // Helper to get full student object
  const getStudentById = (id: number) => students.find(s => s.id === id);

  // Filter allocations by student status
  const activeAllocations = allocations.filter(a => {
    const student = getStudentById(a.student_id);
    return student && student.status === 'active';
  });

  // Filter by search (student name or IC)
  const filteredAllocations = activeAllocations.filter(a => {
    const student = getStudentById(a.student_id);
    const name = student ? `${student.first_name} ${student.last_name}` : '';
    const ic = student?.studentIC || '';
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      ic.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Search by student name or IC"
          variant="outlined"
          size="small"
          value={search}
          onChange={e => setSearch(e.target.value)}
          fullWidth
        />
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Student IC</TableCell>
              <TableCell>Class Package</TableCell>
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
            {filteredAllocations.length > 0 ? (
              filteredAllocations.map((allocation) => {
                const student = getStudentById(allocation.student_id);
                return (
                  <TableRow key={allocation.id}>
                    <TableCell>
                      {getStudentInfo(allocation.student_id).replace(/\s*\(.*?\)\s*$/, '')}
                    </TableCell>
                    <TableCell>{student?.studentIC || ''}</TableCell>
                    <TableCell>{allocation.class_package_name || getClassroomName(allocation.student_id)}</TableCell>
                    <TableCell>{allocation.payment_method}</TableCell>
                    <TableCell>{allocation.payment_reference}</TableCell>
                    <TableCell>
                      {allocation.payment_receipt ? (
                        <a href={allocation.payment_receipt} target="_blank" rel="noopener noreferrer">View</a>
                      ) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        let payments = allocation.selected_payments;
                        if (typeof payments === 'string') {
                          try {
                            payments = JSON.parse(payments);
                          } catch {
                            payments = [];
                          }
                        }
                        return Array.isArray(payments) && payments.length > 0
                          ? payments.map((p: any, idx: number) => (
                              <div key={idx}>
                                {p.type}{p.amount !== undefined ? `: ${p.amount}` : ''}
                              </div>
                            ))
                          : 'N/A';
                      })()}
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
                          onClick={() => onDelete(allocation)}
                          color="error"
                        >
                          <Trash size={16} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">No records found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PaymentRecordTable;
