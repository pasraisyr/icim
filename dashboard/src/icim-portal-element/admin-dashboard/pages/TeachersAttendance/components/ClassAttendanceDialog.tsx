import React from 'react';
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, TableCell, TableBody, Typography, Box } from '@mui/material';

interface ClassAttendanceDialogProps {
  open: boolean;
  onClose: () => void;
  className: string;
  date: string;
  students: Array<{ id: string | number; name?: string; studentName?: string; status: string }>;
}

const ClassAttendanceDialog: React.FC<ClassAttendanceDialogProps> = ({ open, onClose, className, date, students }) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Attendance Details</DialogTitle>
    <DialogContent>
      <Typography>Date: {date}</Typography>
      <Typography>Class: {className}</Typography>
      <Box mt={2}>
        <Typography variant="subtitle1">Student Attendance:</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>Student Name</b></TableCell>
              <TableCell><b>Status</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s, i) => (
              <TableRow key={s.id || i}>
                <TableCell>{s.name || s.studentName || s.id}</TableCell>
                <TableCell>{s.status.charAt(0).toUpperCase() + s.status.slice(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DialogContent>
  </Dialog>
);

export default ClassAttendanceDialog;
