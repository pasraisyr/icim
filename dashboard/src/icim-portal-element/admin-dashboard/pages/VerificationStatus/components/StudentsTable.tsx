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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Edit, Trash, Profile2User, Eye } from 'iconsax-react';
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import HistoryTable from './HistoryTable';
import { Student } from '../api';

interface StudentsTableProps {
  students: Student[]; // <-- Add this line
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onVerify: (id: number) => void;
}

const paymentLabels: Record<string, string> = {
  registration: 'Registration',
  depo: 'Depo',
  modul: 'Modul',
  class: 'Class'
};

const StudentsTable = ({ students, onEdit, onDelete, onVerify }: StudentsTableProps) => {
  const [tab, setTab] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);
  const tabLabels = ['Bayar Penuh', 'Bayar Ansuran'];
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);

  let displayedStudents: Student[] = [];
  if (tab === 0) {
    displayedStudents = students.filter(s => (s.selected_payments?.length ?? 0) === 4 && s.status === 'inactive');
  } else if (tab === 1) {
    displayedStudents = students.filter(s => {
      const len = s.selected_payments?.length ?? 0;
      return len > 0 && len < 4 && s.status === 'inactive';
    });
  }

  return (
    <>
      <Button variant="outlined" sx={{ mb: 2 }} onClick={() => setHistoryOpen(true)}>
        History
      </Button>
      <Dialog open={historyOpen} onClose={() => setHistoryOpen(false)} maxWidth="lg" fullWidth>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: 2 }}>
          <Typography variant="h6">History</Typography>
          <Button onClick={() => setHistoryOpen(false)}>Close</Button>
        </Stack>
        <HistoryTable students={students} onEdit={onEdit} onDelete={onDelete} onVerify={onVerify} />
      </Dialog>
      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 2 }}>
        {tabLabels.map(label => (
          <Tab key={label} label={label} />
        ))}
      </Tabs>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Guardian Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Payments</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Receipt</TableCell>
              <TableCell>Submitted At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>

                  {student.studentName}

                </TableCell>
                <TableCell>{student.guardianName}</TableCell>
                <TableCell>{student.guardianPhone}</TableCell>
                <TableCell>{student.class_name}</TableCell>
                <TableCell>{student.level}</TableCell>
                <TableCell>
                  {(() => {
                    let payments = student.selected_payments;
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
                          {paymentLabels[p.type] || p.type}{p.amount !== undefined ? `: RM ${p.amount}` : ''}
                        </div>
                      ))
                      : 'N/A';
                  })()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={student.status}
                    color={student.status === 'active' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {student.payment_receipt ? (
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => window.open(`/media/${student.payment_receipt}`, '_blank')}
                    >
                      Check
                    </Button>
                  ) : (
                    'No Receipt'
                  )}
                </TableCell>
                <TableCell>{student.submitted_at}</TableCell>
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
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => onVerify(student.id)}
                      disabled={student.status === 'active'}
                    >
                      Verify
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentsTable;
