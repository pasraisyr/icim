import React, { useState } from 'react';
import { Button } from '@mui/material';
import ClassAttendanceDialog from './ClassAttendanceDialog';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';

interface AttendanceTableProps {
  records: any[];
  teachers?: any[];
  students?: any[];
  selectedClass: string;
  classes?: any[];
  selectedTeacher?: string;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ records, teachers, selectedTeacher }) => {

  let teacherName = '';
  if (selectedTeacher && teachers && teachers.length > 0) {
    const found = teachers.find((t: any) => String(t.id) === String(selectedTeacher));
    teacherName = found
      ? (found.first_name && found.last_name
          ? `${found.first_name} ${found.last_name}`
          : found.name || found.id)
      : '';
  }

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);

  const getStatus = (record: any) => {
    if (record.status) {
      return record.status;
    }
    return 'Unknown';
  };

  // Helper to get teacher name for a record
  const getTeacherName = (record: any) => {
    if (record.teacher_name) return record.teacher_name;
    if (record.teacher_id && teachers && teachers.length > 0) {
      const found = teachers.find((t: any) => String(t.id) === String(record.teacher_id));
      return found
        ? (found.first_name && found.last_name
            ? `${found.first_name} ${found.last_name}`
            : found.name || found.id)
        : record.teacher_id;
    }
    return '';
  };

  // Group records by date and teacher
  const grouped: { [key: string]: any[] } = {};
  records.forEach((rec: any) => {
    const key = `${rec.date}_${getTeacherName(rec)}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(rec);
  });

  // Prepare rows: one per teacher/date, map student IDs to names
  const rows = Object.entries(grouped).map(([key, group]) => {
    const first = group[0];
    return {
      date: first.date,
      teacherName: getTeacherName(first),
      status: 'Submitted',
      statusAtt: getStatus(first),
      students: group.map((g: any) => ({
        name: g.student_name || g.name || g.student || g.id,
        status: g.status || '',
      })),
    };
  });

  const handleView = (row: any) => {
    setSelected(row);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <>
      <Box mt={2}>
        {teacherName && (
          <Typography variant="subtitle1" color="primary" gutterBottom>
            Teacher: {teacherName}
          </Typography>
        )}
        {records.length === 0 ? (
          <Typography>No attendance records found.</Typography>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 350 }}>
            <Table stickyHeader size="small" aria-label="attendance table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Teacher</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <TableRow key={row.date + '_' + row.teacherName} hover>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.teacherName}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <Button variant="outlined" size="small" onClick={() => handleView(row)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <ClassAttendanceDialog
        open={open}
        onClose={handleClose}
        className={selected?.teacherName || ''}
        date={selected?.date || ''}
        students={selected?.students || []}
      />
    </>
  );
};

export default AttendanceTable;