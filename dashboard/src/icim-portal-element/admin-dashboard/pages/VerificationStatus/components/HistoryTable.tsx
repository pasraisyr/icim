import React, { useState } from 'react';
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
import Button from '@mui/material/Button';
import { Edit, Trash, Profile2User, Eye } from 'iconsax-react';
import { Student } from '../api';
interface HistoryTableProps {
  students: Student[];
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

const HistoryTable = ({ students, onEdit, onDelete, onVerify }: HistoryTableProps) => {
  const [tab, setTab] = useState(0);
  const tabLabels = ['Bayar Penuh', 'Bayar Ansuran'];
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setTab(newValue);
  let displayedStudents: Student[] = [];
  if (tab === 0) {
    // Bayar Penuh: students with all 4 payments and active status
    displayedStudents = students.filter(s => (s.selected_payments?.length ?? 0) === 4 && s.status === 'active');
  } else if (tab === 1) {
    // Bayar Ansuran: students with 1-3 payments and active status
    displayedStudents = students.filter(s => {
      const len = s.selected_payments?.length ?? 0;
      return len > 0 && len < 4 && s.status === 'active';
    });
  }

  return (
    <>
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
            {displayedStudents.map((student: Student) => (
              <TableRow key={student.id}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Profile2User size={10} />
                    <Typography variant="subtitle2">{student.studentName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{student.guardianName}</TableCell>
                <TableCell>{student.guardianPhone}</TableCell>
                <TableCell>{student.class_name}</TableCell>
                <TableCell>{student.level}</TableCell>
                <TableCell>
                  {student.selected_payments?.length
                    ? student.selected_payments.map((p: string) => paymentLabels[p] || p).join(', ')
                    : 'No Payment'}
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
                    <IconButton
                      size="small"
                      color="info"
                      onClick={() => window.open(`/media/${student.payment_receipt}`, '_blank')}
                    >
                      <Eye size={16} />
                    </IconButton>
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
                    {/* <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => onVerify(student.id)}
                      disabled={student.status === 'active'}
                    >
                      Verify
                    </Button> */}
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
export default HistoryTable;
